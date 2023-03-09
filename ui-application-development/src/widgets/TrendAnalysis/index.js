import { Widget, Grid } from "@frontrolinc/pace-ui-framework";
import { getSummaryData, getTableData } from "../../TransposeData";
import { COLUMN_NAMES_TREND, TREND_VALUES } from "./columnData";
import { useFetchDataQuery } from "../../app/appApi";
import { getQueryConfig } from "../Shared/portfolioSnapshot";
import {
  getProjectId,
  getQueryConfig as projectGetQueryConfig,
} from "../Shared/projectSnapshot";
import MTDGraph from "./mtd-graph";
import ITDGraph from "./itd-graph";
import config from "./config";
import { useTranslation } from 'react-i18next';

function TrendAnalysisWidget({ block }) {
  const { t } = useTranslation(['label', 'message']);
  let obj = JSON.parse(JSON.stringify(TREND_VALUES))

  for(let key in obj) {
    obj[key]['label'] = t(obj[key]['label'])
  }

  const projectID = getProjectId(window.location.href);
  const periodData = (response) => {
    return response.extensions.period;
  };

  const loaderOptions = {
    type: "dashboardWidget",
    layout: "graph",
    tabs: 3,
    isFullWidth: false,
  };

  const uiConfig = {
    block: block,
    loaderOptions: loaderOptions,
    widgetId: block.instanceId,
    isFullScreen: block.isFullScreen,
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: projectID ? projectGetQueryConfig() : getQueryConfig(),
      queryOptions: {
        selectFromResult(response) {
          if (projectID) {
            return {
              ...response,
              data:
                response.data && response.data.data
                ? response.data.data.project : undefined,
            };
          }
          return {
            ...response,
            data:response.data && response.data.data 
            ? response.data.data.projects : undefined,
          };
        },
      },
    },
    content: {
      type: "tabs",
      tabs: [
        {
          label: "MTD",
          id: "MTD",
          exportAs : "png",
          child: MTDGraph,
          childProps: {
            block,
          },
          dataPropName: "filteredData",
          widgetRootDataProp: "widgetRootData",
        },
        {
          label: "ITD",
          id: "ITD",
          exportAs : "png",
          child: ITDGraph,
          dataPropName: "filteredData",
          widgetRootDataProp: "widgetRootData",
          childProps: {
            block,
          },
        },
        {
          label: "Trend values",
          id: "trendValues",
          graphExportTab : "Trend values",
          child: Grid,
          dataPropName: "rows",
          exportAs : "excel",
          processData: (data) => {
            const summarizedData = getSummaryData(
              data,
              COLUMN_NAMES_TREND,
              0,
              true,
              "project_func_currency_code"
            );
            const summarizedDataforTable = getTableData(
              summarizedData,
              obj
            );
            return summarizedDataforTable;
          },
          mapHeaderFromResponse: (data) => {
            const periodDatas = periodData(data);
            return periodDatas;
          },
          childProps: {
            id: "trendValues",
            currencyColumnName: projectID ? "" : "project_func_currency_code",
            uiConfig: config.trendValuesUiConfig,
          },
        },
      ],
    },
  };
  
  return <Widget config={uiConfig}></Widget>;
}

export default TrendAnalysisWidget;
