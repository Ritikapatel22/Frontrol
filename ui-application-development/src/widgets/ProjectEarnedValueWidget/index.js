import { Widget, Grid } from "@frontrolinc/pace-ui-framework";
import "../../App.css";
import { useFetchDataQuery } from "../../app/appApi";
import config from "./config";
import { createTableValues } from "./columnData";
import Summary from "./Summary";
import EarnedValueGraph from "./EarnedValueGraph";
import { getProjectId } from "../Shared/projectSnapshot";
import SPICPIGraph from "./spiCpiGraph";
import { populateProjWeekHierarchy } from "../../TransposeData";
import { useTranslation } from "react-i18next";

function ProjectEarnedValueWidget({ block }) {
  const projectID = getProjectId(window.location.href);
  const { t } = useTranslation(['label']);
  let categoriesData = [
    'Prior periods',
    'Month 1',
    'Month 2',
    'Month 3',
    'Month 4',
    'Month 5',
    'Month 6',
    'Month 7',
    'Month 8',
    'Month 9',
    'Month 10',
    'Month 11',
    'Month 12',
    'Future periods'
  ]

  const periodData = (response) => {
    return response?.Data?.["EarnedValues.PeriodInfo"]?.[0]?.period;
  }

  const loaderOptions = {
      type: 'dashboardWidget',
      layout: 'grid',
      tabs: 5,
      isFullWidth: false
    };

    const uiConfig = {
        block: block,
        loaderOptions: loaderOptions,
        widgetId: block.instanceId,
        isFullScreen: block.isFullScreen,
        queryConfig: {
          query: useFetchDataQuery,
          queryParams: {
            queryName: "EarnedValues.PeriodInfo",
            projectID: parseInt(projectID),
          },
          queryOptions: {
            selectFromResult(response) {
              return {
                ...response,
                data: response?.data ? response?.data?.Data?.["EarnedValues.PeriodInfo"]?.[0] : undefined,
              };
            },
          },
        },
        content: {
          type: "tabs",
          tabs: [
            {
              label: "Summary",
              id: "Summary",
              child: Summary,
              dataPropName: "filteredData"
            },
            {
              label: "Earned value",
              id: "Earned Value",
              child: EarnedValueGraph,
              dataPropName: "filteredData",
              exportAs : "png",
              widgetRootDataProp: 'widgetRootData', 
              childProps: {
                block
              },
            },
            {
              label: "CPI & SPI",
              id: "cpiSpi",
              child: SPICPIGraph,
              dataPropName: "data",
              exportAs : "png",
              widgetRootDataProp: 'widgetRootData', 
              childProps: {
                block
              },
            },
            {
              label: "Table", 
              id: "table",
              child: Grid,
              dataPropName: "rows",
              // graphExportTab : "Trend values",
              exportAs : "excel",
              mapHeaderFromResponse: (data) => {
                let periodDatas;
                if(periodData(data)){
                  periodDatas = periodData(data);
                }else{
                  periodDatas = categoriesData
                }
                return periodDatas;
              },
              childProps: {
                id: "table",
                uiConfig: config.earnedValueTableUiConfig
              },
              processData: (data) => {
                const current = createTableValues(data);
                current.forEach((currentdata)=>{
                  currentdata.item = t(currentdata.item)
                })
                return current;
              },
            },
            {
              label: "Task summary",
              id: "taskSummary",
              child: Grid,
              exportAs : "excel",
              childProps: {
                id: "taskSummary",
                uiConfig: config.taskSummaryUiConfig,
                reduxConfig: {
                  query: useFetchDataQuery,
                  params: {
                    queryName: "EarnedValues.TaskSummary",
                    project_id: parseInt(projectID)
                  },
                  resultSelector(response) {
                    if(response.data?.Data?.["EarnedValues.TaskSummary"]){
                      const earnedValuesTaskSummary =  populateProjWeekHierarchy(response.data?.Data?.["EarnedValues.TaskSummary"]);
                      return {
                        ...response,
                        data: earnedValuesTaskSummary
                      };
                    }
                    return {
                      ...response,
                      data: undefined
                    };
                  },
                },
              }
            }
          ]
        }    
    }
    
  return <Widget config={uiConfig}></Widget>;
}

export default ProjectEarnedValueWidget;
