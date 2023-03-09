import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => {}
export const onQueryStarted = (response) => {}

export const onQueryFulfilled = (response, dispatch) => {}

export const organizationSelectConfig = {
  limit: 20,
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.Organization',
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
            data: res.data ? res.data.Data['Search.Organization'] : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'Organization',
        idField: 'organization_id',
      },
    },
    recentParams: {
      recentQueryName: 'FntlFavourites.Organizations',
      defaultName: 'test',
      queryOptions: {
        selectFromResult: (res) => {
          return {
            data: res.data
              ? res.data.Data['FntlFavourites.Organizations']
              : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'Organization',
        idField: 'organization_id',
      },
    },
    favouriteColumn: 'favorite',
    searchTypeLabel: 'organization_number',
    searchField: 'organization',
  },
  itemTemplate: "<div class='left-item '><div>{organization_name}</div>",
}
