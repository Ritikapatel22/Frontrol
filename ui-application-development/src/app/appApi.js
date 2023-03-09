import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { projectColumns } from './columnConfiguration'
import {
  populateHierarchyCall,
  populateProjWeekHierarchy,
} from './transposeWeekCostData'
import { generateFakeData } from './generateFakeData'
import { getToken } from '../helpers/utils'
import { date } from 'yup/lib/locale'
import {
  init,
  selectToken,
  getComputedData,
} from '@frontrolinc/pace-ui-framework'
import {
  setRefreshTime,
  setProjects,
  setTimeAndProject,
} from '../slices/portfolioslice'

import { agGridLicenseKey, apiBaseUrl, fakeDataBaseUrl } from '../config'

const getPortfolioID = () => {
  let portfolioID
  try {
    portfolioID = parseInt(JSON.parse(localStorage.getItem('portfolio')).ID)
  } catch (e) {
    portfolioID = 1
  }

  return portfolioID
}

const getPayload = (portfolioID) => {
  return {
    query: `query GetProjects($portfolio_id: Int!) {
    projects(portfolio_id: $portfolio_id) {
        all_columns
    }
    },`,
    variables: {
      portfolio_id: portfolioID,
    },
  }
}
const getProjectPayload = (projectID) => {
  return {
    query: `query GetProjects($project_id: Int!) {
    project(project_id: $project_id) {
        all_columns
    }
    },`,
    variables: {
      project_id: projectID,
    },
  }
}
// export const appApi2 = createApi({
//   reducerPath: 'appApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:86/server/' }),
//   // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
//   // baseQuery: fetchBaseQuery({ baseUrl: './server' }),  //bring this back when creating server build
//   endpoints: (builder) => ({
//     getData: builder.query({
//       query: (params) => {
//         //  return `projects?${(new URLSearchParams(params).toString())}`
//         return 'db.json'
//       },
//     }),
//   }),
// })

const dateCols = ['last_summ_date', 'last_invoice_date']
const baseApi = createApi({
  reducerPath: 'appApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:86/server/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState()
      const token = selectToken(state) //state.auth.token //useSelector(selectToken);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  keepUnusedDataFor: 900,
  endpoints: (builder) => ({
    getData: builder.query({
      query: (params) => {
        return {
          url: params.url ? params.url : '/reporting',
          method: params.method ? params.method : 'POST',
          body: getPayload(params.portfolioID), ///params.portfolioID
        }
      },
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        dispatch(setTimeAndProject())
        try {
          const { data } = await queryFulfilled
          dispatch(setRefreshTime())
          dispatch(setProjects(data.length))
        } catch (e) {}
      },
      transformResponse: (response) => {
        // if (response.errors[0] === ""){
        let projects = response.data.projects
        // projects = generateFakeData(projects);
        let tempDate = new Date()
        // convertAllColsStringToDate(projects, dateCols);
        let testData = getComputedData(projects, projectColumns)
        return testData

        // }
      },
    }),
    getProjectStatus: builder.query({
      query: () => {
        return `/lov/portfolio`
      },
    }),
    getProjectSnapshotData: builder.query({
      query: (params) => {
        return {
          url: '/reporting',
          method: 'POST',
          body: getProjectPayload(params.projectID), ///params.portfolioID
        }
      },
      transformResponse: (response) => {
        // if (response.errors[0] === ""){
        let project = [response.data.project]
        project = generateFakeData(project)

        let tempDate = new Date()
        let testData = getComputedData(project, projectColumns)
        return testData

        // }
      },
    }),
    getDataGeneric: builder.query({
      query: (params) => {
        return `/query?${new URLSearchParams(params).toString()}`
      },
    }),
    getFakeData: builder.query({
      query: (params) => {
        return {
          // url: 'http://localhost:3002/data'        //bring this back when developing use below command
          //json-server --watch '.\server\invoice.json' --port 3002
          url: fakeDataBaseUrl + '/' + 'invoice.json',
        }
      },
      // transformResponse: (response) => response.invoices  //bring this back when developing
      transformResponse: (response) => response.data.invoices, //bring this back when creating server build
    }),
    getFakeDataApproval: builder.query({
      query: (params) => {
        return {
          // url: 'http://localhost:3002/data'        //bring this back when developing use below command
          //json-server --watch '.\server\summary.json' --port 3002
          url: fakeDataBaseUrl + '/' + 'summary.json', //bring this back when creating server build
          // url:  'http://127.0.0.1:88/220831.1/server/summary.json'  //bring this back when testing local build
        }
      },
      transformResponse: (response) => response.summary, //bring this back when developing
      // transformResponse: (response) => response.data.summary //bring this back when creating server build
    }),
    getFakeDataDocuments: builder.query({
      query: (params) => {
        return {
          // url: 'http://localhost:3003/data'        //bring this back when developing use below command
          //json-server --watch '.\server\documents.json' --port 3002
          url: fakeDataBaseUrl + '/' + 'documents.json', //bring this back when creating server build
          // url:  'http://127.0.0.1:88/220831.1/server/documents.json'  //bring this back when testing local build
        }
      },
      // transformResponse: (response) => response.documents  //bring this back when developing
      transformResponse: (response) => response.data.documents, //bring this back when creating server build
    }),
    getFakeDataVendorInvoices: builder.query({
      query: (params) => {
        return {
          // url: 'http://localhost:3004/data'        //bring this back when developing use below command
          //json-server --watch '.\server\vendor_invoices.json' --port 3002
          url: fakeDataBaseUrl + '/' + 'vendor_invoices.json', //bring this back when creating server build
          // url:  'http://127.0.0.1:88/220831.1/server/vendor_invoices.json'  //bring this back when testing local build
        }
      },
      // transformResponse: (response) => response.vendor_invoices  //bring this back when developing
      transformResponse: (response) => response.data.vendor_invoices, //bring this back when creating server build
    }),
    getFakeDataCommitmentsDetailPoStatus: builder.query({
      query: (params) => {
        return {
          // url: 'http://localhost:3005/data'        //bring this back when developing use below command
          //json-server --watch '.\server\commitments.json' --port 3005
          url: fakeDataBaseUrl + '/' + 'commitments.json', //bring this back when creating server build
        }
      },
      // transformResponse: (response) => response.commitments  //bring this back when developing
      transformResponse: (response) => response.data.commitments, //bring this back when creating server build
    }),
    getFakeProjectWeekCost: builder.query({
      query: (params) => {
        return {
          // url: 'http://localhost:3006/data'        //bring this back when developing use below command
          url: fakeDataBaseUrl + '/' + 'projectWeekCost.json', //bring this back when creating server build
        }
      },
      // transformResponse: (response) => response.projectWeekCost  //bring this back when developing
      // transformResponse: (response) => response.data.projectWeekCost //bring this back when creating server build
      // transformResponse: (response) => {
      //   // let projData = response.projectWeekCost;
      //   let projData = response.data.projectWeekCost;
      //   projData = populateProjWeekHierarchy(projData);
      //   return projData;
      // }
    }),
    getFakeWeekCost: builder.query({
      query: (params) => {
        return {
          url: 'http://localhost:3007/data', //bring this back when developing use below command
          // url: fakeDataBaseUrl + '/' + 'weekCost.json' //bring this back when creating server build
        }
      },
      // transformResponse: (response) => response.weekCost  //bring this back when developing
      // transformResponse: (response) => response.data.weekCost //bring this back when creating server build
      // transformResponse: (response) => {
      //   // let projData = response['AcmTaskResource.portfolioLevelWeekCost'];
      //   // // let projData = response.data['AcmTaskResource.portfolioLevelWeekCost'];
      //   // projData = populateHierarchyCall(projData);
      //   // return projData;
      // }
    }),
    getFakeEarnedValue: builder.query({
      query: (params) => {
        return {
          // url: 'http://localhost:3008/data'        //bring this back when developing use below command
          //json-server --watch '.\server\earnedValue.json' --port 3008
          url: fakeDataBaseUrl + '/' + 'earnedValue.json', //bring this back when creating server build
        }
      },
      transformResponse: (response) => {
        let data = []
        let responseEV = response.data
        const keys = Object.keys(responseEV)
        const values = Object.values(responseEV)
        for (let i = 0; i < Object.keys(responseEV).length; i++) {
          data[keys[i]] = values[i]
        }
        return data
      },
    }),
    getFakeTaskSummary: builder.query({
      query: (params) => {
        return {
          //url: 'http://localhost:3009/data'        //bring this back when developing use below command
          //json-server --watch '.\server\taskSummary.json' --port 3009
          url: fakeDataBaseUrl + '/' + 'taskSummary.json', //bring this back when creating server build
          // url:  'http://127.0.0.1:88/220831.1/server/earnedValue.json'  //bring this back when testing local build
        }
      },
    }),
    getFakeAdminConfigDef: builder.query({
      query: (params) => {
        return {
          //url: 'http://localhost:3009/data'        //bring this back when developing use below command
          //json-server --watch '.\server\taskSummary.json' --port 3009
          url: fakeDataBaseUrl + '/' + 'AdminConfigDef.json', //bring this back when creating server build
          // url:  'http://127.0.0.1:88/220831.1/server/earnedValue.json'  //bring this back when testing local build
        }
      },
      transformResponse: (response) => {
        return response
      },
    }),
    getFakeObjectDef: builder.query({
      query: (params) => {
        return {
          //url: 'http://localhost:3009/data'        //bring this back when developing use below command
          //json-server --watch '.\server\taskSummary.json' --port 3009
          url: params, //bring this back when creating server build
          // url:  'http://127.0.0.1:88/220831.1/server/earnedValue.json'  //bring this back when testing local build
        }
      },
      transformResponse: (response) => {
        return response
      },
    }),
  }),
})
export const appApi = init({
  licenseKey: agGridLicenseKey,
  appApi: baseApi,
  logConfig: {
    maxResponseSize: process.env.REACT_APP_MAX_RESPONSE_LOG_SIZE || 100,
  },
})

const convertAllColsStringToDate = (data, cols) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      data[i][cols[j]] = stringToDate(data[i][cols[j]])
    }
  }
}

const stringToDate = (s) => {
  try {
    return new Date(s.substr(0, 4), s.substr(5, 2), s.substr(8, 2))
  } catch (e) {}
}

export const {
  useLoginMutation,
  useUpdateDataMutation,
  useLazyGetFakeObjectDefQuery,
  useGetFakeAdminConfigDefQuery,
  useFetchDataQuery,
  useLazyFetchDataQuery,
  useGetDataQuery,
  useGetProjectSnapshotDataQuery,
  useGetDataGenericQuery,
  useGetFakeTaskSummaryQuery,
  useGetFakeEarnedValueQuery,
  useGetFakeDataQuery,
  useGetFakeDataApprovalQuery,
  useGetFakeDataDocumentsQuery,
  useGetFakeDataVendorInvoicesQuery,
  useGetFakeDataCommitmentsDetailPoStatusQuery,
  useGetFakeProjectWeekCostQuery,
  useGetFakeWeekCostQuery,
  useLazyGetDataGenericQuery,
  useMultipleFetchDataQuery,
  useUploadFileMutation,
  useGetProjectStatusQuery,
} = appApi
