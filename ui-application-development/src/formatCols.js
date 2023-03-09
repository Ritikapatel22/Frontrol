import {
  formatCurrency,
  formatNumber,
  formatNumber2Decimal,
  formatNumber1Decimal,
  formatDate,
  formatPercentage,
  formatDynamicColumn,
  cellStyleDynamicColumn,
  formatDateMonth,
  numberErrorValueGetter,
} from './formatData'
import {
  currencyFactory,
  userSettingsFactory
} from '@frontrolinc/pace-ui-framework'

function getMainMenuItems(params) {
  const menuItems = []
  const itemsToExclude = ['separator', 'pinSubMenu', 'valueAggSubMenu']
  params.defaultItems.forEach((item) => {
    if (itemsToExclude.indexOf(item) < 0) {
      menuItems.push(item)
    }
  })
  return menuItems
}

const columnTypesConfig = {
  textColumnMultiFilter: {
    // filter: 'agTextColumnFilter',
    // filterParams: {
    //   buttons: [ 'reset'],
    // }
    filter: 'agMultiColumnFilter',
    filterParams: {
      buttons: ['reset'],
      filters: [
        {
          filter: 'agTextColumnFilter',
          display: 'subMenu',
          buttons: ['reset'],
        },
        {
          filter: 'agSetColumnFilter',
        },
      ],
    },
    cellClass: 'stringType',
  },
      linkType:{},
      totalColumn:{},
      textColumn:{},
      noFilter:{},

  textColumnSingleFilter: {
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
    cellClass: 'stringType',
  },
  supressFilter: {
    //this has to be the last entry
    filter: '',
    cellClass: 'stringType',
  },
  numberColumn: {
    valueFormatter: formatNumber,
    valueGetter: numberErrorValueGetter,
    cellStyle: (params) => {
      if (parseFloat(params.value) < 0) {
        //mark cells as red
        return { color: 'red', textAlign: 'right' }
      }
      return { textAlign: 'right' }
    },
    headerClass: 'ag-right-aligned-header',
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
    cellClass: 'number0DecimalType',
  },
  number2DecimalColumn: {
    valueFormatter: formatNumber2Decimal,
    valueGetter: numberErrorValueGetter,
    cellStyle: (params) => {
      if (parseFloat(params.value) < 0) {
        //mark cells as red
        return { color: 'red', textAlign: 'right' }
      }
      return { textAlign: 'right' }
    },
    headerClass: 'ag-right-aligned-header',
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
    cellClass: 'number2DecimalType',
  },
  number1DecimalColumn: {
    valueFormatter: formatNumber1Decimal,
    valueGetter: numberErrorValueGetter,
    cellStyle: (params) => {
      if (parseFloat(params.value) < 0) {
        //mark cells as red
        return { color: 'red', textAlign: 'right' }
      }
      return { textAlign: 'right' }
    },
    headerClass: 'ag-right-aligned-header',
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
    cellClass: 'number1DecimalType',
  },
  currencyConversionColumn: {
    valueFormatter: formatCurrency,
    valueGetter: (params) => {
      if (numberErrorValueGetter(params) == null) return null

      return currencyFactory.convertCurrency({
        currencyValue: params.data[params.colDef.field],
        currentCurrency: params.data[params.colDef.currencyColumnName],
      })
    },
    cellStyle: (params) => {
      if (parseFloat(params.value) < 0) {
        //mark cells as red
        return { color: 'red', textAlign: 'right' }
      }
      return { textAlign: 'right' }
    },
    headerClass: 'ag-right-aligned-header',
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
    cellClass: 'number2DecimalType',
  },
  currencyColumn: {
    valueFormatter: formatCurrency,
    valueGetter: numberErrorValueGetter,
    cellStyle: (params) => {
      if (parseFloat(params.value) < 0) {
        //mark cells as red
        return { color: 'red', textAlign: 'right' }
      }
      return { textAlign: 'right' }
    },
    headerClass: 'ag-right-aligned-header',
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
    cellClass: 'number2DecimalType',
  },
  percentageColumn: {
    valueFormatter: formatPercentage, //this is be no decimal with percenatge format
    valueGetter: numberErrorValueGetter,
    cellStyle: (params) => {
      if (parseFloat(params.value) < 0) {
        //mark cells as red
        return { color: 'red', textAlign: 'right' }
      }
      return { textAlign: 'right' }
    },
    headerClass: 'ag-right-aligned-header',
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
    cellClass: 'percentageType',
  },
  dateFormat: {
    valueFormatter: formatDate,
    cellStyle: { textAlign: 'right' },
    headerClass: 'ag-right-aligned-header',
    cellClass: 'dateType',
  },
  dateMonthFormat: {
    valueFormatter: formatDateMonth,
    cellStyle: { textAlign: 'right' },
    headerClass: 'ag-right-aligned-header',
  },
  dateFilter: {
    filter: 'agDateColumnFilter',
    filterParams: {
      buttons: ['reset'],
      inRangeInclusive: true,
      comparator: (filterLocalDateAtMidnight, cellValue) => {
        const dateAsString = cellValue
        if (dateAsString == null) {
          return 0
        }
        const dateParts = dateAsString.split('-')
        const year = Number(dateParts[0])
        const month = Number(dateParts[1]) - 1
        const day = Number(dateParts[2])
        const cellDate = new Date(year, month, day)
        if (cellDate < filterLocalDateAtMidnight) {
          return -1
        } else if (cellDate > filterLocalDateAtMidnight) {
          return 1
        }
        return 0
      },
    },
    cellClass: 'dateType',
  },
  dynamicColumnFormat: {
    valueFormatter: formatDynamicColumn,
    valueGetter: numberErrorValueGetter,
    cellStyle: cellStyleDynamicColumn,
    headerClass: 'ag-right-aligned-header',
  },
  eacExpiredColumn: {
    cellStyle: (params) => {
      if (params.data['eac_due_date_expired'] == true) {
        //mark cells as red
        return { color: 'red', textAlign: 'right' }
      }
      return { textAlign: 'right' }
    },
    cellClass: 'dateType',
  },
  forecastEndDateExpiredColumn: {
    cellStyle: (params) => {
      if (params.data['forecast_end_date_expired'] == true) {
        //mark cells as red
        return { color: 'red', textAlign: 'right' }
      }
      return { textAlign: 'right' }
    },
    cellClass: 'dateType',
  },
}



const sidebarColsConfig = {
  id: 'columns',
  labelDefault: 'Columns',
  labelKey: 'columns',
  iconKey: 'columns',
  toolPanel: 'agColumnsToolPanel',
  toolPanelParams: {
    suppressPivotMode: true,
    suppressValues: true,
    suppressRowGroups: true,
  },
  // minWidth: 225,
  width: 225,
  // maxWidth: 225,
}

const sidebarFilterConfig = {
  id: 'filters',
  labelDefault: 'Filters',
  labelKey: 'filters',
  iconKey: 'filter',
  toolPanel: 'agFiltersToolPanel',
  minWidth: 180,
  maxWidth: 400,
  width: 250,
}

const excelStyles = [
  {
    id: 'stringType',
    dataType: 'String',
  },
  {
    id: 'number0DecimalType',
    dataType: 'Number',
    numberFormat: {
      format: '#,##0;[Red](#,##0)',
    },
  },
  {
    id: 'number1DecimalType',
    dataType: 'Number',
    numberFormat: {
      format: '#,##0.0;[Red](#,##0.0)',
    },
  },
  {
    id: 'number2DecimalType',
    dataType: 'Number',
    numberFormat: {
      format: '#,##0.00;[Red](#,##0.00)',
    },
  },
  {
    id: 'percentageType',
    dataType: 'Number',
    numberFormat: {
      format: '#,##0.00%;[Red](#,##0.00%)',
    },
  },
  {
    id: 'dateType',
    dataType: 'DateTime',
    numberFormat: {
      format: 'dd-mmm-yy',
    },
  },
  {
    id: 'kpiPercentage',
    dataType: 'Number',
    numberFormat: {
      format: '#,##.0%;[Red]-#,##0.0%',
    },
  },
  {
    id: 'kpiNumberType',
    dataType: 'Number',
    numberFormat: {
      format: '#,##0.00;[Red](#,##0.00)',
      // format: '#,##0.00;[Red]( #,##0.00 )',  // negetive values in red with brackets
    },
  },
]


let dateFormat = userSettingsFactory.dateFormat;
userSettingsFactory.subscribe('dateFormatChanged', () => {
 dateFormat = userSettingsFactory.dateFormat
 excelStyles.map((e) => {
  if (e.dataType === "DateTime") {
    e.numberFormat.format = dateFormat
  }
  return e
})
})


export {
  columnTypesConfig,
  sidebarColsConfig,
  sidebarFilterConfig,
  getMainMenuItems,
  excelStyles,
}
