import React, { useState, useMemo, useEffect } from "react";
import Inner from "../layout/inner";
import ProjectsTab from "../projectspage/projectstab";
import { withErrorHandler } from '@frontrolinc/pace-ui-framework'
import { useTranslation } from 'react-i18next';
import Footer from "../layout/footer";
import { useTitle } from "../../hooks/useTitle";


const Projects = ({}) => {
  const [isCollepse, setIsCollepse] = useState(true);
  const [isExpand, setIsExpand] = useState(false);
  const { t } = useTranslation(['label']);

  const collepsExpandeHandler = () => {
    setIsCollepse(!isCollepse);
    setIsExpand(!isExpand);
  };

  useTitle(t('Projects'))

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
                    {t("Projects")}
                  </h1>
                </div>
              </div>
            </div>
            <ProjectsTab />
          </div>

          <div></div>
          <Footer />
        </div>
      </Inner>
    </>
  );
};

export default withErrorHandler(Projects, null)

// export default Projects;
