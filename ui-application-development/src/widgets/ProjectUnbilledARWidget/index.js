import { useState } from "react";
import { Widget, Grid } from "@frontrolinc/pace-ui-framework";
import { useFetchDataQuery } from "../../app/appApi";
import { getQueryConfig } from "../Shared/projectSnapshot";
import config from "./config";
import { getTableHeight } from "../../helpers/utils";
import Graph from "./graph";
import { useTranslation } from 'react-i18next';
import {
  getSummaryData,
  getSummaryTableData,
  getTableData,
} from "../../TransposeData";
const { COLUMN_NAMES, SERIES_INFO } = config.summaryMappings;

function ProjectUnbilledARWidget({ block }) {
  const periodData = (response) => {
    return response.extensions.period;
  };
  const { t } = useTranslation(['label', 'message']);

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
      queryParams: getQueryConfig(),
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
          selected: true,
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
            const summarizedData = getSummaryData(data, COLUMN_NAMES, 0,'','',true);
            const summarizedDataforTable = getSummaryTableData(
              summarizedData,
              SERIES_INFO
            );
            for (let langData in summarizedDataforTable) {
              summarizedDataforTable[langData].aging = t(summarizedDataforTable[langData].aging)
            }
            console.log("summarizedDataforTable", summarizedDataforTable)
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
            style: { height: 252, maxWidth: 460 },
          },
        },
        {
          label: "Table",
          id: "table",
          exportAs : "excel",
          child: Grid,
          dataPropName: "rows",
          processData: (data) => {
            const summarizedData = getSummaryData(data, COLUMN_NAMES, 0,'','',true);
            const summarizedDataforTable = getTableData(
              summarizedData,
              SERIES_INFO
            );
            for (let langData in summarizedDataforTable) {
              summarizedDataforTable[langData].aging = t(summarizedDataforTable[langData].aging)
            }
            // const summarizedDataforTable = getTableData(summarizedData, SERIES_INFO);
            // return getTableData(summarizedData, SERIES_INFO);
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
      ],
    },
  };
  return <Widget config={uiConfig}></Widget>;
}

export default ProjectUnbilledARWidget;
