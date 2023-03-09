import summaryUiConfig from "./summary.json";
import {
    columnTypesConfig,
    sidebarColsConfig,
    excelStyles
  } from "../../../formatCols";

summaryUiConfig.columnTypes=columnTypesConfig;
summaryUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
summaryUiConfig.excelStyles=excelStyles;

export default { 
  summaryUiConfig
}
