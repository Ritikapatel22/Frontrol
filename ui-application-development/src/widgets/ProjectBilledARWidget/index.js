import { useState } from 'react'
import { Widget, Grid } from '@frontrolinc/pace-ui-framework'
import { useFetchDataQuery } from '../../app/appApi'
import { getQueryConfig, getProjectId } from '../Shared/projectSnapshot'
import { invoiceData, invoiceData2 } from '../../TransposeData'
import config from './config'
import { getTableHeight } from '../../helpers/utils'
import { useTranslation } from 'react-i18next';

import Graph from './graph'
import {
  getSummaryData,
  getSummaryTableData,
  getTableData,
  getNumber,
  openInvoiceUrl
} from '../../TransposeData'
import { useSelector } from 'react-redux'
import { abcDevBaseUrl } from '../../config'

const { COLUMN_NAMES, SERIES_INFO } = config.summaryMappings

function ProjectBilledARWidget({ block }) {
  // const projectID = window.location.href.split("/project/")[1]?.split('?')[0];
  const projectID = getProjectId(window.location.href)
  const { t } = useTranslation(['label', 'message']);

  const user_name = useSelector(
    (state) => state?.loginAuth?.userProfile?.user_name,
  )
  const hanldeClick = (e) => {
    if (e.colDef.field === 'ra_invoice_number'&& e.data?.ra_invoice_number) {
      openInvoiceUrl(abcDevBaseUrl, e.data.bill_to_customer_id, e.data.invoice_class, e.data.project_id, e.data.draft_invoice_num, e.data.ra_invoice_number, user_name)
    }
  }

  const filteredData = (data) => {
    let arFilteredData = []
    data.filter(function (el) {
      el = {
        ...el,
        gross_functional_amount:
        getNumber(el.projfunc_bill_amount) +
        getNumber(el.accounted_tax_amt),
      }
      el = {
        ...el,
        gross_amount: getNumber(el.inv_amount) + getNumber(el.tax_amount),
      }
      el = {...el, payment_received : getNumber(el.gross_amount) - getNumber(el.balance)}
      el = {...el, prof_func_payment_received : getNumber(el.gross_functional_amount) - getNumber(el.projfunc_balance)} 
      const agedDays = el.age_days;
      if (agedDays < 31 && el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_0030.label };
      } else if (agedDays < 61 && el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_3160.label };
      } else if (agedDays < 91 && el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_6190.label };
      } else if (agedDays < 181 && el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_91180.label };
      } else if (el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_over_180.label };
      }
      
      arFilteredData.push(el)
    })
    return arFilteredData
  }

  const loaderOptions = {
    type: 'dashboardWidget',
    layout: 'graph',
    tabs: 3,
    isFullWidth: false,
  }
  const uiConfig = {
    block: block,
    loaderOptions: loaderOptions,
    widgetId: block.instanceId,
    isFullScreen: block.isFullScreen,
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: getQueryConfig(),
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            data:
              response.data && response.data.data
                ? response.data.data.project
                : undefined,
          }
        },
      },
    },
    content: {
      type: 'tabs',
      tabs: [
        {
          label: 'Graph',
          id: 'graph',
          exportAs : "png",
          child: Graph,
          selected: true,
          dataPropName: 'filteredData',
          childProps: {
            getTableHeight,
            block
          },
        },
        {
          label: 'Table',
          id: 'table',
          exportAs : "excel",
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            // const summarizedDataforTable = invoiceData(data, "invoiceTable");
            const summarizedData = getSummaryData(data, COLUMN_NAMES, 0, true)
            // console.log("this is the new data", summarizedData)
            const summaryData = getSummaryTableData(summarizedData, SERIES_INFO)
            // console.log("this is the new getSummaryTableData", summaryData)
            // return summarizedDataforTable;
            for (let langData in summaryData) {
              summaryData[langData].aging = t(summaryData[langData].aging, {ns:"label"})
            }
            console.log("summaryData",summaryData)
            return summaryData
          },
          childProps: {
            id: 'table',
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: config.tableUiConfig,
            style: { height: 252, width: 415 },
          },
        },
        {
          label: 'Invoices',
          id: 'invoice',
          exportAs : "excel",
          child: Grid,
          childProps: {
            id: 'invoice',
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: {
              ...config.invoiceUiConfig,
              onCellClicked: hanldeClick,
              },
            style: { height: 250 },
            reduxConfig: {
              query: useFetchDataQuery,
              params: {
                queryName: 'ProjectInvoice.getProjectInvoices',
                project_id: parseInt(projectID),
              },
              resultSelector(response) {
                return {
                  ...response,
                  // data: response.data ? response.data.Data["ProjectInvoice.getProjectInvoices"] : undefined,
                  data: response.data
                    ? filteredData(
                        response.data.Data['ProjectInvoice.getProjectInvoices'],
                      )
                    : undefined,
                }
              },
            },
          },
        },
      ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default ProjectBilledARWidget
