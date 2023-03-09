import React, { useState } from 'react'
import closeIcon from '../../../assets/Images/close-icon.svg'
import actionInfoIcon from '../../../assets/Images/action_info2.svg'
import { useSelector } from 'react-redux'
import { useGetDataGenericQuery, useFetchDataQuery } from '../../../app/appApi'
import { formatDate, formatCurrency } from '../../../formatData'
import {
  getQueryConfig,
  getProjectId,
} from '../../../widgets/Shared/projectSnapshot'
import { useTranslation } from 'react-i18next'

function Info({ setOpen }) {
  const projectInfo = useSelector((state) => state.project.projectInfo)
  const { t } = useTranslation (["label"])

  // const projectID = window.location.href.split("/project/")[1];
  const projectID = getProjectId(window.location.href)

  // const { data, isFetching, isLoading } = useGetDataGenericQuery({
  //   queryName: "ProjectInfo.GetProjectInfo",
  //   projectId: parseInt(projectID), //2661661
  //   // projectId : parseInt(2661661),  //2661661
  // });

  const { data, isFetching, isLoading } = useFetchDataQuery(getQueryConfig())

  let projNumber = ''
  let projName = ''
  let projStatus = ''
  let projDesc = ''
  let projApprovedStartDate = ''
  let projApprovedEndDate = ''
  let projectForecastStartDateDisplay = ''
  let projectForecastEndDateDisplay = ''
  let projectTypeDisplay = ''
  let projectOrgDisplay = ''
  let projectKeyMember1 = ''
  let projectKeyMember2 = ''
  let projectKeyMember3 = ''
  let projectKeyMember11 = ''
  let projectKeyMember8 = ''
  let projLastInvoiceDate = ''
  let projRarFunding = ''
  let projectReviewCategory = ''
  let projAgreeAmount = ''
  let projRevOpportunity = ''
  let projLastEACDate = ''
  let projCurr = ''

  if (!isFetching && data && data.data.project.length) {
    // return <div> </div>
    projNumber = data.data.project[0].project_number
    projName = data.data.project[0].project_name
    projStatus = data.data.project[0].project_status
    projDesc = data.data.project[0].project_description
    projApprovedStartDate = formatDate(data.data.project[0].sch_start_date) ///Approved start date
    projApprovedEndDate = formatDate(data.data.project[0].sch_end_date) ///Approved end date
    projectForecastStartDateDisplay = formatDate(
      data.data.project[0].forecast_start_date,
    ) ///Forecast start date
    projectForecastEndDateDisplay = formatDate(
      data.data.project[0].forecast_end_date,
    ) ///Forecast end date
    projectTypeDisplay = data.data.project[0].project_type
    projectOrgDisplay = data.data.project[0].org_9
    projectKeyMember1 = data.data.project[0].key_member_1
    projectKeyMember3 = data.data.project[0].key_member_3
    projectKeyMember2 = data.data.project[0].key_member_2
    projectKeyMember11 = data.data.project[0].key_member_11
    projectKeyMember8 = data.data.project[0].key_member_8
    projLastInvoiceDate = formatDate(data.data.project[0].last_invoice_date)
    // projRarFunding = formatNumber2Decimal(data.data.project[0].funding_rar);
    projRarFunding = formatCurrency({ value: data.data.project[0].funding_rar })

    projectReviewCategory = data.data.project[0].class_11
    // projAgreeAmount = formatNumber2Decimal(data.data.project[0].funding);
    projAgreeAmount = formatCurrency({ value: data.data.project[0].funding })
    // projRevOpportunity  = formatCurrency(data.data.project[0].revenue_opportunity);
    projRevOpportunity = formatCurrency({
      value: data.data.project[0].revenue_opportunity,
    })
    projLastEACDate = formatDate(data.data.project[0].last_eac_date)
    //   projCurr  = data.data.project[0].last_invoice_date;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-[10px] sm:px-[25px] sm:pt-[30px] pb-5">
        <h1 className="text-2xl sm:text-2xl text-[#0e3943] flex font-bold font-Inter">
          {/* <img src={actionInfoIcon} alt="info-icon" className="mr-2.5" /> */}
          {t("Project info")}
        </h1>
        <button
          onClick={() => {
            setOpen(false)
          }}
        >
          <img
            src={closeIcon}
            alt="close-icon"
            className="hover:bg-[#E6F3F0]"
          />
        </button>
      </div>
      <div className="sm:px-[30px]">
        {
          <div className="grid grid-cols-4 gap-3 mb-2">
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Project name")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projName}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Project")}# :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projNumber}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Status")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span
                className={`${
                  projStatus != 'Approved'
                    ? 'w-[146px] text-lightred bg-darkred item-center'
                    : 'w-[71px] text-lightgreen bg-darkgrey1'
                } leading-[140%] text-xs flex px-[8px] py-[2px] h-[21px] rounded-[20px]`}
              >
                {projStatus}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Description")}:
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projDesc}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Approved start date")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projApprovedStartDate}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
               {t("Approved end date")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projApprovedEndDate}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Forecast end date" )}:
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projectForecastEndDateDisplay}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs capitalize">
                {t("Project manager")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projectKeyMember1}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Project approver")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projectKeyMember3}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Project accountant")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projectKeyMember2}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Finance lead")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projectKeyMember11}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Project biller")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projectKeyMember8}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Type")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projectTypeDisplay}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Owning organization")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projectOrgDisplay}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Review category")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projectReviewCategory}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Agreement amount")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className={`${
                  data?.data?.project[0]?.funding < 0
                    ? 'text-red leading-[140%] text-xs flex'
                    : 'text-green leading-[140%] text-xs flex'
                }`}>
                {projAgreeAmount}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("RAR funding")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className={`${
                  data?.data?.project[0]?.funding_rar < 0
                    ? 'text-red leading-[140%] text-xs flex'
                    : 'text-green leading-[140%] text-xs flex'
                }`}>
                {projRarFunding}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Revenue opportunity")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className={`${
                  data?.data?.project[0]?.revenue_opportunity < 0
                    ? 'text-red leading-[140%] text-xs flex'
                    : 'text-green leading-[140%] text-xs flex'
                }`}>
                {projRevOpportunity}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Last EAC date")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projLastEACDate}
              </span>
            </div>
            <div>
              <h6 className="text-lightgreen text-xs">
                {t("Last invoice date")} :
              </h6>
            </div>
            <div className="col-span-3 ">
              <span className="text-green leading-[140%] text-xs flex">
                {projLastInvoiceDate}
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Info
