import React, { useMemo, useState, useRef, useEffect } from 'react'
import '../../App.css'
import styles from '../../features/dashboard/Dashboard.module.css'
import closeIcon from '../../assets/Images/close-icon.svg'
import starIcon from '../../assets/Images/star_border.svg'
import starfilledIcon from '../../assets/Images/star_purple.svg'
//import { useGetDataQuery, useGetDataFakeQuery, useGetFakeApprovalDataQuery, appApi } from "../../app/appApi";
import {
  useGetDataQuery,
  appApi,
  useGetDataGenericQuery,
  useGetFakeDataVendorInvoicesQuery,
} from '../../app/appApi'
import { Grid, withErrorHandler } from '@frontrolinc/pace-ui-framework'
import { getTableHeight } from '../../helpers/utils'
import {
  columnTypesConfig,
  sidebarColsConfig,
  sidebarFilterConfig,
} from '../../formatCols'
import { projectDrilldown } from '../../TransposeData'
import { useNavigate } from 'react-router-dom'
import useWindowSize from '../../hooks/useWindowSize'
import { GridIcon } from '@frontrolinc/pace-ui-framework'

export const ProjectConfig = {
  columnDefs: [
    {
      field: 'favourite_flag',
      headerName: '',
      width: 30,
      minWidth: 30,
      pinned: 'left',
      lockPinned: true,
      //type: ["dateFormat"],
      suppressColumnsToolPanel: true,
      type: 'supressFilter',
      suppressMenu: true,
      cellStyle: { paddingLeft: 8, paddingRight: 0 },
      // cellRenderer: (param) => {
      //   return (
      //     <GridIcon onClickHandler={addToFavourite} {...param}>
      //       {param.data.favourite_flag === 'Y' ? (
      //         <img src={starfilledIcon} alt="starfilled icon" />
      //       ) : (
      //         <img src={starIcon} alt="startIcon" />
      //       )}
      //     </GridIcon>
      //   )
      // },
    },
    {
      field: 'project_number',
      headerName: 'Project#',
      width: 120,
      suppressFilterButton: false,
      menubar: 'false',
      type: ['linkType'],
      cellClass: 'acm-hyperlink',
    },
    {
      field: 'project_name',
      headerName: 'Project name',
      width: 250,
      type: ['linkType'],
      cellClass: 'acm-hyperlink',
    },
    {
      field: 'level8_org_name',
      headerName: 'Department',
      width: 150,
    },
    {
      field: 'customer_name',
      headerName: 'Customer',
      width: 150,
    },
    {
      field: 'key_member_1',
      headerName: 'Project manager',
      width: 150,
    },
    {
      field: 'key_member_2',
      headerName: 'Project accountant',
      width: 150,
    },
    {
      field: 'key_member_3',
      headerName: 'Project approver',
      width: 150,
    },
    {
      field: 'key_member_5',
      headerName: 'Project approver 2',
      width: 150,
    },
    {
      field: 'key_member_7',
      headerName: 'Project accountant alternate',
      width: 170,
    },
    {
      field: 'key_member_11',
      headerName: 'Finance lead',
      width: 150,
    },
    {
      field: 'key_member_12',
      headerName: 'Finance lead 2',
      width: 150,
    },
    {
      field: 'class_2',
      headerName: 'AECOM business line segment',
      width: 150,
    },
    {
      field: 'class_4',
      headerName: 'AECOM Contract Type',
      width: 150,
    },
    {
      field: 'sch_start_date',
      headerName: 'Start date',
      width: 150,
      type: ['dateFormat'],
    },
    {
      field: 'sch_end_date',
      headerName: 'End date',
      width: 150,
      type: ['dateFormat'],
    },
    {
      field: 'project_status',
      headerName: 'Status',
      width: 150,
    },
  ],
  defaultColDef: {
    wrapHeaderText: true,
    autoHeaderHeight: true, // should be used with wrapHeaderText to adjust the height to fix wrapped text
    sortable: true,
    resizable: true,
    // menuTabs: [."generalMenuTab", "filterMenuTab",'columnsMenuTab'],
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
  },
  enableRangeSelection: true,
  defaultExcelExportParams: {
    fileName: 'Recent',
    sheetName: 'Recent',
  },
  columnTypes: columnTypesConfig,
  sideBar: {
    toolPanels: [sidebarColsConfig],
  },
}

const MyProject = ({
  filteredData,
  setFilteredData,
  isFullScreen,
  row,
  addToFavourite,
}) => {
  const navigate = useNavigate()
  const size = useWindowSize()
  const [pro , setPro] = useState(null)

  useEffect(() => {
    ProjectConfig.ref = firstGridRef
    for(let i in ProjectConfig.columnDefs){
      if(ProjectConfig.columnDefs[i].field === 'favourite_flag'){
        ProjectConfig.columnDefs[i].cellRenderer = (param) => {
          return (
            <GridIcon onClickHandler={addToFavourite} {...param}>
              {param.data.favourite_flag === 'Y' ? (
                <img src={starfilledIcon} alt="starfilled icon" />
              ) : (
                <img src={starIcon} alt="startIcon" />
              )}
            </GridIcon>
          )
        }
      }
    }
    setPro(ProjectConfig)
  },[])

  const tableHeight = useMemo(() => {
    const rowCount = (row || []).length
    const rowHeight = rowCount * 30 + 50
    const winHeight = getTableHeight() - 25
    let height = rowHeight && rowHeight < winHeight ? rowHeight : winHeight
    if (height < 250) height = 250
    return height
  }, [size.height, size.width])

  const firstGridRef = useRef()

  const onCellDoubleClicked = (event) => {
    firstGridRef.current.api.refreshCells()
  }

  const id = 'myProject'
  
  return (
    pro ? (
    <div className={styles.adminContainer}>
      <Grid
        id={id}
        // reduxConfig={reduxConfig}
        // uiConfig={ProjectConfig}
        style={{ height: tableHeight }}
        uiConfig={{
          ...pro,
          onCellDoubleClicked,
          onCellClicked: (event) => projectDrilldown(event, navigate),
        }}
        rows={row}
      />
    </div>) : <></>
  )
}

export default withErrorHandler(MyProject, null)

// export default MyProject
