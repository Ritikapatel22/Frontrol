import { useState, useCallback, useEffect, useRef } from 'react'
import {
  Widget,
  Grid,
  currencyFactory,
  getQueryStringValue,
  getAllQueryStringValue,
} from '@frontrolinc/pace-ui-framework'
import { useFetchDataQuery } from '../../app/appApi'
import { getQueryConfig } from '../Shared/portfolioSnapshot'
import config from './config'
import { useNavigate } from 'react-router-dom'
import { projectDrilldown } from '../../TransposeData'

function ProjectListWidgetNew({ block }) {
  const [columnDefs, setColumnDefs] = useState({ ...config.summaryUiConfig })

  const navigate = useNavigate()
  const loaderOptions = {
    type: 'dashboardWidget',
    layout: 'grid',
    tabs: 10,
    isFullWidth: true,
  }

  const useCurrency = () => {
    return block.isFullScreen &&
      currencyFactory.currencyRates &&
      currencyFactory.currencyRates.length > 1
      ? true
      : false
  }
  let ref = useRef(null)
  let summaryUiConfigModified = { ...config.summaryUiConfig }
  const onTabChange = (id) => {
    console.log('ref', ref.current)
  }

  const uiConfig = {
    block: block,
    loaderOptions: loaderOptions,
    widgetId: block.instanceId,
    isFullScreen: block.isFullScreen,
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: getQueryConfig(),
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            data:
              response.data && response.data.data
                ? response.data.data.projects
                : undefined,
          }
        },
      },
    },
    content: {
      type: 'singleGrid',
      isUseCurrency: useCurrency,
      dataPropName: 'rows',
      child: Grid,
      onTabChange,
      childProps: {
        currencyColumnName: 'project_func_currency_code',
        uiConfig: {
          ...columnDefs,
          ref,
          onCellClicked: (event) => projectDrilldown(event, navigate),
        },
      },
      tabs: [
        {
          label: 'Summary',
          id: 'summary',
        },
        {
          label: 'KPIs',
          id: 'kpis',
        },
        {
          label: 'AR & Unbilled',
          id: 'ar unbilled',
        },
        {
          label: 'Approved',
          id: 'approved',
        },
        {
          label: 'Forecast',
          id: 'forecast',
        },
        {
          label: 'Change',
          id: 'change',
        },
        {
          label: 'MTD',
          id: 'mtd',
        },
        {
          label: 'YTD',
          id: 'ytd',
        },
        {
          label: 'ITD',
          id: 'itd',
        },
        {
          label: 'Key members',
          id: 'keymembers',
        },
      ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default ProjectListWidgetNew
