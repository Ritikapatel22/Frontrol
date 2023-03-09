import React, { useCallback, useRef, useState, useEffect } from 'react'
import { element, PropTypes } from 'prop-types'
import {
  useQueryString,
  getQueryStringValue,
  withErrorHandler,
} from '@frontrolinc/pace-ui-framework'
import { useDispatch, useSelector } from 'react-redux'
import useOnClickOutside from '../../../hooks/useOutside'
import { handleAddView, handleViewOperation } from '../../../slices/viewslice'
import {
  selectedView as selectedViewChange,
  initialedState,
  changeView,
  changeSelectedPortfolioID,
  changeSelectedPorjectID,
} from '../../../slices/viewslice'
import { useFetchDataQuery } from '../../../app/appApi'
import { Popover } from 'react-tiny-popover'

// assests
import more from '../../../assets/Images/more.svg'
import plus from '../../../assets/Images/plus.svg'
import NewView from './newview'
import Button from '../button'
import del from '../../../assets/Images/delete.svg'
import delfault from '../../../assets/Images/default.svg'
import global from '../../../assets/Images/global.svg'
import pen from '../../../assets/Images/pencil.svg'
import file from '../../../assets/Images/documentfile.svg'
import restore from '../../../assets/Images/refresh_24px.svg'
import {
  useCustomization,
  showConfirmation,
} from '@frontrolinc/pace-ui-framework'
import ProceedButton from '../button/proceedButton'
import { useTranslation } from 'react-i18next'
const formIntialdata = {
  view_id: '',
  view_name: '',
  description: '',
  default_flag: 'N',
  global: 'N', //seeded
  // CRUD: "C", // is handled by context
  //orgname: "CTE INC",
  exclude_flag: 'Y',
  json_data: {
    widgets: [],
  },
}

const View = ({
  viewopen,
  setViewOpen,
  addNewView,
  setAddNewview,
  addViewhandle,
  widget,
  setCurrent,
  setdilPopUp,
  DeleteData,
  viewType,
  newview,
  setNewview,
  // addWidBool
}) => {
  const { t } = useTranslation(['label', 'message'])
  if (viewType) formIntialdata.view_type = viewType
  const selected = useSelector((state) => state.view.selectedView)
  const views = useSelector((select) => select.view.views)
  const [viewData, setViewData] = useState([])
  // const [newview, setNewview] = useState(false)
  const [popUp, setPopUp] = useState({ status: false, id: '' })
  const [view, setView] = useState(formIntialdata)
  const [select, setSelect] = useState(selected)
  const [newviewData, setNewviewData] = useState([])
  const [newViewsData, setNewViewsData] = useState(viewData)
  const [delData, setDelData] = useState([])
  const ref = useRef(null)
  const refExpt = useRef(null)
  const dispatch = useDispatch()
  const [searchField, setSearchField] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [viewFilter, setViewFilter] = useState([])
  const [results, setResults] = useState([])
  const [scroll, setScroll] = useState(false)
  const div = document.getElementById('viewScroll')
  // const [boolean, setBoolean] = useState(false)

  let selectedView = useSelector((state) =>
    state.view?.selectedView && state.view?.selectedView.view_type === viewType
      ? state.view?.selectedView
      : null,
  )

  const selectedPortfolio = useSelector(
    (state) => state.view.selectedPortfolioID,
  )
  const selectedProject = useSelector((state) => state.view.selectedProjectID)
  const globalViewID = useSelector((state) => state.view.globalViewID)

  const restoreIDs = useSelector((state) => state.view.restoreIDs)
  const [urlValue, setUrlValue] = useQueryString('view')
  useEffect(() => {
    if (selectedView) setUrlValue(selectedView.view_id)
  }, [selectedView])
  //view---

  const { syncToDataBase } = useCustomization()

  // call to views
  let { isLoading, data } = useFetchDataQuery({
    queryName: 'AcmViews.myViews',
    viewType: viewType,
    __config__: {
      providesTags: () => ['views'],
    },
  })

  useEffect(() => {
    setSelect(selected)
  }, [viewopen, selected])
  useEffect(() => {
    dispatch(changeView([]))
    dispatch(selectedViewChange(null))
  }, [viewType])

  useEffect(() => {
    const viewID = getQueryStringValue('view')
    if (
      data &&
      data.Data &&
      data.Data['AcmViews.myViews'] &&
      Array.isArray(data.Data['AcmViews.myViews'])
    ) {
      setViewFilter(data.Data['AcmViews.myViews'])
      dispatch(changeView(data.Data['AcmViews.myViews']))
      createViewDuplicateHandler(data)
      const availableViews = data.Data['AcmViews.myViews'].filter(
        (e) => e.global === 'N',
      )
      let existingView = null
      if (viewID) {
        existingView = availableViews.find((ele) => ele.view_id == viewID)
      }
      if (existingView) {
        dispatch(selectedViewChange(existingView))
        setSelect(existingView)
      } else {
        if (viewType === 'Project Dashboard' && selectedProject) {
          dispatch(selectedViewChange(selectedProject))
          setSelect(selectedProject)
        }
        if (viewType === 'Portfolio Dashboard' && selectedPortfolio) {
          dispatch(selectedViewChange(selectedPortfolio))
          setSelect(selectedPortfolio)
        }
        if (
          (viewType === 'Project Dashboard' && !selectedProject) ||
          (viewType === 'Portfolio Dashboard' && !selectedPortfolio)
        ) {
          const defaultData = availableViews.find(
            (ele) => ele.default_flag === 'Y',
          )
          const selectedView = defaultData
            ? JSON.parse(JSON.stringify({ ...defaultData }))
            : availableViews[0]
          dispatch(selectedViewChange(selectedView))
          setSelect(selectedView)
        }
      }
    }
  }, [data])

  const createViewDuplicateHandler = (data) => {
    const globalY = data.Data['AcmViews.myViews'].filter(
      (ele) => ele.global === 'Y',
    )
    globalY.map((ele) => {
      const duplicate = data.Data['AcmViews.myViews'].find(
        (element) => ele.view_id === element.created_from_view_id,
      )
      if (
        !duplicate &&
        !restoreIDs.includes(ele.view_id) &&
        !globalViewID.includes(ele.view_id)
      ) {
        dispatch(
          handleViewOperation({
            data: ele,
            op: 'seededView',
            syncToDataBase,
            viewType,
          }),
        )
      }
    })
  }

  if (views) {
    var globalData = views.find((val) => {
      return val.global === 'Y' && val
    })
    var createdId = views.find((val) => {
      return val.created_from_view_id
    })
    var ID = views.find((val) => {
      return createdId?.created_from_view_id === val.view_id
    })
  }

  // const editDataRef = useRef()

  // useEffect(() => {
  //   if(editDataRef.current){
  //   const editedData = views.find((e) => e.view_id === editDataRef.current.view_id)
  //   if(editedData.default_flag !== editDataRef.current.default_flag) {
  //     syncToDataBase(editedData,'U')
  //   }
  // }
  // }, [views])

  useEffect(() => {
    setViewData(JSON.parse(localStorage.getItem('newViewsData')))
    if (DeleteData) {
      setNewviewData(views)
    }
    // if(createdId){
    //   setSelect(createdId)
    //   dispatch(selectedView(createdId));
    // }
  }, [views])

  useEffect(() => {
    if (newviewData.length > 0) {
      setNewViewsData(JSON.parse(localStorage.getItem('newViewsData')))
      if (delData.view_id === selected.view_id) {
        setViewOpen(false)
        setSelect(
          createdId?.created_from_view_id ? newviewData[1] : newviewData[0],
        )
      }
    }
  }, [newviewData])

  useEffect(() => {
    return function cleanup() {
      setNewview(false)
      setView(formIntialdata)
      // setBoolean(false)
    }
  }, [])

  const handleProceed = () => {
    setViewOpen(false)
    if (viewType === 'Project Dashboard') {
      dispatch(changeSelectedPorjectID(select))
    } else {
      dispatch(changeSelectedPortfolioID(select))
    }
    dispatch(selectedViewChange(select))
    // dispatch(changeSelectedView(select));
  }
  useEffect(() => {
    dispatch(initialedState())
  }, [])

  // useEffect(() => {
  //   dispatch(selectedView(select));
  // }, [select]);

  useOnClickOutside(ref, () => {
    setPopUp(false), setSearchField(''), setIsPopoverOpen(false)
  })
  useOnClickOutside(refExpt, () => {})

  const handleClick = useCallback((views) => {
    setSelect(views)
  }, [])

  const handleDivClick = (event, data) => {
    if (event?.target?.alt === undefined) {
      setSelect(data)
    } else {
      setSelect(select)
    }
  }

  const viewhandle = () => {
    setNewview(!newview)
    setViewOpen(!viewopen)
    setPopUp(false)
  }

  const handleEditView = (data) => {
    if (widget?.view_id) {
      setViewOpen(true)
      setNewview(true)
    }
    setNewview(true)
    setPopUp(false)
    const newData = JSON.parse(JSON.stringify(data))
    setView({ ...newData })
  }

  const handleDeleteView = (data) => {
    showConfirmation({
      msg: t('delete warning view', { ns: 'message' }),
      title: t('delete view', { ns: 'message' }),
      onConfirm: () => {
        console.log('Confirmation result: confirmed')
        dispatch(
          handleViewOperation({ data, op: 'delete', syncToDataBase, viewType }),
        )
        if (DeleteData) {
          DeleteData(data)
        }
        if (setDelData) {
          setDelData(data)
        }
        if (data.view_id === selected.view_id) {
          if (views.length) {
            // dispatch(selectedViewChange(views[0]));
          } else {
            // dispatch(selectedViewChange(null));
          }
        }
      },
      onClose: () => {
        console.log('close view popup')
      },
      confirmLabel: t('Yes'),
      cancelLabel: t('No'),
    })
  }

  const handleDefaultView = (data) => {
    dispatch(
      handleViewOperation({
        data,
        op: 'default',
        syncToDataBase: syncToDataBase,
        viewType,
      }),
    )
  }

  const duplicateHandler = (data) => {
    data?.global === 'Y'
      ? !data?.created_from_view_id
        ? (setSelect(createdId),
          dispatch(
            handleViewOperation({
              data,
              op: 'seededView',
              syncToDataBase,
              viewType,
            }),
          ))
        : ''
      : dispatch(
          handleViewOperation({
            data,
            op: 'duplicate',
            syncToDataBase,
            viewType,
          }),
        )
  }

  const handleAddNewView = (data) => {
    setNewview(false)
    setView({ ...formIntialdata })
  }

  const handleRestore = (data) => {
    dispatch(
      handleViewOperation({
        data,
        op: 'restoreView',
        syncToDataBase,
        viewType,
      }),
    )
  }

  useEffect(() => {
    if (widget) {
      handleEditView(widget)
    }
  }, [widget, viewopen])

  useEffect(() => {
    if (!viewopen) {
      setViewOpen(false)
      setNewview(false)
      if (widget) {
        setCurrent(false)
      }
      setView(formIntialdata)
    }
  }, [viewopen])

  const handleScroll = (event) => {
    if (event?.currentTarget.scrollTop > 1) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  useEffect(() => {
    handleScroll()
  }, [])

  useEffect(() => {
    const filtered = viewFilter.filter(
      (order) => order && order?.view_name?.toLowerCase().includes(searchField),
    )
    setResults(filtered)
  }, [searchField, viewFilter])

  return (
    <div>
      <div
        ref={ref}
        className={`top-0 transition-all w-full z-[999] right-0 duration-250 ease-linear animation-all fixed h-[100vh]  overflow-y-auto  bg-[#fffffd] `}
      >
        <div className="relative flex flex-col justify-between h-full py-4">
          <div className="relative flex flex-col justify-between h-full">
            <div className={scroll ? 'shadow-md' : ''}>
              <div className="flex items-center justify-between px-[10px] sm:px-[30px]">
                <h1 className="text-base sm:text-2xl text-[#0e3943] font-bold font-Inter">
                  <span>{t("Select view")}</span>
                </h1>
                <ProceedButton
                  type="primaryButton"
                  icon={plus}
                  iconLabel="plus"
                  label={t('New view')}
                  handleClick={() => {
                    setNewview(true), setView(formIntialdata)
                  }}
                />
              </div>
              <div className="mt-5 x-[10px] sm:px-[30px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('Search')}
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    className="search_input rounded-[10px] px-[10px] border-2 border-earthgreen mb-2 text-[#646363] focus:text-black focus:outline-[#9BBEAF]  focus:ring-[#9BBEAF] focus:bg-white focus:border-[#9BBEAF] py-3 text-xs font-Inter w-full 7xl:w-[500px] lg:w-96 pl-12"
                  ></input>
                  <div className="search absolute top-2.5 left-3">
                    <i className="fa-solid fa-magnifying-glass text-lightgreen"></i>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="overflow-x-auto h-[65vh] lg:h-[65vh] xl:h-[68vh] 2xl:h-[76vh]"
              id="viewScroll"
              onScroll={handleScroll}
            >
              {results.length > 0 ? (
                results.map((data, i) => {
                  return data.global === 'N' ? (
                    <div
                      key={i}
                      className={
                        select?.view_id !== data.view_id
                          ? `highirse border-0  hover:shadow-lg p-[5px] cursor-pointer ${
                              data.created_from_view_id ? 'bg-[#CFDFD7]' : ''
                            } mb-[10px] mt-3 py-3.5 rounded-lg shadow-xl mx-[10px] sm:ml-[32px] ${
                              div?.scrollHeight > div?.clientHeight || scroll
                                ? 'mr-[24px]'
                                : 'sm:mr-[30px]'
                            } ${
                              data?.default_flag === 'Y'
                                ? ' border-lightgreen '
                                : ''
                            }`
                          : `highirse border mt-3 hover:shadow-lg mb-[10px] cursor-pointer ${
                              data.created_from_view_id ? 'bg-[#CFDFD7]' : ''
                            } p-[5px] mx-[10px] sm:ml-[32px] ${
                              div?.scrollHeight > div?.clientHeight || scroll
                                ? 'mr-[24px]'
                                : 'mr-[30px]'
                            } py-3.5 rounded-lg shadow-xl border-lightgreen relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen ${
                              data?.default_flag === 'Y' ? '' : ''
                            }`
                      }
                      onClick={(e) => handleDivClick(e, data)}
                    >
                      <div
                        className="ml-2 cursor-pointer"
                        onClick={(e) => handleDivClick(e, data)}
                      >
                        <div className="flex items-center justify-between pr-[10px] pl-[12px]">
                          <div className="flex items-center">
                            <div
                              className="checkbox-box"
                              onClick={() => handleClick(data)}
                            >
                              <input
                                // id="default-radio-1"
                                type="radio"
                                value={data.view_id}
                                onChange={() => handleClick(data)}
                                // name="default-radio-1"
                                isselected={
                                  select?.view_id === data?.view_id
                                    ? select?.view_id
                                    : undefined
                                }
                                checked={select?.view_id === data.view_id}
                                className="radio z-[-99] w-4 h-4 text-lightgreen bg-lightgreen border-lightgreen border focus:ring-lightgreen dark:ring-lightgreen dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600 mr-[10px]"
                              />
                            </div>
                            <h1
                              className={`${data?.default_flag !== 'Y' ? "w-[450px]" :  data.view_name?.length > 50 && "w-[350px]"} name text-sm font-Inter font-bold cursor-pointer`}
                              onClick={() => handleClick(data)}
                            >
                              {data.view_name}{' '}
                              {data?.created_from_view_id && (
                                <span className="font-light">
                                  ({t('Seeded view')})
                                </span>
                              )}
                            </h1>
                            <h1 className="text-sm font-bold font-Inter">
                              {data?.default_flag === 'Y' && (
                                <span className="font-normal text-white bg-lightgreen text-[10px] rounded-full ml-[10px] px-[10px] pt-[5px] pb-[6px]">
                                  {t('Default')}
                                </span>
                              )}
                            </h1>
                          </div>
                          <div className="relative flex">
                            <img
                              className={
                                select?.title !== data.view_name
                                  ? 'mr-[14px]'
                                  : 'text-lightgreen mr-[14px] star'
                              }
                            />
                            <Popover
                              isOpen={isPopoverOpen}
                              key={i}
                              // reposition={true}
                              positions={['bottom', 'top']} // preferred positions by priority
                              content={
                                popUp.status &&
                                popUp.id == data.view_id && (
                                  <div ref={ref}>
                                    <div
                                      className="export bg-white -right-[6px] w-[160px] z-20 cursor-pointer"
                                      onClick={() => setPopUp(false)}
                                    >
                                      <div className="relative z-10 before:absolute before:content-[''] before:top-[0px] before:rotate-45 before:right-[35px] before:bg-white before:h-[40px] before:w-[40px] before:-z-10">
                                        {data?.default_flag != 'Y' && (
                                          <>
                                            <div
                                              className="py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                              onClick={() => {
                                                handleDefaultView(data)
                                              }}
                                            >
                                              <Button
                                                icon={delfault}
                                                iconLabel="default"
                                                label={t('Set as default')}
                                                // handleClick={() =>
                                                //   handleDefaultView(data)
                                                // }
                                              />
                                            </div>
                                            <hr className="bg-darkgrey"></hr>
                                          </>
                                        )}
                                        <div
                                          className="py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                          onClick={() => handleEditView(data)}
                                        >
                                          <div className="relative">
                                            <Button
                                              icon={global}
                                              iconLabel="edit"
                                              label={t('Edit view')}
                                            />
                                            <div className="absolute top-1 left-[6px]">
                                              <img src={pen} alt="pencil" />
                                            </div>
                                          </div>
                                        </div>
                                        <hr className="bg-darkgrey"></hr>
                                        {data?.created_from_view_id ? (
                                          ''
                                        ) : (
                                          <>
                                            <div
                                              onClick={() =>
                                                handleDeleteView(data)
                                              }
                                              className="flex py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                            >
                                              <Button
                                                icon={del}
                                                iconLabel="delete"
                                                label={t('Delete')}
                                              />
                                            </div>
                                            <hr className="bg-darkgrey"></hr>
                                          </>
                                        )}
                                        <div
                                          className="py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                          onClick={() => duplicateHandler(data)}
                                        >
                                          <Button
                                            icon={file}
                                            iconLabel="Duplicate"
                                            label={t('Duplicate')}
                                            // handleClick={() => {
                                            //   duplicateHandler(data)
                                            //   // DuplicateView();
                                            // }}
                                          />
                                        </div>
                                        {data?.created_from_view_id ? (
                                          <>
                                            <hr className="bg-darkgrey"></hr>
                                            <div
                                              onClick={() =>
                                                handleRestore(data)
                                              }
                                              className="flex py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                            >
                                              <Button
                                                icon={restore}
                                                iconLabel="restore"
                                                label={t('Restore')}
                                              />
                                            </div>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                        <hr className="bg-darkgrey"></hr>
                                      </div>
                                    </div>
                                  </div>
                                )
                              }
                            >
                              <div className="hover:bg-[#E6F3F0] w-[28px] h-[28px] flex justify-center item-center">
                                <img
                                  src={more}
                                  alt="more"
                                  className="cursor-pointer px-[5px] w-[28px]"
                                  onClick={() => {
                                    setPopUp({ status: true, id: data.view_id })
                                    setIsPopoverOpen(true)
                                  }}
                                />
                              </div>
                            </Popover>
                          </div>
                        </div>
                        <div className="mt-[1px] cursor-pointer">
                          <div className="items-center block sm:flex">
                            <p className="text-[13px] px-3 sm:ml-6">
                              {data.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                })
              ) : searchField !== '' ? (
                <div className="p-3 m-2 text-center bg-grey">
                  {t('No result', { ns: 'message' })} '{searchField}'{' '}
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="proceed">
              <div className="flex items-center pt-5 mx-[10px] sm:mx-[30px] pb-1">
                <ProceedButton
                  type="primaryButton"
                  label={t('Proceed')}
                  handleClick={handleProceed}
                />
                <ProceedButton
                  type="secondaryButton"
                  label={t('Cancel')}
                  handleClick={() => setViewOpen(false)}
                />
                {newview ? (
                  <NewView
                    viewhandle={viewhandle}
                    addNewView={addNewView}
                    setAddNewview={setAddNewview}
                    addViewhandle={addViewhandle}
                    viewData={view?.view_id === ID?.view_id ? createdId : view}
                    setViewData={setView}
                    formIntialdata={formIntialdata}
                    handleAddView={(data) => handleAddNewView(data)}
                    widget={widget}
                    setCurrent={setCurrent}
                    setNewview={setNewview}
                    newview={newview}
                    setViewOpen={setViewOpen}
                    viewopen={viewopen}
                    setSelect={setSelect}
                    select={select}
                    viewType={viewType}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewopen && (
        <div className="fixed overlay h-[100vh] w-[100%] right-0 top-0 bottom-0 left-0  z-[98]"></div>
      )}
    </div>
  )
}

View.propTypes = {
  setOpen: PropTypes.bool,
  open: PropTypes.bool,
}

//export default View
export default withErrorHandler(View, { mode: 'toast' })
