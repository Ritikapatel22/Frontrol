import { useMemo} from "react";
import {
    columnTypesConfig, 
    getMainMenuItems,
    sidebarColsConfig,
    sidebarFilterConfig,
    excelStyles
  } from "../../../formatCols";
import { CurrencyConverter , CurrencyCalculationContext } from "@frontrolinc/pace-ui-framework";
import projectUiConfig from "./project.json";
import summaryUiConfig from "./summary.json";
import tableUiConfig from "./table.json";
import summaryMappings from "./summaryMappings.json";
import projectInvoiceConfig from "./projectInvoice.json";

const getDataPath = (data) => {
  return data.hierarchy;  
};

function groupOpenByDefault(params) {
  if ( params.key == 'Net receivables' ) {
    return true;
  }   
};

summaryUiConfig.getMainMenuItems = getMainMenuItems;
summaryUiConfig.columnTypes = columnTypesConfig;
summaryUiConfig.excelStyles = excelStyles;

tableUiConfig.getMainMenuItems = getMainMenuItems;
tableUiConfig.columnTypes = columnTypesConfig;
tableUiConfig.getDataPath = getDataPath;
tableUiConfig.isGroupOpenByDefault = groupOpenByDefault;
tableUiConfig.excelStyles = excelStyles;

projectUiConfig.columnTypes = columnTypesConfig;

projectUiConfig.sideBar={
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
}

projectUiConfig.excelStyles = excelStyles;

projectInvoiceConfig.getMainMenuItems = getMainMenuItems;
projectInvoiceConfig.columnTypes = columnTypesConfig;
projectInvoiceConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
projectInvoiceConfig.excelStyles = excelStyles;

const SERIES_INFO_INVOICE_BIll = [
  { type: "Paid" },
  { type: "Billed AR current" },
  { type: "Billed AR 31-60" },
  { type: "Billed AR 61-90" },
  { type: "Billed AR 91-180" },
  { type: "Billed AR >180" },
  // { type: "Retention" },
  // { type: "Unbilled AR current" },
  // { type: "Unbilled AR 31-60" },
  // { type: "Unbilled AR 61-90" },
  // { type: "Unbilled AR 61-90" },
  // { type: "Unbilled AR 91-180" },
  // { type: "Unbilled AR >180" },
  // { type: "unbilled_rec_total" },
  // { type: "BIEE" },
  // { type: "retention" },
];

export default {
    summaryUiConfig,
    tableUiConfig,
    summaryMappings,
    projectUiConfig,
    projectInvoiceConfig,
    SERIES_INFO_INVOICE_BIll
  };