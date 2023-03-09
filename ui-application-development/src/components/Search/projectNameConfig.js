import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => { }
export const onQueryStarted = (response) => { }

export const onQueryFulfilled = (response, dispatch) => { }

export const projectNameConfig = {
  limit: 20,
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.ProjectNameSearch',
      queryConfig: {
        __config__: {
          transformResponse,
          onQueryStarted,
          onQueryFulfilled,
        },
      },
      queryOptions: {
        selectFromResult: (res) => {
          return {
            ...res,
            data: res.data
              ? res.data.Data['Search.ProjectNameSearch']
              : res.data,
          }
        },
      },
    },
    searchTypeLabel: 'projectName',
    searchField: 'projectName',
  },
  itemTemplate:
    "<div class='left-item '><div>{project_name}</div></div>",
}