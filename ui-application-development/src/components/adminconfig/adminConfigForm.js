import React, { useEffect } from 'react'
import { BackendError, Grid } from '@frontrolinc/pace-ui-framework'
import './admin.css'
import styles from '../../features/dashboard/Dashboard.module.css'
import Skeleton from '../Skeleton'

const AdminConfigForm = ({
  uiConfig,
  data,
  rows,
  tableHeight,
  isFetching,
  id,
}) => {
  useEffect(() => {
    if (data?.Status == 'ERROR') {
      throw new BackendError(data?.Message)
    }
  }, [data])

  const config = {
    type: 'adminConsole',
    layout: 'grid',
    tabs: 0,
    isFullWidth: true,
  }

  return (
    <>
      <div className={styles.adminContainer}>
        {isFetching ? (
          <Skeleton {...config} />
        ) : (
          <Grid
            id={id}
            rows={rows}
            style={{ height: tableHeight }}
            uiConfig={uiConfig}
          />
        )}
      </div>
    </>
  )
}

export default AdminConfigForm
