import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => { }
export const onQueryStarted = (response) => { }

export const onQueryFulfilled = (response, dispatch) => { }

export const customerNameConfig = {
  limit: 20,
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.CustomerNameSearch',
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
              ? res.data.Data['Search.CustomerNameSearch']
              : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'customerName',
        idField: 'customer_id',
      },
    },
    recentParams: {
      recentQueryName: 'FntlFavourites.FavouriteCustomer',
      defaultName: 'test',
      queryOptions: {
        selectFromResult: (res) => {
          return {
            data: res.data
              ? res.data.Data['FntlFavourites.FavouriteCustomer']
              : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'customerName',
        idField: 'customer_id',
      },
    },
    favouriteColumn: 'favorite_flag',
    searchTypeLabel: 'customer_name',
    searchField: 'customerName',
  },
  itemTemplate:
    "<div class='left-item '><div>{customer_name}</div></div>",
}