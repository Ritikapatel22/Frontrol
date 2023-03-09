import React, { useState, useEffect, useMemo } from 'react'
import {
  Grid, 
  withErrorHandler,
  hideFullScreenLoading,
  getAllQueryStringValue,
 } from '@frontrolinc/pace-ui-framework'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchDataQuery } from '../../../app/appApi'
import Skeleton from '../../Skeleton'
import {
  columnTypesConfig,
  getMainMenuItems,
  sidebarColsConfig,
  excelStyles
} from '../../../formatCols'
import '../../../App.css'
import styles from '../../../features/dashboard/Dashboard.module.css'
import { constructHierarchyTaskSummaryReport } from '../../../TransposeData'
import { setSelectedfilters, setRefreshTime } from '../../../slices/reportslice'
import useWindowSize from '../../../hooks/useWindowSize'
import { calculateTableHeight } from '../helpers'
import { getProjectId } from '../../../widgets/Shared/projectSnapshot'
import { useTranslation } from 'react-i18next';
import { reportPageExportDetails } from '../../../pages/project'

export const TSReportConfig = {
  columnDefs: [
    {
      field: 'task_name',
      headerName: 'Task name',
      width: 190,
      type: 'textColumnSingleFilter',
    },
    {
      field: 'project_manager',
      headerName: 'Project manager',
      width: 180,
      type: 'textColumnSingleFilter',
      hide:true
    },
    {
      field: 'project_approver',
      headerName: 'Project approver',
      hide:true,
      width: 150,
      type: 'textColumnSingleFilter',
    },
    {
      field: 'project_biller',
      headerName: 'Project biller',
      width: 180,
      type: 'textColumnSingleFilter',
      hide:true,
    },
    {
      field: 'customer_name',
      headerName: 'Customer name',
      width: 180,
      type: 'textColumnSingleFilter',
      hide:true,
    },
    {
      field: 'project_type',
      headerName: 'Project type',
      width: 120,
      type: 'textColumnSingleFilter',
      hide:true,
    },
    {
      field: 'approved_start_date',
      headerName: 'Approved start date',
      width: 120,
      type: ['dateFormat', 'dateFilter'],
      hide:true,
    },
    {
      field: 'approved_end_date',
      headerName: 'Approved end date',
      width: 120,
      type: ['dateFormat', 'dateFilter'],
      hide:true,
    },
    {
      field: 'forecast_start_date',
      headerName: 'Forecast start date',
      width: 135,
      type: ['dateFormat', 'dateFilter'],
      hide:true,
    },
    {
      field: 'forecast_end_date',
      headerName: 'Forecast end date',
      width: 135,
      type: ['dateFormat', 'dateFilter'],
      hide:true,
    },
    {
      field: 'transaction_start_date',
      headerName: 'Transaction start date',
      width: 120,
      type: ['dateFormat', 'dateFilter'],
      hide:true,
    },
    {
      field: 'transaction_end_date',
      headerName: 'Transaction end date',
      width: 120,
      type: ['dateFormat', 'dateFilter'],
      hide:true,
    },
    {
      field: 'original_cost_budget',
      headerName: 'Original cost budget',
      width: 160,
      type: ['currencyColumn'],
      hide:true,
    },
    {
      field: 'original_hours_budget',
      headerName: 'Original hours budget',
      width: 160,
      type: ['currencyColumn'],
      hide:true,
    },
    {
      field: 'original_revenue_budget',
      headerName: 'Original revenue budget',
      width: 160,
      type: ['currencyColumn'],
      hide:true,
    },
    {
      field: 'original_net_margin',
      headerName: 'Original net margin',
      width: 180,
      type: ['currencyColumn'],
      hide:true,
    },
    {
      field: 'changes_cost_budget',
      headerName: 'Changes cost budget',
      width: 165,
      type: ['currencyColumn'],
      hide:true,
    },
    {
      field: 'changes_hours_budget',
      headerName: 'Changes hours budget',
      width: 165,
      type: ['currencyColumn'],
      hide:true,
    },
    {
      field: 'changes_revenue_budget',
      headerName: 'Changes revenue budget',
      width: 165,
      type: ['currencyColumn'],
      hide:true,
    },
    {
      field: 'changes_net_margin',
      headerName: 'Changes net margin',
      width: 120,
      type: ['currencyColumn'],
      hide:true,
    },
    {
      field: 'approved_cost_budget',
      headerName: 'Approved cost budget',
      width: 120,
      type: ['currencyColumn'],
    },
    {
      field: 'approved_hours_budget',
      headerName: 'Approved hours budget',
      width: 165,
      type: ['currencyColumn'],
    },
    {
      field: 'approved_revenue_budget',
      headerName: 'Approved revenue budget',
      width: 165,
      type: ['currencyColumn'],
    },
    {
      field: 'approved_net_margin',
      headerName: 'Approved net margin',
      width: 165,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'approved_gross_margin_budget',
      headerName: 'Approved gross margin budget',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'approved_gross_margin_budget_perc_nsr',
      headerName: 'Approved gross margin budget % of NSR',
      width: 180,
      type: ['percentageColumn'],
      hide:true
    },
    {
      field: 'approved_gross_margin_budget_perc_gsr',
      headerName: 'Approved gross margin budget % of GSR',
      width: 180,
      type: ['percentageColumn'],
      hide:true
    },
    {
      field: 'forecast_cost_budget',
      headerName: 'Forecast cost budget',
      width: 180,
      type: ['currencyColumn'],
    },
    {
      field: 'forecast_hours_budget',
      headerName: 'Forecast hours budget',
      width: 180,
      type: ['currencyColumn'],
    },
    {
      field: 'forecast_revenue_budget',
      headerName: 'Forecast revenue budget',
      width: 165,
      type: ['currencyColumn'],
    },
    {
      field: 'forecast_net_margin',
      headerName: 'Forecast net margin',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'forecast_gross_margin',
      headerName: 'Forecast gross margin',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'forecast_gross_margin_perc_nsr',
      headerName: 'Forecast gross margin % of NSR',
      width: 180,
      type: ['percentageColumn'],
      hide:true
    },
    {
      field: 'forecast_gross_margin_perc_gsr',
      headerName: 'Forecast gross margin % of GSR',
      width: 180,
      type: ['percentageColumn'],
      hide:true
    },
    {
      field: 'total_costs_itd',
      headerName: 'Total costs - ITD',
      width: 180,
      type: ['currencyColumn', 'linkType']
    },
    {
      field: 'direct_labor_hours_itd',
      headerName: 'Direct labor hours - ITD',
      width: 180,
      type: ['numberColumn'],
    },
    {
      field: 'gross_revenue_itd',
      headerName: 'Gross revenue - ITD',
      width: 180,
      type: ['currencyColumn', 'linkType']
    },
    {
      field: 'net_margin_itd',
      headerName: 'Net margin - ITD',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'gross_margin_itd',
      headerName: 'Gross margin - ITD',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'gross_margin_perc_nsr_itd',
      headerName: 'Gross margin % of NSR - ITD',
      width: 180,
      type: ['percentageColumn'],
      hide:true
    },
    {
      field: 'gross_margin_perc_gsr_itd',
      headerName: 'Gross margin % of GSR - ITD',
      width: 180,
      type: ['percentageColumn'],
      hide:true
    },
    {
      field: 'approved_etc_total_cost',
      headerName: 'Approved ETC total cost',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'approved_etc_total_hours',
      headerName: 'Approved ETC total hours',
      width: 180,
      type: ['number1DecimalColumn'],
      hide:true
    },
    {
      field: 'approved_etc_gross_revenue',
      headerName: 'Approved ETC gross revenue',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'approved_etc_net_margin',
      headerName: 'Approved ETC net margin',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'forecast_etc_total_cost',
      headerName: 'Forecast ETC total cost',
      width: 180,
      type: ['currencyColumn'],
    },
    {
      field: 'forecast_etc_total_hours',
      headerName: 'Forecast ETC total hours',
      width: 180,
      type: ['numberColumn'],
    },
    {
      field: 'forecast_etc_gross_revenue',
      headerName: 'Forecast ETC gross revenue',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'forecast_etc_net_margin',
      headerName: 'Forecast ETC net margin',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'billed_itd',
      headerName: 'Billed - ITD',
      width: 120,
      type: ['numberColumn'],
      hide:true
    },
    {
      field: 'billed_hours_itd',
      headerName: 'Billed hours - ITD',
      width: 120,
      type: ['numberColumn'],
      hide:true
    },
    {
      field: 'unbilled_transactions',
      headerName: 'Unbilled transactions',
      width: 140,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'unbilled_hours',
      headerName: 'Unbilled hours',
      width: 140,
      type: ['number1DecimalColumn'],
      hide:true
    },
    {
      field: 'total_billed_draft_unbilled_transactions',
      headerName: 'Total billed + Unbilled transactions',
      width: 180,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'forecast_revenue_to_bill',
      headerName: 'Forecast revenue to bill',
      width: 165,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'approved_backlog',
      headerName: 'Approved backlog',
      width: 165,
      type: ['currencyColumn'],
      hide:true
    },
    {
      field: 'revenue_over_contract',
      headerName: 'Revenue over contract',
      width: 165,
      type: ['currencyColumn'],
      hide:true
    },
  ]
}

export const ResourceTypes = {
  odc: 'ODC',
  rawLabor: 'Raw Labor',
  subs: 'Subs',
  fringe: 'Fringe',
  overHead: 'Overhead',
}

const DRILLDOWN_COLUMNS = {
  total_costs_itd: 'total_costs_itd',
  gross_revenue_itd: 'gross_revenue_itd'
  }

function TaskSummaryReport({ shouldCallExport,setShouldCallExport, isFullScreen, projectNumber }) {

  const [UIConfig, setUIConfig] = useState({ columnDefs: [] })
  const [filteredData, setFilteredData] = useState([])
  const { t } = useTranslation(['label']);
  const refreshTime = useSelector((state) => state.reports?.refreshTime)
  const selectedReport = useSelector((state) => state.reports?.selectedReport)
  const sFilters = useSelector((state) => state.reports?.selectedFilters)

  const qParams = getAllQueryStringValue()
  const projectID = getProjectId(window.location.href);

  const size = useWindowSize()
  const dispatch = useDispatch()

  const { data, isFetching, isLoading } = useFetchDataQuery({
    queryName: 'TaskDetails.TaskSummary',
    projectID: parseInt(projectID),
    __config__: {
      transformResponse: (response) => {
        const date = new Date()
        dispatch(setRefreshTime({ ...refreshTime, summaryDetail: date }))
      },
    },
  });

  useEffect(() => {
    dispatch(
      setSelectedfilters({
        report: {
          ...sFilters?.report,
          ...qParams,
        },
      }),
    )
  }, [])

  useEffect(() => {
    isFetching && dispatch(setRefreshTime({ ...refreshTime, summaryDetail: null }))
  }, [isFetching])

  useEffect(() => {
    if (shouldCallExport) {
    const interval = setInterval(() => {
      if(UIConfig && UIConfig.gridApi) {
        if(reportPageExportDetails.exportAs === 'xls') {
          UIConfig.gridApi.exportDataAsExcel({fileName : `${projectNumber}-${selectedReport.report_name}`})
        }
        if(reportPageExportDetails.exportAs === 'csv') {
          UIConfig.gridApi.exportDataAsCsv({fileName : `${projectNumber}-${selectedReport.report_name}`})
        }
        clearInterval(interval)
        setShouldCallExport(false);
      }
      hideFullScreenLoading()
         }, 1000)
        }
   }, [shouldCallExport])

  useEffect(() => {
    if (data && data?.Status === 'ERROR') {
      throw data?.Message
    }
  }, [data?.Status])

  const tableHeight = useMemo(() => {
    return calculateTableHeight(filteredData, '', isFullScreen)
  }, [size.height, size.width, filteredData, isFullScreen])

  useEffect(() => {
    if (projectID && data?.Data['TaskDetails.TaskSummary']) {
      const reportTaskSummary = constructHierarchyTaskSummaryReport(
        data?.Data['TaskDetails.TaskSummary'],
      )
      setFilteredData(reportTaskSummary)
      const TSReportConfigObj = {...JSON.parse(JSON.stringify(TSReportConfig)),   
        defaultColDef: {
          wrapHeaderText: true,
          autoHeaderHeight: true,
          resizable: true,
          menuTabs: ['generalMenuTab'],
          cellClassRules: {
            'ag-cell-bg-text': (params) => {
              return params.data?.row_type === 'P' || params.data?.row_type === 'T'
            },
          },
        },
        autoGroupColumnDef: {
          headerName: 'Task number',
          pinned: 'left',
          minWidth: 350,
          cellRendererParams: {
            suppressCount: true,
          },
        },
        enableRangeSelection: true,
        enableColumnMoving: false,
        defaultExcelExportParams: {
          fileName: 'Task summary report',
          sheetName: 'Task summary report',
        },
        treeData: true,
        animateRows: true,
        groupDefaultExpanded: -1,
        sideBar: {
          toolPanels: [sidebarColsConfig],
        },
        getMainMenuItems: getMainMenuItems,
        columnTypes: columnTypesConfig,
        excelStyles: excelStyles,
        onCellClicked: (event) => onCellClick(event),
        getDataPath: getDataPath
      }
        for(let i in TSReportConfigObj.columnDefs){
          if(TSReportConfigObj.columnDefs[i].field === 'total_costs_itd'){
            TSReportConfigObj.columnDefs[i].cellClassRules = {
              "acm-hyperlink": (params) => {
                return (
                  (params.data.row_type === 'R' &&
                    params.data.roll_up_resource_name !== ResourceTypes.odc &&
                    params.value !== 0 &&
                    params.value !== null) ||
                  (params.data.parent_flag === 'N' &&
                    params.value !== 0 &&
                    params.value !== null)
                )
              },
            }
          }
          else if(TSReportConfigObj.columnDefs[i].field === 'gross_revenue_itd'){
            TSReportConfigObj.columnDefs[i].cellClassRules = {
              "acm-hyperlink": (params) => {
                return (
                  (params.data.row_type === 'R' &&
                    params.data.roll_up_resource_name !== ResourceTypes.odc &&
                    params.value !== 0) ||
                  (params.data.parent_flag === 'N' && params.value !== 0)
                )
              },
            }
          }
        }
      setUIConfig(TSReportConfigObj)
    }
  }, [data])

  const onCellClick = (params) => {
    if (
      Object.keys(DRILLDOWN_COLUMNS).find((key) => params.colDef.field === DRILLDOWN_COLUMNS[key]) &&
      params.value !== 0 &&
      params.value !== null &&
      params.value !== undefined &&
      params.data.row_type !== 'RC' &&
      params.data.row_type !== 'P' &&
      params.data.roll_up_resource_name !== ResourceTypes.odc
    ) {
      let reportId;
      if(params.colDef.field === DRILLDOWN_COLUMNS.total_costs_itd){
        reportId = 2
      }else if(params.colDef.field === DRILLDOWN_COLUMNS.gross_revenue_itd){
        reportId = 3
      }
      let baseQueryText = `/project/${projectID}?tab=report&report=${reportId}&period_name=ITD&period_id=itd&task_name=${params.data.task_name}&task_id=${params.data.task_id}`
      if (params.data.roll_up_resource_name === ResourceTypes.rawLabor) {
        baseQueryText = `${baseQueryText}&full_name=${params.data.person_name}&person_id=${params.data.person_id}`
      } else if (params.data.roll_up_resource_name === ResourceTypes.subs) {
        baseQueryText = `${baseQueryText}&supplier_name=${params.data.supplier_name}&supplier_id=${params.data.supplier_id}`
      }
      if (params.isOpenInNewTab) {
        window.open(baseQueryText, '_blank')
      } else {
        window.location.href = baseQueryText
      }
    } else {
      return
    }
  }

  const config = {
    type: 'dashboardWidget',
    layout: 'grid',
    tabs: 0,
    isFullWidth: true,
  }

  const getDataPath = (data) => {
    return data.hierarchy
  }

  return (
    <div className={styles.container}>
      {UIConfig.columnDefs.length > 0 ? (
      <Grid
        id={'TaskDetails.TaskSummary'}
        rows={filteredData}
        uiConfig={UIConfig}
        style={{ height: tableHeight }}
      />
      ) : (
        <Skeleton {...config} />
      )}
    </div>
  )
}

export default withErrorHandler(TaskSummaryReport, null)
