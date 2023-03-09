import { Widget, Grid } from '@frontrolinc/pace-ui-framework'
import {useRef, useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showToast } from '@frontrolinc/pace-ui-framework'
import { useFetchDataQuery } from '../../app/appApi'
import config from './config'
import { getTableHeight } from '../../helpers/utils'
import { getProjectId } from '../Shared/projectSnapshot'

const colConfig  = { ...config.projectdocumentUiConfig }
function ProjectDocuments({ block }) {
  const navigate = useNavigate()

  const selectedPortfolio = useSelector(
    (state) => state.portfolio?.selectedPortfolio?.portfolio_id,
  )

  const projectID = getProjectId(window.location.href)
  const hasProjectNumber = colConfig.columnDefs.findIndex((col) => col.field === 'project_number') >= 0;
  if (projectID && hasProjectNumber) {
    colConfig.columnDefs = colConfig.columnDefs.filter(
      (el) => el.field !== 'project_number' && el.field !== 'project_name',
    )
  } else if (!projectID && !hasProjectNumber) {
    colConfig.columnDefs = config.projectdocumentUiConfig.columnDefs;
  }

  const documentShow = (e) => {
    if (e.isOpenInNewTab) {
      const rowKey = e.data.project_id
      const url = `${location.origin}${location.pathname.replace(/\/?$/, '/',)}project/${rowKey}`
      window.open(url, '_blank')
    } else if (
      e.colDef.field === 'project_number' ||
      e.colDef.field === 'project_name'
    ) {
      navigate(`/project/${e.data.project_id}`)
    }

    if (e.colDef.field === 'file_name') {
      if (e.data.file_id) {
        window.open(`/view-file?fileId=${e.data.file_id}&page=${e.value}`, '_blank')
      } else {
        showToast('error', 'File not found')
      }
    }
  }

  const onFilterChange = (e) => {
    console.log('all filter cleared', e)
  }

  const loaderOptions = {
    type: 'dashboardWidget',
    layout: 'grid',
    tabs: 0,
    isFullWidth: true,
  }

  const uiConfig = {
    block: block,
    widgetId: block.instanceId,
    loaderOptions: loaderOptions,
    isFullScreen: block.isFullScreen,
    filterName: 'Documents',
    onFilterChange,
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: projectID
        ? {
            queryName: 'ProjectDocument.GetPortfolioDocuments',
            project_id: parseInt(projectID),
          }
        : {
            queryName: 'ProjectDocument.GetPortfolioDocuments',
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
              ? response.data?.Data?.['ProjectDocument.GetPortfolioDocuments']
              : undefined,
          }
        },
      },
    },
    content: {
      type: 'jsx',
      label: 'Documents',
      id: 'documents',
      child: Grid,
      dataPropName: 'rows',
      childProps: {
        id: 'documents',
        uiConfig: {
          ...colConfig ,
          onCellClicked: documentShow,
        },
        style: {
          height: block.isFullScreen ? getTableHeight() : 300,
        },
      },
    },
  }


  return (
   <Widget config={uiConfig}/>
  )

}

export default ProjectDocuments
