import { Widget, Grid } from "@frontrolinc/pace-ui-framework";
import { useFetchDataQuery } from "../../app/appApi";
import config from "./config";
import { getQueryConfig } from "../Shared/projectSnapshot";
import { rowsCreation, hideModifiedFields } from "./utils";

function FormulasWidget({ block }) {
  const payload = getQueryConfig();
  if (payload.query) {
    payload.query = payload.query.replace(" ", "  ");
    delete payload.__config__.transformResponse;
    delete payload.__config__.onQueryStarted;
    delete payload.__config__.onQueryFulfilled;
  }

  const onClearFilter = (e) => {
    hideModifiedFields(e.api, true);
  };

  const loaderOptions = {
    type: "dashboardWidget",
    layout: "grid",
    tabs: 1,
    isFullWidth: true,
  };

  const uiConfig = {
    block: block,
    widgetId: block.instanceId,
    loaderOptions: loaderOptions,
    isFullScreen: block.isFullScreen,
    onClearFilter,
    filterName: "Fields",
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: payload,
      queryOptions: {
        selectFromResult(response) {
          if (response.data?.data?.project) {
            const data = response.data.data.project;
            let new_array = rowsCreation(data);
            return {
              ...response,
              data: new_array,
            };
          }
          return {
            ...response,
          };
        },
      },
    },
    content: {
      type: "jsx",
      label: "Project fields",
      id: "project fields",
      child: Grid,
      selected: true,
      dataPropName: "rows",
      childProps: {
        id: "project_fields",
        uiConfig: config.formulasUiConfig,
        style: {
          width: "100%",
        },
      },
    },
  };

  return <Widget config={uiConfig}></Widget>;
}

export default FormulasWidget;
