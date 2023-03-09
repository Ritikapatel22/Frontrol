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
import summaryMappings from "./summaryMappings.json";

summaryUiConfig.getMainMenuItems = getMainMenuItems;
summaryUiConfig.columnTypes = columnTypesConfig;
summaryUiConfig.excelStyles = excelStyles;

tableUiConfig.getMainMenuItems = getMainMenuItems;
tableUiConfig.columnTypes = columnTypesConfig;
tableUiConfig.excelStyles = excelStyles;

projectUiConfig.columnTypes = columnTypesConfig;
projectUiConfig.excelStyles = excelStyles;
// projectUiConfig.columnDefs.map(each=> {
//     if(each.currency){
//     each.cellRenderer = (param) => {
//       return (
//         <CurrencyCalculationContext.Consumer>
//          {props => (
//             <CurrencyConverter
//             currencyCode={param.data.project_currency_code}
//             currencyValue={param.data[each.field]}
//             convertTo = {props.convertTo}
//             convertCurrency = {props.convertCurrency}
//           /> 
//           )}
//         </CurrencyCalculationContext.Consumer>
//       );
//     }
//   }
// });

projectUiConfig.sideBar={
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
}

// projectUiConfig = Object.assign(projectUiConfig, {
// columnTypes: columnTypesConfig,
// sideBar: {
//     toolPanels: [sidebarColsConfig, sidebarFilterConfig],
// },
// });

export default {
    summaryUiConfig,
    tableUiConfig,
    summaryMappings,
    projectUiConfig,
  };