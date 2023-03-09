import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import '../../App.css'
import styles from '../../features/dashboard/Dashboard.module.css'
import starIcon from '../../assets/Images/star_border.svg'
import starfilledIcon from '../../assets/Images/star_purple.svg'
import { Grid } from '@frontrolinc/pace-ui-framework'
import {
  columnTypesConfig,
  sidebarColsConfig,
  sidebarFilterConfig,
} from '../../formatCols'
import { projectDrilldown } from '../../TransposeData'
import { useNavigate } from 'react-router-dom'
import useWindowSize from '../../hooks/useWindowSize'
import { getTableHeight } from '../../helpers/utils'
import { GridIcon, withErrorHandler } from '@frontrolinc/pace-ui-framework'
import { configureStore } from '@reduxjs/toolkit'

export const FavoriteConfig = {
  columnDefs: [
    {
      field: 'favourite_flag',
      headerName: '',
      width: 30,
      minWidth: 30,
      pinned: 'left',
      lockPinned: true,
      suppressMenu: true,
      suppressColumnsToolPanel: true,
      type: 'supressFilter',
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

const Favorites = ({ row, addToFavourite }) => {
  const navigate = useNavigate()
  const size = useWindowSize()
  const [fav, setFav] = useState(null)

  useEffect(() => {
    FavoriteConfig.ref = firstGridRef
    for (let i in FavoriteConfig.columnDefs) {
      if (FavoriteConfig.columnDefs[i].field === 'favourite_flag') {
        FavoriteConfig.columnDefs[i].cellRenderer = (param) => {
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
    setFav({ ...FavoriteConfig })
  }, [])

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

  const id = 'favourite'

  return fav ? (
    <div className={styles.adminContainer}>
      <Grid
        id={id}
        //reduxConfig={reduxConfig}
        // uiConfig={FavoriteConfig}
        style={{ height: tableHeight }}
        uiConfig={{
          ...fav,
          onCellDoubleClicked,
          onCellClicked: (event) => projectDrilldown(event, navigate),
        }}
        rows={row}
      />
    </div>
  ) : (
    <></>
  )
}

export default withErrorHandler(Favorites, null)

// export default Favorites
