import React from "react";
import PropTypes from "prop-types";

import View from "../../projects/header/breadceumb/view";
import { useTranslation } from 'react-i18next';

export function DashboardSubHeader({
  handlePortfolioBtnClick,
  handleViewBtnClick,
  selectedPortFolio,
  selectedView,
  defaulview,
}) {

  const { t } = useTranslation(['label']);

  return (
    <div className="flex">
      <div className="block pl-0 mr-0 portofolio sm:flex lg:pl-5">
        <div className="cursor-pointer">
          <div className="select_portofolio shadow hover:shadow-lg relative w-full sm:w-[275px] flex bg-white rounded ">
            <button
              type="button"
              className="relative flex items-center  bg-green text-white text-sm px-[15px] rounded-l font-Inter font-normal"
              onClick={(e) => {
                e.preventDefault();
                handlePortfolioBtnClick();
              }}
            >
              <span className="display-content">{t("Portfolio")}</span>
            </button>
            <div
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                handlePortfolioBtnClick();
              }}
            >
              <div className="font-Inter group w-full border border-transparent pr-[20px] -mr-[17px] rounded-r      pl-[10px]  items-center h-[36px] flex text-sm">
                {selectedPortFolio && (
                  <span className={`text-ellipsis block ${selectedPortFolio.length> 21 ? "w-[60%]" : "w-[100%]"} overflow-hidden whitespace-nowrap`}>
                    {selectedPortFolio}
                  </span>
                )}
                <div className="group-hover:block w-auto top-[50px] left-[50%] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                  <div className="relative">
                    <p className="font-Inter leading-[16.38px] text-center text-xs">
                      {selectedPortFolio}
                    </p>
                    <div className="bg-black top-[-11px] z-[-1] left-[28px] rotate-45 absolute w-[15px] h-[15px]"></div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-[7px] px-2 flex items-center">
                <i className="fa-solid fa-caret-right text-slate-700"></i>
              </div>
            </div>
          </div>
        </div>

        {/* <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleViewBtnClick();
        }}
        className="cursor-pointer relative mt-6 sm:mt-0 select_portofolio flex w-full sm:w-[275px] hover:shadow-lg  bg-[#e4eaec] rounded ml-0 sm:ml-2 md:ml-5"
      >
        <div className="block pl-0 mr-0 portofolio sm:flex lg:pl-5">
          <div className="cursor-pointer">
            <div className="select_portofolio shadow hover:shadow-lg relative w-full sm:w-[275px] flex bg-grey rounded ">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewBtnClick();
                }}
                className="cursor-pointer relative mt-6 sm:mt-0 select_portofolio flex w-full sm:w-[275px] hover:shadow-lg  bg-[#e4eaec] rounded ml-0 sm:ml-2 md:ml-5"
              >
                <div className="flex items-center bg-[#00323b] text-white font-normal text-sm  rounded-l font-Inter px-7 py-2">
                  <span>View</span>
                </div>
                <div
                  className="w-full"
                  onClick={(e) => {
                    setOpen(true);
                    e.preventDefault();
                    handleViewBtnClick();
                  }}
                >
                  <div className="font-Inter group w-full border border-transparent pr-[20px] -mr-[17px] rounded-r   bg-white   pl-[10px]  items-center h-[36px] flex text-sm">
                    {selectedView && (
                      <option className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {selectedView}
                      </option>
                    )}
                    <div className="group-hover:block w-[100px] top-[50px] left-[50%] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                      <div className="relative">
                        <p className="font-Inter leading-[16.38px] text-center text-xs">
                          {selectedView}
                        </p>
                        <div className="bg-black top-[-11px] z-[-1] left-[28px] rotate-45 absolute w-[15px] h-[15px]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-[7px] px-2 flex items-center">
                    <i className="fa-solid fa-caret-right text-slate-700"></i>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </button> */}
      </div>
      <View
        // viewopen={viewopen}
        // setViewOpen={setViewOpen}
        handleViewBtnClick={() => handleViewBtnClick()}
        selectedView={selectedView}
      />
    </div>
  );
}

DashboardSubHeader.propTypes = {
  handlePortfolioBtnClick: PropTypes.func,
  handleViewBtnClick: PropTypes.func,
  selectedPortFolio: PropTypes.string,
  selectedView: PropTypes.any,
};

DashboardSubHeader.defaultProps = {
  handlePortfolioBtnClick: function (e) {
    return e;
  },
  handleViewBtnClick: function (e) {
    return e;
  },
};
