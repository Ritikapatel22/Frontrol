import { useFetchDataQuery } from '../../app/appApi'
import { useTranslation } from 'react-i18next'


export const transformResponse = (response) => {}
export const onQueryStarted = (response) => {}

export const onQueryFulfilled = (response, dispatch) => {}
export const searchConfig = {
  remote: true,
  limit: 20,
  mode: 'simple',
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
    recentParams: {
      recentQueryName: 'ProjectList.ProjectUnion',
      defaultName: 'test',
      queryConfig: {},
      queryOptions: {
        selectFromResult: (res) => {
          return {
            ...res,
            data: res.data
              ? res.data.Data['ProjectList.ProjectUnion']
              : res.data,
          }
        },
      },
      favouriteConfig: {
        type: 'Project',
        idField: 'project_id',
      },
    },
    searchField: 'search',
    favouriteColumn: 'favourite_flag',
    recentText: 'Recent and favorite projects',
  },
  onClickSearchItem: (rec) => {
    console.log('clickHandler', rec)
  },
  onAdvanceSearchClickHandler: () => {
    console.log('Hello!! i am clicked')
  },

  showAdvanceSearch: true,
  advanceSearch: 'Advanced',
  searchTypeLabel: 'Projects',

  itemTemplate:
    "<div class='left-item acm-hyperlink'><div>{project_number} ({project_name})</div><div class='full-name'></div><div>{employee_number}</div></div><div class='right-item'>{customer_name}</div>",
}
