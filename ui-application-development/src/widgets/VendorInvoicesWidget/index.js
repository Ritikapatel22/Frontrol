import { Widget, Grid } from '@frontrolinc/pace-ui-framework'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFetchDataQuery } from '../../app/appApi'
import { getProjectId } from '../Shared/projectSnapshot'
import Graph from './graph'
import Charts from './charts'
import config from './config'
import { abcBaseUrl, coupaBaseUrl } from '../../config'

const { tableUiConfig } = config
const purchaseInvoiceUiConfig = { ...config.purchaseInvoiceUiConfig }

function VendorInvoicesWidget({ block }) {
  const { t } = useTranslation(['label', 'message'])
  const navigate = useNavigate()

  const selectedPortfolio = useSelector(
    (state) => state.portfolio?.selectedPortfolio?.portfolio_id,
  )
  const user_name = useSelector(
    (state) => state?.loginAuth?.userProfile?.user_name,
  )
  const projectID = getProjectId(window.location.href)

  const hasProjectNumber =
    purchaseInvoiceUiConfig.columnDefs.findIndex(
      (col) => col.field === 'project_number',
    ) >= 0
  if (projectID && hasProjectNumber) {
    purchaseInvoiceUiConfig.columnDefs = purchaseInvoiceUiConfig.columnDefs.filter(
      (el) => el.field !== 'project_number' && el.field !== 'project_name',
    )
  } else if (!projectID && !hasProjectNumber) {
    purchaseInvoiceUiConfig.columnDefs =
      config.purchaseInvoiceUiConfig.columnDefs
  }

  const drillDown = (event) => {
    if (event.colDef.field === 'po_number' && event.data?.po_number) {
      window.open(
        `${coupaBaseUrl}/order_headers/${event.data.po_number}`,
        '_blank',
      )
    } else if (
      event.colDef.field === 'invoice_number' &&
      event.data?.invoice_id &&
      user_name
    ) {
      window.open(
        `${abcBaseUrl}/aecom/jsp/get_tiff.jsp?uuid=${user_name}&inv_id=${event.data.invoice_id}`,
        '_blank',
      )
    } else if (
      event.colDef.field === 'project_number' ||
      event.colDef.field === 'project_name'
    ) {
      navigate(`/project/${event.data.project_id}`)
    }
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
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: projectID
        ? {
            queryName: 'SupplierInvoice.getProjectSupplierInvoiceConsolidated',
            projectID: parseInt(projectID),
          }
        : {
            queryName:
              'SupplierInvoice.getPortfolioSupplierInvoiceConsolidated',
            portfolioID: selectedPortfolio,
          },
      queryOptions: {
        selectFromResult(response) {
          if (
            projectID &&
            response.data?.Data?.[
              'SupplierInvoice.getProjectSupplierInvoiceConsolidated'
            ]
          ) {
            return {
              ...response,
              data:
                response.data?.Data?.[
                  'SupplierInvoice.getProjectSupplierInvoiceConsolidated'
                ],
            }
          } else if (
            selectedPortfolio &&
            response.data?.Data?.[
              'SupplierInvoice.getPortfolioSupplierInvoiceConsolidated'
            ]
          ) {
            return {
              ...response,
              data:
                response.data?.Data?.[
                  'SupplierInvoice.getPortfolioSupplierInvoiceConsolidated'
                ],
            }
          }
          return {
            ...response,
            data: undefined,
          }
        },
      },
    },
    content: {
      type: 'tabs',
      tabs: [
        {
          label: 'Graph',
          id: 'graph',
          exportAs: 'png',
          child: Graph,
          dataPropName: 'data',
          childProps: {
            block,
          },
        },
        {
          label: 'By supplier',
          id: 'Charts',
          child: Charts,
          exportAs: 'png',
          dataPropName: 'data',
          childProps: {
            block,
          },
        },
        {
          label: 'Table',
          id: 'table',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          childProps: {
            id: 'table',
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            uiConfig: tableUiConfig,
          },
        },
        {
          label: 'Invoices',
          id: 'supplierInvoice',
          exportAs: 'excel',
          child: Grid,
          dataPropName: 'rows',
          childProps: {
            id: 'Invoice',
            uiConfig: {
              ...purchaseInvoiceUiConfig,
              onCellClicked: (event) => drillDown(event),
            },
            reduxConfig: {
              query: useFetchDataQuery,
              params: projectID
                ? {
                    queryName: 'SupplierInvoice.getProjectInvoices',
                    projectID: parseInt(projectID),
                  }
                : {
                    queryName: 'SupplierInvoice.getPortfolioInvoices',
                    portfolioID: selectedPortfolio,
                  },
              resultSelector(response) {
                if (
                  projectID &&
                  response?.data?.Data?.['SupplierInvoice.getProjectInvoices']
                ) {
                  return {
                    ...response,
                    data:
                      response.data?.Data?.[
                        'SupplierInvoice.getProjectInvoices'
                      ],
                  }
                } else if (
                  selectedPortfolio &&
                  response?.data?.Data?.['SupplierInvoice.getPortfolioInvoices']
                ) {
                  return {
                    ...response,
                    data:
                      response.data?.Data?.[
                        'SupplierInvoice.getPortfolioInvoices'
                      ],
                  }
                }
                return {
                  ...response,
                  data: undefined,
                }
              },
            },
          },
        },
      ],
    },
  }

  return <Widget config={uiConfig}></Widget>
}

export default VendorInvoicesWidget
