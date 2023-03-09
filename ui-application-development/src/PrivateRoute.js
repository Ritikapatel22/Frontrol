import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useFetchDataQuery } from './app/appApi'
import { useDispatch } from 'react-redux'
import { setUserProfile } from './slices/authslice'
import { OktaExpiryManagementProvider } from './components/OktaExpiryManagement/OktaExpiryManagementProvider'
import { Query } from './http-common/query.constants'
import { useLocationLogger } from './hooks/useLocationLogger'
import {
  getLoginUrl,
  isDefaultLoginSSO,
  isLoginMode,
  openSSO,
} from './helpers/utils'

function PrivateRoute({ children, authentication, pathName }) {
  let location = useLocation()
  const dispatch = useDispatch()
  const navigateTo = getLoginUrl()
  if (!authentication) {
    if (isLoginMode() || !isDefaultLoginSSO) {
      return <Navigate to={navigateTo} state={{ path: location.pathname }} />
    } else {
      openSSO()
    }
    return null
  }

  const { data } = useFetchDataQuery({
    queryName: Query.GetUserProfile,
  })

  useEffect(() => {
    if (data && data.Status.toLowerCase() === 'success') {
      const [userDetails] = data?.Data[Query.GetUserProfile]
      dispatch(setUserProfile(userDetails))
    }
  }, [data])

  useLocationLogger()

  return <OktaExpiryManagementProvider>{children}</OktaExpiryManagementProvider>
}
export default PrivateRoute
