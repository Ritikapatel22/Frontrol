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

summaryUiConfig.getMainMenuItems = getMainMenuItems;
summaryUiConfig.columnTypes = columnTypesConfig;
summaryUiConfig.excelStyles = excelStyles;

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
  { type: "Billed AR Current" },
  { type: "Billed AR 31 - 60 Days" },
  { type: "Billed AR 61 - 90 Days" },
  { type: "Billed AR 91 - 180 Days" },
  { type: "Billed AR > 180 Days" },
  { type: "Retention" },
];
export default {
  summaryUiConfig,
  tableUiConfig,
  summaryMappings,
  invoiceUiConfig,
  SERIES_INFO_INVOICE_Bill
};
