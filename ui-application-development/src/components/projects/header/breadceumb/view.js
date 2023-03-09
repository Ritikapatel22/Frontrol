import React from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
function View({
  projectSelectedView,
  selectedView2,
  handleViewBtnClick,
  setViewOpen,
}) {

  const { t } = useTranslation(['label']);
  const selectedView = useSelector((state) => state.view.selectedView)
  return (
    <div className="portofolio block sm:flex pl-5 mr-0 justify-end">
      <div className="cursor-pointer mr-[25px]">
        <div className="select_portofolio shadow hover:shadow-lg relative w-full sm:w-[275px] flex bg-white rounded ">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleViewBtnClick();
            }}
            className="cursor-pointer relative mt-6 sm:mt-0 select_portofolio flex w-full sm:w-[275px] hover:shadow-lg  bg-[#e4eaec] rounded ml-0 "
          >
            <div className="flex items-center bg-[#00323b] text-white font-normal text-sm  rounded-l font-Inter px-7 py-2">
              <span className="display-content">{t("View")}</span>
            </div>
            <div
              className="w-full"
              onClick={(e) => {
                // setViewOpen(true);
                e.preventDefault();
                handleViewBtnClick();
              }}
            >
              <div className="font-Inter group w-full border border-transparent pr-[20px] -mr-[17px] rounded-r   bg-white   pl-[10px]  items-center h-[36px] flex text-sm">
                {selectedView && (
                  <span className="text-ellipsis text-left block w-full overflow-hidden whitespace-nowrap">
                    {
                      (selectedView?.view_name)?.length > 23 ? (selectedView?.view_name).slice(0, 16)+ "..." : (selectedView?.view_name).slice(0, 23)
                    }
                  </span>
                )}
                {selectedView?.view_name && <div className="group-hover:block w-[100px] top-[50px] left-[50%] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                  <div className="relative">
                    <p className="font-Inter leading-[16.38px] text-center text-xs">
                      {selectedView?.view_name}
                    </p>
                    <div className="bg-black top-[-11px] z-[-1] left-[28px] rotate-45 absolute w-[15px] h-[15px]"></div>
                  </div>
                </div>}
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-[7px] px-2 flex items-center">
                <i className="fa-solid fa-caret-right text-slate-700"></i>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
View.defaultProps = {
  handleViewBtnClick: function (e) {
    return e;
  },
};

export default View;
View.propTypes = {
  handleViewBtnClick: PropTypes.func,
  selectedView2: PropTypes.string,
  setOpen: PropTypes.bool,
};
