import {
    columnTypesConfig, 
    getMainMenuItems,
    sidebarColsConfig,
    sidebarFilterConfig,
    excelStyles
  } from "../../../formatCols";
  import { CurrencyConverter , CurrencyCalculationContext } from "@frontrolinc/pace-ui-framework";

import summaryUiConfig from "./summary.json";
import tableUiConfig from "./table.json";
import summaryMappings from "./summaryMappings.json";

summaryUiConfig.getMainMenuItems = getMainMenuItems;
summaryUiConfig.columnTypes = columnTypesConfig;
summaryUiConfig.excelStyles = excelStyles;

tableUiConfig.getMainMenuItems = getMainMenuItems;
tableUiConfig.columnTypes = columnTypesConfig;
tableUiConfig.excelStyles = excelStyles;

export default {
    summaryUiConfig,
    tableUiConfig,
    summaryMappings
  };