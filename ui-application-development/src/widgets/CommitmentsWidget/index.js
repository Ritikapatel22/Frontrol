import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Widget, Grid, currencyFactory } from '@frontrolinc/pace-ui-framework'
import Graph from './graph'
import Charts from './charts'
import config from './config'
import { useFetchDataQuery } from '../../app/appApi'
import { commitmentsColumnTransform } from './utilityFunctions'
import { projectDrilldown } from '../../TransposeData'
import { getProjectId } from '../Shared/projectSnapshot'
import { coupaBaseUrl } from '../../config';

function CommitmentWidget({ block }) {
  const navigate = useNavigate()
  const projectID = getProjectId(window.location.href)
  const selectedPortfolio = useSelector((state)=>state.portfolio?.selectedPortfolio?.portfolio_id)
  const { t } = useTranslation(['label', 'message']);

  const [columnsConfig, setColumnConfig] = useState(config.purchaseOrderUiConfig)

  const useCurrency = () => {
    return block.isFullScreen &&
      currencyFactory.currencyRates &&
      currencyFactory.currencyRates.length > 1
      ? true
      : false;
  };

  useEffect(() => {
    if (projectID) {
      let newPurchaseOrderUiConfig = config.purchaseOrderUiConfig.columnDefs.filter(
        function (item) {
          return (
            item.field !== 'project_number' && item.field !== 'project_name'
          )
        },
      )
      setColumnConfig({
        ...columnsConfig,
        columnDefs: newPurchaseOrderUiConfig,
      })
    }
  }, [projectID])

  const drillDown = (event, navigate) => {
    if(event.colDef.field === 'project_number' || event.colDef.field === 'project_name') {
      projectDrilldown(event, navigate)
    } else if(event.colDef.field === 'cmt_number' && event.data.cmt_number) {
      window.open(`${coupaBaseUrl}/order_headers/${event.data.cmt_number}`, '_blank')
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
    filterName: 'Purchase Order',
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: projectID
        ? {
            queryName: 'SupplierInvoice.getProjectCommitments',
            projectID: parseInt(projectID),
          }
        : {
            queryName: 'SupplierInvoice.getPortfolioCommitments',
            portfolioID:selectedPortfolio,
          },
      queryOptions: {
        selectFromResult(response) {
          if (projectID) {
            return {
              ...response,
              data: response.data
                ? response.data?.Data['SupplierInvoice.getProjectCommitments']
                : undefined,
            }
          }
          return {
            ...response,
            data: response.data
              ? response.data?.Data['SupplierInvoice.getPortfolioCommitments']
              : undefined,
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
          exportAs : "png",
          child: Graph,
          dataPropName: 'filteredData',
          childProps:{
            block
          }
        },
        {
          label: 'By supplier',
          id: 'Charts',
          exportAs : "png",
          child: Charts,
          childProps : {
            block
          },
          dataPropName: 'filteredData',
        },
        {
          label: 'Table',
          id: 'table',
          exportAs : "excel",
          child: Grid,
          dataPropName: 'rows',
          processData: (data) => {
            const summarizedDataforTable = commitmentsColumnTransform(data, 'table', true, 'projfunc_currency_code')
            return summarizedDataforTable
          },
          childProps: {
            id: 'table',
            showTotal: true,
            totalOptions: {
              displayName: t('total'),
            },
            currencyColumnName: projectID ? '' : 'projfunc_currency_code',
            uiConfig: config.tableUiConfig,
          },
        },
        {
          label: 'Purchase order',
          id: 'purchaseOrder',
          exportAs : "excel",
          child: Grid,
          primary: true,
          isUseCurrency: useCurrency,
          dataPropName: 'rows',
          childProps: {
            id: 'purchaseOrder',
            currencyColumnName: "projfunc_currency_code",
            uiConfig: {
              ...columnsConfig,
              onCellClicked: (event) => drillDown(event, navigate),
            },
          },
        },
      ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default CommitmentWidget
