import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => { }
export const onQueryStarted = (response) => { }

export const onQueryFulfilled = (response, dispatch) => { }

export const projectNumberConfig = {
  limit: 20,
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.ProjectNumberSearch',
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
              ? res.data.Data['Search.ProjectNumberSearch']
              : res.data,
          }
        },
      },
    },
    searchTypeLabel: 'projectNumber',
    searchField: 'projectNumber',
  },
  itemTemplate:
    "<div class='left-item '><div>{project_number} ({project_name})</div></div>",
}