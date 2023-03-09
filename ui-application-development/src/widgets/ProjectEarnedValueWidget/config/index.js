import React from "react";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { columnTypesConfig, getMainMenuItems, sidebarColsConfig, excelStyles } from "../../../formatCols";
import { EARNED_VALUE_COLUMN_NAMES } from "../columnData";
import "../../../App.css";
import { formatDynamicColumn } from "../../../formatData";
import earnedValueTableUiConfig from "./earnedValueTable.json";
import taskSummaryUiConfig from "./taskSummary.json";

import {t} from 'i18next';

ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

  const getDataPath = (data) => {
      return data.hierarchy;  
  };

  taskSummaryUiConfig.columnTypes = columnTypesConfig;
  taskSummaryUiConfig.excelStyles = excelStyles;
  taskSummaryUiConfig.getDataPath = getDataPath;

  taskSummaryUiConfig.defaultColDef = {
    wrapHeaderText: true,
    autoHeaderHeight: true,
    sortable: true,
    resizable: true,
    menuTabs:[ "generalMenuTab"],
    suppressMovable:true,
    flex: 1,
    cellClassRules: { 
      "acm-cell-bg-text": (params) => {
        return (
          params.data?.parent_flag === "Y"
        );
      },
    },  
  }

  taskSummaryUiConfig.autoGroupColumnDef = {
    headerName: "Task number",
    pinned: "left",
    minWidth: 300,
    cellRendererParams: {
      suppressCount: true
    }
  }

  taskSummaryUiConfig.sideBar = {
    toolPanels: [sidebarColsConfig],
  };

  earnedValueTableUiConfig.columnDefs.map(each=> {
    each.cellRenderer = (params) => {
      if (
        params.value == t(EARNED_VALUE_COLUMN_NAMES.CPI.label) ||
        params.value == t(EARNED_VALUE_COLUMN_NAMES.SPI.label) 
      ) {
        return <span style={{ marginLeft: 20 }}>{params.value}</span>;
      } else if (params.value === t("Cumulative")) {
        return (
          <b>
            <span>{params.value}</span>
          </b>
        );
      } else if (params.value == t(EARNED_VALUE_COLUMN_NAMES.actualCost.label) ||
        params.value == t(EARNED_VALUE_COLUMN_NAMES.approvedBudget.label) ||
        params.value == t(EARNED_VALUE_COLUMN_NAMES.earnedValue.label) ||
        params.value == t(EARNED_VALUE_COLUMN_NAMES.cumulativeActualCost.label) ||
        params.value == t(EARNED_VALUE_COLUMN_NAMES.cumulativeApprovedBudget.label) ||
        params.value == t(EARNED_VALUE_COLUMN_NAMES.cumulativeEarnedValue.label)) {
        return <span>{params.value}</span>;
      } else {
        return formatDynamicColumn (params)
      }
    }
  });

  earnedValueTableUiConfig.getMainMenuItems = getMainMenuItems;
  earnedValueTableUiConfig.columnTypes = columnTypesConfig;
  earnedValueTableUiConfig.defaultColDef = {
    wrapHeaderText: true,
    autoHeaderHeight: true,
    resizable: true,
    menuTabs:["generalMenuTab"],
    suppressMovable:true,
    cellClassRules: {
      "acm-cell-border-top-bottom": (params) => {
        return params.data.item === "Cumulative";
      },
    },
  }

export default {
    earnedValueTableUiConfig,
    taskSummaryUiConfig,
}            