import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import Inner from "../layout/inner";
import { withErrorHandler } from '@frontrolinc/pace-ui-framework'
import AdminPage from "./adminPage";
import { useTranslation } from "react-i18next";
import Footer from "../layout/footer";

const AdminConfig = ({}) => {
  const [isCollepse, setIsCollepse] = useState(true);
  const [isExpand, setIsExpand] = useState(false);
  const userProfile = useSelector((state) => state?.loginAuth?.userProfile);
  const {t} = useTranslation(['label']);
  let isAllowed = ''
  if(userProfile) {
    isAllowed = userProfile?.admin_flag === "Y";
  }
  const collepsExpandeHandler = () => {
    setIsCollepse(!isCollepse);
    setIsExpand(!isExpand);
  };

  useEffect(() => {
    document.title = t("Admin console")
  }, [])

  return (
    <>
      <Inner
        isCollepse={isCollepse}
        collepsExpandeHandler={collepsExpandeHandler}
        isExpand={isExpand}
      >
        <div
          className={
            isCollepse
              ? "main_dashboard duration-500 ease-in-out transition-all bg-[#f7f9ff] pl-16"
              : "new_dashboard duration-500 ease-in-out transition-all bg-[#f7f9ff]  pb-[29px] h-[90vh] lg:pl-60"
          }
        >
          <div className="relative ml-0 md:pl-15 ">
            <div className="xl:flex block justify-between pt-5 sm:mr-[25px] mr-3 relative items-center">
              <div className="dashboard block items-center justify-between pl-3 sm:pl-[27px] sm:pr-9 lg:pr-5">
                  <div className="title">
                    <h1 className="text-base sm:text-xl xl:text-2xl font-Inter text-green m-[-3px] font-bold ">
                      {t("Admin console")}
                    </h1>
                  </div>
              </div>
            </div>
            {(isAllowed === true || isAllowed === false) && <AdminPage isAllowed={isAllowed} />}
          </div>

          <Footer />
        </div>
      </Inner>
    </>
  );
};

export default withErrorHandler(AdminConfig, null)

// export default AdminConfig;