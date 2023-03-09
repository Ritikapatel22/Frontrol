import React, { useState, useEffect, useRef } from 'react'
import Recent from './recent'
import Favorites from './favorites'
import MyProject from './myProject'
import {
  Skeleton,
  Tabs,
  TabPanel,
  Tab,
  TabList,
  usePersonalization,
  withErrorHandler,
} from '@frontrolinc/pace-ui-framework'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeProjectsView,
  changeRecentsView,
  changeFavouritesView,
  changeFavoutiteFlag,
} from '../../slices/projectListSlice'
import { useFetchDataQuery, useUpdateDataMutation } from '../../app/appApi'
import { Toast } from '../Common/toast'
import { useTranslation } from 'react-i18next';

function ProjectsTab() {
  const [update, { data }] = useUpdateDataMutation()
  const { setCategory } = usePersonalization()
  const projectList = useRef(null)
  const recents = useRef(null)
  const favourites = useRef(null)
  const type = useRef(null)
  const { t } = useTranslation(['label']);

  projectList.current = useSelector((state) => state.projectList.myProjects)
  recents.current = useSelector((state) => state.projectList.recents)
  favourites.current = useSelector((state) => state.projectList.favourites)
  const dispatch = useDispatch()

  const queryBody = [
    {
      queryName: 'FntlFavourites.ProjectList',
    },
    {
      queryName: 'FntlRecents.ProjectList',
    },
    {
      queryName: 'ProjectList.MyProjects',
    },
  ]
  queryBody.__config__ = {
    providesTags: () => ['Projects'],
  }

  let queryResponse = useFetchDataQuery(queryBody)

  useEffect(() => {
    setCategory('project_list')
    queryResponse.refetch() 
  }, [])

  useEffect(() => {
    if (queryResponse?.data?.Status === 'ERROR') {
      throw queryResponse.data.Message
    }
  }, [queryResponse?.data?.Status])

  useEffect(() => {
    onDataSave()
  }, [data])

  useEffect(() => {
    if (
      queryResponse.data &&
      queryResponse.data.Data &&
      queryResponse.data.Data['ProjectList.MyProjects'] &&
      Array.isArray(queryResponse.data.Data['ProjectList.MyProjects'])
    ) {
      dispatch(
        changeProjectsView(queryResponse.data.Data['ProjectList.MyProjects']),
      )
    }
    if (
      queryResponse.data &&
      queryResponse.data.Data &&
      queryResponse.data.Data['FntlFavourites.ProjectList'] &&
      Array.isArray(queryResponse.data.Data['FntlFavourites.ProjectList'])
    ) {
      dispatch(
        changeFavouritesView(
          queryResponse.data.Data['FntlFavourites.ProjectList'],
        ),
      )
    }
    if (
      queryResponse.data &&
      queryResponse.data.Data &&
      queryResponse.data.Data['FntlRecents.ProjectList'] &&
      Array.isArray(queryResponse.data.Data['FntlRecents.ProjectList'])
    ) {
      dispatch(
        changeRecentsView(queryResponse.data.Data['FntlRecents.ProjectList']),
      )
    }
  }, [queryResponse.data])

  function removeHandler(e) {
    type.current = { mode: 'delete', id: e.data.project_id }
    const apiData = [
      {
        FntlRecents: {
          object_type: 'Project',
          object_id2: '',
          object_id3: '',
          CRUD: 'D',
        },
      },
    ]

    apiData[0]['FntlRecents']['object_id1'] = e.data.project_id
    update({ name: { documentName: 'FntlRecents' }, body: apiData})
  }

  function onDataSave() {
    if (!type || !type.current || !data) {
      return
    }
    if (data.Status === 'SUCCESS') {
      if (type.current.mode === 'delete') {
        const updatedRecents = recents.current.filter(
          (ele) => type.current.id !== ele.project_id,
        )
        dispatch(changeRecentsView(updatedRecents))
      } else {
        dispatch(
          changeFavoutiteFlag({
            flag: type.current.flag,
            projectId: type.current.id,
          }),
        )
      }
      type.current = null
    } else {
      let errorMsg = data.Message ? data.Message : 'Something went wrong!!!'
      if (
        data &&
        data.Message &&
        Array.isArray(data.Message) &&
        typeof data.Message !== 'string'
      ) {
        errorMsg = JSON.stringify(data.Message)
      }
      Toast('error', errorMsg)
    }
  }

  function addToFavourite(e) {
    const flag = e.data?.favourite_flag === 'Y' ? 'N' : 'Y'
    type.current = { mode: 'add', id: e.data.project_id, flag }
    const apiData = [
      {
        FntlFavourites: {
          object_id3: '',
          object_type: 'Project',
          object_id2: '',
        },
      },
    ]
    apiData[0]['FntlFavourites']['object_id1'] = e.data.project_id

    if (flag === 'Y') {
      apiData[0]['FntlFavourites']['CRUD'] = 'C'
    } else {
      apiData[0]['FntlFavourites']['CRUD'] = 'D'
    }
    console.log("here", apiData);
    update({
      name: { documentName: 'FntlFavourites' },
      body: apiData,
      __config__: {
        invalidatesTags: () => ['Projects', 'FntlFavourites.ObjectList', 'projectInfo'],
      },
    })
  }
  const config = {
    type: 'dashboardWidget',
    layout: '',
    tabs: 3,
    isFullWidth: true,
  }

  return (
    <div className="my-[10px] mx-[30px]">
      {queryResponse.isLoading ? (
        <Skeleton {...config} />
      ) : (
        <Tabs defaultSelected="1" className="tab-context">
          <TabList>
            <Tab id="1">{t("Recent")}</Tab>
            <Tab id="2">{t("Favorites")}</Tab>
            <Tab id="3">{t("My projects")}</Tab>
          </TabList>
          <TabPanel id="1">
            <Recent
              row={recents.current}
              removeHandler={removeHandler}
              addToFavourite={addToFavourite}
            />
          </TabPanel>
          <TabPanel id="2" panel="second">
            <Favorites
              row={favourites.current}
              addToFavourite={addToFavourite}
            />
          </TabPanel>
          <TabPanel id="3">
            <MyProject
              row={projectList.current}
              addToFavourite={addToFavourite}
            />
          </TabPanel>
        </Tabs>
      )}
    </div>
  )
}

export default withErrorHandler(ProjectsTab, null)

// export default ProjectsTab;
