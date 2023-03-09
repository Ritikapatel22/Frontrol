import { columnTypesConfig, excelStyles, getMainMenuItems } from "../../../formatCols";
import {
  CurrencyConverter,
  CurrencyCalculationContext,
} from "@frontrolinc/pace-ui-framework";
import metricsUiConfig from "./metrics.json";
import metricsmapping from "./metricsmapping.json";
import trendValueUiConfig from "./trendValues.json";
import trendvaluesMapping from "./trendvaluesMapping.json";



metricsUiConfig.defaultExcelExportParams = {
  ...metricsUiConfig.defaultExcelExportParams,
  processCellCallback: (params) => {
    const colDef = params.column.getColDef()
    if (colDef.valueFormatter) {
      const valueFormatterParams = {
        ...params,
        data: params.node.data,
        node: params.node,
        colDef: params.column.getColDef()
      };
      const val = colDef.valueFormatter(valueFormatterParams);
      if(!val) return val
      const parsedDate = Date.parse(val);

      if(val.includes('%')) {
        colDef.cellClass = "kpiPercentage"
          if(val.includes('(') && val.indexOf(')') === val.length - 1) {
          return -(parseFloat(val.replaceAll(/[^\d\*.]/g,''))/100)
        }
        return parseFloat(val.replaceAll(/[^\d\*.]/g,''))/100
      }
      if(val.includes('(') && val.indexOf(')') === val.length - 1) {
        colDef.cellClass = "kpiNumberType"
        return isNaN(parseFloat(val.replaceAll(/[^\d\*.]/g,''))) ? '' : -(parseFloat(val.replaceAll(/[^\d\*.]/g,'')))
      }
      if (isNaN(val) && !isNaN(parsedDate) && !val.includes('%')) {
        colDef.cellClass = "dateType"
        return params.value
        }
      colDef.cellClass = "kpiNumberType"
      return isNaN(parseFloat(val.replaceAll(/[^\d\*.]/g,''))) ? '' : parseFloat(val.replaceAll(/[^\d\*.]/g,''))
  }
    return params.value;
  },
  columnKeys : ['row', "prior_period_mtd", 'mtd', 'ytd','itd','original','approved','forecast','prior_period_forecast','etc','complete']
}


trendValueUiConfig.defaultExcelExportParams = {
  ...trendValueUiConfig.defaultExcelExportParams,
  processCellCallback: (params) => {
    const colDef = params.column.getColDef()
    if (colDef.valueFormatter) {
      const valueFormatterParams = {
        ...params,
        data: params.node.data,
        node: params.node,
        colDef: params.column.getColDef()
      };
      const val = colDef.valueFormatter(valueFormatterParams);
      if(!val) return val
      const parsedDate = Date.parse(val);

      if(val.includes('%')) {
        colDef.cellClass = "kpiPercentage"
          if(val.includes('(') && val.indexOf(')') === val.length - 1) {
          return -(parseFloat(val.replaceAll(/[^\d\*.]/g,''))/100)
        }
        return parseFloat(val.replaceAll(/[^\d\*.]/g,''))/100
      }
      if(val.includes('(') && val.indexOf(')') === val.length - 1) {
        colDef.cellClass = "kpiNumberType"
        return isNaN(parseFloat(val.replaceAll(/[^\d\*.]/g,''))) ? '' : -(parseFloat(val.replaceAll(/[^\d\*.]/g,'')))
      }
      if (isNaN(val) && !isNaN(parsedDate) && !val.includes('%')) {
        colDef.cellClass = "dateType"
        return params.value
        }
      colDef.cellClass = "kpiNumberType"
      return isNaN(parseFloat(val.replaceAll(/[^\d\*.]/g,''))) ? '' : parseFloat(val.replaceAll(/[^\d\*.]/g,''))
  }
    return params.value;
  }
}


metricsUiConfig.excelStyles = excelStyles;
trendValueUiConfig.excelStyles = excelStyles;

metricsUiConfig.defaultColDef.cellClassRules = {
  "acm-cell-bg-white": (params) => {
    return params.data.type === "hidden";
  },
  "acm-cell-bg-text": (params) => {
    return (
      params.data.dynamicCss == "textBold" 
    );
  },
  "acm-cell-bg-text-margin": (params) => {
    return (
      params.colDef.tooltipField=='' &&(
      params.data.dynamicCss == "leftalign" 
      )
    );
  },
  "acm-cell-size-info": (params) => {
    return params.colDef.tooltipField == "description";
  },
};
// metricsUiConfig.defaultColDef.cellRenderer = (params) => {
//   console.log(params.data);
//   if (params.data.row == "Gross Revenue") {
//     return <img src={info}></img>;
//   }
// };
metricsUiConfig.getMainMenuItems = getMainMenuItems;
metricsUiConfig.columnTypes = columnTypesConfig;
trendValueUiConfig.getMainMenuItems = getMainMenuItems;
trendValueUiConfig.columnTypes = columnTypesConfig;
export default {
  metricsUiConfig,
  metricsmapping,
  trendValueUiConfig,
  trendvaluesMapping,
};