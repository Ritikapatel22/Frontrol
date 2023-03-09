import {
  columnTypesConfig, 
  getMainMenuItems,
  sidebarColsConfig,
  sidebarFilterConfig,
  excelStyles
} from "../../../formatCols";
import { CurrencyConverter , CurrencyCalculationContext } from "@frontrolinc/pace-ui-framework";
import projectUiConfig from "./project.json";
import tableUiConfig from "./table.json";
import projectInvoiceConfig from "./projectInvoice.json";
import summaryMappings from "./summaryMappings.json";


tableUiConfig.getMainMenuItems = getMainMenuItems;
tableUiConfig.columnTypes = columnTypesConfig;
tableUiConfig.excelStyles = excelStyles;

projectInvoiceConfig.getMainMenuItems = getMainMenuItems;
projectInvoiceConfig.columnTypes = columnTypesConfig;
projectInvoiceConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
projectInvoiceConfig.excelStyles = excelStyles;

// projectUiConfig.getMainMenuItems = getMainMenuItems;
projectUiConfig.columnTypes = columnTypesConfig;

projectUiConfig.sideBar={
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
}
projectUiConfig.excelStyles = excelStyles;

const SERIES_INFO_INVOICE_Bill = [
  { type: "Paid" },
  { type: "Billed AR current" },
  { type: "Billed AR 31-60" },
  { type: "Billed AR 61-90" },
  { type: "Billed AR 91-180" },
  { type: "Billed AR >180" },
  { type: "Retention" },
];

export default {
  tableUiConfig,
  summaryMappings,
  projectUiConfig,
  projectInvoiceConfig,
  SERIES_INFO_INVOICE_Bill
};
