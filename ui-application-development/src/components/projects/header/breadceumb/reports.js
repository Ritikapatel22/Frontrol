import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import svgIcon from '../../../../assets/Symbol/svgIcon'
import closeIcon from '../../../../assets/Images/close-icon.svg'

import help2 from '../../../../assets/Images/open_in_new.svg'
import filter from '../../../../assets/Images/filter.svg'
import cancel from '../../../../assets/Images/cancel_24px.svg'
import calender from '../../../../assets/Images/calender.svg'
import pdf from '../../../../assets/Images/pdf.svg'
import { Button } from '../../../Common'
import { useTranslation } from 'react-i18next';
import {
  getAllQueryStringValue,
  setQueryStringValue,
  showFullScreenLoading,
  userSettingsFactory
} from '@frontrolinc/pace-ui-framework'
import { useFilter } from '../../../Reportpage/filterContext'
import useOnClickOutside from '../../../../hooks/useOutside'
import { reportPageExportDetails } from '../../../../pages/project'

function Reports({
  exportHandler,
  isFullScreen,
  setIsFullScreen,
  projectNumber,
}) {
  const { selectedReport, refreshTime } = useSelector((state) => state.reports)
  const [exportmodal, setExportmodal] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const refExpt = useRef(null)
  const ref = useRef(null)
  const { t } = useTranslation(['label', 'message']);
  const qParams = getAllQueryStringValue()

  const dateFormat = userSettingsFactory.dateFormat;
  useOnClickOutside(ref, () => setPopUp(false))

  var  getDateString = function(date, format) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    getPaddedComp = function(comp) {
        return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
    },
    formattedDate = format,
    o = {
        "y+": date.getFullYear(), // year
        "m+": format.replace(/[^m]/g, "").length > 2 ? months[date.getMonth()] : getPaddedComp(date.getMonth()), //month
        "d+": getPaddedComp(date.getDate()), //day
        "h+": getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : date.getHours()), //hour
        "H+": getPaddedComp(date.getHours()), //hour
        "M+": getPaddedComp(date.getMinutes()), //minute
        "s+": getPaddedComp(date.getSeconds()), //second
        "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
        "b+": (date.getHours() >= 12) ? 'PM' : 'AM'
    };

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            formattedDate = formattedDate.replace(RegExp.$1, o[k]);
        }
    }
    return formattedDate;
  };

const formattedDate = (refreshDate) =>  getDateString(new Date(refreshDate), dateFormat)
const time = (refreshDate) => new Date(refreshDate).toLocaleString().split(',')

  const getLastRefreshTime = () => {
    if (selectedReport?.report_id === 1) {
      return refreshTime?.summaryDetail
        ? <><>{t("Last refresh")} : </>{formattedDate(refreshTime?.summaryDetail)+time(refreshTime?.summaryDetail)[time(refreshTime?.summaryDetail).length - 1]}</>
        : ''
    } else if (selectedReport?.report_id === 2) {
      return refreshTime?.costDetail
        ? <><>{t("Last refresh")} : </>{formattedDate(refreshTime?.costDetail)+time(refreshTime?.costDetail)[time(refreshTime?.costDetail).length - 1]}</>
        : ''
    } else if (selectedReport?.report_id === 3) {
      return refreshTime?.revenueDetail
        ? <><>{t("Last refresh")} : </>{formattedDate(refreshTime?.revenueDetail)+time(refreshTime?.revenueDetail)[time(refreshTime?.revenueDetail).length - 1]}</>
        : ''
    } else if (selectedReport?.report_id === 4) {
      return refreshTime?.resourceHrsByWeek
        ? <><>{t("Last refresh")} : </>{formattedDate(refreshTime?.resourceHrsByWeek)+time(refreshTime?.resourceHrsByWeek)[time(refreshTime?.resourceHrsByWeek).length - 1]}</>
        : ''
    }
    return ''
  }
  
  let filterContext = useFilter()

  const handleClose = () => {
    for (const key in qParams) {
      key !== 'tab' && setQueryStringValue(key, undefined)
    }
    setIsFullScreen(false)
  }

  const onExport = (param) => {
    setExportmodal(false)
    showFullScreenLoading()
    reportPageExportDetails.setExportValue(param)
    exportHandler()
  }
  const openExportModal = () => {
    setExportmodal(true)
  }

    useOnClickOutside(refExpt, () => {
    setExportmodal(false)
  })

  useEffect(() => {
    filterContext.setFilterText(null)
  }, [selectedReport])

  const clearFilter = () => {
    if (filterContext.gridRef.current) {
      let newData = [...filterContext.filteredData]
      filterContext.gridRef.current.api.setFilterModel(null)
      filterContext.gridRef.current.api.setRowData(newData)
      filterContext.gridRef.current.api.onFilterChanged()
    }
  }

  return (
    <div
      className={`portofolio block sm:flex justify-between px-[24px] lg:ml-[0px] ml-[70px] ${
        isFullScreen &&
        'border-1 solid lightgraygreen items-center fullscreen-header hover:shadow-lg'
      }`}
    >
      <div className="flex">
        <div className="cursor-pointer">
        <div className="font-medium sm:text-[18px] font-Inter tracking-[-0.005em] text-left leading-[24px] ml-0  mr-2 text-[#11414a]">
          {projectNumber} : {t(selectedReport?.report_name)}
        </div>
        </div>
        <div className="self-center mr-2 font-normal font-Inter text-lightgrey text-[11px] py-[3px] px-4">
          {getLastRefreshTime()}
        </div>
      </div>

      <div className="ml-[11px] flex items-center">
        <div className="text-[#646363] text-sm flex items-center mr-[13px] font-Inter text-[-12px]">
          {filterContext?.filterText != null && (
            <h3 className="ml-1 font-Inter flex">
              {filterContext?.filterText}
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
                      {t("Clear filter")}
                    </p>
                    <div className="bg-black top-[-11px] z-[-1] left-[28px] rotate-45 absolute w-[15px] h-[15px]"></div>
                  </div>
                </div>
              </div>
            </h3>
          )}
        </div>
        <div className="relative" onClick={openExportModal}>
          <div className="group flex relative">
            <div className=" group-one relative">
              <img
                src={svgIcon.download.default}
                alt="download"
                className="mr-[15px] mt-[-2px] cursor-pointer hover:bg-[#E6F3F0] w-[28px]"
              />
              <div className=" group-one-hover  w-[85px] top-[30px] left-[-28px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                <div className="relative">
                  <p className="font-Inter leading-[16.38px] text-center text-xs">
                    {t("Export data")}
                  </p>
                  <div className="bg-black top-[-11px] z-[-1] left-[28px] rotate-45 absolute w-[15px] h-[15px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
              {exportmodal && (
                <div
                  ref={refExpt}
                  className="export bg-white absolute top-[4px] right-[165px] w-[144px] z-[97] rounded"
                >
                  <div className="relative z-10 before:absolute before:content-[''] before:top-[8px] before:rotate-45 before:-right-[5px] before:bg-white before:h-[40px] before:w-[40px] before:-z-10">
                    <p className="pt-3 pb-1 pl-[15px] text-sm font-medium">{t("Export as")}</p>
                   <div className="py-3 pl-[15px] cursor-pointer hover:bg-[#E6F3F0]" onClick={() => onExport("xls")}>
                      <Button
                        icon={calender}
                        iconLabel="delete"
                        label={t("Excel")}
                        handleClick={() => onExport("xls")}
                      />
                    </div>
                    <hr className="bg-darkgrey"></hr>
                    <div className="py-3 pl-[15px] cursor-pointer hover:bg-[#E6F3F0]" onClick={() => onExport("csv")}>
                      <Button
                        icon={pdf}
                        iconLabel="delete"
                        label={t("CSV")}
                        handleClick={() => onExport("csv")}
                      />
                    </div>
                    <hr className="bg-darkgrey"></hr>
                  </div>
                </div>
              )}
        
        <div className="group-one relative">
          <div className="hover:bg-[#E6F3F0] w-[28px] h-[28px] flex justify-center item-center">
            <img
              src={svgIcon.more.default}
              alt="more"
              className="cursor-pointer px-[5px] w-[28px]"
              onClick={() => setPopUp(true)}
            />
            <div className="group-one-hover w-[48px] top-[28px] my-[8px] left-[-15px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
              <div className="relative">
                <p className="font-Inter leading-[16.38px] text-center text-xs">
                  {t("More")}
                </p>
                <div className="bg-black top-[-11px] z-[-1] left-[12px] rotate-45 absolute w-[15px] h-[15px]"></div>
              </div>
            </div>
          </div>
          {popUp && (
            <div ref={ref}>
              <div onClick={() => setPopUp(true)}></div>
              <div className="export bg-white absolute -top-[10px] right-[40px] w-[140px] z-[1000]">
                <div className="relative z-10 before:absolute before:content-[''] before:top-[8px] before:rotate-45 before:-right-[5px] before:bg-white before:h-[32px] before:w-[24px] before:-z-10">
                  <div
                    className="flex py-3 pl-[10px] hover:bg-[#E6F3F0]"
                    handleClick={() => {
                      setPopUp(false)
                      selectedReport?.helpUrl
                        ? window.open(selectedReport.helpUrl, '_blank')
                        : ''
                    }}
                  >
                    <Button
                      icon={help2}
                      iconLabel="Help"
                      label={t("Help")}
                      handleClick={() => {
                        setPopUp(false)
                        selectedReport?.helpUrl
                          ? window.open(`/view-file?filename=${selectedReport.helpUrl}&page=${selectedReport.report_name}`, '_blank')
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
        <div className='ml-[11px]'>
          <button>
            <div className="group-one relative">
              <div>
                <img
                  src={closeIcon}
                  alt="maximize"
                  className="mr-[15px] mt-[3.7px] w-[28px] hover:bg-[#E6F3F0]"
                  onClick={() => handleClose(false)}
                />
              </div>
              <div
                className={`group-one-hover w-[100px] left-[-44.6px] top-[35px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm `}
              >
                <div className="relative">
                  <p className="font-Inter leading-[16.38px] text-center text-xs">
                    {t("Close")}
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
      </div>
    </div>
  )
}

export default Reports
