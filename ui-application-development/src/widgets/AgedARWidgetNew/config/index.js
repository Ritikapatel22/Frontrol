import {
  columnTypesConfig,
  getMainMenuItems,
  sidebarColsConfig,
  sidebarFilterConfig,
} from "../../../formatCols";
import projectUiConfig from "./project.json";
import summaryUiConfig from "./summary.json";
import tableUiConfig from "./table.json";
import projectInvoiceConfig from "./projectInvoice.json";
import summaryMappings from "./summaryMappings.json";
import projectTest from "./projectTest.json";
summaryUiConfig.getMainMenuItems = getMainMenuItems;
summaryUiConfig.columnTypes = columnTypesConfig;
tableUiConfig.getMainMenuItems = getMainMenuItems;
tableUiConfig.columnTypes = columnTypesConfig;
projectUiConfig.getMainMenuItems = getMainMenuItems;
projectUiConfig.columnTypes = columnTypesConfig;
(projectInvoiceConfig.getMainMenuItems = getMainMenuItems);
projectInvoiceConfig.columnTypes = columnTypesConfig;
projectUiConfig.columnTypes=columnTypesConfig;
projectUiConfig.sideBar={
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
}

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
  projectUiConfig,
  projectInvoiceConfig,
  projectTest,
  SERIES_INFO_INVOICE_Bill
};
