import React, { memo, useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";
import Info from "./info";
import starIcon from "../../../assets/Images/star_border.svg";
import starfilledIcon from "../../../assets/Images/star_purple.svg";
import { Drawer } from "../../../components/Common";
import ProjectIcon from "../../../assets/Images/project.svg";
import { useFetchDataQuery, useUpdateDataMutation } from "../../../app/appApi";
import { changeFavoutiteFlag } from "../../../slices/projectListSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { BackendError, withErrorHandler } from '@frontrolinc/pace-ui-framework'
import { getQueryConfig } from "../../../widgets/Shared/projectSnapshot";

function BreadCrumb({ projectName, routeName, setProjectNumber }) {
  const [open, setOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const projectID = useParams().id;
  const dispatch = useDispatch();
  const [update, {data}] = useUpdateDataMutation();
  const { t } = useTranslation(['label']);

  const queryBody = {
    queryName: 'ProjectInfo.GetProjectInfo',
    projectId: parseInt(projectID), //2661661
    // projectId : parseInt(2661661),//2661661
    __config__: {
      providesTags: () => ['projectInfo'],
    },
  }

  let queryResponse = useFetchDataQuery(queryBody)
  let reportingQueryResponse = useFetchDataQuery(getQueryConfig())

  useEffect(() => {
    if (data) {
      setProjectDetails({
        ...projectDetails,
        favorite_flag: projectDetails.favorite_flag === 'Y' ? 'N' : 'Y',
      })
      dispatch(
        changeFavoutiteFlag({
          flag: projectDetails.favorite_flag === 'Y' ? 'N' : 'Y',
          projectId: projectID,
        }),
      )
    }
  }, [data])

  useEffect(() => {
    if (
      queryResponse?.data &&
      queryResponse?.data.Data &&
      queryResponse.data.Data['ProjectInfo.GetProjectInfo']
    ) {
      setProjectDetails(
        JSON.parse(
          JSON.stringify(queryResponse.data.Data['ProjectInfo.GetProjectInfo']),
        ),
      )
    }
  }, [queryResponse.data])

  let projNumber = ''
  let projName = ''
  let funcCurrency = ''
  

  if (queryResponse.isFetching || !projectDetails) {
    return (
      <div className="project flex items-center">
        <div className="flex items-center p-0">
          <img src={ProjectIcon} alt="project-icon" className="mr-2" />
        </div>
      </div>
    )
  }

  if (!reportingQueryResponse.isFetching && reportingQueryResponse?.data?.data?.project[0]) {
    projNumber = reportingQueryResponse.data.data.project[0].project_number
    projName = reportingQueryResponse.data.data.project[0].project_name
    funcCurrency = reportingQueryResponse.data.data.project[0].project_func_currency_code;
    setProjectNumber(projNumber)
  }

  const favoriteHandler = () => {
    const apiData = [
      {
        FntlFavourites: {
          object_id3: '',
          object_type: 'Project',
          object_id2: '',
        },
      },
    ]
    apiData[0]['FntlFavourites']['object_id1'] = projectID

    if (projectDetails.favorite_flag !== 'Y') {
      apiData[0]['FntlFavourites']['CRUD'] = 'C'
    } else {
      apiData[0]['FntlFavourites']['CRUD'] = 'D'
    }
    update({
      name: { documentName: 'FntlFavourites' },
      body: apiData,
      __config__: {
        invalidatesTags: () => ['Projects', 'FntlFavourites.ObjectList', 'projectInfo'],
      },
    })
  }

  return (
    <div className="project flex items-center">
      <div className="flex items-center p-0">
        {/* <Link to="/">
          <p className="text-lightgreen text-2xl font-bold font-Inter">
            {routeName} {">"}
          </p>
        </Link> */}
        <img src={ProjectIcon} alt="project-icon" className="mr-2" />
        <p className="text-green font-Inter font-medium text-2xl mx-0">
          {' '}
          {projNumber} ({projName})
        </p>
      </div>
      <div className="text ml-[4px]">
        <h1 className="text-green font-Inter font-medium text-2xl">
          {projectName}
        </h1>
      </div>
      <div className="flex items-center">
        <button
          className="text-sm mr-2 font-normal font-Inter bg-lightgreen text-white py-[3px] px-4 rounded-2xl hover:bg-[#015e4b]"
          onClick={() => {
            setOpen(!open)
          }}
        >
          <span className="display-content">{t("Info")}</span>
        </button>
        <Drawer isOpen={open} setIsOpen={setOpen}>
          <Info setOpen={setOpen} />
        </Drawer>
        <div
          className="cursor-pointer hover:bg-[#E6F3F0] p-1"
          onClick={favoriteHandler}
        >
          {projectDetails.favorite_flag === 'Y' ? (
            <img src={starfilledIcon} alt="starfilled icon" />
          ) : (
            <img src={starIcon} alt="startIcon" />
          )}
        </div>
        {/* <div className="text ml-[4px]"> */}
          <p className="text-lightgrey text-[11px] px-1 font-normal font-Inter sm:ml-0 ml-4 mr-1">
            {`${t("All currencies in")} ${funcCurrency}`}
          </p>
        {/* </div> */}
        
      </div>
    </div>
  )
}

BreadCrumb.propTypes = {
  projectName: PropTypes.string,
  routeName: PropTypes.string,
}
export default BreadCrumb
