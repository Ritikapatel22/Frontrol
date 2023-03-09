import { useState, useRef, useEffect } from 'react'
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
import InvoiceGrid from './InvoiceGrid'
import Graph from './graph'
import { useTranslation } from 'react-i18next'
import {
  getSummaryData,
  getSummaryTableData,
  getTableData,
} from '../../TransposeData'
import { projectDrilldown } from '../../TransposeData'
import { useNavigate } from 'react-router-dom'
const { COLUMN_NAMES, SERIES_INFO } = config.summaryMappings
const projectBreadCumbs = [{ label: 'Projects', active: true }]
const projectBreadCumbsWithSubmenu = [
  { label: 'Projects', active: true },
  { label: 'Invoice', active: false },
]
function AgedARWidget({ block }) {
  const [isProject, setIsProject] = useState(true)
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState('')
  const projectUiConfigUpdated = config.projectUiConfig

  const firstGridRef = useRef()
  projectUiConfigUpdated.ref = firstGridRef
  const { t } = useTranslation(['label', 'message'])

  let obj = JSON.parse(JSON.stringify(SERIES_INFO))

  for (let key in obj) {
    obj[key]['label'] = t(obj[key]['label'])
  }

  const onCellDoubleClicked = (event) => {}

  projectUiConfigUpdated.onCellDoubleClicked = onCellDoubleClicked

  const useCurrency = () => {
    return block.isFullScreen &&
      currencyFactory.currencyRates &&
      currencyFactory.currencyRates.length > 1
      ? true
      : false
  }

  const onBreadcrumbClick = (item) => {
    block.setForceHide(false)
    setIsProject(true)
  }
  const onTabChange = (id) => {
    setIsProject(true)
  }
  const PROJECT_DRILLDOWN = [
    { type: 'Project number' },
    { type: 'Project name' },
  ]

  const periodData = (response) => {
    return response.extensions.period
  }

  const onFilterChange = (e) => {
    console.log('all filter cleared', e)
  }
  const onProjectCellClick = (event) => {
    const result = config.SERIES_INFO_INVOICE_Bill.filter((item, key) => {
      return item.type === event.colDef.headerNameKey && event.value !== 0
    })
    if (result.length != 0) {
      block.setForceHide(true)
      setIsProject(false)
    } else {
      projectDrilldown(event, navigate)
    }
    setSelectedProject(event)
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
    onFilterChange,
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
      type: 'tabs',
      onTabChange,
      tabs: [
        {
          label: 'Graph',
          id: 'graph',
          exportAs: 'png',
          child: Graph,
          dataPropName: 'filteredData',
          widgetRootDataProp: 'widgetRootData',
          childProps: {
            getTableHeight,
            block,
          },
        },

        {
          label: 'Summary',
          id: 'summary',
          exportAs: 'excel',
          child: Grid,
          processData: (data) => {
            const summarizedData = getSummaryData(
              data,
              COLUMN_NAMES,
              0,
              true,
              'project_func_currency_code',
            )
            const summaryData = getSummaryTableData(summarizedData, obj)
            return summaryData
          },
          dataPropName: 'rows',
          childProps: {
            id: 'summary',
            //To get the Total as Footer
            //Set showTotal true in childProps & pass totalOptions object containning the 'Total' text to display
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            currencyColumnName: 'project_func_currency_code',
            uiConfig: config.summaryUiConfig,
            style: { height: 252, width: 410 },
          },
        },
        {
          label: 'Table',
          id: 'table',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            const summarizedData = getSummaryData(
              data,
              COLUMN_NAMES,
              0,
              true,
              'project_func_currency_code',
            )
            return getTableData(summarizedData, obj)
          },
          mapHeaderFromResponse: (data) => {
            const periodDatas = periodData(data)
            return periodDatas
          },
          childProps: {
            id: 'table',
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            currencyColumnName: 'project_func_currency_code',
            uiConfig: config.tableUiConfig,
            style: { height: 252 },
          },
        },
        {
          label: isProject ? 'Projects' : 'Project-Invoice',
          id: 'projects',
          exportAs: 'excel',
          child: isProject ? Grid : InvoiceGrid,
          primary: true,
          isUseCurrency: isProject ? useCurrency : '',
          dataPropName: 'rows',
          tabExtraProps: {
            breadcrumbs: isProject
              ? projectBreadCumbs
              : projectBreadCumbsWithSubmenu,
            onBreadcrumbClick,
          },
          childProps: {
            id: isProject ? 'projects' : 'Invoice-Grid',
            showTotal: true,
            currencyColumnName: 'project_func_currency_code',
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: isProject
              ? {
                  ...projectUiConfigUpdated,
                  suppressColumnMoveAnimation: true,
                  debounceVerticalScrollbar: true,
                  onCellClicked: onProjectCellClick,
                }
              : null,
            invoiceProps: !isProject
              ? {
                  selectedProject: selectedProject,
                  block: block,
                }
              : null,
          },
        },
      ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default AgedARWidget
