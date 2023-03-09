import { useState } from 'react'
import {
  Widget,
  Grid,
  getQueryStringValue,
} from '@frontrolinc/pace-ui-framework'
import { useFetchDataQuery, useMultipleFetchDataQuery } from '../../app/appApi'
import { getPayload } from '../Shared/portfolioSnapshot'
import { useSelector } from 'react-redux'
import config from './config'
import { getTableHeight } from '../../helpers/utils'
import InvoiceGrid from './InvoiceGrid'
import Graph from './graph'
import {
  getSummaryData,
  getSummaryTableData,
  getTableData,
} from '../../TransposeData'
import { useNavigate } from 'react-router-dom'
import { projectDrilldown } from '../../TransposeData'
import {
  setRefreshTime,
  setProjects,
  setTimeAndProject,
} from '../../slices/portfolioslice'
import { getProjectId } from '../Shared/projectSnapshot'
const { COLUMN_NAMES, SERIES_INFO } = config.summaryMappings
const projectBreadCumbs = [{ label: 'Projects', active: true }]
const projectBreadCumbsWithSubmenu = [
  { label: 'Projects', active: true },
  { label: 'Invoice', active: false },
]

function AgedARWidgetNew({ block }) {
  const [isProject, setIsProject] = useState(true)
  const navigate = useNavigate()
  const projectID = getProjectId(window.location.href)
  const selectedPortfolio = useSelector(
    (state) => state.portfolio?.selectedPortfolio?.portfolio_id,
  )
  const [selectedProject, setSelectedProject] = useState('')

  const view = useSelector((state) => state.view.views)

  const projectUiConfigUpdated = config.projectUiConfig
  const useCurrency = () => {
    return block.isFullScreen ? true : false
  }

  const onBreadcrumbClick = (item) => {
    setIsProject(true)
  }
  const onTabChange = (id) => {
    setIsProject(true)
  }
  const PROJECT_DRILLDOWN = [
    { type: 'Project Number' },
    { type: 'Project Name' },
  ]

  const onProjectCellClick = (event) => {
    const result = config.SERIES_INFO_INVOICE_Bill.filter((item, key) => {
      return item.type === event.colDef.headerNameKey
    })
    if (result.length != 0) {
      setIsProject(false)
    } else {
      projectDrilldown(event, navigate)
    }
    setSelectedProject(event)
  }

  const transformResponse = (response) => {}
  const onQueryStarted = (dispatch) => {
    dispatch(setTimeAndProject())
  }

  const onQueryFulfilled = (response, dispatch) => {
    dispatch(setRefreshTime())
    dispatch(setProjects(response.data.reporting.data.projects.length))
  }

  const loaderOptions = {
    type: 'dashboardWidget',
    layout: 'graph',
    tabs: 4,
    isFullWidth: false,
  }
  const uiConfig = {
    block: block,
    loaderOptions: loaderOptions,
    widgetId: block.instanceId,
    isFullScreen: block.isFullScreen,
    filterName: 'Projects',
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: projectID
        ? {
            queryName: 'ProjectInvoice.getProjectInvoices',
            project_id: parseInt(projectID),
          }
        : {
            queryName: 'ProjectInvoice.getProjectInvoices',
            portfolio_id: selectedPortfolio,
          },
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            data: response.data
              ? response.data?.Data?.['ProjectInvoice.getProjectInvoices']
              : undefined,
          }
        },
      },
    },
    content: {
      type: 'jsx',
      label: 'This week cost',
      id: 'dashBoardWeekCost',
      child: Grid,
      isUseCurrency: useCurrency,
      dataPropName: 'rows',
      // processData: (data) => {
      //   return populateHierarchyCall(data.Data['AcmTaskResource.portfolioLevelWeekCost']);
      // },
      childProps: {
        id: 'dashBoardWeekCost',
        uiConfig: {
          ...config.projectUiConfig,
          suppressColumnMoveAnimation: true,
          debounceVerticalScrollbar: true,
          onCellClicked: onProjectCellClick,
        },
      },
    },
  }
  return (
    <>
      <Widget config={uiConfig}></Widget>
    </>
  )
}

export default AgedARWidgetNew
