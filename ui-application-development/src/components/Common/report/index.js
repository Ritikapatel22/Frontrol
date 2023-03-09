import React, { useState, useEffect } from 'react'

// assests
import svgIcon from '../../../assets/Symbol/svgIcon'
import { useDispatch, useSelector } from 'react-redux'
import { setReport, setSelectedfilters } from '../../../slices/reportslice'
import { useTranslation } from 'react-i18next'
import {
  useQueryString,
  getAllQueryStringValue,
  setQueryStringValue,
} from '@frontrolinc/pace-ui-framework'

function report({ reportSection }) {
  const dispatch = useDispatch()
  const { t } = useTranslation(['label', 'message'])

  const report = useSelector((state) => state.reports?.reports)
  const selected = useSelector((state) => state.reports?.selectedReport)

  const [selReport, setSelReport] = useQueryString('report')
  const qParams = getAllQueryStringValue()

  const [select, setSelect] = useState(selected)

  useEffect(() => {
    if (selReport) {
      const rep = report.find(
        ({ report_id }) => report_id === Number(selReport)
      )
      setSelect(rep)
      dispatch(setReport(rep))
    } else {
      setSelect(selected)
    }
  }, [reportSection, selReport])

  const handleClick = (report) => {
    setSelect(report)
    setSelReport(report.report_id)
    dispatch(setReport(report))
    setQueryStringValue('report', report.report_id)
    dispatch(setSelectedfilters({ report: null }))
    for (const key in qParams) {
      if (key !== 'tab' && key !== 'report') {
        setQueryStringValue(key, undefined)
      }
    }
  }

  if(qParams?.report) {
    return
  }
  
  return (
    <div className="h-[60vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[70vh] w-1/3" id='reports-container'>
      {report.map((data, index) => {
        return (
          <div
            key={data.report_id}
            id={`reports_${data.report_id}_${data.category}`}
            className={`w-[350px] highirse border mt-3 hover:shadow-lg  p-[5px] cursor-pointer mx-[10px] sm:mx-[30px] py-3.5 rounded relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0  ${
              data?.global ? 'bg-[#fff]' : ''
            }`}
            onClick={() => handleClick(data)}
          >
            <div
              className="ml-2 cursor-pointer"
              onClick={() => handleClick(data)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h1
                    onClick={() => handleClick(data)}
                    className="text-sm font-Inter font-normal cursor-pointer"
                  >
                    {t(data.report_name)}{' '}
                  </h1>
                  <div className="group-one relative ml-2 cursor-pointer">
                    <div>
                      <img
                        src={svgIcon.info.default}
                        alt="info"
                        draggable={false}
                        className="hover:bg-[#E6F3F0]"
                      />
                    </div>
                    <div className="group-one-hover w-[205px] top-[30px] left-[-34px]  dropdown-menu absolute hidden h-auto z-10 py-[12px] px-[17px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                      <div className="relative">
                        <p className="font-Inter leading-[16.38px]">
                          {t(data.category, { ns: 'message' })}
                        </p>
                        <div className="bg-black top-[-15px] z-[-1] left-[15px] rotate-45 absolute w-[20px] h-[20px]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default report
