import {
  columnTypesConfig, 
  getMainMenuItems,
  sidebarColsConfig,
  sidebarFilterConfig,
  excelStyles
} from "../../../formatCols";
import { CurrencyConverter , CurrencyCalculationContext } from "@frontrolinc/pace-ui-framework";
import tableUiConfig from "./table.json";
import summaryMappings from "./summaryMappings.json";
import invoiceUiConfig from "./invoice.json";


tableUiConfig.getMainMenuItems = getMainMenuItems;
tableUiConfig.columnTypes = columnTypesConfig;
tableUiConfig.excelStyles = excelStyles;

// invoiceUiConfig.getMainMenuItems = getMainMenuItems;
invoiceUiConfig.columnTypes = columnTypesConfig;
invoiceUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
};
invoiceUiConfig.excelStyles = excelStyles;

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
  invoiceUiConfig,
  SERIES_INFO_INVOICE_Bill
};
