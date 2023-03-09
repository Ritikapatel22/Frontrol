import { useState } from 'react'
import { Widget, Grid } from '@frontrolinc/pace-ui-framework'
import { useFetchDataQuery } from '../../app/appApi'
import { getQueryConfig, getProjectId } from '../Shared/projectSnapshot'
import config from './config'
import { getTableHeight } from '../../helpers/utils'
import { populateProjWeekHierarchy } from '../../TransposeData'
import { formatDate } from '../../formatData'

function ProjectWeekCostWidget({ block }) {
  // const projectID = window.location.href.split("/project/")[1]?.split('?')[0];
  const projectID = getProjectId(window.location.href)
  // projectID.split('?')[0]

  const calculateColumns = (data) => {
    let weekCostColumns = []
    if (typeof data !== 'undefined') {
      data.filter(function (el) {
        el = {
          ...el,
          itd_total_cost: parseFloat(el.itd_fully_burdened_cost)
            ? parseFloat(el.itd_fully_burdened_cost)
            : 0 + parseFloat(el.itd_odc_subs_cost)
            ? parseFloat(el.itd_odc_subs_cost)
            : 0,
        }
        // el = {...el, avg_cost_rate :
        //   parseFloat(el.itd_fully_burdened_cost)?parseFloat(el.itd_fully_burdened_cost)/ (parseFloat(el.itd_hours)?parseFloat(el.itd_hours):1):0};
        //doing like above as the object is not extentable for some reason
        // el.itd_total_cost = parseFloat(el.itd_fully_burdened_cost)?parseFloat(el.itd_fully_burdened_cost) :0 +
        //   parseFloat(el.itd_odc_subs_cost)?parseFloat(el.itd_odc_subs_cost) :0
        // el.avg_cost_rate = parseFloat(el.itd_fully_burdened_cost)?parseFloat(el.itd_fully_burdened_cost)/ (parseFloat(el.itd_hours)?parseFloat(el.itd_hours):1):0;
        weekCostColumns.push(el)
      })
      return weekCostColumns
    }
  }

  const periodData = (response) => {
    // return response.Data["EarnedValues.PeriodInfo"][0].period;
    var responseData = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
    if (typeof response !== 'undefined') {
      response.Data['AcmTaskResource.projectLevelWeekCost']['periodSchema']
        ? (responseData = [])
        : ''
      for (
        let i = 0;
        i <
        response.Data['AcmTaskResource.projectLevelWeekCost']['periodSchema']
          .length;
        i++
      ) {
        responseData.push(
          formatDate(
            response.Data['AcmTaskResource.projectLevelWeekCost'][
              'periodSchema'
            ][i],
          ),
        )
      }
    }
    return responseData
  }

  const loaderOptions = {
    type: 'dashboardWidget',
    layout: 'grid',
    tabs: 0,
    isFullWidth: false,
  }
  const uiConfig = {
    block: block,
    loaderOptions: loaderOptions,
    widgetId: block.instanceId,
    isFullScreen: block.isFullScreen,
    queryConfig: {
      query: useFetchDataQuery,
      queryParams: {
        queryName: 'AcmTaskResource.projectLevelWeekCost',
        projectId: Number(projectID),
        __config__: {
          transformResponse: (response) => {
            if (
              response.Data['AcmTaskResource.projectLevelWeekCost'] &&
              typeof response.Data['AcmTaskResource.projectLevelWeekCost'][
                'projectLevelWeekCost'
              ] !== 'undefined'
            ) {
              response.Data['AcmTaskResource.projectLevelWeekCost'][
                'projectLevelWeekCost'
              ] = populateProjWeekHierarchy(
                response.Data['AcmTaskResource.projectLevelWeekCost'][
                  'projectLevelWeekCost'
                ],
              )
            }
          },
        },
      },
      queryOptions: {
        selectFromResult(response) {
          return {
            ...response,
            // data: response.data ? response.data.Data['AcmTaskResource.projectLevelWeekCost']: undefined,
            data:
              typeof response.data.Data['AcmTaskResource.projectLevelWeekCost'][
                'projectLevelWeekCost'
              ] !== 'undefined'
                ? calculateColumns(
                    response.data.Data['AcmTaskResource.projectLevelWeekCost'][
                      'projectLevelWeekCost'
                    ],
                  )
                : undefined,
          }
        },
      },
    },
    content: {
      type: 'jsx',
      // tabs: [
      //   {
      label: 'This week cost',
      id: 'dashBoardWeekCost',
      child: Grid,
      primary: true,
      dataPropName: 'rows',
      // processData: (data) => {
      //   return populateHierarchyCall(data.Data['AcmTaskResource.portfolioLevelWeekCost']);
      // },
      childProps: {
        id: 'dashBoardWeekCost',
        uiConfig: config.weekCostUiConfig,
      },
      mapHeaderFromResponse: (data) => {
        if (
          data !== undefined &&
          typeof data.Data['AcmTaskResource.projectLevelWeekCost'][
            'periodSchema'
          ] !== 'undefined'
        ) {
          const periodDatas =
            data.Data['AcmTaskResource.projectLevelWeekCost']['periodSchema']
              .length !== 0 &&
            data.Data['AcmTaskResource.projectLevelWeekCost'].hasOwnProperty(
              'periodSchema',
            ) !== false
              ? periodData(data)
              : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']

          return periodDatas
        }
      },
      //   },
      // ],
    },
  }
  return <Widget config={uiConfig}></Widget>
}

export default ProjectWeekCostWidget
