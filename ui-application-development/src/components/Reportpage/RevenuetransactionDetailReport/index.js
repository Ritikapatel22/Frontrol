import React, { useEffect, useState, useMemo, useRef } from 'react'
import '../../../App.css'
import styles from '../../../features/dashboard/Dashboard.module.css'
import { useLazyFetchDataQuery } from '../../../app/appApi'
import {
  getAllQueryStringValue,
  withErrorHandler,
  ErrorBoundary,
  hideFullScreenLoading,
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
import { getProjectId } from '../../../widgets/Shared/projectSnapshot'
import { useTranslation } from 'react-i18next'
import RevenueTransactionGrid from './RevenueTranSactionGrid'
import { reportPageExportDetails } from '../../../pages/project'

export const RDReportConfig = {
  columnDefs: [
    {
      field: 'expenditure_event_number',
      headerName: 'ID / Event #',
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
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'trans_date',
      headerName: 'Expense item date',
      width: 130,
      type: ['dateFormat', 'dateFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'week_ending_date',
      headerName: 'Costed in week ending',
      width: 180,
      type: ['dateFormat', 'dateFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'trans_category',
      headerName: 'Resource category',
      width: 180,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'employee_supplier_number',
      headerName: 'Employee / Supplier number',
      width: 180,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'employee_supplier_name',
      headerName: 'Employee / Supplier name',
      width: 230,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'employee_classification',
      headerName: 'Employee classification',
      width: 180,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'trans_org',
      headerName: 'Organization',
      width: 250,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 130,
      type: ['number2DecimalColumn'],
      aggFunc: 'sum',
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
      headerName: 'Expenditure / Event category',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'trans_type',
      headerName: 'Expenditure / Event type',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 130,
      enableRowGroup: true,
      enablePivot: true,
      type: ['textColumnSingleFilter'],
    },
    {
      field: 'cost',
      headerName: 'Cost',
      width: 130,
      type: ['currencyColumn'],
      aggFunc: 'sum',
    },
    {
      field: 'fully_burden_cost',
      headerName: 'Burdened cost',
      width: 180,
      type: ['currencyColumn'],
      aggFunc: 'sum',
    },
    {
      field: 'bill_rate',
      headerName: 'Bill rate',
      width: 130,
      type: ['currencyColumn'],
    },
    {
      field: 'revenue_amount',
      headerName: 'Revenue amount',
      width: 130,
      type: ['currencyColumn'],
      enableValue: true,
      aggFunc: 'sum',
    },
    {
      field: 'bill_amount',
      headerName: 'Bill amount',
      width: 130,
      type: ['currencyColumn'],
      aggFunc: 'sum',
      enableValue: true,
    },
    {
      field: 'bill_trans_bill_amount',
      headerName: 'Bill amount (bill trans currency)',
      width: 160,
      type: ['currencyColumn'],
      enableValue: true,
    },
    {
      field: 'bill_trans_currency_code',
      headerName: 'Bill transaction currency',
      width: 150,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'project_currency_code',
      headerName: 'Project currency',
      width: 130,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'project_burden_cost',
      headerName: 'Project burdened cost',
      width: 180,
      enableValue: true,
      type: ['currencyColumn'],
      aggFunc: 'sum',
    },
    {
      field: 'project_revenue_amount',
      headerName: 'Project revenue amount',
      width: 180,
      enableValue: true,
      type: ['currencyColumn'],
      aggFunc: 'sum',
    },
    {
      field: 'project_bill_amount',
      headerName: 'Project bill amount',
      width: 180,
      enableValue: true,
      type: ['currencyColumn'],
      aggFunc: 'sum',
    },
    {
      field: 'invoice_number',
      headerName: 'Invoice number',
      width: 160,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'direct_labor_multiplier',
      headerName: 'Direct labor multiplier',
      width: 180,
      type: ['number2DecimalColumn'],
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'transaction_status',
      headerName: 'Transaction status',
      width: 180,
      type: ['textColumnSingleFilter'],
      enableRowGroup: true,
      enablePivot: true,
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
      enableRowGroup: true,
      enablePivot: true,
      type: ['textColumnSingleFilter'],
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
      field: 'e_description',
      headerName: 'Description',
      width: 130,
      enableRowGroup: true,
      enablePivot: true,
      type: ['textColumnSingleFilter'],
    },
  ],
  defaultColDef: {
    wrapHeaderText: true,
    autoHeaderHeight: true,
    sortable: true,
    resizable: true,
    menuTabs: ['generalMenuTab', 'filterMenuTab'],
  },
  enableRangeSelection: true,
  enableColumnMoving: false,
  getMainMenuItems: getMainMenuItems,
  defaultExcelExportParams: {
    fileName: 'Revenue transaction detail',
    sheetName: 'Revenue transaction detail',
  },
  columnTypes: columnTypesConfig,
  excelStyles: excelStyles,
}

const RevenueTransactionDetails = ({
  shouldCallExport,
  setShouldCallExport,
  isFullScreen,
  projectNumber,
}) => {
  const { t } = useTranslation(['label', 'message'])
  const [filteredData, setFilteredData] = useState([])
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState({
    period_name: t('Current period'),
  })
  const projectID = getProjectId(window.location.href)
  const sFilters = useSelector((state) => state.reports?.selectedFilters)
  const refreshTime = useSelector((state) => state.reports?.refreshTime)

  const [update, { data, isFetching, isLoading }] = useLazyFetchDataQuery()
  let filteredDataRef = useRef(null)
  let primaryGridRef = useRef()

  const dispatch = useDispatch()
  const size = useWindowSize()
  const qParams = getAllQueryStringValue()

  const selectedReport = useSelector((state) => state.reports?.selectedReport)

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
    update({
      queryName: 'TaskDetails.RevenueTxnDetails',
      projectID: parseInt(projectID),
      filters: JSON.stringify(tabData),
      __config__: {
        transformResponse: (response) => {
          const date = new Date()
          dispatch(setRefreshTime({ ...refreshTime, revenueDetail: date }))
        },
      },
    })
  }, [])

  useEffect(() => {
    isFetching &&
      dispatch(setRefreshTime({ ...refreshTime, revenueDetail: null }))
  }, [isFetching])

  useEffect(() => {
    RDReportConfig.sideBar = {
      toolPanels: [updatedSideBarConfig, sidebarFilterConfig],
    }
  }, [])

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

  const resCatConfig = {
    mode: 'singleSelect',
    remote: false,
    data: [
      {
        resource_category: 'Labor',
        res_name: t('Labor'),
      },
      {
        resource_category: 'Non-Labor',
        res_name: t('Non-Labor'),
      },
      {
        resource_category: 'Event',
        res_name: t('Event'),
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
      suppressRowGroups: false,
    },
  }

  const tableHeight = useMemo(() => {
    return calculateTableHeight(
      filteredData,
      'revenue',
      isFullScreen,
      updatedSideBarConfig.toolPanelParams.suppressPivotMode,
    )
  }, [size.height, size.width, filteredData, isFullScreen])

  useEffect(() => {
    if (projectID) {
      setFilteredData(data?.Data['TaskDetails.RevenueTxnDetails'])
    }
  }, [data])

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
      queryName: 'TaskDetails.RevenueTxnDetails',
      projectID: parseInt(projectID),
      filters: JSON.stringify(queryItem),
      __config__: {
        transformResponse: (response) => {
          dispatch(
            setRefreshTime({ ...refreshTime, revenueDetail: new Date() }),
          )
        },
      },
    })
  }

  const config = {
    type: 'dashboardWidget',
    layout: 'grid',
    tabs: 0,
    isFullWidth: true,
  }

  let filterContext = useFilter()
  if (RDReportConfig.ref) {
    primaryGridRef = RDReportConfig.ref
  } else {
    RDReportConfig.ref = primaryGridRef
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
  RDReportConfig.onFilterChanged = getFilterChangeFn
  useEffect(() => {
    if (shouldCallExport) {
      const interval = setInterval(() => {
        if (RDReportConfig && RDReportConfig.gridApi) {
          if(reportPageExportDetails.exportAs === 'xls') {
            RDReportConfig.gridApi.exportDataAsExcel({fileName : `${projectNumber}-${selectedReport.report_name}`})
          }
          if(reportPageExportDetails.exportAs === 'csv') {
            RDReportConfig.gridApi.exportDataAsCsv({fileName : `${projectNumber}-${selectedReport.report_name}`})
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
            className="cursor-pointer text-darkgreen flex pr-[10px] py-[6px] text-xs"
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
            <RevenueTransactionGrid
              filteredData={filteredData}
              uiConfig={RDReportConfig}
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

export default withErrorHandler(RevenueTransactionDetails, null, 2)
