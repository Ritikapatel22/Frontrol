import { useFetchDataQuery } from '../../../app/appApi'

export const transformResponse = (response) => {}
export const onQueryStarted = (response) => {}

export const onQueryFulfilled = (response, dispatch) => {}

export const projectResentConfig = {
  limit: 20,
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'ProjectList.ProjectSearch',
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
              ? res.data.Data['ProjectList.ProjectSearch']
              : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'Project',
        idField: 'project_id',
      },
    },

    favouriteColumn: 'favourite_flag',
    searchTypeLabel: 'projects',
    searchField: 'search',
  },
  itemTemplate:
    "<div class='left-item '><div>{project_number} ({project_name})</div><div class='full-name'></div><div>{employee_number}</div></div><div class='right-item'>{customer_name}</div>",
}
