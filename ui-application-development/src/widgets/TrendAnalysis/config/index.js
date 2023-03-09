import trendValuesUiConfig from "./trendValues.json";
import { columnTypesConfig, getMainMenuItems, excelStyles } from "../../../formatCols";

trendValuesUiConfig.getMainMenuItems = getMainMenuItems;
trendValuesUiConfig.columnTypes = columnTypesConfig;
trendValuesUiConfig.excelStyles = excelStyles;

export default { 
    trendValuesUiConfig
}
