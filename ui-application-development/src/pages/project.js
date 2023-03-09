import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chunkArray } from '../helpers/utils'
import Inner from '../components/layout/inner'
import View from '../components/projects/header/breadceumb/view'
import Views from '../components/Common/views'
import Index from '../components/projects/breadcrumb/index'
import add from '../assets/Images/add.svg'
import { Drawer } from '../components/Common'
import WidgetDragAndDrop from '../components/WidgetDragAndDrop/WidgetDragAndDrop'
import ReportPage from '../components/projects/report/index'
import { useTranslation } from 'react-i18next'
import {
  toggleFullScreen,
  selectedView as selectedViewChange,
} from '../slices/viewslice'
import { widgets } from '../components/widget_container/render/widgetMapping'
import { widgetslices } from '../slices/widgetslice'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useFetchDataQuery, useUpdateDataMutation } from '../app/appApi'

import { setReport, setSelectedfilters } from '../slices/reportslice'
import { getQueryConfig, getProjectId } from '../widgets/Shared/projectSnapshot'
import Reports from '../components/projects/header/breadceumb/reports'
import {
  getQueryStringValue,
  setQueryStringValue,
  useQueryString,
  getAllQueryStringValue,
  Skeleton,
  withErrorHandler,
  BackendError,
  Tabs,
  TabPanel,
  Tab,
  TabList,
  usePersonalization,
  currencyFactory,
  userSettingsFactory,
} from '@frontrolinc/pace-ui-framework'
import arrow from '../assets/Images/arrow.svg'
import { FilterProvider } from '../components/Reportpage/filterContext'
import Footer from '../components/layout/footer'
import ProceedButton from '../components/Common/button/proceedButton'
import ReportSelection from '../components/Common/report'
import { useTitle } from '../hooks/useTitle'

const TABS = ['dashboard', 'report']

const Project = () => {
  const navigate = useNavigate()
  const projectId = getProjectId(window.location.href)


  const { t } = useTranslation(['label', 'message'])

  const [title, setTitle] = useTitle(t('Project', {ns: 'label'}))

  const reportId = getQueryStringValue('report')
  const [isFullScreen, setIsFullScreen] = useState(false)
  // console.log("userSettingsFactory", userSettingsFactory.lang)

  const [isCollepse, setIsCollepse] = useState(true)
  const [open, setOpen] = useState(false)
  const [isExpand, setIsExpand] = useState(false)
  const [project, setProject] = useState(false)
  const [addNewView, setAddNewview] = useState(false)
  const [current, setCurrent] = useState(false)
  const [viewopen, setViewOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [flow, setflow] = useState([])
  const header = document.getElementById('projects-tab')
  const stickyHeader = header?.offsetTop
  const [tabValue, setTabValue] = useQueryString('tab')
  const [urlIndex, setUrlIndex] = useState()
  const [projectNumber, setProjectNumber] = useState()
  const [newview, setNewview] = useState(false)
  const [select, setSelect] = useState(tabValue === 'report' ? '2' : '1')

  const qParams = getAllQueryStringValue()
  const blockData = useRef({})

  const routeName = useSelector((state) => state?.portfolio?.route)
  const report = useSelector((state) => state.reports?.reports)
  const refreshDate = useSelector((state) => state.portfolio?.refreshTime)
  const selectedView = useSelector((state) => state?.view?.selectedView)
  const selectedReport = useSelector((state) => state.reports?.selectedReport)
  const sFilters = useSelector((state) => state.reports?.selectedFilters)

  const [shouldCallExport, setShouldCallExport] = useState(false)

  const exportHandler = () => {
    setShouldCallExport(true)
  }

  const { setCategory } = usePersonalization()

  useEffect(() => {
    if (tabValue !== 'dashboard' && selectedReport && selectedReport.category) {
      setCategory(selectedReport?.category)
    } else {
      if (tabValue) setCategory(`porject_${tabValue}`)
    }
  }, [tabValue, selectedReport])
  // const defaulview = useSelector((state) => state?.view?.selectedView);
  // const currencyInfo = useSelector((state) => state?.loginAuth?.currencyInfo);

  const reportData = useFetchDataQuery(getQueryConfig())

  useEffect(() => {
    if (
      reportData &&
      reportData.data &&
      reportData.data.data &&
      reportData.data.data.project &&
      Array.isArray(reportData.data.data.project) &&
      reportData.data.data.project.length
    ) {
      currencyFactory.setConvertTo(
        reportData.data.data.project[0]['project_func_currency_code'],
      )
    }
  }, [reportData])

  const views = useSelector((state) => state?.view?.views)
  useEffect(() => {
    select === '1' ? setTabValue('dashboard') : setTabValue('report')
  }, [select])

  useEffect(() => {
    !tabValue && dispatch(setReport(null))
    if(reportId && tabValue == "report" ) {
      setIsFullScreen(true)
    } else {
      setIsFullScreen(false)
      dispatch(setSelectedfilters({ report: null }))
    }
  }, [tabValue, reportId])

  useEffect(() => {
    return () => {
      dispatch(setReport(null))
      dispatch(setSelectedfilters({ report: null }))
    }
  }, [])
  const data =
    views &&
    views
      .filter((v) => v.view_type === 'Project Dashboard')
      .find((views) => {
        return selectedView?.view_id === views.view_id ? views : ''
      })
  const selectedViewData = data ? data.json_data?.widgets : ''

  // if (reportData.isError && reportData.error) {
  //   throw new BackendError(reportData.error)
  // }
  if (reportData?.data?.Status === 'ERROR' || reportData.isError) {
    throw new BackendError(reportData?.data?.Message)
  }
  const [update] = useUpdateDataMutation()

  const { id } = useParams()
  const idParamRef = useRef()
  const [boolean, setBoolean] = useState(false)

  const dateObj = new Date()
  const month = dateObj.getUTCMonth() + 1 //months from 1-12
  const day = dateObj.getUTCDate()
  const year = dateObj.getUTCFullYear()
  const newdate = year + '-' + month + '-' + day

  const dispatch = useDispatch()

  const height = `top-[${
    document.getElementById('sub-header')?.offsetHeight
  }px]`

  const apiData = [
    {
      FntlRecents: {
        object_type: 'Project',
        object_id1: id,
        object_id2: '',
        object_id3: '',
        CRUD: 'C',
        view_date: newdate,
      },
    },
  ]

  // useEffect(() => {
  //   if (select === "Reports") {
  //     const defaultReport = report.find((val) => { return val.default === "Y" })
  //     dispatch(setReport(defaultReport));
  //   }
  // }, [select])

  useEffect(() => {
    if (projectNumber)
      tabValue === 'dashboard'
        ? setTitle(`Project ${projectNumber}: Dashboard`)
        : setTitle(
            `Project ${projectNumber}: ${
              selectedReport?.report_name || 'Report'
            }`,
          )
  }, [tabValue, projectNumber, selectedReport])

  useEffect(() => {
    if (idParamRef.current !== id) {
      idParamRef.current = id
      update({
        name: { documentName: 'FntlRecents' },
        body: apiData,
      })
    }
  }, [id])

  useEffect(() => {
    const tabIndex = Number(select)
    if (urlIndex > 0) {
      if (urlIndex === tabIndex) {
        if (urlIndex === 2) {
          for (const key in qParams) {
            key !== 'tab' &&
              dispatch(
                setSelectedfilters({
                  report: { ...sFilters?.report, [key]: qParams[key] },
                }),
              )
          }
        } else {
          dispatch(setSelectedfilters({ report: null }))
        }
      } else {
        for (const key in qParams) {
          key !== 'tab' && setQueryStringValue(key, undefined)
        }
      }
    }
  }, [urlIndex, select])

  useEffect(() => {
    const qParamsArray = Object.keys(qParams)
    if (select === '1' && urlIndex !== undefined) {
      setQueryStringValue('view', selectedView?.view_id)
    } else if (select === '2') {
      for (let key in sFilters?.report) {
        setQueryStringValue(key, sFilters.report[key], 'urlReplace')
      }
    }
  }, [sFilters, tabValue, selectedView, select])

  // useEffect(() => {
  //   const selectedView = views.find((e) => e.default_flag === "Y")
  //   dispatch(selectedViewChange(selectedView))
  // },[views])

  const widgetsChunks = useMemo(() => {
    if (!id || !projectId) {
      return []
    }
    if (selectedViewData && selectedViewData?.length > 0) {
      const chunks = chunkArray(selectedViewData)
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
      return chunkWithComponents
    }
    return []
  }, [selectedViewData])

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > stickyHeader) {
        header?.classList.add('pb-4')
        header?.classList.add('shadow-md')
      } else {
        header?.classList.remove('shadow-md')
        header?.classList.remove('pb-4')
      }
    }
    // clean up code
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [stickyHeader, header])
  const addViewhandle = () => {
    setAddNewview(!addNewView)
  }

  const collepsExpandeHandler = () => {
    setIsCollepse(!isCollepse)
    setIsExpand(!isExpand)
  }

  const reloadData = () => {
    reportData.refetch()
  }
  if (!projectId) {
    return <></>
  }

  const config = {
    type: '',
    layout: 'projectHomePage',
    tabs: 2,
    isFullWidth: true,
  }

  const getfullscreenCss = () => {
    if (select === '2') {
      return 'fullscreen-report'
    }
    return 'fullscreen'
  }
  return (
    <>
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
          {reportData.isLoading || reportData.isFetching ? (
            <Skeleton {...config} />
          ) : (
            <div
              className={`bg-[#f7f9ff] ${
                isFullScreen ? getfullscreenCss() : ''
              }`}
            >
              <div>
                <div
                  className={`sticky top-0 bg-[#f7f9ff] z-[98] sticky-sub-header pl-[6px]  ${
                    !isFullScreen && 'pb-2'
                  }`}
                  id="sub-header"
                >
                  <div
                    className={`lg:flex block justify-between items-center ${
                      !isFullScreen && 'pt-5'
                    }`}
                  >
                    <div
                      className={`dashboard w-full items-center justify-between pl-3 sm:pl-[14px] flex  ${
                        isFullScreen && 'hidden'
                      }`}
                    >
                      <Index
                        routeName={routeName}
                        setProjectNumber={setProjectNumber}
                      />
                      {select === '1' && (
                        <View
                          viewopen={viewopen}
                          setViewOpen={setViewOpen}
                          handleViewBtnClick={() => setViewOpen(!viewopen)}
                          selectedView={selectedView}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <Tabs
                  defaultSelected={tabValue === 'report' ? '2' : '1'}
                  className="tab-context"
                >
                  <div
                    id="projects-tab"
                    className={`flex sticky-sub-header pl-[22px] ${height} ${
                      isFullScreen ? 'hidden-div' : 'sticky-tab-header'
                    }`}
                  >
                    <TabList
                      onTabChange={(tabIndex) => {
                        setSelect(tabIndex)
                        tabValue && tabValue !== undefined
                          ? setUrlIndex(TABS.indexOf(tabValue) + 1)
                          : setUrlIndex(TABS.indexOf('dashboard') + 1)
                      }}
                    >
                      <Tab id="1">{t('Dashboard')}</Tab>
                      <Tab id="2">{t('Reports')}</Tab>
                    </TabList>
                  </div>

                  <TabPanel id="1" panel="second" className="lg:ml-0 ml-[80px]">
                    <Drawer
                      isOpen={viewopen}
                      setIsOpen={setViewOpen}
                      newPopup={newview}
                    >
                      {select === '1' && (
                        <Views
                          viewopen={viewopen}
                          setViewOpen={setViewOpen}
                          addViewhandle={addViewhandle}
                          addNewView={addNewView}
                          setAddNewview={setAddNewview}
                          widget={current}
                          setCurrent={setCurrent}
                          newview={newview}
                          setNewview={setNewview}
                          viewType="Project Dashboard"
                        />
                      )}
                    </Drawer>
                    {/* </div> */}
                    <div className="flex-wrap lg:flex block mx-3 sm:ml-[20px] sm:mr-[25px] justify-between">
                      {select === '1' && (
                        <WidgetDragAndDrop
                          type="project"
                          projectNumber={projectNumber}
                          isOpen={open}
                          widgetsChunks={widgetsChunks}
                          project={project}
                          toggleFullScreen={(data) =>
                            dispatch(toggleFullScreen(data))
                          }
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex justify-center py-7">
                        <ProceedButton
                          type="secondaryButton"
                          label={t('Add widget')}
                          handleClick={() => {
                            setCurrent(data)
                            setAddNewview(true)
                          }}
                          icon={add}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel id="2">
                    <FilterProvider>
                      {reportId && (
                        <Reports
                          isFullScreen={isFullScreen}
                          setIsFullScreen={setIsFullScreen}
                          exportHandler={exportHandler}
                          reportOpen={reportOpen}
                          setReportOpen={setReportOpen}
                          handleViewBtnClick={() => setReportOpen(!reportOpen)}
                          selectedView={selectedView}
                          projectNumber={projectNumber}
                        />
                      )}
                      <ReportSelection />
                      <ReportPage
                        isFullScreen={isFullScreen}
                        shouldCallExport={shouldCallExport}
                        setShouldCallExport={setShouldCallExport}
                        projectNumber={projectNumber}
                      />
                    </FilterProvider>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          )}
          <Footer />
        </div>
      </Inner>
    </>
  )
}

export default withErrorHandler(Project)


export const reportPageExportDetails = (() => {
  let exportAs = ''
  return {
    get exportAs() {
      return exportAs
    },
    setExportValue(params) {
      exportAs = params
    },
  }
})()

