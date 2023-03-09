import { columnTypesConfig, getMainMenuItems, excelStyles } from "../../../formatCols";
import ProgressUiConfig from "./Progress.json";
import CashUiConfig from "./Cash.json";
import FinancialUiConfig from "./Financial.json";
import DataQualityUiConfig from "./DataQuality.json";
import ProjectsFlagsUiConfig from "./ProjectsFlags.json";
// import arrowindicators from "../arrowindicators";// import description from "../description";

function formatter(params) {
  const { yValue } = params;
  return {
    fill: yValue == 101 ? 'white' : '00353E',
  };
}

ProgressUiConfig.columnDefs.map(column=> {
    if (column.field === 'kpi_indicator'){
      column.cellRendererParams.sparklineOptions= {...column.cellRendererParams.sparklineOptions, formatter: formatter};
    }
})

ProgressUiConfig.defaultExcelExportParams = {
  ...ProgressUiConfig.defaultExcelExportParams,
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
      const parsedDate = Date.parse(val);
      if (isNaN(val) && !isNaN(parsedDate) && !val.includes('%')) {
       colDef.cellClass = "dateType"
       return params.value
       }
      colDef.cellClass = "kpiNumberType"
      return isNaN(parseFloat(val.replaceAll(/[^\d\*.]/g,''))) ? '' : parseFloat(val.replaceAll(/[^\d\*.]/g,''))
  }
  if(colDef.field == "kpi_indicator") {
    
    if(params.node && params.node.data && params.node.data.kpi_tooltip && params.node.data.kpi_tooltip.includes('%') && !params.node.data.kpi_tooltip.includes(':')) {
      colDef.cellClass = "kpiPercentage"
      return parseFloat(params.node.data.kpi_tooltip)/100

    }
    delete colDef.cellClass 
    // return params.node.data.kpi_tooltip
    // return isNaN(params.value) ? '' : params.value ;
    // return params.value;
    if(typeof params.value=== 'object') {
      return null
    }
  }
    return params.value;
  },
  columnKeys : ['display_name', "kpi_indicator", 'current_value', 'kpi_updown', 'prior_value','message']
}


FinancialUiConfig.defaultExcelExportParams = {
  ...FinancialUiConfig.defaultExcelExportParams,
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
      const parsedDate = Date.parse(val);
      if (isNaN(val) && !isNaN(parsedDate) && !val.includes('%')) {
       colDef.cellClass = "dateType"
       return params.value
       }
      colDef.cellClass = "kpiNumberType"
      return isNaN(parseFloat(val.replaceAll(/[^\d\*.]/g,''))) ? '' : parseFloat(val.replaceAll(/[^\d\*.]/g,''))
      return val
  }
    return params.value;
  },
  columnKeys : ['display_name', "kpi_indicator", 'current_value', 'kpi_updown', 'prior_value','approved_budget_value','eac_forecast_value','message']
}

ProjectsFlagsUiConfig.defaultExcelExportParams = {
  ...ProjectsFlagsUiConfig.defaultExcelExportParams,
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
      const parsedDate = Date.parse(val);
      if (isNaN(val) && !isNaN(parsedDate) && !val.includes('%')) {
       colDef.cellClass = "dateType"
       return params.value
       }
      colDef.cellClass = "kpiNumberType"
      return isNaN(parseFloat(val.replaceAll(/[^\d\*.]/g,''))) ? '' : parseFloat(val.replaceAll(/[^\d\*.]/g,''))
      return val
  }
    return params.value;
  },
  columnKeys : ['display_name', "kpi_indicator", 'current_value', 'kpi_updown', 'prior_value','message']
}

CashUiConfig.defaultExcelExportParams = {
  ...CashUiConfig.defaultExcelExportParams,
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
      const parsedDate = Date.parse(val);
      if (isNaN(val) && !isNaN(parsedDate) && !val.includes('%')) {
       colDef.cellClass = "dateType"
       return params.value
       }
      colDef.cellClass = "kpiNumberType"
      return isNaN(parseFloat(val.replaceAll(/[^\d\*.]/g,''))) ? '' : parseFloat(val.replaceAll(/[^\d\*.]/g,''))
      return val
  }
    return params.value;
  },
  columnKeys : ['display_name', "kpi_indicator", 'current_value', 'kpi_updown', 'prior_value','message']
}


DataQualityUiConfig.defaultExcelExportParams = {
  ...DataQualityUiConfig.defaultExcelExportParams,
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
      const parsedDate = Date.parse(val);
      if (isNaN(val) && !isNaN(parsedDate) && !val.includes('%')) {
       colDef.cellClass = "dateType"
       return params.value
       }
      colDef.cellClass = "kpiNumberType"
      return isNaN(parseFloat(val.replaceAll(/[^\d\*.]/g,''))) ? '' : parseFloat(val.replaceAll(/[^\d\*.]/g,''))
     
  }
    return params.value;
  },
  columnKeys : ['display_name', "kpi_indicator", 'current_value', 'kpi_updown', 'prior_value','message']
}

ProgressUiConfig.getMainMenuItems = getMainMenuItems;
ProgressUiConfig.columnTypes = columnTypesConfig;
CashUiConfig.getMainMenuItems = getMainMenuItems;
CashUiConfig.columnTypes = columnTypesConfig;
FinancialUiConfig.getMainMenuItems = getMainMenuItems;
FinancialUiConfig.columnTypes = columnTypesConfig;
DataQualityUiConfig.getMainMenuItems = getMainMenuItems;
DataQualityUiConfig.columnTypes = columnTypesConfig;
ProjectsFlagsUiConfig.getMainMenuItems = getMainMenuItems;
ProjectsFlagsUiConfig.columnTypes = columnTypesConfig;

ProgressUiConfig.excelStyles = excelStyles;
CashUiConfig.excelStyles = excelStyles;
FinancialUiConfig.excelStyles = excelStyles;
DataQualityUiConfig.excelStyles = excelStyles;
ProjectsFlagsUiConfig.excelStyles = excelStyles;


ProgressUiConfig.defaultColDef.cellClassRules = {
  "acm-cell-size-info": (params) => {
    return params.colDef.tooltipField == "description";
  },
  "acm-cell-size-progress": (params) => {
    return params.colDef.field == "kpi_progress";
  },
  "acm-cell-size": (params) => {
    return params.colDef.field == "kpi_updown";
  },
};

CashUiConfig.defaultColDef.cellClassRules = {
  "acm-cell-size-info": (params) => {
    return params.colDef.tooltipField == "description";
  },
  "acm-cell-size-indicators": (params) => {
    return params.colDef.field == "kpi_indicator";
  },
  "acm-cell-size": (params) => {
    return params.colDef.field == "kpi_updown";
  },
};
FinancialUiConfig.defaultColDef.cellClassRules = {
  "acm-cell-size-info": (params) => {
    return params.colDef.tooltipField == "description";
  },
  "acm-cell-size-indicators": (params) => {
    return params.colDef.field == "kpi_indicator";
  },
  "acm-cell-size": (params) => {
    return params.colDef.field == "kpi_updown";
  },
};

DataQualityUiConfig.defaultColDef.cellClassRules = {
  "acm-cell-size-info": (params) => {
    return params.colDef.tooltipField == "description";
  },
  "acm-cell-size-indicators": (params) => {
    return params.colDef.field == "kpi_indicator";
  },
};

ProjectsFlagsUiConfig.defaultColDef.cellClassRules = {
  "acm-cell-size-info": (params) => {
    return params.colDef.tooltipField == "description";
  },
  "acm-cell-size-indicators": (params) => {
    return params.colDef.field == "kpi_indicator";
  },
  "acm-cell-size": (params) => {
    return params.colDef.field == "kpi_updown";
  },
};
export default {
  ProgressUiConfig,
  CashUiConfig,
  FinancialUiConfig,
  DataQualityUiConfig,
  ProjectsFlagsUiConfig
};