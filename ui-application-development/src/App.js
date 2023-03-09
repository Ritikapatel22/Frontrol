import React, { useState, useRef, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Loading from './components/layout/loadingscreen'
import PrivateRoute from './PrivateRoute'
import Project from '../src/pages/project'
import SSO from './pages/sso'
import Projectspage from './components/projectspage/projects'
import ViewFile from './components/ViewFile/viewFile'
import AdminConfig from './components/adminconfig/adminconfig'
import Userprofilepage from '../src/pages/userprofile'
import { useTranslation } from 'react-i18next'

import './App.css'
import {
  selectToken,
  CustomizationProvider,
  usePersonalization,
  InfoMessageContainer,
  showToast,
  withErrorHandler,
  BackendError,
  showAlert,
} from '@frontrolinc/pace-ui-framework'
import {
  selectedView as selectedViewChange,
  changeView,
  changeRestoreIDs,
  changeWidgetdeteleIDs,
  changeDuplicateWidgetIDs,
  changeDuplicateViewID,
} from './slices/viewslice'
import { useFetchDataQuery, useUpdateDataMutation } from './app/appApi'

// toast
import 'react-toastify/dist/ReactToastify.css'
import ArrowToTop from './assets/Images/arrow-top.svg'
import { OktaExpiryManagementProvider } from './components/OktaExpiryManagement/OktaExpiryManagementProvider'
import AdvanceSearch from './components/Common/advacedSearch'
import useWindowSize from './hooks/useWindowSize'
import SsoLogin from './pages/ssoLogin'

const App = () => {
  const { t } = useTranslation(['label', 'message'])
  const dispatch = useDispatch()
  const size = useWindowSize()
  const isLoading = useSelector((state) => state?.loginAuth?.isLoading)
  const view = useSelector((state) => state.view.views)
  const selectedView = useSelector((state) => state.view.selectedView)
  const restoreIDs = useSelector((state) => state.view.restoreIDs)
  const duplicateViewID = useSelector((state) => state.view.duplicateViewID)
  const widgetdeteleIDFromStore = useSelector(
    (state) => state.view.widgetdeteleIDs,
  )
  const widgetdeteleIDs = JSON.parse(JSON.stringify(widgetdeteleIDFromStore))
  const duplicateWidgetID = useSelector(
    (state) => state.view.dublicateWidgetIDs,
  )
  const shouldSelected = useRef()

  const [visible, setVisible] = useState(false)
  const {
    deleteSingleData,
    syncToDataBase,
    personalizationData,
    duplicatePersonalization,
  } = usePersonalization()
  const shouldChangeViewRef = useRef()
  const dataRef = useRef()

  useEffect(() => {
    if (shouldChangeViewRef.current && dataRef.current) {
      if (dataRef.current.view_id === selectedView.view_id) {
        dispatch(selectedViewChange(dataRef.current))
      }
      dispatch(changeView(getModifiedView(dataRef.current)))
      shouldChangeViewRef.current = null
      dataRef.current = null
    }
  }, [personalizationData.current])

  const syncToReduxStore = (action, data, resData) => {
    if (action === 'U') {
      const allViews = JSON.parse(JSON.stringify(view))

      const modifiedViews = getModifiedView(data)

      const duplicateWidgetIDs = JSON.parse(JSON.stringify(duplicateWidgetID))
      if (
        selectedView?.json_data?.widgets?.length !==
        data.json_data.widgets.length
      ) {
        duplicateWidgetIDs.forEach((element) => {
          const filteredPersonalizationData = personalizationData.current.find(
            (e) =>
              e.document_name.includes(
                element.view_id + '_' + element.widget_id,
              ),
          )
          if (filteredPersonalizationData) {
            const newWidget = getDifference(
              data.json_data.widgets,
              selectedView?.json_data?.widgets,
            )
            const filteredGrid = JSON.parse(JSON.stringify(newWidget))
            syncToDataBase(
              selectedView.view_id +
                '_' +
                filteredGrid[0].instanceId +
                '_' +
                filteredPersonalizationData.document_name.split('_')[2],
              filteredPersonalizationData.payload,
            )
            shouldChangeViewRef.current = true
            dataRef.current = data
          }
        })
        duplicateWidgetIDs.shift()
        dispatch(changeDuplicateWidgetIDs(duplicateWidgetIDs))
      }

      const isWidgetDeleteView = widgetdeteleIDs.findIndex(
        (e) => e.view_id === data.view_id,
      )
      if (isWidgetDeleteView > -1) {
        const isWidgetDeleted =
          data.json_data &&
          data.json_data.widgets.find(
            (e) =>
              e.instanceId === widgetdeteleIDs[isWidgetDeleteView].widget_id,
          )
        if (!isWidgetDeleted) {
          deleteSingleData(
            widgetdeteleIDs[isWidgetDeleteView].view_id,
            widgetdeteleIDs[isWidgetDeleteView].widget_id,
          )
          widgetdeteleIDs.splice(isWidgetDeleteView, 1)
          dispatch(changeWidgetdeteleIDs(widgetdeteleIDs))
        }
      }
      if (!shouldChangeViewRef.current) {
        if (data.view_id === selectedView.view_id) {
          dispatch(selectedViewChange(data))
        }
        dispatch(changeView(modifiedViews))
        showToast('success', t('View saved.', { ns: 'message' }), 'drawer')
      }
    } else if (action === 'D') {
      const allViews = JSON.parse(JSON.stringify(view))
      const index = allViews.findIndex((view) => view.view_id === data.view_id)
      if (data.view_id === selectedView.view_id) {
        const availableViews = allViews.filter((e) => e.global === 'N')

        if (availableViews.length) {
          dispatch(selectedViewChange(availableViews[0]))
        } else {
          dispatch(selectedViewChange(null))
        }
      }
      if (index >= 0) {
        allViews.splice(index, 1)
      }
      if (
        data.created_from_view_id &&
        restoreIDs.includes(data.created_from_view_id) &&
        selectedView.created_from_view_id === data.created_from_view_id
      ) {
        shouldSelected.current = data.created_from_view_id
      }
      if (
        !data.created_from_view_id ||
        !restoreIDs.includes(data.created_from_view_id)
      ) {
        showToast('success', t('View deleted.', { ns: 'message' }), 'drawer')
      }
      deleteSingleData(data.view_id, data.json_data.widgets)
      dispatch(changeView(allViews))
    } else if (action === 'C') {
      const allViews = JSON.parse(JSON.stringify(view))
      const newData = JSON.parse(JSON.stringify(data))
      newData.view_id = resData.Key[0].view_id
      allViews.push(newData)
      if (newData.created_from_view_id && Array.isArray(restoreIDs)) {
        const index = restoreIDs.indexOf(newData.created_from_view_id)
        if (index > -1) {
          showToast(
            'success',
            t('Seeded view restored.', { ns: 'message' }),
            'drawer',
          )
          const newRestoreIDs = JSON.parse(JSON.stringify(restoreIDs))
          newRestoreIDs.splice(index, 1)
          if (shouldSelected.current === newData.created_from_view_id) {
            dispatch(selectedViewChange(newData))
          }
          changeRestoreIDs(newRestoreIDs)
        }
      } else if (newData.view_name.indexOf('Copy') > 0) {
        if (duplicateViewID && duplicateViewID.length)
          duplicateViewID.forEach((e) => {
            const originalView = view.find((element) => element.view_id === e)
            duplicatePersonalization(newData, originalView)
          })
        dispatch(changeDuplicateViewID([]))
        showToast('success', t('View duplicated.', { ns: 'message' }), 'drawer')
      } else if (!newData.created_from_view_id) {
        dispatch(selectedViewChange(newData))
        showToast('success', t('View created.', { ns: 'message' }), 'drawer')
      }
      dispatch(changeView(allViews))
      if (!selectedView) {
        dispatch(selectedViewChange(newData))
      }
    }
    //setBoolean(!boolean);
  }

  const onError = (data) => {
    let errorMsg = data.Message ? data.Message : 'Something went wrong!!!'
    if (
      data &&
      data.Message &&
      Array.isArray(data.Message) &&
      typeof data.Message !== 'string'
    ) {
      errorMsg = JSON.stringify(data.Message)
    }
    showToast('error', errorMsg)
  }

  const authentication = useSelector(selectToken)
  const CustomizationProviderConfig = {
    documentName: 'AcmViews',
    onDataChange: syncToReduxStore,
    onError: onError,
    getInvalidateTagOnSave() {
      return ['views']
    },
  }

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    const scrollToTopButton = document.querySelector('#arrowToTopEl')
    if (scrollToTopButton && scrollToTopButton.style) {
      scrollToTopButton.style.display = scrolled > 300 ? 'flex' : 'none'
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    })
  }

  function getDifference(array1, array2) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.instanceId === object2.instanceId
      })
    })
  }

  useEffect(() => {
    if (
      window.navigator.userAgent.toLowerCase().includes('mobile') && isLoading
    ) {
      showAlert({
        msg: ' ',
        title: t('device_size_issue_message', { ns: 'message' }),
        onClose: () => {},
      })
    }
  }, [])

  function getModifiedView(data) {
    const allViews = JSON.parse(JSON.stringify(view))
    return allViews.map((singleView) => {
      if (singleView.view_id === data.view_id) {
        singleView = data
      }
      if (data.default_flag === 'Y' && singleView.view_id !== data.view_id) {
        singleView.default_flag = 'N'
      }
      return singleView
    })
  }

  window.addEventListener('scroll', toggleVisible)
  toggleVisible()
  return (
    <div>
      <div
        id="arrowToTopEl"
        className="group move-to-top bg-[#00886d] hover:bg-[#015e4b]"
        onClick={scrollToTop}
        style={{ display: 'none' }}
      >
        <div>
          <img
            src={ArrowToTop}
            alt="arrow-to-top"
            className="h-[8px] w-[16px]"
          />
          <img
            src={ArrowToTop}
            alt="arrow-to-top"
            className="h-[8px] w-[16px]"
          />
        </div>
        <div className="group-hover:block w-[58px] mr-[105px] top-[-1px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
          <div className="relative">
            <p className="font-Inter leading-[16.38px] text-center text-xs">
              {t('Back to top')}
            </p>
            <div className="bg-black top-[8px] z-[-1] left-[41px] rotate-45 absolute w-[15px] h-[15px]"></div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/sso" exact element={<SSO />} />
        <Route path="ssologin" exact element={<SsoLogin />} />
        <Route
          exact
          path="/"
          element={
            <div style={{ display: isLoading ? 'none' : 'block' }}>
              <PrivateRoute authentication={authentication}>
                <CustomizationProvider config={CustomizationProviderConfig}>
                  <Dashboard />
                </CustomizationProvider>
              </PrivateRoute>
            </div>
          }
        />
        <Route
          exact
          path={'/project/:id'}
          element={
            <div>
              <PrivateRoute authentication={authentication}>
                <CustomizationProvider config={CustomizationProviderConfig}>
                  <Project />
                </CustomizationProvider>
              </PrivateRoute>
            </div>
          }
        />
        <Route
          path="/projects"
          exact
          element={
            <div>
              <PrivateRoute authentication={authentication}>
                <Projectspage />
              </PrivateRoute>
            </div>
          }
        />
        <Route
          path="/view-file"
          exact
          element={
            <div>
              <PrivateRoute authentication={authentication}>
                <ViewFile />
              </PrivateRoute>
            </div>
          }
        />
        <Route
          path={'/projects/project-advanced-search'}
          element={
            <div>
              <PrivateRoute authentication={authentication}>
                <AdvanceSearch />
              </PrivateRoute>
            </div>
          }
        />
        <Route
          path="/admin"
          exact
          element={
            <div>
              <PrivateRoute pathName="admin" authentication={authentication}>
                <AdminConfig />
              </PrivateRoute>
            </div>
          }
        />
      </Routes>
      <InfoMessageContainer />
    </div>
  )
}

// export default App
export default withErrorHandler(App, null)
