import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => { }
export const onQueryStarted = (response) => { }

export const onQueryFulfilled = (response, dispatch) => { }

export const orgLevel4Config = {
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.OrgSearch',
      queryConfig: {
        level : 4,
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
  "<div class='left-item '><div>{level4_org_name}</div></div>",
}