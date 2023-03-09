import React, { useEffect, useState, useMemo, useRef } from 'react'
import '../../../App.css'
import styles from '../../../features/dashboard/Dashboard.module.css'
import { useLazyFetchDataQuery } from '../../../app/appApi'
import {
  getAllQueryStringValue,
  hideFullScreenLoading,
  ErrorBoundary,
} from '@frontrolinc/pace-ui-framework'
import {
  columnTypesConfig,
  getMainMenuItems,
  sidebarColsConfig,
  sidebarFilterConfig,
  excelStyles,
} from '../../../formatCols'
import Skeleton from '../../Skeleton'
import SearchContainer from '../SearchContainer'
import { Drawer } from '../../Common'
import { formatDate } from '../../../formatData'
import edited from '../../../assets/Images/edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedfilters, setRefreshTime } from '../../../slices/reportslice'
import useWindowSize from '../../../hooks/useWindowSize'
import { calculateTableHeight } from '../helpers'
import { useFilter } from '../filterContext'
import { useTranslation } from 'react-i18next'
import { getProjectId } from '../../../widgets/Shared/projectSnapshot'
import CostDetailGrid from './CostDetailGrid'
import { reportPageExportDetails } from '../../../pages/project'

const drillDown = (event) => {
  if (event.colDef.field === 'po_number' && event.data.po_number) {
    window.open(
      `https://aecom.coupahost.com/order_headers/${event.data.po_number}`,
      '_blank',
    )
  }
}

export const CDReportConfig = {
  columnDefs: [
    {
      field: 'expenditure_item_id',
      headerName: 'ID',
      width: 150,
      pinned: 'left',
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'task_number',
      headerName: 'Task #',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'task_name',
      headerName: 'Task name',
      width: 160,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'trans_date',
      headerName: 'Expense item date',
      width: 130,
      type: ['dateFormat', 'dateFilter'],
      cellClass: 'dateType',
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'week_ending_date',
      headerName: 'Costed in week ending',
      width: 130,
      type: ['dateFormat', 'dateFilter'],
      cellClass: 'dateType',
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'trans_roll_up_category',
      headerName: 'Resource category',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'employee_supplier_number',
      headerName: 'Employee / Supplier number',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'employee_supplier_name',
      headerName: 'Employee / Supplier name',
      width: 200,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'employee_classification',
      headerName: 'Employee classification',
      width: 200,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'operating_unit',
      headerName: 'Operating unit',
      width: 250,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'level1_org_name',
      headerName: 'Operating group',
      width: 130,
      hide: true,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'level2_org_name',
      headerName: 'Strategic business unit',
      width: 130,
      hide: true,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'level3_org_name',
      headerName: 'Area',
      width: 180,
      hide: true,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'level4_org_name',
      headerName: 'Sub area',
      width: 130,
      hide: true,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'level5_org_name',
      headerName: 'Level 5 organization',
      width: 250,
      hide: true,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'level6_org_name',
      headerName: 'Global business line',
      width: 130,
      hide: true,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'level7_org_name',
      headerName: 'Sub-business line',
      width: 160,
      hide: true,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'level9_org_name',
      headerName: 'Expenditure organization',
      width: 230,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 130,
      type: ['number2DecimalColumn'],
      enableValue: true,
    },
    {
      field: 'uom',
      headerName: 'UOM',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'trans_category',
      headerName: 'Expenditure category',
      width: 160,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'trans_type',
      headerName: 'Expenditure type',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'project_function_curr_code',
      headerName: 'Project functional currency',
      width: 180,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'cost',
      headerName: 'Project functional cost amount',
      width: 180,
      type: ['currencyColumn'],
      enableValue: true,
      aggFunc: 'sum',
    },
    {
      field: 'trans_currency',
      headerName: 'Original transaction currency',
      width: 180,
      hide: true,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'trans_currency_amount',
      headerName: 'Original transaction cost amount',
      width: 180,
      hide: true,
      type: ['currencyColumn'],
      enableValue: true,
      aggFunc: 'sum',
    },
    {
      field: 'bill_rate',
      headerName: 'Bill rate',
      width: 130,
      type: ['currencyColumn'],
    },
    {
      field: 'bill_amount',
      headerName: 'Billed amount',
      width: 130,
      type: ['currencyColumn'],
      enableValue: true,
      aggFunc: 'sum',
    },
    {
      field: 'bill_trans_bill_amount',
      headerName: 'Projected bill amount',
      width: 130,
      enableValue: true,
      type: ['currencyColumn'],
      aggFunc: 'sum',
    },
    {
      field: 'project_currency',
      headerName: 'Project currency',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'billing_multiplier',
      headerName: 'Billing multiplier',
      width: 130,
      type: ['number2DecimalColumn'],
    },
    {
      field: 'bill_hold',
      headerName: 'Billing hold ?',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'billable_flag',
      headerName: 'Billable',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'pa_date',
      headerName: 'PA date',
      width: 130,
      type: ['dateFormat', 'dateFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'gl_period_name',
      headerName: 'GL period',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'po_number',
      headerName: 'PO number',
      width: 130,
      type: ['textColumnSingleFilter'],
      cellClass: 'acm-hyperlink',
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'supplier_invoice_number',
      headerName: 'Supplier invoice #',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'supplier_invoice_line_number',
      headerName: 'Supplier line #',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'comment',
      headerName: 'Expenditure comment',
      width: 180,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
  ],
  defaultColDef: {
    wrapHeaderText: true,
    autoHeaderHeight: true,
    sortable: true,
    resizable: true,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
  },
  enableRangeSelection: true,
  enableColumnMoving: false,
  getMainMenuItems: getMainMenuItems,
  defaultExcelExportParams: {
    fileName: 'Cost transaction detail',
    sheetName: 'Cost transaction detail',
  },
  columnTypes: columnTypesConfig,
  onCellClicked: (event) => drillDown(event),
  excelStyles: excelStyles,
}

const CostDetailreport = ({
  shouldCallExport,
  setShouldCallExport,
  isFullScreen,
  projectNumber,
}) => {
  const { t } = useTranslation(['label', 'message'])
  const size = useWindowSize()
  const dispatch = useDispatch()

  const [filteredData, setFilteredData] = useState([])
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState({
    period_name: t('Current period'),
  })

  const selectedReport = useSelector((state) => state.reports?.selectedReport)
  const sFilters = useSelector((state) => state.reports?.selectedFilters)
  const refreshTime = useSelector((state) => state.reports?.refreshTime)

  let filteredDataRef = useRef(null)
  let primaryGridRef = useRef(null)

  const qParams = getAllQueryStringValue()

  useEffect(() => {
    dispatch(
      setSelectedfilters({
        report: {
          period_name: t('Current period'),
          period_id: 'ptd',
          ...sFilters?.report,
          ...qParams,
        },
      }),
    )
    const tabData = {
      period_name: t('Current period'),
      period_id: 'ptd',
      ...sFilters?.report,
      ...qParams,
    }
    delete tabData?.tab
    delete tabData?.report
    delete tabData?.res_name
    delete tabData?.period_name
    delete tabData?.task_name
    delete tabData?.full_name
    delete tabData?.supplier_name
    delete tabData?.organization_name

    update({
      queryName: 'TaskDetails.CostDetails',
      projectID: parseInt(projectID),
      filters: JSON.stringify(tabData),
      __config__: {
        transformResponse: (response) => {
          dispatch(setRefreshTime({ ...refreshTime, costDetail: new Date() }))
        },
      },
    })
  }, [])

  const resCatConfig = {
    mode: 'singleSelect',
    remote: false,
    data: [
      {
        resource_category: 'Raw Labor',
        res_name: t('Raw Labor'),
      },
      {
        resource_category: 'Fringe',
        res_name: t('Fringe'),
      },
      {
        resource_category: 'Overhead',
        res_name: t('Overhead'),
      },
      {
        resource_category: 'ODC',
        res_name: t('ODC'),
      },
      {
        resource_category: 'Subs',
        res_name: t('Subs'),
      },
    ],
    itemTemplate: "<div class='left-item '><div>{res_name}</div></div>",
  }

  const FilterMap = {
    res_name: 'Resource category',
    start_date: 'Start date',
    end_date: 'End date',
    supplier_name: 'Supplier',
    organization_name: 'Organization',
    period_name: 'Period type',
    task_name: 'Task',
    full_name: 'Employee',
  }

  const updatedSideBarConfig = {
    ...sidebarColsConfig,
    toolPanelParams: {
      suppressPivotMode: false,
      suppressValues: false,
      suppressRowGroups: false,
    },
  }

  useEffect(() => {
    CDReportConfig.sideBar = {
      toolPanels: [updatedSideBarConfig, sidebarFilterConfig],
    }
  }, [])
  const projectID = getProjectId(window.location.href)
  const tableHeight = useMemo(() => {
    return calculateTableHeight(
      filteredData,
      'cost',
      isFullScreen,
      updatedSideBarConfig.toolPanelParams.suppressPivotMode,
    )
  }, [size.height, size.width, filteredData, isFullScreen])

  const onInitialRender = (displayItem) => {
    for (let item in displayItem) {
      if (
        displayItem[item] === null ||
        displayItem[item] === undefined ||
        displayItem[item] === ''
      ) {
        delete displayItem[item]
      }
    }
    setFilters(displayItem)
  }
  const [update, { data, isFetching, isLoading }] = useLazyFetchDataQuery()

  useEffect(() => {
    if (projectID && data && data.Data['TaskDetails.CostDetails']) {
      setFilteredData(data?.Data['TaskDetails.CostDetails'])
    }
  }, [data])

  const config = {
    type: 'dashboardWidget',
    layout: 'grid',
    tabs: 0,
    isFullWidth: true,
  }

  const onSubmit = (displayItem, queryItem) => {
    let data = {}

    for (let item in displayItem) {
      if (
        displayItem[item] === null ||
        displayItem[item] === undefined ||
        displayItem[item] === ''
      ) {
        delete displayItem[item]
      } else {
        data = { ...data, [item]: displayItem[item] }
      }
    }
    for (let item in queryItem) {
      if (
        queryItem[item] === null ||
        queryItem[item] === undefined ||
        queryItem[item] === ''
      ) {
        delete queryItem[item]
      } else {
        data = { ...data, [item]: queryItem[item] }
      }
    }
    dispatch(setSelectedfilters({ report: { ...sFilters.report, ...data } }))
    setFilters(displayItem)
    update({
      queryName: 'TaskDetails.CostDetails',
      projectID: parseInt(projectID),
      filters: JSON.stringify(queryItem),
      __config__: {
        transformResponse: (response) => {
          const date = new Date()
          dispatch(setRefreshTime({ ...refreshTime, costDetail: date }))
        },
      },
    })
  }

  useEffect(() => {
    isFetching &&
      dispatch(setRefreshTime({ ...refreshTime, revenueDetail: null }))
  }, [isFetching])

  let filterContext = useFilter()
  if (CDReportConfig.ref) {
    primaryGridRef = CDReportConfig.ref
  } else {
    CDReportConfig.ref = primaryGridRef
  }

  if (primaryGridRef.current != undefined && primaryGridRef.current != null) {
    filterContext.setGridRef(primaryGridRef)
  }

  const getFilterChangeFn = (event) => {
    const filterObj = event.api?.getFilterModel()
    const isFilterApplied = Object.keys(filterObj).length > 0
    const updatedData = event.api.rowRenderer.rowModel.rowsToDisplay.map(
      (row) => row.data,
    )
    filteredDataRef.current = updatedData

    if (isFilterApplied) {
      filterContext.setFilterText(
        filteredDataRef?.current?.length +
          ' of ' +
          filteredData?.length +
          ' ' +
          'transactions',
      )
    } else {
      filterContext.setFilterText(null)
    }
    filterContext.setFilteredData(filteredData)
  }
  CDReportConfig.onFilterChanged = getFilterChangeFn
  useEffect(() => {
    if (shouldCallExport) {
      const interval = setInterval(() => {
        if (CDReportConfig && CDReportConfig.gridApi) {
          if(reportPageExportDetails.exportAs === 'xls') {
            CDReportConfig.gridApi.exportDataAsExcel({fileName : `${projectNumber}-${selectedReport.report_name}`})
          }
          if(reportPageExportDetails.exportAs === 'csv') {
            CDReportConfig.gridApi.exportDataAsCsv({fileName : `${projectNumber}-${selectedReport.report_name}`})
          }
          clearInterval(interval)
          setShouldCallExport(false)
        }
        hideFullScreenLoading()
      }, 1000)
    }
  }, [shouldCallExport])

  return (
    <div className={styles.container}>
      <div className="flex flex-wrap justify-between">
        <div className="flex">
          {Object.keys(filters).map((key, index) => {
            return (
              <>
                <span
                  className="bg-darkgrey mb-[10px] text-xs rounded-sm px-[10px] py-[6px] mr-[19px] text-lightgrey"
                  key={index}
                >
                  <b>{t(FilterMap[key])}</b>:{' '}
                  {key === 'start_date' || key === 'end_date'
                    ? formatDate(filters[key])
                    : filters[key]}
                </span>
              </>
            )
          })}
          <span
            onClick={() => setOpen(true)}
            className="cursor-pointer text-darkgreen mb-[10px] mr-[19px] flex pr-[10px] py-[6px] text-xs hover:bg-[#E6F3F0]"
          >
            <div>
              <img
                src={edited}
                alt="edit"
                className="cursor-pointer w-[15px] h-[15px] rounded-full p-[3px] bg-bggreen mr-[5px]"
              />
            </div>
            {t('Edit parameters')}
          </span>
        </div>
      </div>
      <div>
        {isFetching ? (
          <div>
            <Skeleton {...config} />
          </div>
        ) : (
          <ErrorBoundary>
            <CostDetailGrid
              filteredData={filteredData}
              uiConfig={CDReportConfig}
              tableHeight={tableHeight}
              data={data}
            />
          </ErrorBoundary>
        )}
      </div>
      <Drawer isOpen={open} setIsOpen={setOpen} showSmall="w-1/4">
        <SearchContainer
          projectId={parseInt(projectID)}
          onSubmit={onSubmit}
          onInitialRender={onInitialRender}
          open={open}
          setOpen={setOpen}
          resCatConfig={resCatConfig}
        />
      </Drawer>
    </div>
  )
}

// export default withErrorHandler(CostDetailreport, null)

export default CostDetailreport
