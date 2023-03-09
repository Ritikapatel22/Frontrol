import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => { }
export const onQueryStarted = (response) => { }

export const onQueryFulfilled = (response, dispatch) => { }

export const projectLongNameConfig = {
  limit: 20,
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.ProjectLongNameSearch',
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
              ? res.data.Data['Search.ProjectLongNameSearch']
              : res.data,
          }
        },
      },
    },
    searchTypeLabel: 'projectLongName',
    searchField: 'projectLongName',
  },
  itemTemplate:
    "<div class='left-item '><div>{project_long_name}</div></div>",
}