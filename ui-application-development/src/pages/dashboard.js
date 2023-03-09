import React, { useMemo, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import add from '../assets/Images/add.svg'
import { switchCurrency } from '../slices/authslice'
import { toggleFullScreen } from '../slices/viewslice'
import { changeCurrencyInfo } from '../slices/sharedslice'
import { chunkArray } from '../helpers/utils'
import Inner from '../components/layout/inner'
import { DashboardHeader, Currency, Reload } from '../components/dashboard'
import Project from './project'
import WidgetDragAndDrop from '../components/WidgetDragAndDrop/WidgetDragAndDrop'
import { DashBoardHeader } from './dashboardHeader'
import { widgets } from '../components/widget_container/render/widgetMapping'
import { widgetslices } from '../slices/widgetslice'
import { useFetchDataQuery, useMultipleFetchDataQuery } from '../app/appApi'
import { useTranslation } from 'react-i18next'

import {
  getQueryStringValue,
  withErrorHandler,
  useQueryString,
  resetRtkCache,
  usePersonalization,
  currencyFactory,
  showConfirmation,
  showAlert,
  showToast,
  Skeleton,
} from '@frontrolinc/pace-ui-framework'
import {
  changedPortfolio,
  selectedPortFolio,
  setPortfolios,
  setNewCreatedPortfolio,
} from '../slices/portfolioslice'
import { useNavigate } from 'react-router-dom'
import ProceedButton from '../components/Common/button/proceedButton'
import { Query } from '../http-common/query.constants'
import Footer from '../components/layout/footer'
import { useTitle } from '../hooks/useTitle'

const Dashboard = React.memo(() => {
  const navigate = useNavigate()
  const portfolioURLId = useQueryString('portfolio')

  const selectedPortfolio = useSelector(
    (state) => state.portfolio?.selectedPortfolio,
  )
  const selectedView = useSelector((state) => state.view?.selectedView)
  const routeName = useSelector((state) => state.portfolio?.route)
  const header = document.getElementById('sub-header')
  const stickyHeader = header?.offsetTop
  const dashboardHeaderRef = React.createRef()
  const { t } = useTranslation(['label', 'message'])

  useTitle(t('Portfolio dashboard', {ns: 'label'}))

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [addNewView, setAddNewview] = useState(false)
  const [isCollepse, setIsCollepse] = useState(true)
  const [isExpand, setIsExpand] = useState(false)
  const [project, setProject] = useState(false)
  const [flow, setflow] = useState('Portfolio')
  const [reloadTime, setReloadTime] = useState()
  const [viewopen, setViewOpen] = useState(false)
  const [current, setCurrent] = useState(false)
  const [select, setSelect] = useState(selectedPortfolio)
  const [reRender, serReRender] = useState(false)
  // const [portfolioData, setPortfolioData] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const { setCategory } = usePersonalization()

  let {
    isLoading: isPortfolioListLoading,
    data: portfolioData,
    isFetching: isPortfolioFetching,
  } = useFetchDataQuery({
    queryName: Query.GetPortfolioHeader,
    __config__: {
      providesTags: () => [Query.GetPortfolioHeader],
    },
  })

  useEffect(() => {
    setCategory('portfolio_dashboard')
    document.title = t('Portfolio dashboard', {ns: 'label'})
  }, [])

  useEffect(() => {
    setSelect(selectedPortfolio)
  }, [selectedPortfolio])

  useEffect(() => {
    setPortfolios(portfolioData?.Data[Query.GetPortfolioHeader])
  }, [portfolioData])

  let { isLoading, isFetching, currentData } = useFetchDataQuery(
    selectedPortfolio?.portfolio_id
      ? {
          queryName: Query.GetPortfolioCurrencyInfo,
          portfolio_id: selectedPortfolio?.portfolio_id,
          __config__: {
            transformResponse: (response) => {
              response.Data[
                Query.GetPortfolioCurrencyInfo
              ][0].refreshTime = new Date()
            },
            providesTags: () => [
              `portfolio_dashboard_${selectedPortfolio?.portfolio_id}`,
            ],
          },
        }
      : {},
    {
      skip: !selectedPortfolio?.portfolio_id,
    },
  )

  useEffect(() => {
    if (
      currentData?.Data?.[Query.GetPortfolioCurrencyInfo]?.length &&
      Array.isArray(currentData?.Data[Query.GetPortfolioCurrencyInfo])
    ) {
      const rate = JSON.parse(JSON.stringify(currentData?.Data))
      const [multipleRate] = rate[Query.GetPortfolioCurrencyInfo]

      let multiple_rates = []
      if (Object.keys(multipleRate).includes('multiple_rates')) {
        multiple_rates = multipleRate.multiple_rates
      } else {
        multiple_rates.push({
          currency: multipleRate.project_currency,
          rate: multipleRate.conversion_rate,
        })
      }
      currencyFactory.setCurrencyConfigRate(multiple_rates)
      dispatch(changeCurrencyInfo(currentData?.Data))
    }
  }, [currentData])

  useEffect(() => {
    const portfolioID = getQueryStringValue('portfolio')
    if (
      portfolioData?.Data?.[Query.GetPortfolioHeader] &&
      Array.isArray(portfolioData.Data[Query.GetPortfolioHeader])
    ) {
      dispatch(changedPortfolio(portfolioData?.Data[Query.GetPortfolioHeader]))
      const availablePortfolios = portfolioData?.Data[
        Query.GetPortfolioHeader
      ].filter((e) => e.published === 'Y')
      let existingPortfolio = null
      if (portfolioID) {
        existingPortfolio = availablePortfolios.find(
          (ele) => ele.portfolio_id == portfolioID,
        )
      }
      if (existingPortfolio) {
        dispatch(selectedPortFolio(existingPortfolio))
        setSelect(existingPortfolio)
      } else {
        const defaultData = availablePortfolios.find(
          (ele) => ele.default_portfolio === 'Y',
        )
        const selectedPortfolio = defaultData
          ? JSON.parse(JSON.stringify({ ...defaultData }))
          : availablePortfolios[0]
        dispatch(selectedPortFolio(selectedPortfolio))
        setSelect(selectedPortfolio)
      }
    }
  }, [portfolioData])

  const currencyInfo = {
    currency: '', //Multiple
    currencyRate: '',
    multipleCurrency: '',
  }

  let projects, refreshDate, multiCurrencyString
  if (
    currentData?.Data?.[Query.GetPortfolioCurrencyInfo] &&
    Array.isArray(currentData?.Data[Query.GetPortfolioCurrencyInfo])
  ) {
    try {
      const [currentPorfolioCurrencyInfo] = currentData?.Data[
        Query.GetPortfolioCurrencyInfo
      ]

      refreshDate = new Intl.DateTimeFormat('us-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(currentPorfolioCurrencyInfo.refreshTime)

      projects = parseInt(currentPorfolioCurrencyInfo.project_count)
      currencyInfo.currency = currentPorfolioCurrencyInfo.project_currency
      currencyInfo.currencyRate = currentPorfolioCurrencyInfo.conversion_rate
      // currencyInfo.currencyRate = '1.5';

      for (
        let i = 0;
        i < currentPorfolioCurrencyInfo.multiple_rates.length;
        i++
      ) {
        const multipleRate = currentPorfolioCurrencyInfo.multiple_rates[i]
        const currencyRate = `1 ${multipleRate.currency} = ${multipleRate.rate} USD`
        //   currencyInfo.multipleCurrency =
        //     currencyInfo.multipleCurrency & "1 USD =" & currentData.Data[Query.GetPortfolioCurrencyInfo][0].multiple_rates.rate &
        //     currentData.Data[Query.GetPortfolioCurrencyInfo][0].currency;
        multiCurrencyString = multiCurrencyString
          ? `${multiCurrencyString}, ${currencyRate}`
          : currencyRate
      }

      currencyInfo.multipleCurrency = multiCurrencyString
    } catch (e) {}
  }
  //TODO: To be changed later
  const views = useSelector((state) => state?.view?.views)

  const data =
    views &&
    views
      .filter((v) => v.view_type === 'Portfolio Dashboard')
      .find((views) => {
        return selectedView?.view_id === views.view_id ? views : ''
      })
  const selectedViewData = data ? data.json_data?.widgets : ''
  const reloadData = () => {
    location.reload()
    // dispatch(resetRtkCache().util.resetApiState());
    setReloadTime(new Date().getTime())
    // refetch();
  }
  const addViewhandle = () => {
    setAddNewview(!addNewView)
  }
  const widgetsChunks = useMemo(() => {
    if (!selectedPortfolio?.portfolio_id || !portfolioURLId) {
      return []
    }
    if (selectedViewData?.length > 0) {
      const chunkWithComponents = JSON.parse(
        JSON.stringify(chunkArray(selectedViewData)),
      )
      chunkWithComponents.forEach((chunk) => {
        chunk.forEach((packet) => {
          packet.componentKey = packet.component
          if (
            typeof packet.component === 'string' &&
            widgets[packet.component]
          ) {
            const widget = widgetslices.find(
              (ele) => ele.component === packet.component,
            )
            if (widget) {
              Object.keys(widget).forEach((key) => {
                if (!packet[key]) {
                  packet[key] === widget[key]
                }
              })
            }
            packet.component = widgets[packet.component]
          } else {
            packet.component = ''
          }
        })
      })
      return [...chunkWithComponents]
    }
    return []
  }, [selectedViewData])

  const collepsExpandeHandler = () => {
    setIsCollepse(!isCollepse)
    setIsExpand(!isExpand)
  }

  const handleswitchCurrency = (currency) => {
    dispatch(switchCurrency(currency))
  }

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > stickyHeader) {
        // header.classList.add("pb-1");
        header.classList.add('shadow-md')
        // header.classList.add('sticky')
      } else {
        // header.classList.remove('sticky')
        header.classList.remove('shadow-md')
        // header.classList.remove("pb-1");
      }
    }
    // clean up code
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [stickyHeader, header])

  useEffect(() => {
    serReRender(true)
    setTimeout(() => {
      serReRender(false)
    }, 0)
  }, [selectedPortfolio])

  const openConfirm = () => {
    showConfirmation({
      msg: t('proceed', { ns: 'message' }),
      title: t('delete message'),
      onConfirm: () => {},
      onClose: () => {},
      confirmLabel: t('Submit'),
      cancelLabel: t('Cancel'),
    })
  }

  const openAlert = () => {
    showAlert({
      msg: 'This is a sample alert message',
      title: 'Sample alert',
      onClose: () => {},
    })
  }

  const openToast = () => {
    showToast('error', 'This is a sample toast')
  }

  const widgetHandler = () => {
    dashboardHeaderRef?.current?.handleAddWidget()
  }

  // if (!selectedPortfolio?.portfolio_id || !portfolioURLId) {
  //   return <></>
  // }
  const config = {
    type: '',
    layout: 'homePage',
    tabs: 3,
    isFullWidth: true,
  }

  return (
    <Inner
      isCollepse={isCollepse}
      collepsExpandeHandler={collepsExpandeHandler}
      isExpand={isExpand}
      project={project}
      setProject={setProject}
      flow={flow}
      setflow={setflow}
    >
      <div
        className={
          isCollepse
            ? `main_dashboard duration-500 ease-in-out transition-all bg-[#f7f9ff] pl-16`
            : 'new_dashboard duration-500 ease-in-out transition-all bg-[#f7f9ff] pb-[29px] lg:pl-60'
        }
      >
        {/* {!selectedPortfolio?.portfolio_id || !portfolioURLId ? (
          <Skeleton {...config} />
        ) : (
          <></> */}
        {(!selectedPortfolio?.portfolio_id || !portfolioURLId) && (
          <Skeleton {...config} />
        )}

        {selectedPortfolio?.portfolio_id && portfolioURLId && (
          <>
            <div className={`relative ml-0 md:pl-15 `}>
              <div
                id="sub-header"
                className="sticky top-0 bg-[#f7f9ff] mb-2 pb-1 z-[98]"
                style={{
                  height: !(isLoading || isFetching) ? 'auto' : '0px',
                  overflow: !(isLoading || isFetching) ? 'visible' : 'hidden',
                }}
              >
                <div className="flex block justify-between pt-5 items-center lg:flex-row flex-col">
                  <div className="flex flex-col self-start xl:flex-row">
                    <DashboardHeader
                      open={open}
                      setOpen={setOpen}
                      projects={projects}
                      routeName={routeName}
                    />
                    <span className="xl:hidden block pl-[27px]">
                      <Reload
                        refreshDate={refreshDate}
                        reloadData={reloadData}
                      />
                    </span>
                  </div>
                  <div className="lg:flex block items-center  ml-3 sm:ml-[25px] lg:mt-0 refresh-menu xl:self-center self-start">
                    <div className="flex items-center justify-between lg:flex-row sm:flex-col">
                      <span className="hidden xl:block">
                        <Reload
                          refreshDate={refreshDate}
                          reloadData={reloadData}
                        />
                      </span>

                      <DashBoardHeader
                        ref={dashboardHeaderRef}
                        selectedPortfolio={selectedPortfolio}
                        selectedView={selectedView}
                        isOpen={viewopen}
                        setIsOpen={setViewOpen}
                        widget={current}
                        setCurrent={setCurrent}
                        data={portfolioData}
                        select={select}
                        setSelect={setSelect}
                        isLoading={
                          isLoading ||
                          isPortfolioListLoading ||
                          isPortfolioFetching
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-2 lg:mt-0 pl-7">
                  {portfolioData && (
                    <Currency
                      info={currencyInfo}
                      changeSelectedCurrency={setSelectedCurrency}
                      selectedPortfolio={selectedPortfolio}
                      projects={projects}
                    />
                  )}
                </div>
              </div>
              {isLoading || isFetching || reRender ? (
                <Skeleton {...config} />
              ) : (
                <div
                  className={
                    'aged_trend flex-wrap lg:flex block mx-3 sm:mx-[25px] justify-between'
                  }
                >
                  <WidgetDragAndDrop
                    type="Portfolio"
                    key={selectedView?.view_id}
                    widgetsChunks={widgetsChunks}
                    project={project}
                    toggleFullScreen={(data) =>
                      dispatch(toggleFullScreen(data))
                    }
                  />
                  {project && <Project widgetsChunks={widgetsChunks} />}
                </div>
              )}
            </div>

            {/* {!(isLoading || isFetching || reRender) ? ( */}
            {!(isLoading || isFetching || reRender) && (
              <div className="flex justify-center py-7">
                <ProceedButton
                  type="secondaryButton"
                  label={t('Add widget')}
                  // handleClick={dashboardHeaderRef && dashboardHeaderRef?.current?.handleAddWidget}
                  handleClick={widgetHandler}
                  icon={add}
                />
              </div>
            )}
          </>
        )}
        <Footer />
      </div>
    </Inner>
  )
})

// export default Dashboard
export default withErrorHandler(Dashboard)
