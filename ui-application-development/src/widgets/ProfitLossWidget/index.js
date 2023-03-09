import { useEffect, useState } from "react";
import { Widget, Grid } from "@frontrolinc/pace-ui-framework";
import { useFetchDataQuery } from "../../app/appApi";
import { getQueryConfig as portfolioSnapshot } from "../Shared/portfolioSnapshot";
import { getQueryConfig as projectSnapshot } from "../Shared/projectSnapshot";
import config
  // metricsUiConfig,
  // trendValueUiConfig,
  // trendvaluesMapping,
  // metricsmapping,
 from "./config";
import { getTableHeight } from "../../helpers/utils";
import Graph from "./graph";
import { getSummaryData, getTableData, gridData } from "../../TransposeData";
import { getComputedData, GridIcon, GridInfoTip } from "@frontrolinc/pace-ui-framework";
const { COLUMN_NAMES, SERIES_INFO } = config.trendvaluesMapping;
const { COLUMN_NAMES_METRICS, COLUMNS_TO_EXCLUDE_IN_CONVERSION } = config.metricsmapping;
import { formulaDefs } from "./projectColumn";
import { metricsRows } from "./metricsRows";
import info from "../../assets/icons/info-fill.svg";
// import CustomTooltip from "./config/customTooltip";
import { useTranslation } from "react-i18next";

function ProfitLossTableWidget({ block }) {
  const { t } = useTranslation(['message','label']);
  const projectID = window.location.href.split("/project/")[1];
  let data = [config.metricsUiConfig];

  useEffect(() => {
    data.map((item, key) => {
      item.columnDefs.map((val, index) => {
        val.children.map((value) => {
          if (value.tooltipField == "description") {
            value.tooltipComponent = GridInfoTip;
            value.cellRenderer = (param) => {
              return (
                <GridIcon {...param} customClassName="kpi-custom-info">
                  <img src={info}></img>
                </GridIcon>
              );
            };
          }
        });
      });
    });
  }, []); // Only re-run the effect if count changes

  const periodData = (response) => {
    return response.extensions.period;
  };

  // function getRowHeight(params) {
  //   return params.data.row == "hidden" ? 1 : null;
  // }

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
    filterName: "Projects",
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: projectID ? projectSnapshot() : portfolioSnapshot(),
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            data: response.data
              ? projectID
                ? response.data.data.project
                : response.data.data.projects
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
          exportAs: "png",
          child: Graph,
          dataPropName: "filteredData",
          widgetRootDataProp: "widgetRootData",
          childProps: {
            getTableHeight,
            block,
          },
        },

        {
          label: "Metrics & KPIs",
          id: "metrics & kpis",
          exportAs: "excel",
          child: Grid,
          processData: (data) => {
            const summarizedData = getSummaryData(
                    data, COLUMN_NAMES_METRICS,0,true, 
                    projectID ? "" : "project_func_currency_code", false, 
                    COLUMNS_TO_EXCLUDE_IN_CONVERSION);
            const computedData = getComputedData([summarizedData], formulaDefs);
            const metricRowsData= metricsRows.map((data)=>{
              const modifiedData = {...data}
              modifiedData.description= t(`${data.row}_desc`)
              modifiedData.row = t(data.row)
              return modifiedData
            })
            // console.log("metricRowsData is here",metricRowsData)
            const grid_data = gridData(computedData, metricRowsData);
            // console.log("grid_data is here", grid_data, "metricsRows", metricsRows);
            return grid_data;
          },
          dataPropName: "rows",
          childProps: {
            id: "metrics & kpis",
            // currencyColumnName: projectID ? "" : "project_func_currency_code",
            uiConfig: { ...config.metricsUiConfig },
          },
        },
        {
          label: "Trend values",
          graphExportTab: "Trend values",
          exportAs: "excel",
          id: "trednvalues",
          child: Grid,
          processData: (data, currencyColumnName) => {
            const summarizedData = getSummaryData( data, COLUMN_NAMES, 0, true, projectID ? "" : "project_func_currency_code");
            const summarizedDataforTable = getTableData(summarizedData,SERIES_INFO);
            for (let langData in summarizedDataforTable) {
            summarizedDataforTable[langData].aging = t(summarizedDataforTable[langData].aging, {ns:'label'})
          }
          console.log("change", summarizedDataforTable)
    /*      let langvalue = ""
          for (let langData in summarizedDataforTable) {
          const newSummarizedDataforTable = {...summarizedDataforTable}
          console.log("summaryvalue", newSummarizedDataforTable);
          langvalue = t(summarizedDataforTable[langData].aging, {ns:'label'})
          summarizedDataforTable[langData].aging = langvalue
          console.log("data", langvalue)    
          // console.log(`${property}:`,summaryData[property]);
        }       */
            return summarizedDataforTable;
          },
          mapHeaderFromResponse: (data) => {
            const periodDatas = periodData(data);
            return periodDatas;
          },
          dataPropName: "rows",
          childProps: {
            id: "trednvalues",
            // showTotal: true,
            // totalOptions: {
            //   displayName: t('total'),
            // },
            // currencyColumnName: projectID ? "" : "project_func_currency_code",
            uiConfig: config.trendValueUiConfig,
          },
        },
      ],
    },
  };
  return <Widget config={uiConfig}></Widget>;
}

export default ProfitLossTableWidget;
