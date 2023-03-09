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
import projectInvoiceConfig from "./projectInvoice.json";
import summaryMappings from "./summaryMappings.json";
import projectTest from "./projectTest.json";

summaryUiConfig.getMainMenuItems = getMainMenuItems;
summaryUiConfig.columnTypes = columnTypesConfig;
summaryUiConfig.excelStyles = excelStyles;

tableUiConfig.getMainMenuItems = getMainMenuItems;
tableUiConfig.columnTypes = columnTypesConfig;
tableUiConfig.excelStyles = excelStyles;

// projectUiConfig.getMainMenuItems = getMainMenuItems;
projectUiConfig.columnTypes = columnTypesConfig;
projectUiConfig.sideBar={
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
};
projectUiConfig.excelStyles = excelStyles;

projectInvoiceConfig.getMainMenuItems = getMainMenuItems;
projectInvoiceConfig.columnTypes = columnTypesConfig;
projectInvoiceConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
projectInvoiceConfig.excelStyles = excelStyles;

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
  summaryUiConfig,
  tableUiConfig,
  summaryMappings,
  projectUiConfig,
  projectInvoiceConfig,
  projectTest,
  SERIES_INFO_INVOICE_Bill
};
