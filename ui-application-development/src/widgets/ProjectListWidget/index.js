import { useState, useCallback } from 'react'
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
import { getTableHeight } from '../../helpers/utils'
import { getSummaryData, getTableData, gridData } from '../../TransposeData'
import { getComputedData } from '@frontrolinc/pace-ui-framework'
import { useNavigate } from 'react-router-dom'
import { projectDrilldown } from '../../TransposeData'

function ProjectListWidget({ block }) {
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
      type: 'singleGridTab',
      tabs: [
        {
          label: 'Summary',
          id: 'summary',
          exportAs: 'excel',
          child: Grid,
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          primary: true,
          childProps: {
            id: 'summary',
            currencyColumnName: 'project_func_currency_code',
            uiConfig: {
              ...config.summaryUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
        {
          label: 'KPIs',
          id: 'kpis',
          child: Grid,
          exportAs: 'excel',
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          childProps: {
            id: 'kpis',
            currencyColumnName: 'project_func_currency_code',
            uiConfig: {
              ...config.kpisUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
        {
          label: 'AR & Unbilled',
          id: 'ar unbilled',
          child: Grid,
          exportAs: 'excel',
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          childProps: {
            id: 'ar unbilled',
            currencyColumnName: 'project_func_currency_code',
            uiConfig: {
              ...config.arUnBilledUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
        {
          label: 'Approved',
          id: 'approved',
          child: Grid,
          exportAs: 'excel',
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          childProps: {
            id: 'approved',
            currencyColumnName: 'project_func_currency_code',
            uiConfig: {
              ...config.approvedUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
        {
          label: 'Forecast',
          id: 'forecast',
          child: Grid,
          exportAs: 'excel',
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          childProps: {
            id: 'forecast',
            currencyColumnName: 'project_func_currency_code',
            uiConfig: {
              ...config.forecastUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
        {
          label: 'Change',
          id: 'change',
          child: Grid,
          exportAs: 'excel',
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          childProps: {
            id: 'change',
            currencyColumnName: 'project_func_currency_code',
            uiConfig: {
              ...config.changeUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
        {
          label: 'MTD',
          id: 'mtd',
          child: Grid,
          exportAs: 'excel',
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          childProps: {
            id: 'mtd',
            currencyColumnName: 'project_func_currency_code',
            uiConfig: {
              ...config.mtdUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
        {
          label: 'YTD',
          id: 'ytd',
          child: Grid,
          exportAs: 'excel',
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          childProps: {
            id: 'ytd',
            currencyColumnName: 'project_func_currency_code',
            uiConfig: {
              ...config.ytdUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
        {
          label: 'ITD',
          id: 'itd',
          child: Grid,
          exportAs: 'excel',
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          childProps: {
            id: 'itd',
            currencyColumnName: 'project_func_currency_code',
            uiConfig: {
              ...config.itdUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
        {
          label: 'Key members',
          id: 'keymembers',
          child: Grid,
          exportAs: 'excel',
          dataPropName: 'rows',
          childProps: {
            id: 'key members',
            uiConfig: {
              ...config.keymemberUiConfig,
              onCellClicked: (event) => projectDrilldown(event, navigate),
            },
          },
        },
      ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default ProjectListWidget
