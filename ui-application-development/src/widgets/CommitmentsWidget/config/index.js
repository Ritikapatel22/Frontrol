import tableUiConfig from "./table.json";
import purchaseOrderUiConfig from "./purchaseOrder.json";
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

purchaseOrderUiConfig.columnTypes = columnTypesConfig;
purchaseOrderUiConfig.sideBar={
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
}
purchaseOrderUiConfig.excelStyles = excelStyles;

export default { 
    tableUiConfig,
    purchaseOrderUiConfig
}
