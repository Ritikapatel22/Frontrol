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

const {
  BILLED_SERIES_INFO,
  UNBILLED_SERIES_INFO,
  COLUMN_NAMES_AR_SUMMARY,
  COLUMN_NAMES_UNBILLED_SUMMARY,
  COLUMN_NAMES,
  SERIES_INFO,
  SERIES_INFO_FOR_SUMMARY,
  SERIES_INFO_AR_SUMMARY,
  SERIES_INFO_UNBILLED_SUMMARY,
} = config.summaryMappings;

function ProjNetReceivableWidget({ block }) {
  // const projectID = window.location.href.split("/project/")[1]?.split('?')[0];
  const projectID = getProjectId(window.location.href);
  const { t } = useTranslation(['label', 'message']);

  const user_name = useSelector(
    (state) => state?.loginAuth?.userProfile?.user_name,
  )
  const hanldeClick = (e) => {
    if (e.colDef.field === 'ra_invoice_number'&& e.data?.ra_invoice_number) {
      openInvoiceUrl(abcDevBaseUrl, e.data.bill_to_customer_id, e.data.invoice_class, e.data.project_id, e.data.draft_invoice_num, e.data.ra_invoice_number, user_name)
    }
  }

  let obj = JSON.parse(JSON.stringify(BILLED_SERIES_INFO))
  let unobj = JSON.parse(JSON.stringify(UNBILLED_SERIES_INFO))

  for(let key in obj) {
    obj[key]['group'] = t(obj[key]['group'])
    obj[key]['label'] = t(obj[key]['label'])
  }
  for(let key in unobj) {
    unobj[key]['group'] = t(unobj[key]['group'])
    unobj[key]['label'] = t(unobj[key]['label'])
  }

  function mergeArrayObjects(arr1,arr2){
    let merge = [];
    let matchFound = false;
      for(let i=0; i < arr1.length; i++ ){
          matchFound = false
          for(let j=0; j < arr2.length; j++ ){
              if(arr1[i]['aging'] === arr2[j]['aging']){
                  merge.push({...arr1[i],...arr2[j]});
                  matchFound= true;
                  break;
              }
          }
          if(matchFound == false){
              merge.push({...arr1[i]}) 
          }
      }
    return merge;
  }

  const filteredData = (data) => {
    let netFilteredData = [];
    data.filter(function (el) {
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
      netFilteredData.push(el);
    });
    return netFilteredData;
  };

  const periodData = (response) => {
    return response.extensions.period;
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
          child: Graph,
          exportAs: 'png',
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
          child: Grid,
          exportAs: 'excel',
          processData: (data) => {
            const summarizedArData = getSummaryData(
              data,
              COLUMN_NAMES_AR_SUMMARY,
              0,'','',true
            );
            const summarizedArDataforTable = getSummaryTableData(
              summarizedArData,
              SERIES_INFO_AR_SUMMARY,
              ["Accounts receivable"],
              true
            );

            const summarizedUnbilledData = getSummaryData(
              data,
              COLUMN_NAMES_UNBILLED_SUMMARY,
              0,'','',true
            );
            const summarizedUnbilledDataforTable = getSummaryTableData(
              summarizedUnbilledData,
              SERIES_INFO_UNBILLED_SUMMARY,
              ["Net unbilled"],
              true
            );

            const summarizedNRData = getSummaryData(data, COLUMN_NAMES, 0,'','',true);
            const summarizedNRDataforTable = getSummaryTableData(
              summarizedNRData,
              SERIES_INFO_FOR_SUMMARY,
              [],
              true
            );

            function SumForNR(arr, keys) {
              return arr.reduce((ac, a) => {
                let ind = ac.findIndex((x) => keys.every((k) => x[k] === a[k]));
                ind === -1
                  ? ac.push(a)
                  : (ac[ind]["Net receivables"] += a["Net receivables"]);
                return ac;
              }, []);
            }

            const balanceforNRforTable = SumForNR(summarizedNRDataforTable, [
              "aging",
              "",
            ]);

            // let summarizedData = summarizedArDataforTable.map((item, i) =>
            //   Object.assign({}, item, summarizedUnbilledDataforTable[i])
            // );
            

            // summarizedData = summarizedData.map((item, i) =>
            //   Object.assign({}, item, balanceforNRforTable[i])
            // );
            
            // summarizedData[5]['Accounts receivable'] = 0  //this is temp have to find a clean way
            // summarizedData.splice(5, 0, summarizedArDataforTable[5]);

            let summarizedData = mergeArrayObjects(balanceforNRforTable, summarizedArDataforTable);
            summarizedData = mergeArrayObjects(summarizedData, summarizedUnbilledDataforTable);
            let langvalue = {}
              for (let langdata in summarizedData) {
              const summaryvalue = {...summarizedData}
              console.log("summaryvalue", summaryvalue);
              langvalue = t(summarizedData[langdata].aging)
              summarizedData[langdata].aging = langvalue
              console.log("data", langvalue) 
              // console.log(`${property}:`,summaryData[property]);
            }
            // for (let langData in summarizedData) {
            //   summarizedData[langData].aging = t(summarizedData[langData].aging)
            // }
            console.log("summarizedData",summarizedData)
            return summarizedData;
          },
          dataPropName: "rows",
          childProps: {
            id: "summary",
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: config.summaryUiConfig,
            style: { height: 252, maxWidth: 850 },
          },
        },
        {
          label: "Table",
          id: "table",
          child: Grid,
          dataPropName: "rows",
          exportAs: 'excel',
          processData: (data) => {
            const billedSummarizedData = getSummaryData(
              data,
              COLUMN_NAMES_AR_SUMMARY,
              0,'','',true
            );
            let summarizedDataforTable = [];
            if (
              (billedSummarizedData &&
                Object.keys(billedSummarizedData).length === 0 &&
                Object.getPrototypeOf(billedSummarizedData) ===
                  Object.prototype) == false
            ) {
              summarizedDataforTable = [
                { hierarchy: [t("Net receivables")] },
                { hierarchy: [t("Net receivables"), t("Accounts receivable")] },
              ];

              const billedDataforTable = getTableData(
                billedSummarizedData,
                obj
              );

              for (var key in billedDataforTable) {
                summarizedDataforTable.push(billedDataforTable[key]);
              }
            }

            const unBilledSummarizedData = getSummaryData(
              data,
              COLUMN_NAMES_UNBILLED_SUMMARY,
              0,'','',true
            );
            if (
              (unBilledSummarizedData &&
                Object.keys(unBilledSummarizedData).length === 0 &&
                Object.getPrototypeOf(unBilledSummarizedData) ===
                  Object.prototype) == false
            ) {
              summarizedDataforTable.push({
                hierarchy: [t("Net receivables"), t("Net unbilled")],
              });

              let unBilledDataforTable = getTableData(
                unBilledSummarizedData,
                unobj
              );

              for (var key in unBilledDataforTable) {
                summarizedDataforTable.push(unBilledDataforTable[key]);
              }
            }

            let gridData = [];
            if (
              (Array.isArray(summarizedDataforTable) &&
                !summarizedDataforTable.length) == false
            ) {
              gridData = summarizedDataforTable;
            }
            return gridData;
          },
          mapHeaderFromResponse: (data) => {
            const periodDatas = periodData(data);
            return periodDatas;
          },
          childProps: {
            id: "table",
            uiConfig: config.tableUiConfig,
            style: { height: 252 },
          },
        },
        {
          label: "Invoices",
          id: "invoice",
          child: Grid,
          exportAs: 'excel',
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
            style: { height: 850 },
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

export default ProjNetReceivableWidget;