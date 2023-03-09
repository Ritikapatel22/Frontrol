import React from 'react'
import TaskSummaryReport from './TaskSummaryReport'
import CostDetailreport from './CostDetailReport/index'
import RevenueTransactionDetails from './RevenuetransactionDetailReport/index'
import ResourceHrsreport from './ResourceHrsByWeek'
import { getAllQueryStringValue } from '@frontrolinc/pace-ui-framework/dist/cjs'

function index({ selected, shouldCallExport, setShouldCallExport, isFullScreen, projectNumber }) {
  const qParams = getAllQueryStringValue()

  if(!qParams?.report) {
    return
  }

  return (
    <div className="mt-[5px] lg:ml-[0px] ml-[70px]">
      {selected?.report_id === 1 ? (
        <TaskSummaryReport
          shouldCallExport={shouldCallExport}
          setShouldCallExport={setShouldCallExport}
          isFullScreen={isFullScreen}
          projectNumber={projectNumber}
        />
      ) : (
        ''
      )}
      {selected?.report_id === 2 ? (
        <CostDetailreport
          shouldCallExport={shouldCallExport}
          setShouldCallExport={setShouldCallExport}
          isFullScreen={isFullScreen}
          projectNumber={projectNumber}
        />
      ) : (
        ''
      )}
      {selected?.report_id === 3 ? (
        <RevenueTransactionDetails
          shouldCallExport={shouldCallExport}
          setShouldCallExport={setShouldCallExport}
          isFullScreen={isFullScreen}
          projectNumber={projectNumber}
        />
      ) : (
        ''
      )}
      {selected?.report_id === 4 ? (
        <ResourceHrsreport
          shouldCallExport={shouldCallExport}
          setShouldCallExport={setShouldCallExport}
          isFullScreen={isFullScreen}
          projectNumber={projectNumber}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default index
