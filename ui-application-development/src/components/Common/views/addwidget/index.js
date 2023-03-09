import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// utils
import { getSelectedView, uid } from '../../../../helpers/utils'

// component
import { Button } from '../..'
import WidgetCard from './widget_card'

// assets
import downArrow from '../../../../assets/Images/triangle.svg'
import useOnClickOutside from '../../../../hooks/useOutside'
import { useTranslation } from 'react-i18next'
import { usePersonalization } from '@frontrolinc/pace-ui-framework'
import ProceedButton from '../../button/proceedButton'

function Addwidget({
  addViewhandle,
  data,
  setAddNewView,
  setWidgets,
  currentWidget,
  viewData,
}) {
  const { t } = useTranslation(['label', 'message'])
  const { id } = useParams()
  const [color, setColor] = useState('Standard')
  const [display, setDisplay] = useState(false)
  const [section, setSection] = useState(true)
  const [popover, setPopover] = useState(false)
  const [selView, setSelView] = useState('')
  const widgets = useSelector((select) => select.view.widgets)
  const standardWidgets = id
    ? widgets?.filter((val) => {
        return val.type === 'ProjectDashboard'
      })
    : widgets?.filter((val) => {
        return val.type === 'PortfolioDashboard'
      })
  // const standardWidgets = widgets?.map((val) => { return val.type === "PortfolioDashboard" ? val : "ProjectDashboard" })
  const [addWidgets, setAddWidgets] = useState(data?.json_data?.widgets && [])
  const [viewWidgets, setViewWidgets] = useState(data?.json_data?.widgets && [])
  const [searchField, setSearchField] = useState('')
  const [searchViewResult, setSearchViewResult] = useState()
  const [searchResult, setSearchResult] = useState()
  const [standardResult, setStandardResult] = useState()
  const view = useSelector((state) => state.view.views)
  const views = view.filter((e) => e.global === 'N')

  const selected = useSelector((state) => state.view.selectedView) //getSelectedView();
  const combineWidgets = [...currentWidget, ...addWidgets, ...viewWidgets]
  const ref = useRef()
  const refExpt = useRef(null)
  const { syncToDataBase, personalizationData } = usePersonalization()

  const createdId = views.find((val) => {
    return val.created_from_view_id
  })
  const ID = views.find((val) => {
    return createdId?.created_from_view_id === val.view_id
  })

  const widgetIDRef = useRef()

  useEffect(() => {
    setWidgets(combineWidgets)
    // setSelView()
  }, [addWidgets, viewWidgets])

  useOnClickOutside(ref, () => {
    setPopover(false), setSearchField('')
  })
  useOnClickOutside(refExpt, () => {})

  const changeHandler = (e, widget) => {
    if (e.target?.checked) {
      const newWidget = { ...widget }
      newWidget.instanceId = uid()
      newWidget.grids = []
      newWidget.tabs = []
      setAddWidgets([...addWidgets, newWidget])
    } else {
      const findIndex = addWidgets.findIndex((wid) => {
        return wid.component == widget.component
      })
      if (findIndex >= 0) {
        setAddWidgets([
          ...addWidgets.filter((wid) => wid.component != widget.component),
        ])
      }
    }
  }

  const changeViewHandler = (e, widget) => {
    if (e.target.checked) {
      const newViewWidget = { ...widget }
      // newViewWidget.instanceId = uid();
      // newViewWidget.grids = [];
      // newViewWidget.tabs = [];
      widgetIDRef.current =
        widgetIDRef.current && widgetIDRef.current.length
          ? [...widgetIDRef.current, widget.instanceId]
          : [widget.instanceId]
      setViewWidgets([...viewWidgets, newViewWidget])
    } else {
      const findIndex = viewWidgets.findIndex(
        (wid) => wid.instanceId == widget.instanceId,
      )
      if (findIndex >= 0) {
        setViewWidgets([
          ...viewWidgets.filter((wid) => wid.instanceId != widget.instanceId),
        ])
      }
      widgetIDRef.current = null
    }
  }
  const handleButton = () => {
    setAddNewView(false)
    // if(widgetIDRef?.current && widgetIDRef.current?.length) {
    if (widgetIDRef.current) {
      widgetIDRef.current.forEach((element) => {
        const filteredPersonalizationData = personalizationData.current.find(
          (e) => e.document_name.includes(element),
        )
        syncToDataBase(
          viewData.view_id +
            '_' +
            element +
            '_' +
            filteredPersonalizationData.document_name.split('_')[2],
          filteredPersonalizationData.payload,
        )
      })
    }
  }

  const searchHandler = (event) => {
    setSearchField(event.target.value)
  }

  useEffect(() => {
    // Standard Widget
    setStandardResult(
      standardWidgets?.filter((val) => {
        const searchVal = t(`${val?.component}_title`, { ns: 'message' })
        if (searchField === '') {
          return val
        } else if (
          searchVal.toLowerCase().includes(searchField.toLowerCase())
        ) {
          return val
        } else {
          return false
        }
      }),
    )

    // From view [all views]
    setSearchViewResult(
      views
        .filter((val) => {
          return data.view_id
            ? val.view_id != viewData?.view_id && val.view_id != ID?.view_id
            : val.view_id
        })
        .map((views) => {
          return views?.json_data?.widgets?.filter((searchFilter) => {
            if (searchField === '') {
              return searchFilter
            } else if (
              searchFilter.name
                .toLowerCase()
                .includes(searchField.toLowerCase())
            ) {
              return searchFilter
            } else {
              return false
            }
          })
        })
        .map((val) => {
          return val.length > 0
        })
        .find((val) => {
          return val === true
        }),
    )

    // From view [single view]
    setSearchResult(
      selView?.json_data?.widgets?.filter((val) => {
        if (searchField === '') {
          return data.view_id
            ? data.view_id != selView?.view_id && selView.view_id != ID?.view_id
            : val
        } else if (val.name.toLowerCase().includes(searchField.toLowerCase())) {
          return data.view_id
            ? data.view_id != selView?.view_id && selView.view_id != ID?.view_id
            : val
        } else {
          return false
        }
      }),
    )
  }, [searchField, selView])

  return (
    <div>
      <div className="fixed right-0 top-0 h-[100vh] w-full bg-white rounded  shadow-lg">
        <div className="flex flex-col h-full justify-between">
          <div className="h-[60vh] lg:h-[60vh] xl:h-[57vh] 2xl:h-[70vh] pl-9 pr-11 pt-9">
            <h1 className="text-green text-2xl font-Inter font-bold mb-5 ">
              {t("Add widget")} ({addWidgets?.length + viewWidgets?.length})
            </h1>
            <div className="flex justify-between ">
              <div className="mb-6 border border-lightgreen  rounded flex">
                <button
                  type="button"
                  onClick={() => {
                    setColor('Standard')
                    setDisplay(false)
                    setSection(true)
                  }}
                  className={`h-[40px] flex justify-center items-center rounded-l font-medium font-Inter shadow hover:shadow-xl text-sm min-w-[111px] py-[12px] px-[12px] border border-lightgreen ${color == 'Standard' && 'bg-lightgreen text-white'
                    }`}
                >
                  {t('Standard')} ({addWidgets?.length})
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setColor('View')
                    setDisplay(true)
                    setSection(false)
                  }}
                  className={`h-[40px] flex justify-center items-center rounded-r font-Inter text-sm font-medium shadow hover:shadow-xl py-[12px] px-[12px] min-w-[111px] border border-lightgreen defaultChecked ${color == 'View' && 'bg-lightgreen text-white'
                    }`}
                >
                  {t('From views')} ({viewWidgets?.length})
                </button>
              </div>

              {display && (
                <>
                  <div className="relative inline-block text-left ml-auto">
                    <div>
                      <button
                        type="button"
                        className=" flex items-center w-full justify-center rounded-md border border-gray-300 bg-grey px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lightgreen focus:ring-offset-1 focus:ring-offset-lightgreen focus:bg-white"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={() => setPopover(true)}
                      >
                        {selView?.view_name
                          ? selView?.view_name
                          : t('All views')}
                        <img src={downArrow} alt="arrowdown" className="ml-2" />
                      </button>
                    </div>
                  </div>
                  {popover && (
                    <div ref={ref}>
                      <div className="export bg-white absolute top-[150px] right-[40px] w-[160px] z-20 cursor-pointer">
                        <div className="relative z-10 bg-white before:absolute before:content-[''] before:top-[-13px] before:rotate-45 before:right-[32px] before:bg-white before:h-[40px] before:w-[40px] before:-z-10 drop-shadow-lg">
                          {selView?.view_name === undefined ? (
                            ''
                          ) : (
                            <>
                              <div
                                className="py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                onClick={() => {
                                  setPopover(false)
                                }}
                              >
                                <Button
                                  iconLabel={'All views'}
                                  label={'All views'}
                                  handleClick={() => {
                                    setSelView()
                                  }}
                                />
                              </div>
                              <hr className="bg-darkgrey"></hr>
                            </>
                          )}
                          {views
                            ?.filter((val) => {
                              return data.view_id
                                ? val.view_id != viewData?.view_id &&
                                    val.view_id != ID?.view_id
                                : val.view_id
                            })
                            .map((view, indx) => (
                              <>
                                <div
                                  className={`${
                                    selView?.view_name != view?.view_name
                                      ? 'py-3 pl-[10px] hover:bg-[#E6F3F0]'
                                      : ''
                                  }`}
                                  onClick={() => {
                                    setPopover(false)
                                  }}
                                  key={indx}
                                >
                                  <Button
                                    iconLabel={view?.view_name}
                                    label={
                                      selView?.view_name != view?.view_name
                                        ? view?.view_name
                                        : ''
                                    }
                                    handleClick={() => {
                                      setSelView(view)
                                    }}
                                  />
                                </div>
                                {selView?.view_name != view?.view_name ? (
                                  <hr className="bg-darkgrey"></hr>
                                ) : (
                                  ''
                                )}
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder={t('Search')}
                onChange={searchHandler}
                className="pr-7 border border-lightgreen bg-inherit focus:outline-lightgreen font-normal rounded py-3 text-xs font-Inter w-full  pl-12"
              ></input>
              <div className="search absolute top-2.5 left-3">
                <i className="fa-solid fa-magnifying-glass text-lightgreen"></i>
              </div>
            </div>
            {section ? (
              <div className="overflow-x-auto h-[60vh] lg:h-[63vh] xl:h-[vh] 2xl:h-[64vh] pb-[10px] widget">
                {standardResult?.length > 0 ? (
                  standardResult.map((widget, index) => {
                    const checked = addWidgets.find(
                      (wid) => wid.component == widget.component,
                    )
                    return (
                      <div
                        key={index}
                        className={`${
                          checked && widget.component
                            ? "checked highirse flex items-start border mt-3 hover:shadow-lg cursor-pointer rounded-lg shadow-xl relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen"
                            : 'highirse flex items-start mt-3 hover:shadow-lg cursor-pointer rounded-lg shadow-xl relative '
                        } `}
                      >
                        <WidgetCard
                          changeHandler={(e) => changeHandler(e, widget)}
                          checked={checked}
                          widget={widget}
                        />
                      </div>
                    )
                  })
                ) : searchField !== '' ? (
                  <div className="p-3 text-center m-2 bg-grey">
                    {t('No result', { ns: 'message' })} '{searchField}'
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div className="overflow-y-auto h-[60vh] md:h-[60vh] lg:h-[60vh] xl:h-[60vh] 2xl:h-[70vh] widget">
                {selView ? (
                  searchResult?.length > 0 ? (
                    searchResult.map((widget, index) => {
                      const checked = viewWidgets.find(
                        (wid) => wid.instanceId == widget.instanceId,
                      )
                      return (
                        <div
                          key={index}
                          className={`${
                            checked && widget.name
                              ? "checked highirse flex items-start border mt-3 hover:shadow-lg cursor-pointer rounded-lg shadow-xl relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen"
                              : 'highirse flex items-start mt-3 hover:shadow-lg cursor-pointer rounded-lg shadow-xl relative '
                          } `}
                        >
                          <WidgetCard
                            changeHandler={(e) => changeViewHandler(e, widget)}
                            checked={checked}
                            widget={widget}
                          />
                        </div>
                      )
                    })
                  ) : searchField !== '' ? (
                    <div className="p-3 text-center m-2 bg-grey">
                      {t('No result', { ns: 'message' })} '{searchField}'
                    </div>
                  ) : (
                    ''
                  )
                ) : searchViewResult ? (
                  views
                    .filter((val) => {
                      return data.view_id
                        ? val.view_id != viewData?.view_id &&
                            val.view_id != ID?.view_id
                        : val.view_id
                    })
                    .map((views) => {
                      return views.json_data.widgets
                        ?.filter((searchFilter) => {
                          if (searchField === '') {
                            return searchFilter
                          } else if (
                            searchFilter.name
                              .toLowerCase()
                              .includes(searchField.toLowerCase())
                          ) {
                            return searchFilter
                          } else {
                            return false
                          }
                        })
                        .map((widget, index) => {
                          const checked = viewWidgets.find((wid) => {
                            return wid.instanceId == widget.instanceId
                          })
                          return (
                            <div
                              key={index}
                              className={`${
                                checked && widget.name
                                  ? "checked highirse flex items-start border mt-3 hover:shadow-lg cursor-pointer rounded-lg shadow-xl relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen"
                                  : 'highirse flex items-start mt-3 hover:shadow-lg cursor-pointer rounded-lg shadow-xl relative '
                              } `}
                            >
                              <WidgetCard
                                changeHandler={(e) =>
                                  changeViewHandler(e, widget)
                                }
                                checked={checked}
                                widget={widget}
                                view={views}
                              />
                            </div>
                          )
                        })
                    })
                ) : searchField !== '' ? (
                  <div className="p-3 text-center m-2 bg-grey">
                    {t('No result', { ns: 'message' })} '{searchField}'
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
          <div></div>
          <div className="proceed z-[10] bg-white mt-[-30px]">
            <div className="flex items-center pt-5 mx-[10px] sm:mx-[30px] pb-5">
              <ProceedButton
                type="primaryButton"
                label={t('Proceed')}
                handleClick={(e) => handleButton(e)}
              />
              <ProceedButton
                type="secondaryButton"
                label={t('Cancel')}
                handleClick={addViewhandle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addwidget
