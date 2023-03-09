import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { useTranslation } from 'react-i18next';

export function DashboardHeader({ projects, routeName }) {
  const { t } = useTranslation(['label']);
  return (
    <div className="dashboard block items-center justify-between pl-3 sm:pl-[27px] sm:pr-9 lg:pr-5">
      <div className="title">
        <h1 className="text-base sm:text-[1.20rem] xl:text-2xl font-Inter text-green m-0 font-bold">
          {routeName != "/" ? <>{t("Portfolio dashboard")}</> : ""}
          <span className="text-[#646363] text-[12px] font-normal mr-[13px] ml-3 font-Inter">
            {!projects ? 0 : projects} <>{t("Projects")}</>
          </span>
        </h1>
      </div>
    </div>
  )
}

DashboardHeader.propTypes = {
  projects: PropTypes.number,
  routeName: PropTypes.string,
}
