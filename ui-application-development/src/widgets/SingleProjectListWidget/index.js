import React, { useCallback } from 'react'
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
import { projectDrilldown } from '../../TransposeData'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function SingleProjectListWidget({ block }) {
  const loaderOptions = {
    type: 'dashboardWidget',
    layout: 'grid',
    tabs: 0,
    isFullWidth: true,
  }

  const { t } = useTranslation(['label', 'message'])

  const useCurrency = () => {
    return block.isFullScreen &&
      currencyFactory.currencyRates &&
      currencyFactory.currencyRates.length > 1
      ? true
      : false
  }

  const navigate = useNavigate()

  const uiConfig = {
    block: block,
    loaderOptions: loaderOptions,
    widgetId: block.instanceId,
    isFullScreen: block.isFullScreen,
    filterName: 'Projects',
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
      type: 'jsx',
      // tabs: [
      //   {
      label: 'Single line data export',
      id: 'single line data export',
      child: Grid,
      isUseCurrency: useCurrency,
      dataPropName: 'rows',      
      primary: true,
      childProps: {
        id: 'single line data export',
        currencyColumnName: "project_func_currency_code",
        showTotal: true,
          totalOptions: {
            displayName: t('total'),
          },
        uiConfig: {
          ...config.singleprojectUiConfig,
          onCellClicked: (event) => projectDrilldown(event, navigate),
        },
        currencyColumnName: "project_func_currency_code",
        style: { height: 325, width: '100%' },
      },
    },
    //   ],
    // },
  }
  return <Widget config={uiConfig}></Widget>
}

export default SingleProjectListWidget
