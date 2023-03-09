import { Grid, BackendError } from '@frontrolinc/pace-ui-framework'
import { useEffect } from 'react'

export default function CostDetailGrid({
  filteredData,
  uiConfig,
  tableHeight,
  data,
}) {
  
  useEffect(() => {
    if (data && data?.Status === 'ERROR') {
      throw new BackendError(data?.Message)
    }
  }, [data?.Status])
  
  return (
    <Grid
      id={'TaskDetails.CostDetails'}
      rows={filteredData}
      uiConfig={uiConfig}
      style={{ height: tableHeight }}
    />
  )
}
