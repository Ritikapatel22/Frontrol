import { useState, useMemo } from 'react'
import {
  Widget,
  Grid,
  currencyFactory,
  getQueryStringValue,
} from '@frontrolinc/pace-ui-framework'
import { useFetchDataQuery } from '../../app/appApi'
import { getQueryConfig } from '../Shared/portfolioSnapshot'
import config from './config'
import { getTableHeight } from '../../helpers/utils'
import { populateHierarchyCall } from '../../TransposeData'
import { useNavigate } from 'react-router-dom'
import { generatePath } from 'react-router'
import { rootPath } from '../../config'
import { formatDate } from '../../formatData'
import { useSelector } from 'react-redux'

function WeekCostWidget({ block }) {
  const [isProject, setIsProject] = useState(true)
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState('')
  const selectedPortfolio = useSelector(
    (state) => state.portfolio?.selectedPortfolio?.portfolio_id,
  )
  const weekCostUiConfigUpdated = config.weekCostUiConfig
  const useCurrency = () => {
    return block.isFullScreen &&
      currencyFactory.currencyRates &&
      currencyFactory.currencyRates.length > 1
      ? true
      : false
  }

  const calculateColumns = (data) => {
    let weekCostColumns = []
    const shouldConvert = currencyFactory.shouldConvert
    if (typeof data !== 'undefined') {
      data.forEach(function (el) {
        el = {
          ...el,
          itd_total_cost: parseFloat(el.itd_fully_burdened_cost)
            ? shouldConvert
              ? parseFloat(
                  currencyFactory.convertCurrency({
                    currencyValue: el.itd_fully_burdened_cost,
                    currentCurrency: el.project_function_curr_code,
                  }),
                )
              : parseFloat(el.itd_fully_burdened_cost)
            : 0 + parseFloat(el.itd_odc_subs_cost)
            ? shouldConvert
              ? parseFloat(
                  currencyFactory.convertCurrency({
                    currencyValue: el.itd_odc_subs_cost,
                    currentCurrency: el.project_function_curr_code,
                  }),
                )
              : parseFloat(el.itd_odc_subs_cost)
            : 0,
        }
        // el = {
        //   ...el,
        //   avg_cost_rate: parseFloat(el.itd_fully_burdened_cost)
        //     ? shouldConvert
        //       ? parseFloat(
        //           currencyFactory.convertCurrency({
        //             currencyValue: el.itd_fully_burdened_cost,
        //             currentCurrency: el.project_function_curr_code,
        //           }),
        //         ) /
        //         (parseFloat(el.itd_hours)
        //           ? parseFloat(
        //               currencyFactory.convertCurrency({
        //                 currencyValue: el.itd_hours,
        //                 currentCurrency: el.project_function_curr_code,
        //               }),
        //             )
        //           : 1)
        //       : parseFloat(el.itd_fully_burdened_cost) /
        //         (parseFloat(el.itd_hours) ? parseFloat(el.itd_hours) : 1)
        //     : 0,
        // }
        weekCostColumns.push(el)
      })
      return weekCostColumns
    }
  }

  const periodData = (response) => {
    // return response.Data["EarnedValues.PeriodInfo"][0].period;
    var responseData = ['Week 1', 'Week 2', 'Week 3', 'Week 4', , 'Week 5']
    if (typeof response !== 'undefined') {
      response.Data['AcmTaskResource.portfolioLevelWeekCost']['periodSchema']
        ? (responseData = [])
        : ''
      for (
        let i = 0;
        i <
        response.Data['AcmTaskResource.portfolioLevelWeekCost']['periodSchema']
          .length;
        i++
      ) {
        responseData.push(
          formatDate(
            response.Data['AcmTaskResource.portfolioLevelWeekCost'][
              'periodSchema'
            ][i],
          ),
        )
      }
    }
    return responseData
    // return response?.Data['AcmTaskResource.portfolioLevelWeekCost'][0]
    //   .periodSchema
  }

  const projectDrilldown = (e) => {
    let view = getQueryStringValue('view')
    if (e.isOpenInNewTab) {
      const rowKey = e.data.project_id
      let url = generatePath('/project/:id', {
        id: rowKey,
      })
      const baseName = rootPath ? rootPath.replace(/\/$/, '') : ''
      url = baseName + url
      window.open(url, '_blank')
    } else if (
      e.colDef.headerNameKey == 'Project/Resources' &&
      e.data.row_type == 'P'
    ) {
      navigate(`/project/${e.data.project_id}?view=${view}`)
    }
  }

  const onProjectCellClick = (event) => {
    // const result = SERIES_INFO_INVOICE_Bill.filter((item, key) => {
    //   return item.type === event.colDef.headerName;
    // });
    // if (result.length != 0) {
    //   //setIsProject(false);
    // } else {
    projectDrilldown(event, navigate)
    // }
  }

  const loaderOptions = {
    type: 'dashboardWidget',
    layout: 'grid',
    tabs: 0,
    isFullWidth: true,
  }

  const uiConfig = {
    block: block,
    loaderOptions: loaderOptions,
    widgetId: block.instanceId,
    isFullScreen: block.isFullScreen,
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: {
        queryName: 'AcmTaskResource.portfolioLevelWeekCost',
        protfoliyoid: selectedPortfolio,

        __config__: {
          transformResponse: (response) => {
            ///do logic here

            if (
              response.Data['AcmTaskResource.portfolioLevelWeekCost'] &&
              typeof response.Data['AcmTaskResource.portfolioLevelWeekCost'][
                'portfolioLevelWeekCost'
              ] !== 'undefined'
            ) {
              response.Data['AcmTaskResource.portfolioLevelWeekCost'][
                'portfolioLevelWeekCost'
              ] = populateHierarchyCall(
                response.Data['AcmTaskResource.portfolioLevelWeekCost'][
                  'portfolioLevelWeekCost'
                ],
              )
            }
          },
          providesTags: () => [`portfolio_dashboard_${selectedPortfolio}`],
        },
      },
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            data:
              typeof response.data.Data[
                'AcmTaskResource.portfolioLevelWeekCost'
              ]['portfolioLevelWeekCost'] !== 'undefined'
                ? calculateColumns(
                    response.data.Data[
                      'AcmTaskResource.portfolioLevelWeekCost'
                    ]['portfolioLevelWeekCost'],
                  )
                : undefined,
          }
        },
      },
    },
    content: {
      type: 'jsx',
      label: 'This week cost',
      id: 'dashBoardWeekCost',
      child: Grid,
      widgetRootDataProp: 'widgetRootData',
      isUseCurrency: useCurrency,
      dataPropName: 'rows',
      // processData: (data) => {
      //   return populateHierarchyCall(data.Data['AcmTaskResource.portfolioLevelWeekCost']);
      // },
      childProps: {
        id: 'dashBoardWeekCost',
        currencyColumnName: 'project_function_curr_code',
        uiConfig: {
          ...weekCostUiConfigUpdated,
          suppressColumnMoveAnimation: true,
          debounceVerticalScrollbar: true,
          onCellClicked: onProjectCellClick,
        },
      },
      mapHeaderFromResponse: (data) => {
        if (
          data !== undefined &&
          typeof data.Data['AcmTaskResource.portfolioLevelWeekCost'][
            'periodSchema'
          ] !== 'undefined'
        ) {
          const periodDatas =
            data.Data['AcmTaskResource.portfolioLevelWeekCost']['periodSchema']
              .length !== 0 &&
            data.Data['AcmTaskResource.portfolioLevelWeekCost'].hasOwnProperty(
              'periodSchema',
            ) !== false
              ? periodData(data)
              : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
          return periodDatas
        }
      },
    },
  }

  return <Widget config={uiConfig}></Widget>
}

export default WeekCostWidget
