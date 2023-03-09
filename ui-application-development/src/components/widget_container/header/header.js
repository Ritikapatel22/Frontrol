import React, { useCallback, useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import svgIcon from '../../../assets/Symbol/svgIcon'
import pdf from '../../../assets/Images/pdf.svg'
import file from '../../../assets/Images/document.svg'
import image from '../../../assets/Images/image.svg'
import help2 from '../../../assets/Images/open_in_new.svg'
import ChartModel from '../../modal/chartModel'
import global from '../../../assets/Images/global.svg'
import calender from '../../../assets/Images/calender.svg'
import pen from '../../../assets/Images/pencil.svg'
import filter from '../../../assets/Images/filter.svg'
import cancel from '../../../assets/Images/cancel_24px.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWidget } from '../../../slices/viewslice'
import { duplicateWidget } from '../../../slices/viewslice'
import Loading from '../../loadingscreen/loading'
import useOnClickOutside from '../../../hooks/useOutside'
import del from '../../../assets/Images/deleteicon.svg'
import maximize from '../../../assets/Images/maximize.svg'
import miniscreen from '../../../assets/Images/miniscreen.svg'
import { useGetDataQuery } from '../../../app/appApi'
import { getPortfolioID } from '../../../helpers/utils'
import { Button } from '../../Common'
import { useTranslation } from 'react-i18next'
import {
  getQueryStringValue,
  setQueryStringValue,
  useCustomization,
  showConfirmation,
} from '@frontrolinc/pace-ui-framework'
import {widgetslices} from "../../../slices/widgetslice"

export function Header({
  widgetName,
  widget,
  id,
  handleExportOption,
  isFullScreen,
  setIsFullScreen,
  modal,
  setModal,
  setFullScreen,
  cursor,
  isOpen,
  fullScreen,
  block,
  type,
  projectNumber,
}) {
  const [popUp, setPopUp] = useState(false)
  const [exportmodal, setExportmodal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [filterCount, setFilterCount] = useState('')
  const [invoice, setInvoice] = useState(false)
  const [exportAs, setExportAs] = useState('')
  const [tabCount, setTabCount] = useState(0)
  block.setIsFetching = setIsFetching
  block.setFilterCount = setFilterCount
  block.setInvoice = setInvoice
  const ref = useRef(null)
  const { t } = useTranslation(['label', 'message'])
  const refExpt = useRef(null)
  const dispatch = useDispatch()
  const fWidgetId = getQueryStringValue('fullScreenWidgetid')
  let selectedView = useSelector((state) => state.view?.selectedView)
  const wSlice = widgetslices.find((data) => data.component === widget.componentKey)
  const selectedPortfolio = useSelector(
    (state) => state.portfolio?.selectedPortfolio,
  )
  const widgetMaximizedState = useRef({
    state: 'pristine',
  })

  if (projectNumber) {
    block.projectNumber = projectNumber
  } else {
    block.portfolioName = selectedPortfolio?.portfolio_name.substring(0, 15)
  }
  
  useEffect(() => {
  if(block.exportAs)
  setExportAs(block.exportAs)
  }, [block.selectedTab])

  useEffect(() => {
  setTabCount(block.tabsCount)
  }, [block.tabsCount])
  useEffect(() => {
    modal
      ? (document.querySelector('body').style.overflow = 'hidden')
      : (document.querySelector('body').style.overflow = 'auto')
  }, [modal])

  useEffect(() => {
    if (getQueryStringValue('portfolio')) {
      if (isFullScreen) {
        setQueryStringValue('fullScreenWidgetid', id)
      } else if (fWidgetId === id) {
        setQueryStringValue('fullScreenWidgetid', undefined)
      }
    }
  }, [isFullScreen])

  const { syncToDataBase } = useCustomization()

  const handlefullwidth = () => {
    // widgetMaximizedState.current.state = "touched";
    // setFullScreen(isFullScreen ? false : true);
    setTimeout(() => {
      setIsFullScreen(!isFullScreen)
    }, 1000)
  }

  // if (
  //   !isFullScreen &&
  //   fWidgetId === id &&
  //   widgetMaximizedState.current.state === "pristine"
  // ) {
  //   handlefullwidth();
  // }

  const exportHandler = (e) => {
    // handleExportOption(type);
    setExportmodal(false)
    if (e !== 'all') {
      block.onClickExport(e)
    } else {
      block.onExport()
    }
  }

  const handleAddCard = (id) => {
    setPopUp(false)
    dispatch(duplicateWidget({ id, syncToDataBase }))
    setPopUp(false)
    setIsLoading(!isLoading)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  useOnClickOutside(ref, () => setPopUp(false))
  useOnClickOutside(refExpt, () => {
    handleExportOption('')
    setExportmodal(false)
  })

  const handleDeleteClick = (id) => {
    setPopUp(false)
    showConfirmation({
      msg: t('delete warning widget', { ns: 'message' }),
      title: t('delete widget', { ns: 'message' }),
      onConfirm: () => {
        console.log('Confirmation result: confirmed')
        dispatch(deleteWidget({ id, syncToDataBase }))
        setPopUp(false)
        setIsLoading(!isLoading)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      },
      onClose: () => {
        console.log('close widget delete popup')
      },
      confirmLabel: t('Yes'),
      cancelLabel: t('No'),
    })
  }

  const handleSettingBtn = useCallback(() => {
    setModal(!modal)
    setPopUp(false)
  }, [modal, popUp])

  const clearFilter = () => {
    if (block.onClearFilter) {
      block.onClearFilter()
    }
  }
  const localLang = localStorage.getItem('i18nextLng')

  const handleRequestClose = () => {
    setPopUp(false)
  }

  const getPrefix = () => {
    if (isFullScreen && type === 'project' && projectNumber) {
      return projectNumber + ': '
    } else if (isFullScreen && type === 'Portfolio') {
      return selectedPortfolio?.portfolio_name.substring(0, 30) + ': '
    }
  }
  return (
    <>
      <div
        className={`flex flex-wrap sm:px-6 px-2.4 border-1 solid lightgraygreen items-center  ${cursor} ${
          isFullScreen ? 'fullscreen-header hover:shadow-lg ' : ''
        }`}
      >
        <div
          className={` ${
            isFullScreen
              ? 'cursor-default select-text'
              : 'cursor-grab flex items-center w-auto top-[35px] left-[24px]  z-10'
          }`}
          draggable={isOpen || modal || fullScreen ? false : true}
        >
          <img
            className={`${isFullScreen ? 'hidden ' : ''}`}
            src={svgIcon.dots.default}
            alt="dots"
            draggable={false}
          />
          <h2
            className={`text-base font-medium sm:text-[18px] font-Inter tracking-[-0.005em] text-left leading-[24px] ${
              isFullScreen ? 'ml-0 cursor-text' : 'ml-2 '
            } mr-2 text-[#11414a] `}
          >
            {getPrefix()}
            {!widget.isModified
              ? t(`${widget.componentKey}_title`, { ns: 'message' })
              : widget.name}
          </h2>
        </div>
        <div className="group-one relative ">
          <div>
            <img src={svgIcon.info.default} alt="info" draggable={false} />
          </div>
          <div className="group-one-hover w-[313px] top-[30px] left-[-34px]  dropdown-menu absolute hidden h-auto z-10 py-[12px] px-[17px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
            <div className="relative">
              <p className="font-Inter leading-[16.38px]">
                {!widget.isModified
                  ? t(`${widget.componentKey}_desc`, { ns: 'message' })
                  : widget.description}
              </p>
              <div className="bg-black top-[-15px] z-[-1] left-[15px] rotate-45 absolute w-[20px] h-[20px]"></div>
            </div>
          </div>
        </div>
        {!isFetching ? (
          <div
            className={`${
              !isFetching ? `flex items-center ml-auto` : 'display-none '
            }`}
          >
            <div className="relative">
              <div className="group flex relative">
                <div className="text-[#646363] text-sm flex items-center mr-[13px] font-Inter text-[-12px]">
                  {filterCount && !invoice && (
                    <h3 className="ml-1 font-Inter flex">
                      {filterCount}
                      <div
                        className="group-one relative z-[2] cursor-pointer"
                        onClick={clearFilter}
                      >
                        <img src={filter} alt="filter" className="ml-2" />
                        <img
                          src={cancel}
                          alt="filter"
                          className="ml-2 absolute top-[4px] left-[8px]"
                        />
                        <div className=" group-one-hover  w-[85px] top-[30px] left-[-28px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                          <div className="relative">
                            <p className="font-Inter leading-[16.38px] text-center text-xs">
                              {t('Clear filter')}
                            </p>
                            <div className="bg-black top-[-11px] z-[-1] left-[28px] rotate-45 absolute w-[15px] h-[15px]"></div>
                          </div>
                        </div>
                      </div>
                    </h3>
                  )}
                </div>

                <div className=" group-one relative">
                  <img
                    src={svgIcon.download.default}
                    alt="download"
                    className="mr-[15px] mt-[-2px] cursor-pointer hover:bg-[#E6F3F0] w-[28px]"
                    onClick={() => {
                      // exportHandler()
                      setExportmodal(true)
                    }}
                  />
                  <div className=" group-one-hover  w-[85px] top-[30px] left-[-28px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                    <div className="relative">
                      <p className="font-Inter leading-[16.38px] text-center text-xs">
                        {t('Export data')}
                      </p>
                      <div className="bg-black top-[-11px] z-[-1] left-[28px] rotate-45 absolute w-[15px] h-[15px]"></div>
                    </div>
                  </div>
                </div>
              </div>
              {exportmodal && (
                <div
                  ref={refExpt}
                  className={`export bg-white absolute -top-[13px] right-[60px] ${localLang === 'fn' ? 'w-[185px]' :' w-[152px]'} z-[97] rounded`}
                >
                  <div className="relative z-10 before:absolute before:content-[''] before:top-[8px] before:rotate-45 before:-right-[5px] before:bg-white before:h-[40px] before:w-[40px] before:-z-10">
                    <p className="pt-3 pb-1 pl-[15px] text-sm font-medium">Export as</p>
                   {exportAs !== 'png' && <div><div className="py-3 pl-[15px] cursor-pointer hover:bg-[#E6F3F0]" onClick={() => exportHandler("xls")}>
                      <Button
                        icon={calender}
                        iconLabel="delete"
                        label={t("Excel")}
                        handleClick={() => exportHandler("xls")}
                      />
                    </div>
                    <hr className="bg-darkgrey"></hr>
                    </div>
                  }
                    {exportAs !== 'png' && <div><div className="py-3 pl-[15px] cursor-pointer hover:bg-[#E6F3F0]" onClick={() => exportHandler("csv")}>
                      <Button
                        icon={pdf}
                        iconLabel="delete"
                        label={t("CSV")}
                        handleClick={() => exportHandler("csv")}
                      />
                    </div>
                    <hr className="bg-darkgrey"></hr>
                    </div>
                  }
                    {exportAs === 'png' && <div><div className="flex py-3 pl-[15px] cursor-pointer hover:bg-[#E6F3F0]" onClick={() => exportHandler("png")}>
                      <Button
                        icon={image}
                        iconLabel="Duplicate"
                        label={t("PNG image")}
                        handleClick={() => exportHandler("png")}
                      />
                     
                    </div>
                    <hr className="bg-darkgrey"></hr>
                    </div>
                  }
                   {exportAs === 'png' && <div><div className="flex py-3 pl-[15px] cursor-pointer hover:bg-[#E6F3F0]" onClick={() => exportHandler("jpg")}>
                      <Button
                        icon={image}
                        iconLabel="Duplicate"
                        label={t("JPG image")}
                        handleClick={() => exportHandler("jpg")}
                      />
                    </div> 
                    <hr className="bg-darkgrey"></hr>
                    </div>
                  }
                  {tabCount> 1 && 
                    <div className="flex py-3 pl-[15px] cursor-pointer hover:bg-[#E6F3F0]" onClick={() => exportHandler("all")}>
                      <Button
                        icon={calender}
                        iconLabel="Duplicate"
                        label={t("Excel (all tabs)")}
                        handleClick={() => exportHandler("all")}
                      />
                    </div>
                  }
                  </div>
                </div>
              )}
            </div>

            <div>
              <button>
                <div className="group-one relative">
                  <div>
                    <img
                      src={isFullScreen ? miniscreen : maximize}
                      alt="maximize"
                      className="mr-[15px] mt-[3.7px] w-[28px] hover:bg-[#E6F3F0]"
                      onClick={() => handlefullwidth(false)}
                    />
                  </div>
                  <div
                    className={`group-one-hover ${
                      !isFullScreen
                        ? 'w-[79px] left-[-23.6px]'
                        : 'w-[120px] left-[-44.6px]'
                    } top-[35px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm `}
                  >
                    <div className="relative">
                      <p className="font-Inter leading-[16.38px] text-center text-xs">
                        {!isFullScreen
                          ? t('Full screen')
                          : t('Exit full screen')}
                      </p>
                      <div
                        className={`bg-black top-[-11px] z-[-1] ${
                          !isFullScreen ? 'left-[25px]' : 'left-[45px]'
                        }  rotate-45 absolute w-[15px] h-[15px]`}
                      ></div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <div className="relative group-one">
              <div className="hover:bg-[#E6F3F0] w-[28px] h-[28px] flex justify-center item-center">
                <img
                  src={svgIcon.more.default}
                  alt="s"
                  className="cursor-pointer px-[5px] w-[28px]"
                  onClick={() => setPopUp(true)}
                />
                <div className="group-one-hover w-[48px] top-[28px] my-[8px] left-[-15px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                  <div className="relative">
                    <p className="font-Inter leading-[16.38px] text-center text-xs">
                      {t('More')}
                    </p>
                    <div className="bg-black top-[-11px] z-[-1] left-[12px] rotate-45 absolute w-[15px] h-[15px]"></div>
                  </div>
                </div>
              </div>
              {popUp && (
                <div ref={ref}>
                  <div onClick={() => setPopUp(true)}></div>
                  <div className="export bg-white absolute -top-[10px] right-[40px] w-[140px] z-[97]">
                    <div className="relative z-10 before:absolute before:content-[''] before:top-[8px] before:rotate-45 before:-right-[5px] before:bg-white before:h-[40px] before:w-[40px] before:-z-10">
                      {!isFullScreen && (
                        <div
                          className="py-3 pt-5 pl-[10px] hover:bg-[#E6F3F0] cursor-pointer"
                          onClick={() => handleDeleteClick(id)}
                        >
                          <Button
                            icon={del}
                            iconLabel="delete"
                            label={t('Delete')}
                            // handleClick={() => handleDeleteClick(id)}
                          />
                        </div>
                      )}
                      <hr className="bg-darkgrey"></hr>
                      <div
                        className="py-3 pl-[10px] hover:bg-[#E6F3F0] cursor-pointer"
                        onClick={handleSettingBtn}
                      >
                        <div className="relative">
                          <Button
                            icon={global}
                            iconLabel="delete"
                            label={t('Settings')}
                            // handleClick={handleSettingBtn}
                          />
                          <div
                            className="absolute top-1 left-[6px]"
                            // onClick={handleSettingBtn}
                          >
                            <img src={pen} alt="pencil" />
                          </div>
                        </div>
                      </div>
                      <hr className="bg-darkgrey"></hr>
                      {!isFullScreen && (
                        <div
                          className="py-3 pl-[10px] hover:bg-[#E6F3F0] cursor-pointer"
                          onClick={() => {
                            handleAddCard(id)
                          }}
                        >
                          <Button
                            icon={file}
                            iconLabel="Duplicate"
                            label={t('Duplicate')}
                            // handleClick={() => handleAddCard(id)}
                          />
                        </div>
                      )}
                      <hr className="bg-darkgrey"></hr>
                      <div
                        className="flex py-3 pl-[10px] hover:bg-[#E6F3F0] cursor-pointer"
                        onClick={() => {
                          setPopUp(false)
                          wSlice.helpUrl
                            ? window.open(
                                `/view-file?filename=${wSlice.helpUrl}&page=${wSlice.name}`,
                                '_blank',
                              )
                            : ''
                        }}
                      >
                        <Button
                          icon={help2}
                          iconLabel="Help"
                          label={t('Help')}
                          handleClick={() => {
                            setPopUp(false)
                            wSlice.helpUrl
                              ? window.open(
                                  `/view-file?filename=${wSlice.helpUrl}&page=${wSlice.name}`,
                                  '_blank',
                                )
                              : ''
                          }}
                        />
                      </div>
                      <hr className="bg-darkgrey"></hr>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-[6.7px]"></div>
        )}
      </div>
      {isLoading && <Loading />}
      {modal && (
        <ChartModel
          modal={modal}
          widget={widget}
          setModal={setModal}
          componentName={widgetName}
        />
      )}
    </>
  )
}

Header.propTypes = {
  widgetName: PropTypes.string,
}