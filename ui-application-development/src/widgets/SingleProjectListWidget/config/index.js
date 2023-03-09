import {
  columnTypesConfig,
  getMainMenuItems,
  sidebarColsConfig,
  sidebarFilterConfig,
  excelStyles
} from "../../../formatCols";
import {
  CurrencyConverter,
  CurrencyCalculationContext,
} from "@frontrolinc/pace-ui-framework";
import singleprojectUiConfig from "./singleproject.json";

singleprojectUiConfig.columnTypes = columnTypesConfig;
singleprojectUiConfig.sideBar = {
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
};
singleprojectUiConfig.excelStyles = excelStyles;
export default { singleprojectUiConfig };
