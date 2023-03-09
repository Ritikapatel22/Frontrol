import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => {}
export const onQueryStarted = (response) => {}

export const onQueryFulfilled = (response, dispatch) => {}

export const supplierSelectConfig = {
  limit: 20,
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.Supplier',
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
            data: res.data ? res.data.Data['Search.Supplier'] : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'Supplier',
        idField: 'supplier_id',
      },
    },
    recentParams: {
      recentQueryName: 'FntlFavourites.Suppliers',
      defaultName: 'test',
      queryOptions: {
        selectFromResult: (res) => {
          return {
            ...res,
            data: res.data
              ? res.data.Data['FntlFavourites.Suppliers']
              : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'Supplier',
        idField: 'supplier_id',
      },
    },
    favouriteColumn: 'favorite',
    searchTypeLabel: 'supplier_number',
    searchField: 'supplier',
  },
  itemTemplate:
    "<div class='left-item '><div>{supplier_name} ({supplier_number})</div>",
}
