import React from 'react'
import { Drawer } from '../../Common';
import { Reload } from '../../dashboard';
import Reports from "../header/breadceumb/reports";
import Report from "../../../components/Common/report"
// import ReportWidgetContainer from '../../report_widget_container';

function drawer({
  isOpen,
  setIsOpen,
  delRes,
  diletpopup,
  setdilPopUp,
  reportOpen,
  setReportOpen,
  reportSection,
  handleViewBtnClick,
  selectedView,
  refreshDate,
  reloadData
}) {

  return (
    <>
      <div className="portofolio block sm:flex  pl-0 lg:pl-5 mr-0">
        <Drawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          delRes={delRes}
          diletpopup={diletpopup}
          setdilPopUp={setdilPopUp}>
          <Report
            reportOpen={reportOpen}
            setReportOpen={setReportOpen}
            reportSection={reportSection}
          />
        </Drawer>
        <Reports
          reportOpen={reportOpen}
          setReportOpen={setReportOpen}
          handleViewBtnClick={handleViewBtnClick}
          selectedView={selectedView}
        />
        <div className="flex mr-5 items-center">
          {/* <Reload refreshDate={refreshDate} reloadData={reloadData} /> */}
        </div>
      </div>
      {/* <ReportWidgetContainer /> */}
    </>
  )
}

export default drawer;