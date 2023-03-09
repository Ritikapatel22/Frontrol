import { columnTypesConfig, getMainMenuItems ,sidebarColsConfig, sidebarFilterConfig, excelStyles} from "../../../formatCols";
import {
  CurrencyConverter,
  CurrencyCalculationContext,
} from "@frontrolinc/pace-ui-framework";
import approvedUiConfig from "./approved.json";
import arUnBilledUiConfig from "./arUnBilled.json";
import changeUiConfig from "./change.json";
import forecastUiConfig from "./forecast.json";
import itdUiConfig from "./itd.json";
import keymemberUiConfig from "./keymember.json";
import kpisUiConfig from "./kpis.json";
import mtdUiConfig from "./mtd.json";
import summaryUiConfig from "./summary.json";
import ytdUiConfig from "./ytd.json";

approvedUiConfig.columnTypes = columnTypesConfig;
approvedUiConfig.excelStyles = excelStyles;

arUnBilledUiConfig.columnTypes = columnTypesConfig;
arUnBilledUiConfig.excelStyles = excelStyles;

changeUiConfig.columnTypes = columnTypesConfig;
changeUiConfig.excelStyles = excelStyles;

forecastUiConfig.columnTypes = columnTypesConfig;
forecastUiConfig.excelStyles = excelStyles;

itdUiConfig.columnTypes = columnTypesConfig;
itdUiConfig.excelStyles = excelStyles;

keymemberUiConfig.columnTypes = columnTypesConfig;
keymemberUiConfig.excelStyles = excelStyles;

kpisUiConfig.columnTypes = columnTypesConfig;
kpisUiConfig.excelStyles = excelStyles;

mtdUiConfig.columnTypes = columnTypesConfig;
mtdUiConfig.excelStyles = excelStyles;

// summaryUiConfig.getMainMenuItems = getMainMenuItems;
summaryUiConfig.columnTypes = columnTypesConfig;
summaryUiConfig.excelStyles = excelStyles;

ytdUiConfig.columnTypes = columnTypesConfig;
ytdUiConfig.excelStyles = excelStyles;

summaryUiConfig.sideBar={
  toolPanels: [sidebarColsConfig, , sidebarFilterConfig], 
}
kpisUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
arUnBilledUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
approvedUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
forecastUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
changeUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
mtdUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
itdUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
ytdUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
keymemberUiConfig.sideBar={
  toolPanels: [sidebarColsConfig],
}
export default {
  approvedUiConfig,
  arUnBilledUiConfig,
  changeUiConfig,
  forecastUiConfig,
  itdUiConfig,
  keymemberUiConfig,
  kpisUiConfig,
  mtdUiConfig,
  summaryUiConfig,
  ytdUiConfig,
};
