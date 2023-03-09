import { useEffect, useState } from 'react'
import { Widget, Grid, logger } from '@frontrolinc/pace-ui-framework'
import { useFetchDataQuery, useMultipleFetchDataQuery } from '../../app/appApi'
import { getQueryConfig as projectSnapshot } from '../Shared/projectSnapshot'
import config from './config'
import { getPayload } from '../Shared/portfolioSnapshot'
import {
  getComputedData,
  GridIcon,
  GridInfoTip,
} from '@frontrolinc/pace-ui-framework'
import green_circle from '../../assets/icons/green_circle.svg'
import info from '../../assets/icons/info-fill.svg'
import red_diamond from '../../assets/icons/red_diamond.svg'
import { getTableHeight } from '../../helpers/utils'
import yellow_triangle from '../../assets/icons/yellow_triangle.svg'
import arrow_top from '../../assets/icons/arrow_top.svg'
import no_change from '../../assets/icons/no_change.svg'
import arrow_down from '../../assets/icons/arrow_down.svg'
import { formulaDefs } from './kpiFormulas'
import { mergeKpiInfo, evaluateKpiValues, kpi_indicators } from './util'
import { useTranslation } from 'react-i18next'
// import CustomTooltip from "./customTooltip"

function KeyPerfomanceIndicators({ block }) {
  const projectID = window.location.href.split('/project/')[1]?.split('?')[0]
  const { t } = useTranslation(['label'])

  var data = [
    config.CashUiConfig,
    config.DataQualityUiConfig,
    config.FinancialUiConfig,
    config.ProgressUiConfig,
    config.ProjectsFlagsUiConfig,
  ]

  useEffect(() => {
    data.map((item, key) => {
      item.columnDefs.map((val, index) => {
        if (val.tooltipField === 'description') {
          val.tooltipComponent = GridInfoTip
          val.cellRenderer = (param) => {
            return (
              <GridIcon {...param} customClassName="kpi-custom-info">
                <img src={info}></img>
              </GridIcon>
            )
          }
        } else if (val.field === 'kpi_indicator') {
          val.tooltipComponent = GridInfoTip
          val.cellRendererSelector = (param) => {
            if (param.data.sparkline != true) {
              const icon = () => {
                return (
                  <GridIcon {...param} customClassName="kpi-custom-info">
                    {param.data.kpi_indicator == 'red' && (
                      <img
                        className="indicators_center_progress"
                        src={red_diamond}
                      ></img>
                    )}
                    {param.data.kpi_indicator == 'green' && (
                      <img
                        className="indicators_center_progress"
                        src={green_circle}
                      ></img>
                    )}
                    {param.data.kpi_indicator == 'yellow' && (
                      <img
                        className="indicators_center_progress"
                        src={yellow_triangle}
                      ></img>
                    )}
                  </GridIcon>
                )
              }
              return { component: icon }
            }
          }
        } else if (val.field === 'kpi_updown') {
          val.cellRenderer = (param) => {
            return (
              <GridIcon {...param} customClassNameName="kpi-custom-info">
                {param.data.kpi_updown == 'same' && (
                  <img className="indicators_center" src={no_change}></img>
                )}
                {param.data.kpi_updown == 'up' && (
                  <img className="indicators_center" src={arrow_top}></img>
                )}
                {param.data.kpi_updown == 'down' && (
                  <img className="indicators_center" src={arrow_down}></img>
                )}
              </GridIcon>
            )
          }
        }
      })
    })
  })

  const transformResponse = (response) => {
    let reportingData = [
      JSON.parse(JSON.stringify(response.reporting.data.project)),
    ]
    let kpiData = response.query.Data['AcmKpiThreshold.kpiData']

    //1. add some additional computed fields to the project data: TBD - need to review and cleanup this logic
    let temp = []
    if (typeof reportingData !== 'undefined') {
      reportingData.filter(function (el) {
        el = {
          ...el,
          eac_due_date:
            el.last_eac_date == null
              ? null
              : el.class_11 == 'C-0' || el.class_11 == 'C-1'
              ? incrementDate(el.last_eac_date, 30)
              : incrementDate(el.last_eac_date, 90),
          eac_due_days:
            el.last_eac_date == null
              ? null
              : el.class_11 == 'C-0' || el.class_11 == 'C-1'
              ? twoDaysDiff(incrementDate(el.last_eac_date, 30))
              : twoDaysDiff(incrementDate(el.last_eac_date, 90)),
          billed_ar_days: billedArdays(el, billeddata),
          un_billed_ar_days: billedArdays(el, unbilleddata),
          end_data_kpi_value: el.forecast_end_date
            ? twoDaysDiff(el.forecast_end_date)
            : '',
          // arb_frb_kpi_val: arbfrbkpi(el),
        }
        temp.push(el)
      })
      reportingData = temp
    }

    //2. apply formulas - TBD: should this be added to the project data?
    reportingData = getComputedData(reportingData, formulaDefs)

    let projectData = reportingData[0]

    //3. merge UI info to the queried data
    kpiData = mergeKpiInfo(kpiData)

    //4. evaluate KPI values from project data
    kpiData = evaluateKpiValues(kpiData, projectData)
    response.query.gridData = kpiData

    logger.add({
      action: 'KPI data',
      data: kpiData,
    })
  }

  var billeddata = [
    { name: 'ar_0030', val: 'ar_0030', day: 30 },
    { name: 'ar_3160', val: 'ar_3160', day: 60 },
    { name: 'ar_6190', val: 'ar_6190', day: 90 },
    { name: 'ar_91180', val: 'ar_91180', day: 180 },
    { name: 'ar_over_180', val: 'ar_over_180', day: 181 },
  ]
  var unbilleddata = [
    { name: 'unbilled_rec_0030', val: 'unbilled_rec_0030', day: 30 },
    { name: 'unbilled_rec_3160', val: 'unbilled_rec_3160', day: 60 },
    { name: 'unbilled_rec_6190', val: 'unbilled_rec_6190', day: 90 },
    { name: 'unbilled_rec_91180', val: 'unbilled_rec_91180', day: 180 },
    { name: 'unbilled_rec_over_180', val: 'unbilled_rec_over_180', day: 181 },
  ]

  // const arbfrbkpi=(data)=>{
  //   let current = data.at_comp_plan1_revenue == data.at_comp_plan2_revenue ? null : data.at_comp_plan1_revenue - data.at_comp_plan2_revenue
  //   let last = data.at_comp_plan1_rev_pp == data.at_comp_plan2_rev_pp ? null :data.at_comp_plan1_rev_pp - data.at_comp_plan2_rev_pp
  //   if(current!=null || last!=null){
  //     return current == last  ? 'green' : 'yellow'
  //   }
  // }

  const billedArdays = (val, data) => {
    data.map((value) => {
      Object.keys(value).map((y) => {
        Object.keys(val).map((x) => {
          if (x == value[y]) {
            return (value.val = val[x])
          }
        })
      })
    })
    var day = 0
    data &&
      data.filter((item) => {
        if (item.val != 0) {
          day = item.day
          return day
        }
      })
    return day
  }

  const twoDaysDiff = (last_eac_date) => {
    const date1 = new Date(last_eac_date)
    const date2 = new Date()
    if (date1 > date2) {
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    } else {
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return -diffDays
    }
  }

  const incrementDate = (dateString, days2Add) => {
    let incrementedDate = new Date(dateString)
    incrementedDate.setDate(incrementedDate.getDate() + days2Add) //number  of days to add, e.x. 15 days
    var dateFormated = incrementedDate.toISOString().substr(0, 10)
    return dateFormated
  }

  const loaderOptions = {
    type: 'dashboardWidget',
    layout: 'grid',
    tabs: 5,
    isFullWidth: false,
  }

  const rowTranslater = (final_data) => {
    for (let i in final_data) {
      final_data[i] = {
        ...final_data[i],
        display_name: t(final_data[i].display_name),
      }
    }
    return final_data
  }

  const uiConfig = {
    block: block,
    loaderOptions: loaderOptions,
    widgetId: block.instanceId,
    isFullScreen: block.isFullScreen,
    filterName: 'Projects',
    queryConfig: {
      query: useMultipleFetchDataQuery,
      queryParams: {
        query: {
          reporting: {
            url: '/reporting',
            method: 'POST',
            payload: projectSnapshot(),
          },
          query: {
            url: '/query',
            method: 'GET',
            payload: {
              queryName: 'AcmKpiThreshold.kpiData',
              project_id: projectID, // dummy value to be changed during real implementation
            },
          },
        },
        __config__: {
          transformResponse,
        },
      },
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            data: response ? response : undefined,
          }
        },
      },
    },
    content: {
      type: 'tabs',
      tabs: [
        {
          label: 'Progress',
          id: 'progress',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            let final_data = data.data.data.query.gridData.filter(
              (item, key) => {
                return item.category == 'Progress'
              },
            )
            return rowTranslater(final_data)
          },
          childProps: {
            id: 'progress',
            uiConfig: config.ProgressUiConfig,
            style: { maxWidth: 950 },
          },
        },
        {
          label: 'Cash',
          id: 'cash',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            let final_data = data.data.data.query.gridData.filter(
              (item, key) => {
                return item.category == 'Cash'
              },
            )
            return rowTranslater(final_data)
          },
          childProps: {
            id: 'cash',
            uiConfig: config.CashUiConfig,
            style: { maxWidth: 900 },
          },
        },
        {
          label: 'Financials',
          id: 'financials',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            let final_data = data.data.data.query.gridData.filter(
              (item, key) => {
                return item.category == 'Financials'
              },
            )
            return rowTranslater(final_data)
          },
          childProps: {
            id: 'financials',
            uiConfig: config.FinancialUiConfig,
            style: { maxWidth: 900 },
          },
        },
        {
          label: 'Data quality',
          id: 'dataquality',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            let final_data = data.data.data.query.gridData.filter(
              (item, key) => {
                return item.category == 'Data Quality'
              },
            )
            return rowTranslater(final_data)
          },
          childProps: {
            id: 'dataquality',
            uiConfig: config.DataQualityUiConfig,
            style: { maxWidth: 650 },
          },
        },
        {
          label: 'Project flags',
          id: 'projectflags',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            let final_data = data.data.data.query.gridData.filter(
              (item, key) => {
                return item.category == 'Project Flags'
              },
            )
            return rowTranslater(final_data)
          },
          childProps: {
            id: 'projectflags',
            uiConfig: config.ProjectsFlagsUiConfig,
            style: { maxWidth: 900 },
          },
        },
      ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default KeyPerfomanceIndicators
