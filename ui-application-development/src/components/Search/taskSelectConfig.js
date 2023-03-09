import { useFetchDataQuery } from '../../app/appApi'

export const transformResponse = (response) => {}
export const onQueryStarted = (response) => {}

export const onQueryFulfilled = (response, dispatch) => {}

export const taskSelectConfig = {
  limit: 20,
  mode: 'singleSelect',
  remote: true,
  reduxConfig: {
    query: useFetchDataQuery,
    params: {
      name: 'Search.Task',
      queryConfig: {
        project_id: null,
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
            data: res.data ? res.data.Data['Search.Task'] : res.data,
          }
        },
      },
      // favouriteConfig: {
      //   type: 'Models',
      //   idField: 'task_number',
      // },
    },
    // recentParams: {
    //   recentQueryName: 'ProjectList.ProjectUnion',
    //   defaultName: 'test',
    //   queryOptions: {
    //     selectFromResult: (res) => {
    //       return {
    //         data: res.data
    //           ? res.data.Data['ProjectList.ProjectUnion']
    //           : res.data,
    //       }
    //     },
    //   },
    //   favouriteConfig: {
    //     type: 'Models',
    //     idField: 'project_id',
    //   },
    // },
    searchTypeLabel: 'task_number',
    searchField: 'task',
  },
  itemTemplate:
    "<div class='left-item '><div>{task_number} ({task_name})</div><div class='full-name'></div><div>{employee_number}</div></div><div class='right-item'>{customer_name}</div>",
}
