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
import config from './config'
import { getTableHeight } from '../../helpers/utils'
import InvoiceGrid from './InvoiceGrid'
import Graph from './graph'
import { projectDrilldown } from '../../TransposeData'
import { useTranslation } from 'react-i18next'

import {
  getSummaryData,
  getSummaryTableData,
  getTableData,
} from '../../TransposeData'
import { useNavigate } from 'react-router-dom'

const {
  BILLED_SERIES_INFO,
  UNBILLED_SERIES_INFO,
  COLUMN_NAMES_AR_SUMMARY,
  COLUMN_NAMES_UNBILLED_SUMMARY,
  COLUMN_NAMES,
  SERIES_INFO,
  SERIES_INFO_FOR_SUMMARY,
  SERIES_INFO_AR_SUMMARY,
  SERIES_INFO_UNBILLED_SUMMARY,
} = config.summaryMappings

const projectBreadCumbs = [{ label: 'Projects', active: true }]
const projectBreadCumbsWithSubmenu = [
  { label: 'Projects', active: true },
  { label: 'Invoice', active: false },
]

function NetReceivableWidget({ block }) {
  const [isProject, setIsProject] = useState(true)
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState('')
  const projectUiConfigUpdated = config.projectUiConfig
  const { t } = useTranslation(['label', 'message'])

  let obj = JSON.parse(JSON.stringify(BILLED_SERIES_INFO))
  let unobj = JSON.parse(JSON.stringify(UNBILLED_SERIES_INFO))

  for (let key in obj) {
    obj[key]['group'] = t(obj[key]['group'])
    obj[key]['label'] = t(obj[key]['label'])
  }
  for (let key in unobj) {
    unobj[key]['group'] = t(unobj[key]['group'])
    unobj[key]['label'] = t(unobj[key]['label'])
  }

  const useCurrency = () => {
    return block.isFullScreen &&
      currencyFactory.currencyRates &&
      currencyFactory.currencyRates.length > 1
      ? true
      : false
  }

  function mergeArrayObjects(arr1, arr2) {
    let merge = []
    let matchFound = false
    for (let i = 0; i < arr1.length; i++) {
      matchFound = false
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i]['aging'] === arr2[j]['aging']) {
          merge.push({ ...arr1[i], ...arr2[j] })
          matchFound = true
          break
        }
      }
      if (matchFound == false) {
        merge.push({ ...arr1[i] })
      }
    }
    return merge
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
    const result = config.SERIES_INFO_INVOICE_BIll.filter((item, key) => {
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

  const periodData = (response) => {
    return response.extensions.period
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
            const summarizedArData = getSummaryData(
              data,
              COLUMN_NAMES_AR_SUMMARY,
              0,
              true,
              'project_func_currency_code',
              true,
            )
            const summarizedArDataforTable = getSummaryTableData(
              summarizedArData,
              SERIES_INFO_AR_SUMMARY,
              ['Accounts receivable'],
              true,
            )

            const summarizedUnbilledData = getSummaryData(
              data,
              COLUMN_NAMES_UNBILLED_SUMMARY,
              0,
              true,
              'project_func_currency_code',
              true,
            )
            const summarizedUnbilledDataforTable = getSummaryTableData(
              summarizedUnbilledData,
              SERIES_INFO_UNBILLED_SUMMARY,
              ['Net unbilled'],
              true,
            )

            const summarizedNRData = getSummaryData(
              data,
              COLUMN_NAMES,
              0,
              true,
              'project_func_currency_code',
              true,
            )
            const summarizedNRDataforTable = getSummaryTableData(
              summarizedNRData,
              SERIES_INFO_FOR_SUMMARY,
              [],
              true,
            )

            function SumForNR(arr, keys) {
              return arr.reduce((ac, a) => {
                let ind = ac.findIndex((x) => keys.every((k) => x[k] === a[k]))
                ind === -1
                  ? ac.push(a)
                  : (ac[ind]['Net receivables'] += a['Net receivables'])
                return ac
              }, [])
            }

            const balanceforNRforTable = SumForNR(summarizedNRDataforTable, [
              'aging',
              '',
            ])

            // let summarizedData = summarizedArDataforTable.map((item, i) =>
            //   Object.assign({}, item, summarizedUnbilledDataforTable[i])
            // );

            // summarizedData = summarizedData.map((item, i) =>
            //   Object.assign({}, item, balanceforNRforTable[i])
            // );
            // summarizedData[5]['Accounts receivable'] = 0  //this is temp have to find a clean way
            // summarizedData.splice(5, 0, summarizedArDataforTable[5]);

            let summarizedData = mergeArrayObjects(
              balanceforNRforTable,
              summarizedArDataforTable,
            )
            summarizedData = mergeArrayObjects(
              summarizedData,
              summarizedUnbilledDataforTable,
            )
            for (let langData in summarizedData) {
              summarizedData[langData].aging = t(summarizedData[langData].aging)
            }
            return summarizedData
          },
          dataPropName: 'rows',
          childProps: {
            id: 'summary',
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: config.summaryUiConfig,
            style: { height: 250, maxWidth: 900 },
          },
        },
        {
          label: 'Table',
          id: 'table',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            const billedSummarizedData = getSummaryData(
              data,
              COLUMN_NAMES_AR_SUMMARY,
              0,
              true,
              'project_func_currency_code',
              true,
            )

            let summarizedDataforTable = []
            if (
              (billedSummarizedData &&
                Object.keys(billedSummarizedData).length === 0 &&
                Object.getPrototypeOf(billedSummarizedData) ===
                  Object.prototype) == false
            ) {
              summarizedDataforTable = [
                { hierarchy: [t('Net receivables')] },
                { hierarchy: [t('Net receivables'), t('Accounts receivable')] },
              ]
              const billedDataforTable = getTableData(billedSummarizedData, obj)
              for (var key in billedDataforTable) {
                summarizedDataforTable.push(billedDataforTable[key])
              }
            }
            const unBilledSummarizedData = getSummaryData(
              data,
              COLUMN_NAMES_UNBILLED_SUMMARY,
              0,
              true,
              'project_func_currency_code',
              true,
            )

            if (
              (unBilledSummarizedData &&
                Object.keys(unBilledSummarizedData).length === 0 &&
                Object.getPrototypeOf(unBilledSummarizedData) ===
                  Object.prototype) == false
            ) {
              summarizedDataforTable.push({
                hierarchy: [t('Net receivables'), t('Net unbilled')],
              })
              let unBilledDataforTable = getTableData(
                unBilledSummarizedData,
                unobj,
              )

              for (var key in unBilledDataforTable) {
                summarizedDataforTable.push(unBilledDataforTable[key])
              }
            }
            let gridData = []
            if (
              (Array.isArray(summarizedDataforTable) &&
                !summarizedDataforTable.length) == false
            ) {
              gridData = summarizedDataforTable
            }
            return gridData
          },
          mapHeaderFromResponse: (data) => {
            const periodDatas = periodData(data)
            return periodDatas
          },
          childProps: {
            id: 'table',
            uiConfig: config.tableUiConfig,
            style: { height: block.isFullScreen ? getTableHeight() : 250 },
          },
        },
        {
          label: 'Projects',
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
                }
              : null,
          },
        },
      ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default NetReceivableWidget
