import { useMemo} from "react";
import {
    columnTypesConfig, 
    getMainMenuItems,
    sidebarColsConfig,
    sidebarFilterConfig,
    excelStyles
  } from "../../../formatCols";
import { CurrencyConverter , CurrencyCalculationContext } from "@frontrolinc/pace-ui-framework";
import invoiceUiConfig from "./invoice.json"; 
import summaryUiConfig from "./summary.json";
import tableUiConfig from "./table.json";
import summaryMappings from "./summaryMappings.json";

function groupOpenByDefault(params) {
  if ( params.key == 'Net receivables' ) {
    return true;
  }   
};

const getDataPath = (data) => {
  return data.hierarchy;  
};

summaryUiConfig.getMainMenuItems = getMainMenuItems;
summaryUiConfig.columnTypes = columnTypesConfig;
summaryUiConfig.excelStyles = excelStyles;

tableUiConfig.getMainMenuItems = getMainMenuItems;
tableUiConfig.columnTypes = columnTypesConfig;
tableUiConfig.getDataPath = getDataPath;
tableUiConfig.isGroupOpenByDefault = groupOpenByDefault;
tableUiConfig.excelStyles = excelStyles;

invoiceUiConfig.columnTypes = columnTypesConfig;
// invoiceUiConfig.getMainMenuItems = getMainMenuItems;
invoiceUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
};
invoiceUiConfig.excelStyles = excelStyles;


export default {
    summaryUiConfig,
    tableUiConfig,
    summaryMappings,
    invoiceUiConfig,
  };