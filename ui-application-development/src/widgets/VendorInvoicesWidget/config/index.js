import tableUiConfig from "./table.json";
import purchaseInvoiceUiConfig from "./purchaseInvoice.json";
import {
    columnTypesConfig,
    getMainMenuItems,
    sidebarColsConfig,
    sidebarFilterConfig,
    excelStyles
  } from "../../../formatCols";

tableUiConfig.getMainMenuItems = getMainMenuItems;
tableUiConfig.columnTypes = columnTypesConfig;
tableUiConfig.excelStyles = excelStyles;

purchaseInvoiceUiConfig.columnTypes=columnTypesConfig;
purchaseInvoiceUiConfig.sideBar={
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
}
purchaseInvoiceUiConfig.excelStyles = excelStyles;

export default { 
    tableUiConfig,
    purchaseInvoiceUiConfig
}