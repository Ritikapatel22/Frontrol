import { useState } from "react";
import { Widget, Grid } from "@frontrolinc/pace-ui-framework";
import { useFetchDataQuery } from "../../app/appApi";
import { getQueryConfig, getProjectId } from "../Shared/projectSnapshot";
import config from "./config";
import { getTableHeight } from "../../helpers/utils";
import Graph from "./graph";
import { useTranslation } from 'react-i18next';
import {
  getSummaryData,
  getSummaryTableData,
  getTableData,
  getNumber,
  openInvoiceUrl
} from "../../TransposeData";
import { useSelector } from 'react-redux'
import { abcDevBaseUrl } from '../../config'

const { COLUMN_NAMES, SERIES_INFO } = config.summaryMappings;

function ProjAgedARWidget({ block }) {
  // const projectID = window.location.href.split("/project/")[1]?.split('?')[0];
  const projectID = getProjectId(window.location.href);
  const periodData = (response) => {
    return response.extensions.period;
  };

  const { t } = useTranslation(['label', 'message']);

  const user_name = useSelector(
    (state) => state?.loginAuth?.userProfile?.user_name,
  )

  const hanldeClick = (e) => {
    if (e.colDef.field === 'ra_invoice_number'&& e.data?.ra_invoice_number) {
      // window.open(
      //   `${abcDevBaseUrl}/aecom/wc3.html?role=PM&ifilter=WF_ACTION_TYPE,103&invkey=.|bill_to_customer_id,${e.data.bill_to_customer_id}|invoice_class%5e,${e.data.invoice_class}|doc_id,${e.data.bill_to_customer_id},${e.data.project_id},${e.data.draft_invoice_num},${e.data.ra_invoice_number}&uuid=${user_name}`,'_blank',
      // )
      openInvoiceUrl(abcDevBaseUrl, e.data.bill_to_customer_id, e.data.invoice_class, e.data.project_id, e.data.draft_invoice_num, e.data.ra_invoice_number, user_name)
    }
  }

  const filteredData = (data) => {
    let arFilteredData = [];
    data.map(function (el) {
      el = {
        ...el,
        gross_functional_amount:
          getNumber(el.projfunc_bill_amount) +
          getNumber(el.accounted_tax_amt),
      };
      el = {
        ...el,
        gross_amount: getNumber(el.inv_amount) + getNumber(el.tax_amount),
      };
      el = {...el, payment_received : getNumber(el.gross_amount) - getNumber(el.balance)}
      el = {...el, prof_func_payment_received : getNumber(el.gross_functional_amount) - getNumber(el.projfunc_balance)} 
      const agedDays = el.age_days;
      if (agedDays < 31 && el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_0030_series.label };
      } else if (agedDays < 61 && el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_3160_series.label };
      } else if (agedDays < 91 && el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_6190_series.label };
      } else if (agedDays < 181 && el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_91180_series.label };
      } else if (el.balance > 0) {
        el = { ...el, aging_buckets: SERIES_INFO.ar_over_180_series.label };
      }
      return arFilteredData.push(el);
    });
    return arFilteredData;
  };

  const loaderOptions = {
    type: "dashboardWidget",
    layout: "graph",
    tabs: 4,
    isFullWidth: false,
  };

  const uiConfig = {
    block: block,
    loaderOptions: loaderOptions,
    widgetId: block.instanceId,
    isFullScreen: block.isFullScreen,
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: getQueryConfig(),
      // queryParams: [
      //   getQueryConfig(),
      //   {
      //     queryName: "ProjectInvoice.getProjectInvoices",
      //     projectID: parseInt(projectID),
      //   }
      // ],
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            data:
              response.data && response.data.data
                ? response.data.data.project
                : undefined,
          };
        },
      },
    },
    content: {
      type: "tabs",
      tabs: [
        {
          label: "Graph",
          id: "graph",
          exportAs : "png",
          child: Graph,
          dataPropName: "filteredData",
          widgetRootDataProp: "widgetRootData",
          childProps: {
            getTableHeight,
            block
          },
        },
        {
          label: "Summary",
          id: "summary",
          exportAs : "excel",
          child: Grid,
          processData: (data) => {
            const summarizedData = getSummaryData(data, COLUMN_NAMES, 0);
            const summarizedDataforTable = getSummaryTableData(
              summarizedData,
              SERIES_INFO
            );
            for (let langData in summarizedDataforTable) {
              summarizedDataforTable[langData].aging = t(summarizedDataforTable[langData].aging)
            }
            return summarizedDataforTable;
          },
          dataPropName: "rows",
          childProps: {
            id: "summary",
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: config.summaryUiConfig,
            style: { height: 252, width: 410 },
          },
        },
        {
          label: "Table",
          id: "table",
          exportAs : "excel",
          child: Grid,
          dataPropName: "rows",
          processData: (data) => {
            const summarizedData = getSummaryData(data, COLUMN_NAMES, 0);
            const summarizedDataforTable = getTableData(
              summarizedData,
              SERIES_INFO
            );
            for (let langData in summarizedDataforTable) {
              summarizedDataforTable[langData].aging = t(summarizedDataforTable[langData].aging)
              console.log("langdata", t(summarizedDataforTable[langData].item))
            }
            return summarizedDataforTable;
          },
          mapHeaderFromResponse: (data) => {
            const periodDatas = periodData(data);
            return periodDatas;
          },
          childProps: {
            id: "table",
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: config.tableUiConfig,
            style: { height: 252 },
          },
        },
        {
          label: "Invoices",
          id: "invoice",
          exportAs : "excel",
          child: Grid,
          childProps: {
            id: "invoice",
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: {
              ...config.invoiceUiConfig,
              onCellClicked: hanldeClick,
              },
            reduxConfig: {
              query: useFetchDataQuery,
              params: {
                queryName: "ProjectInvoice.getProjectInvoices",
                project_id: parseInt(projectID),
              },
              resultSelector(response) {
                return {
                  ...response,
                  // data: response.data ? response.data.Data["ProjectInvoice.getProjectInvoices"] : undefined,
                  data: response.data
                    ? filteredData(
                        response.data.Data["ProjectInvoice.getProjectInvoices"]
                      )
                    : undefined,
                };
              },
            },
          },
        },
      ],
    },
  };
  return <Widget config={uiConfig}></Widget>;
}
export default ProjAgedARWidget;
