import React from "react";
import rocket from "../../assets/Images/rocket.svg";
import flow from "../../assets/Images/flow.svg";
import arrow_left from "../../assets/Images/arrow_left.svg";
import admin from "../../assets/Images/admin.svg"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Collapse = (props) => {
  const userProfile = useSelector((state) => state?.loginAuth?.userProfile)
  
  return (
    <>
      <div className="sidebar fixed top-[125px] sm:top-[74px] bg-[#00353e] left-0 ">
        <div className="h-full version w-[240px]">
          <div
            onClick={props.collepsExpandeHandler}
            className="absolute cursor-pointer right-0 bottom-[33px] z-[99]"
          >
            <img src={arrow_left} alt="arrow_left" />
          </div>
          <div className="text-center">
            <div className="flex items-center portofolio bg-[#002228] py-[22px] pl-7 h-[64px]">
              <img src={rocket} alt="rocket" />
              <Link to="/">
                <button
                  onClick={() => {
                    // setIsColour("Portfolio");
                    // props.setflow("Portfolio");
                  }}
                  className={`text-white text-lg  font-medium font-Inter pl-3.5 `}
                >
                  Portfolio
                </button>
              </Link>
            </div>
            <div className="flex items-center  text-white text-xl py-[22px] pl-7 h-[64px]">
              <img
                src={flow}
                alt="flow"
              // onClick={() => props.setProject(!props.project)}
              />
              <Link
                onClick={() => {
                  props.setProject(!props.project);
                  // props.setflow("Project");
                  window.localStorage.setItem("sideBarHighlight", "Project")
                }}
                to="/projects"
                className={`flex items-center text-white text-lg font-medium font-Inter  pl-3.5 h-[64px] `}
              >
                Projects
              </Link>
            </div>
          </div>
         {userProfile?.admin_flag !== 'Y' && <div className="flex items-center absolute bottom-2 left-[26px]">
            <img src={admin} alt="admin" />
            <Link
              onClick={() => {
                props.setProject(!props.project);
                // props.setflow("Admin");
                window.localStorage.setItem("sideBarHighlight", "Admin console")
              }}
              to="/admin"
              className={`flex items-center text-white text-lg font-medium font-Inter  pl-3.5 h-[64px] `}
            >
              <h3 className="text-white text-lg font-Inter mt-[2px] font-medium">
              Admin console
              </h3>
            </Link>
          </div>}
          <div className="absolute cursor-pointer bottom-[30px] text-white w-full text-center z-[99] font-Inter">
          </div>
        </div>
      </div>
    </>
  );
};

export default Collapse;
