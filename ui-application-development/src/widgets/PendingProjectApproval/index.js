import { Widget, Grid } from '@frontrolinc/pace-ui-framework'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFetchDataQuery } from '../../app/appApi'
import { projectDrilldown } from '../../TransposeData'
import { getProjectId } from '../Shared/projectSnapshot'
import Graph from './graph'
import config from './config'

function PendingProjectApproval({ block }) {
  const navigate = useNavigate()
  const projectID = getProjectId(window.location.href)
  const selectedPortfolio = useSelector(
    (state) => state.portfolio?.selectedPortfolio?.portfolio_id,
  )

  const [columnsConfig, setColumnConfig] = useState(config.summaryUiConfig)

  const loaderOptions = {
    type: 'dashboardWidget',
    layout: 'graph',
    tabs: 2,
    isFullWidth: false,
  }

  useEffect(() => {
    if (projectID) {
      let newSummaryUiConfig = config.summaryUiConfig.columnDefs.filter(function (
        item,
      ) {
        return item.field !== 'project_number' && item.field !== 'project_name'
      })
      setColumnConfig({
        ...columnsConfig,
        columnDefs: newSummaryUiConfig,
      })
    }
  }, [projectID])

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
            queryName: 'AcmProjectWFApproval.approvalList',
            project_id: parseInt(projectID),
          }
        : {
            queryName: 'AcmProjectWFApproval.approvalList',
            portfolio_id: selectedPortfolio,
            __config__: {
              providesTags: () => [`portfolio_dashboard_${selectedPortfolio}`],
            },
          },
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            data: response.data
              ? response.data?.Data?.['AcmProjectWFApproval.approvalList']
              : undefined,
          }
        },
      },
    },
    content: {
      type: 'tabs',
      tabs: [
        {
          label: 'Outstanding workflows',
          id: 'outstanding workflows',
          exportAs: 'png',
          child: Graph,
          childProps: {
            block,
          },
          dataPropName: 'filteredData',
        },
        {
          label: 'Summary',
          id: 'summary',
          exportAs: 'excel',
          graphExportTab: 'Summary',
          child: Grid,
          dataPropName: 'rows',
          childProps: {
            id: 'summary',
            uiConfig: {
              ...columnsConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate)
            },
          },
        },
      ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default PendingProjectApproval;
