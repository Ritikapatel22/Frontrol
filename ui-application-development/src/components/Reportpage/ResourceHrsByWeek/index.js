import React, { useEffect, useState, useMemo } from 'react'
import {
  Grid,
  withErrorHandler,
  BackendError,
  hideFullScreenLoading,
  getAllQueryStringValue,
} from '@frontrolinc/pace-ui-framework'
import '../../../App.css'
import styles from '../../../features/dashboard/Dashboard.module.css'
import { useFetchDataQuery } from '../../../app/appApi'
import {
  columnTypesConfig,
  getMainMenuItems,
  sidebarColsConfig,
  excelStyles
} from '../../../formatCols'
import Skeleton from '../../Skeleton'
import useWindowSize from '../../../hooks/useWindowSize'
import { calculateTableHeight } from '../helpers'
import { revenueByWeekHierarchy } from '../../../TransposeData'
import { formatDate } from '../../../formatData'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedfilters, setRefreshTime } from '../../../slices/reportslice'
import { getProjectId } from '../../../widgets/Shared/projectSnapshot'
import { useTranslation } from 'react-i18next';
import { reportPageExportDetails } from '../../../pages/project'

export const RHWReportConfig = {
  columnDefs: [
    {
      field: 'current_fblr',
      headerName: 'Current FBLR',
      width: 160,
      hide:true,
      type: ['number2DecimalColumn'],
    },
    {
      field: 'org_7',
      headerName: 'Sub business line',
      width: 170,
      type: ['textColumnSingleFilter'],
    },
    {
      field: 'prior_weeks_hours',
      headerName: 'Prior week hours',
      width: 130,
      type: ['number2DecimalColumn'],
    },
    {
      field: 'total_hours',
      headerName: 'Total hours',
      width: 130,
      type: ['number2DecimalColumn'],
    },
    {
      field: 'total_labor_cost',
      headerName: 'Total labor cost',
      width: 130,
      hide:true,
      type: ['currencyColumn'],
    },
    {
      field: 'forecast_labor_quantity',
      headerName: "Forecast hours",
      width: 130,
      type: ['number2DecimalColumn'],
    },
    {
      field: 'forecast_labor_cost',
      headerName: "Forecast labor cost",
      width: 130,
      type: ['currencyColumn'],
    },
    {
      field: 'approved_labor_quantity',
      headerName: 'Approved hours',
      width: 130,
      type: ['number2DecimalColumn'],
    },
    {
      field: 'approved_labor_cost',
      headerName: 'Approved labor cost',
      width: 130,
      type: ['currencyColumn'],
    },
    {
      field: 'total_raw_labor_cost',
      headerName: 'Total raw labor cost',
      width: 130,
      type: ['currencyColumn'],
    },
    {
      field: 'forecast_raw_labor_cost',
      headerName: "Forecast raw labor cost",
      width: 130,
      type: ['currencyColumn'],
    },
    {
      field: 'approved_raw_labor_cost',
      headerName: 'Approved raw labor cost',
      width: 130,
      type: ['currencyColumn'],
    },
  ]
}

const ResourceHrsreport = ({ shouldCallExport, setShouldCallExport, isFullScreen, projectNumber }) => {
  const [filteredData, setFilteredData] = useState([])
  const [UIConfig, setUIConfig] = useState({ columnDefs: [] })
  const { t } = useTranslation(['label']);
  const qParams = getAllQueryStringValue()
  const dispatch = useDispatch()

  const refreshTime = useSelector((state) => state.reports?.refreshTime)
  const sFilters = useSelector((state) => state.reports?.selectedFilters)
  const selectedReport = useSelector((state) => state.reports?.selectedReport)

  const projectID = getProjectId(window.location.href);
  const size = useWindowSize()

  const tableHeight = useMemo(() => {
    return calculateTableHeight(filteredData, '', isFullScreen)
  }, [size.height, size.width, filteredData, isFullScreen])

  const { data, isFetching, isLoading } = useFetchDataQuery({
    queryName: 'TaskDetails.ResourceHrsByWeek',
    projectID: parseInt(projectID),
    __config__: {
      transformResponse: (response) => {
        const date = new Date()
        dispatch(setRefreshTime({ ...refreshTime, resourceHrsByWeek: date }))
      },
    },
  })
  
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
    isFetching && dispatch(setRefreshTime({ ...refreshTime, resourceHrsByWeek: null }))
  }, [isFetching])


  useEffect(() => {
    if (data && data?.Status === 'ERROR') {
      throw new BackendError(data?.Message)
    }
  }, [data?.Status])

  useEffect(() => {
    if(shouldCallExport) {
    const interval = setInterval(() => {
      if(UIConfig && UIConfig.gridApi) {
        if(reportPageExportDetails.exportAs === 'xls') {
          UIConfig.gridApi.exportDataAsExcel({fileName : `${projectNumber}-${selectedReport.report_name}`})
        }
        if(reportPageExportDetails.exportAs === 'csv') {
          UIConfig.gridApi.exportDataAsCsv({fileName : `${projectNumber}-${selectedReport.report_name}`})
        }
        clearInterval(interval)
        setShouldCallExport(false)
      }
      hideFullScreenLoading()
    }, 1000)
  }
   }, [shouldCallExport])

  useEffect(() => {
    if (projectID && data?.Data['TaskDetails.ResourceHrsByWeek'][0]?.tasks) {
      const RHWReportConfigObj = {...JSON.parse(JSON.stringify(RHWReportConfig)),   
        enableRangeSelection: true,
        treeData: true,
        groupDefaultExpanded: -1,
        defaultExcelExportParams: {
          fileName: 'Resource hrs by week',
          sheetName: 'Resource hrs by week',
        },
        defaultColDef: {
          wrapHeaderText: true,
          autoHeaderHeight: true,
          sortable: true,
          suppressMovable: true,
          resizable: true,
          menuTabs: ['generalMenuTab'],
          cellClassRules: {
            'ag-cell-bg-text': (params) => {
              return params.data?.row_type === 'P' || params.data?.row_type === 'T'
            },
          },
        },
        autoGroupColumnDef: {
          headerName: 'Task / Employee',
          pinned: 'left',
          minWidth: 300,
          cellRendererParams: {
            suppressCount: true,
          },
        },
        columnTypes: columnTypesConfig,
        excelStyles: excelStyles,
        sideBar: {
          toolPanels: [sidebarColsConfig],
        },
        getMainMenuItems: getMainMenuItems,
        onCellClicked: (event) =>
          onCellClick(
            event,
            createDrillDownColumns(
              data?.Data['TaskDetails.ResourceHrsByWeek'][0].periods,
            ),
          ),
        getDataPath: getDataPath
      }
      
      let periodColumns = []
      for (let [index, value] of data?.Data[
        'TaskDetails.ResourceHrsByWeek'
      ][0].periods.entries()) {
        let obj = {
          field: `period${index + 1}_hours`,
          headerName: formatDate(value),
          rawColumnName: value,
          width: 120,
          suppressColumnsToolPanel: true,
          type: ['number2DecimalColumn'],
          cellClassRules: {
            "acm-hyperlink": (params) => {
              return (
                (params.data.row_type === 'R' &&
                  params.value !== 0 &&
                  params.value !== null) ||
                (params.data.parent_flag === 'N' &&
                  params.value !== 0 &&
                  params.value !== null)
              )
            },
          },
        }
        periodColumns.push(obj)
      }

      RHWReportConfigObj.columnDefs.splice(3, 0, ...periodColumns)
      setUIConfig(RHWReportConfigObj)

      setFilteredData(revenueByWeekHierarchy(data?.Data['TaskDetails.ResourceHrsByWeek'][0].tasks))
    }
  }, [data])

  const onCellClick = (params, drillDowncolumns) => {
    if (
      drillDowncolumns.find(
        (item) => item.type === params.colDef.rawColumnName
      ) &&
      params.value !== 0 &&
      params.value !== null &&
      params.value !== undefined &&
      params.data.row_type !== 'T' &&
      params.data.row_type !== 'P'
    ) {
      let fullName = params.data.key_member
      let personId = params.data.person_id

      let start_date = params.colDef.rawColumnName
      let endDate = new Date(params.colDef.rawColumnName)
      endDate.setDate(endDate.getDate() + 6)
      endDate = endDate.toISOString().substring(0, 10)

      let baseQueryText = `/project/${projectID}?tab=report&report=2&period_name=ITD&period_id=itd&full_name=${fullName}&start_date=${start_date}&end_date=${endDate}&person_id=${personId}`
      window.location.href = baseQueryText
    }
  }

  const createDrillDownColumns = (periods) => {
    let DRILLDOWN_COLUMNS = []
    periods.map((item) => {
      DRILLDOWN_COLUMNS.push({ type: item })
    })
    return DRILLDOWN_COLUMNS
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
          id={'TaskDetails.ResourceHrsByWeek'}
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

export default withErrorHandler(ResourceHrsreport, null)
