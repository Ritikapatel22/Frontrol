import { useState } from 'react'
import {
  Widget,
  Grid,
  currencyFactory,
  getQueryStringValue,
  getAllQueryStringValue,
} from '@frontrolinc/pace-ui-framework'
import { useFetchDataQuery } from '../../app/appApi'
import { getQueryConfig } from '../Shared/portfolioSnapshot'
import { invoiceData, invoiceData2 } from '../../TransposeData'
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
import { useNavigate } from 'react-router-dom'
const { COLUMN_NAMES, SERIES_INFO } = config.summaryMappings
const projectBreadCumbs = [{ label: 'Projects', active: true }]
const projectBreadCumbsWithSubmenu = [
  { label: 'Projects', active: true },
  { label: 'Invoice', active: false },
]
import { projectDrilldown } from '../../TransposeData'

function BilledARWidget({ block }) {
  const [isProject, setIsProject] = useState(true)
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState('')
  const projectUiConfigUpdated = config.projectUiConfig
  const { t } = useTranslation(['label', 'message'])

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
    tabs: 3,
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
          childProps: {
            getTableHeight,
            block,
          },
        },
        {
          label: 'Table',
          id: 'table',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            // const summarizedDataforTable = invoiceData(data, "invoiceTable", true , 'project_func_currency_code');
            const summarizedData = getSummaryData(data, COLUMN_NAMES, 0, true)
            // console.log("this is the new data", summarizedData)
            // console.log("this is the new data", summarizedDataforTable)
            const summaryData = getSummaryTableData(summarizedData, SERIES_INFO)
            console.log('summaryData', summaryData)
            // return summarizedDataforTable;
            let langvalue = ''
            for (let property in summaryData) {
              const summaryvalue = { ...summaryData }
              console.log('summaryvalue', summaryvalue)
              langvalue = t(summaryData[property].aging)
              summaryData[property].aging = langvalue
              console.log('data', langvalue)
              // console.log(`${property}:`,summaryData[property]);
            }
            return summaryData
          },
          childProps: {
            id: 'table',
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: config.tableUiConfig,
            style: { height: 252, width: 415 },
          },
        },
        {
          label: 'Projects',
          id: 'projects',
          exportAs: 'excel',
          child: isProject ? Grid : InvoiceGrid,
          primary: true,
          isUseCurrency: isProject ? useCurrency : '',
          exportAs: 'excel',
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
            totalOptions: {
              displayName: t('total'),
            },
            currencyColumnName: 'project_func_currency_code',
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
                }
              : null,

            style: {
              height: block.isFullScreen ? getTableHeight() : 252,
            },
          },
        },
      ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default BilledARWidget
