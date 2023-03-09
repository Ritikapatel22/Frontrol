import { getComputedData } from '@frontrolinc/pace-ui-framework'
import { projectColumns } from '../../app/columnConfiguration'
export const transformResponse = (response) => {
  let project = [response.data.project]
  response.data.project = getComputedData(project, projectColumns)
}
export const getProjectPayload = (projectID) => {
  if (projectID) {
    return {
      query: `query GetProjectDetails($project_id: Int!){project(project_id: $project_id) {all_columns}},`,
      variables: {
        project_id: projectID,
      },
    }
  }
}

export const onQueryStarted = (dispatch) => {
  // dispatch(setTimeAndProject());
}
export const onQueryFulfilled = (data, dispatch) => {
  // dispatch(setRefreshTime());
  // dispatch(setProjects(data.length));
}
export const getQueryConfig = () => {
  // if (!getProjectId(window.location.href)) {
  //   throw Error("no project id found");
  // }
  return {
    ...getProjectPayload(Number(getProjectId(window.location.href))),
    __config__: {
      url: '/reporting',
      method: 'POST',
      transformResponse,
    },
  }
}

export const getProjectId = (url) => {
  if (url !== '') {
    return url.split('/project/')[1]?.split('?')[0]
  }
}
