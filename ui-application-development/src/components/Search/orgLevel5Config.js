import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => { }
export const onQueryStarted = (response) => { }

export const onQueryFulfilled = (response, dispatch) => { }

export const orgLevel5Config = {
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.OrgSearch',
      queryConfig: {
        level : 5,
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
            ? res.data.Data['Search.OrgSearch']
            : res.data,
          }
        },
      }
    },
    searchTypeLabel: 'orgName',
    searchField: 'orgName',
  },
  limit: 20,
  itemTemplate:
  "<div class='left-item '><div>{level5_org_name}</div></div>",
}