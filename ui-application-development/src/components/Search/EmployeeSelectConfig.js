import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => {}
export const onQueryStarted = (response) => {}

export const onQueryFulfilled = (response, dispatch) => {}

export const employeeSelectConfig = {
  limit: 20,
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.Employee',
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
              ? res.data.Data['Search.Employee']
              : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'Person',
        idField: 'person_id',
      },
    },
    recentParams: {
      recentQueryName: 'FntlFavourites.Persons',
      defaultName: 'test',
      queryOptions: {
        selectFromResult: (res) => {
          return {
            data: res.data
              ? res.data.Data['FntlFavourites.Persons']
              : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'Person',
        idField: 'project_id',
      },
    },
    favouriteColumn: 'favorite',
    searchTypeLabel: 'employee_number',
    searchField: 'employee',
  },
  itemTemplate:
    "<div class='left-item '><div>{full_name} ({employee_number})</div></div>",
}