import React, { useEffect, useState } from "react";
import rocket from "../../assets/Images/rocket.svg";
import flowIcon from "../../assets/Images/flow.svg";
import Collapse from "./Collapse";
import arrow_left from "../../assets/Images/arrow_left.svg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "../../slices/portfolioslice";
import admin from "../../assets/Images/admin.svg";
import header_logo from "../../assets/Images/collapse.svg";
import sidebar_arrow from "../../assets/Images/sidebar-arrow.png";
import sidebar_arrow_reverse from "../../assets/Images/sidebar-arrow-reverse.png";
import { useTranslation } from 'react-i18next';

const Sidebar = ({
  isCollepse,
  collepsExpandeHandler,
  isExpand,
  project,
  setProject,
  setflow,
  flow,
}) => {
  const { t } = useTranslation(['label']);
  const dispatch = useDispatch();
  const location = useLocation();
  const projectID = window.location.href.split("/project")[1];
  const userProfile = useSelector((state) => state?.loginAuth?.userProfile);
  const portfolioID = useSelector(
    (state) => state.portfolio.selectedPortfolio?.portfolio_id
  );
  const viewID = useSelector(
    (state) => state.view.selectedView?.view_id
  );

  const header = document.getElementById('sidebar')
  const stickyHeader = header?.offsetTop

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 30) {
        header.classList.remove("sidebar")
        // header.classList.add("sidebar-scroll")
        header.classList.remove("top-[56px]")
        header.classList.add("top-[0px]")
        header.classList.add("h-[100vh]")
        header.classList.add('scroll-smooth')
      } else {
        header.classList.add("sidebar")
        // header.classList.remove("sidebar-scroll")
        header.classList.remove("top-[0px]")
        header.classList.remove("h-[100vh]")
        header.classList.add("top-[56px]")
        header.classList.add("scroll-smooth")
      }
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [stickyHeader, header]);

  const generatePath = () => {
    let path = '/';
    if (portfolioID) {
      path += `?portfolio=${portfolioID}`
    }
    if (viewID) {
      if (portfolioID) {
        path += '&'
      } else {
        path += '?'
      }
      path += `view=${viewID}`
    }
    return path;
  }
  return (
    <div
      className={`fixed ${window.pageYOffset > 30 ? "top-0 h-[100vh]" : "top-[56px] sidebar"} z-[99] duration-500 ease-in-out transition-all transform ${
        isExpand ? "w-[240px]" : "w-[70px]"
      }`}
      id="sidebar"
    >
      {/* <div className={`bg-white h-[55px] justify-center flex items-center pb-[3px] !w-[72px] ${!show && "hidden"}`}>
        <img
          src={header_logo}
          alt="header_logo"
          className="w-[30px] lg:w-[31px]"
        />
      </div> */}
      <div className="h-full version bg-[#00353e] ">
        <div className="absolute right-[-20px] bottom-[-8px] z-[99]">
          <button onClick={collepsExpandeHandler}>
            {isExpand ? (
              <img src={sidebar_arrow_reverse} alt="arrow_left" />
            ) : (
              <img src={sidebar_arrow} alt="arrow_left" />
            )}
          </button>
        </div>
        <div className="text-center relative h-full flex flex-col justify-between">
          <div>
            <div
              onClick={() => {
                // setflow("Portfolio")
                // window.localStorage.setItem("sideBarHighlight", "Portfolio");
                dispatch(setRoute('Portfolio dashboard'));
              }}
              className={`portofolio group-one relative ${
                location.pathname === "/" ? " bg-[#002228]" : " "
              } p-5 pt-[22px] pb-[22px]`}
            >
              <div
                className={`group-one relative ${
                  isExpand && "flex items-center portofolio"
                }`}
              >
                <Link
                  to={`${generatePath()}`}
                >
                  <img src={rocket} alt="rocket" className="m-auto" />
                </Link>
                {isExpand && (
                  <Link to="/">
                    <button
                      onClick={() => {
                        // setIsColour("Portfolio");
                        // props.setflow("Portfolio");
                      }}
                      className={`text-white text-lg  font-medium font-Inter pl-3.5 `}
                    >
                      {t("Portfolio")}
                    </button>
                  </Link>
                )}
              </div>
              {isCollepse && (
                <div className="group-one-hover w-[170px] top-[12px] left-[80px] hidden dropdown-menu absolute h-auto z-10 py-[12px] px-[17px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                  <div className="relative">
                    <p className="font-Inter leading-[16.38px]">
                      {t("Portfolio dashboard")}
                    </p>
                    <div className="bg-black top-[2px] z-[-1] left-[-22px] rotate-45 absolute w-[12px] h-[12px]"></div>
                  </div>
                </div>
              )}
            </div>
            <div
              onClick={() => {
                // setflow("Project")
                // window.localStorage.setItem("sideBarHighlight", "Project")
                dispatch(setRoute(location.pathname));
              }}
              className={`text-white text-lg p-5 group-one relative ${
                location.pathname === "/project" || projectID
                  ? " bg-[#002228]"
                  : ""
              } pt-[22px] pb-[22px]`}
            >
              <div
                className={`group-one relative z-10  ${
                  isExpand && "flex items-center portofolio"
                }`}
              >
                <Link to="/projects">
                  <img src={flowIcon} alt="flow" className="m-auto" />
                </Link>
                {isExpand && (
                  <Link
                    onClick={() => {
                      props.setProject(!props.project);
                      // props.setflow("Project");
                      window.localStorage.setItem(
                        "sideBarHighlight",
                        "Project"
                      );
                    }}
                    to="/projects"
                    className={`flex items-center text-white text-lg font-medium font-Inter  pl-3.5`}
                  >
                    {t("Projects")}
                  </Link>
                )}
              </div>
              {isCollepse && (
                <div className="group-one-hover w-[100px] top-[12px] left-[80px] hidden dropdown-menu absolute h-auto z-10 py-[12px] px-[17px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                  <div className="relative">
                    <p className="font-Inter leading-[16.38px]">{t("Projects")}</p>
                    <div className="bg-black top-[2px] z-[-1] left-[-22px] rotate-45 absolute w-[12px] h-[12px]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {userProfile?.admin_flag === "Y" && (
            <div
              onClick={() => {
                // setflow("Project")
                // window.localStorage.setItem("sideBarHighlight", "Project")
                dispatch(setRoute(location.pathname));
              }}
              className={`text-white text-lg p-5 group-one relative ${
                location.pathname === "/admin" ? " bg-[#002228]" : ""
              } pt-[22px] pb-[22px]`}
            >
              <div
                className={`group-one relative z-10  ${
                  isExpand && "flex items-center portofolio"
                }`}
              >
                <Link to="/admin">
                  <img src={admin} alt="admin" className="m-auto" />
                </Link>
                {isExpand && (
                  <Link
                    onClick={() => {
                      props.setProject(!props.project);
                      // props.setflow("Admin");
                      window.localStorage.setItem(
                        "sideBarHighlight",
                        "Admin console"
                      );
                    }}
                    to="/admin"
                    className={`flex items-center text-white text-lg font-medium font-Inter  pl-3.5`}
                  >
                    {t("Admin console")}
                  </Link>
                )}
              </div>
              {isCollepse && (
                <div className="group-one-hover w-[150px] top-[12px] left-[90px] hidden dropdown-menu absolute h-auto z-10 py-[12px] px-[17px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                  <div className="relative">
                    <p className="font-Inter leading-[16.38px]">{t("Admin console")}</p>
                    <div className="bg-black top-[2px] z-[-1] left-[-22px] rotate-45 absolute w-[12px] h-[12px]"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="absolute bottom-[42px] cursor-pointer text-white w-full text-center z-[99]"></div>
      </div>
    </div>
  );
};

export default Sidebar;
