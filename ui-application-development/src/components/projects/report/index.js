import React from 'react'
import Reportpage from '../../../components/Reportpage'
// import ReportWidgetContainer from '../../report_widget_container';
import { useSelector } from 'react-redux'

function reportPage({ shouldCallExport, setShouldCallExport, blockData, isFullScreen , projectNumber }) {
  const selected = useSelector((state) => state.reports?.selectedReport)

  return (
    <>
      <Reportpage
        selected={selected}
        blockData={blockData}
        shouldCallExport={shouldCallExport}
        setShouldCallExport={setShouldCallExport}
        isFullScreen={isFullScreen}
        projectNumber={projectNumber}
      />
    </>
  )
}

export default reportPage
