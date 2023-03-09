import {
  getComputedData,
  getQueryStringValue,
} from '@frontrolinc/pace-ui-framework'
import { useSelector } from 'react-redux'
import { projectColumns } from '../../app/columnConfiguration'
import {
  setRefreshTime,
  setProjects,
  setTimeAndProject,
} from '../../slices/portfolioslice'
export const transformResponse = (response) => {
  if (response.data) {
    let portfoliosData = []
    let projects = response.data.projects
    if (typeof response.data.projects !== 'undefined') {
      response.data.projects.filter(function (el) {
        el.eac_due_date = el.last_eac_date? el.class_11 == 'C-0' || el.class_11 == 'C-1'
          ? incrementDate(el.last_eac_date, 30)
          : incrementDate(el.last_eac_date, 90): null          
        el.eac_due_date_expired = new Date(el.eac_due_date) < new Date()
        el.expired_eac_date = el.eac_due_date_expired ? el.last_eac_date : null

        el.forecast_end_date_expired =
          new Date(el.forecast_end_date) < new Date()

        portfoliosData.push(el)
      })
      response.data.projects = portfoliosData
    }
    response.data.projects = getComputedData(
      response.data.projects,
      projectColumns,
    )
    return response.data.projects
  }
}

const incrementDate = (dateString, days2Add) => {
  let incrementedDate = new Date(dateString)
  incrementedDate.setDate(incrementedDate.getDate() + days2Add) //number  of days to add, e.x. 15 days
  var dateFormated = incrementedDate.toISOString().substr(0, 10)
  return dateFormated
}

export const getPayload = () => {
  const portfolio = useSelector(
    (state) => state.portfolio.selectedPortfolio?.portfolio_id,
  )
  if (portfolio) {
    return {
      query: `query GetProjects($portfolio_id: Int!) {
      projects(portfolio_id: $portfolio_id) {
          all_columns
      }
      },`,
      variables: {
        portfolio_id: portfolio,
      },
    }
  }
}

export const onQueryStarted = (dispatch) => {
  dispatch(setTimeAndProject())
}

export const onQueryFulfilled = (response, dispatch) => {
  dispatch(setRefreshTime())
  dispatch(setProjects(response.data.projects.length))
}
export const getQueryConfig = () => {
  // if (!getQueryStringValue("portfolio")) {
  //   throw Error("no portfolio found");
  // }
  return {
    ...getPayload(Number(getQueryStringValue('portfolio'))),
    __config__: {
      url: '/reporting',
      method: 'POST',
      transformResponse,
      onQueryStarted,
      onQueryFulfilled,
      providesTags: () => [
        `portfolio_dashboard_${getQueryStringValue('portfolio')}`,
      ],
    },
  }
}
