import { useMemo } from 'react'
import {
  columnTypesConfig,
  getMainMenuItems,
  sidebarColsConfig,
  sidebarFilterConfig,
  excelStyles,
} from '../../../formatCols'
import {
  CurrencyConverter,
  CurrencyCalculationContext,
} from '@frontrolinc/pace-ui-framework'
import weekCostUiConfig from './weekCost.json'
import { formatCurrency } from '../../../formatData'
import { calculateAvgCost, aggregateAvgCost } from './weekCostFormulas'

const getDataPath = (data) => {
  return data.hierarchy
}

weekCostUiConfig.columnTypes = columnTypesConfig
weekCostUiConfig.excelStyles = excelStyles
weekCostUiConfig.getMainMenuItems = getMainMenuItems
weekCostUiConfig.getDataPath = getDataPath
weekCostUiConfig.isCellLinkType = (colDef, rowData) => {
  return rowData.row_type === 'P'
}
weekCostUiConfig.defaultColDef = {
  wrapHeaderText: true,
  sortable: true,
  resizable: true,
  menuTabs: ['generalMenuTab'],
  suppressMovable: true,
  flex: 1,
  cellClassRules: {
    ///pending CG
    'acm-cell-bg-text': (params) => {
      return (
        params.colDef.headerNameKey !== 'Project/Resources' &&
        params.data.row_type === 'P'
      )
    },
  },
}
;(weekCostUiConfig.autoGroupColumnDef = {
  headerName: 'Project/Resources',
  pinned: 'left',
  minWidth: 300,
  type: 'linkType',
  cellRendererParams: {
    suppressCount: true,
    // innerRenderer: (param) => {
    //   console.log("innerRenderer", param)
    //     return (
    //       <CurrencyCalculationContext.Consumer>
    //        {props => (
    //           <CurrencyConverter
    //             currencyCode={param.data.project_currency_code}
    //             currencyValue={param.data[param.colDef.field]}
    //             convertTo = {props.convertTo}
    //             convertCurrency = {props.convertCurrency}
    //             formatterFunc = {formatCurrency}
    //           >
    //         </CurrencyConverter>
    //         )}
    //       </CurrencyCalculationContext.Consumer>
    //     );
    //        }
  },
  cellClassRules: {
    ///pending CG
    "acm-hyperlink": (params) => {
      return params.data.row_type === 'P'
    },
  },
}),
  (weekCostUiConfig.sideBar = {
    toolPanels: [sidebarColsConfig],
  })

const aggFuncs = {
  avg_cost_rate: (params) => {
    return aggregateAvgCost(params)
  },
}
weekCostUiConfig.aggFuncs = aggFuncs
weekCostUiConfig.columnDefs.map((column) => {
  column.children.forEach((item) => {
    if (item.field === 'avg_cost_rate') {
      item.valueGetter = (params) => {
        return {
          ...params.data,
          toString: () =>
            calculateAvgCost(
              params.data?.itd_fully_burdened_cost,
              params.data?.itd_hours,
              params,
            ),
        }
      }
    }
    if (
      item.headerName.indexOf('Week') > -1 &&
      item.headerName.trim() !== 'Week'
    ) {
      item.languageParams = {
        index: item.headerName.replaceAll('Week', '').trim(),
      }
      item.headerName = 'Week'
    }
  })
})
weekCostUiConfig.excludeChildrenWhenTreeDataFiltering = true
export default { weekCostUiConfig }
