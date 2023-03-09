import { useState } from "react";
import {
  Widget,
  Grid,
  currencyFactory,
  getQueryStringValue,
  getAllQueryStringValue,
} from "@frontrolinc/pace-ui-framework";
import { useFetchDataQuery } from "../../app/appApi";
import { getQueryConfig } from "../Shared/portfolioSnapshot";
import config from "./config";
import { getTableHeight } from "../../helpers/utils";
import Graph from "./graph";
import { useTranslation } from 'react-i18next';
import {
  getSummaryData,
  getSummaryTableData,
  getTableData,
} from "../../TransposeData";
import { useNavigate } from "react-router-dom";
import { projectDrilldown } from "../../TransposeData";
const { COLUMN_NAMES, SERIES_INFO } = config.summaryMappings;

function UnbilledARWidget({ block }) {
  const [isProject, setIsProject] = useState(true);
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState("");
  const projectUiConfigUpdated = config.projectUiConfig;
  const { t } = useTranslation(['label', 'message']);

  let obj = JSON.parse(JSON.stringify(SERIES_INFO))

  for(let key in obj) {
    obj[key]['label'] = t(obj[key]['label'])
  }

  const useCurrency = () => {
    return block.isFullScreen &&
      currencyFactory.currencyRates &&
      currencyFactory.currencyRates.length > 1
      ? true
      : false;
  };

  const PROJECT_DRILLDOWN = [
    { type: "Project number" },
    { type: "Project name" },
  ];

  const periodData = (response) => {
    return response.extensions.period;
  };

  const onProjectCellClick = (event) => {
    // const result = SERIES_INFO_INVOICE_Bill.filter((item, key) => {
    //   return item.type === event.colDef.headerName;
    // });
    // if (result.length != 0) {
    //   //setIsProject(false);
    // } else {
    projectDrilldown(event, navigate);
    // }
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
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            data:
              response.data && response.data.data
                ? response.data.data.projects
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
            const summarizedData = getSummaryData(data, COLUMN_NAMES, 0, true,"project_func_currency_code",true);
            const summaryData = getSummaryTableData(
              summarizedData,
              obj
            );
            return summaryData;
          },
          dataPropName: "rows",
          childProps: {
            id: "summary",
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: config.summaryUiConfig,
            style: { height: 250, width: 410 },
          },
        },
        {
          label: "Table",
          id: "table",
          exportAs : "excel",
          child: Grid,
          dataPropName: "rows",
          processData: (data) => {
            const summarizedData = getSummaryData(data, COLUMN_NAMES, 0, true,"project_func_currency_code",true);
            return getTableData(summarizedData, obj);
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
            style: { height: 250 },
          },
        },
        {
          label: "Projects",
          id: "projects",
          exportAs : "excel",
          child: Grid,
          primary: true,
          isUseCurrency: isProject ? useCurrency:'',
          dataPropName: "rows",
          childProps: {
            id: "projects", 
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            currencyColumnName: "project_func_currency_code",
            uiConfig: {
              ...projectUiConfigUpdated,
              suppressColumnMoveAnimation: true,
              debounceVerticalScrollbar: true,
              onCellClicked: onProjectCellClick,
            },
            style: {
              height: block.isFullScreen ? getTableHeight() : 250,
            },
          },
        },
      ],
    },
  };
  return <Widget config={uiConfig}></Widget>;
}

export default UnbilledARWidget;
