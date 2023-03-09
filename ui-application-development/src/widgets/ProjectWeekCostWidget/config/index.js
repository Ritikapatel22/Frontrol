import { useMemo } from "react";
import {
  columnTypesConfig,
  getMainMenuItems,
  sidebarColsConfig,
  sidebarFilterConfig,
  excelStyles,
} from "../../../formatCols";
import {
  CurrencyConverter,
  CurrencyCalculationContext,
} from "@frontrolinc/pace-ui-framework";
import weekCostUiConfig from "./weekCost.json";

import { calculateAvgCost, aggregateAvgCost } from "./weekCostFormulas";

const getDataPath = (data) => {
  return data.hierarchy;
};

weekCostUiConfig.columnTypes = columnTypesConfig;
weekCostUiConfig.excelStyles = excelStyles;
// weekCostUiConfig.getMainMenuItems = getMainMenuItems;
weekCostUiConfig.getDataPath = getDataPath;

weekCostUiConfig.defaultColDef = {
  wrapHeaderText: true,
  sortable: true,
  resizable: true,
  // menuTabs: [."generalMenuTab", "filterMenuTab",'columnsMenuTab'],
  menuTabs: ["generalMenuTab"],
  suppressMovable: true,
  flex: 1,
  cellClassRules: {
    "acm-cell-bg-text": (params) => {
      return (
        // params.colDef.headerName !== "Task/Resource" &&
        params.data.row_type !== "R"
      );
    },
  },
};

weekCostUiConfig.autoGroupColumnDef = {
  headerName: "Task/Resource",
  pinned: "left",
  minWidth: 300,
  cellRendererParams: {
    suppressCount: true,
  },
};

weekCostUiConfig.sideBar = {
  toolPanels: [sidebarColsConfig],
};

const aggFuncs = {
  avg_cost_rate: (params) => {
    return aggregateAvgCost(params);
  },
};

weekCostUiConfig.aggFuncs = aggFuncs;

weekCostUiConfig.columnDefs.map((column) => {
  column.children.forEach((item) => {
    if (item.field === "avg_cost_rate") {
      item.valueGetter = (params) => {
        return {
          ...params.data,
          toString: () =>
            calculateAvgCost(
              params.data?.itd_fully_burdened_cost,
              params.data?.itd_hours
            ),
        };
      };
    }
  });
});
weekCostUiConfig.excludeChildrenWhenTreeDataFiltering = true;

export default {
  weekCostUiConfig,
};
