import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../../App.css";
import styles from "../../../features/dashboard/Dashboard.module.css";
import { Grid ,BackendError, withErrorHandler, GridIcon} from "@frontrolinc/pace-ui-framework";
import { getTableHeight } from "../../../helpers/utils";
import { columnTypesConfig, sidebarColsConfig } from "../../../formatCols";
import { projectDrilldown } from "../../../TransposeData";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import { useDispatch,useSelector } from "react-redux";
import starIcon from "../../../assets/Images/star_border.svg"
import starfilledIcon from '../../../assets/Images/star_purple.svg'
import { useUpdateDataMutation } from "../../../app/appApi";
import { advanceFavourite } from "../../../slices/portfolioslice";


export const SRASConfig = {
  columnDefs: [
      {
        field: 'favourite_flag',
        headerName: '',
        width: 30,
        minWidth: 30,
        pinned: 'left',
        suppressColumnsToolPanel: true,
        type: 'supressFilter',
        suppressMenu: true,
        cellStyle: { paddingLeft: 8, paddingRight: 0 },
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
        field: 'department',
        headerName: 'Department',
        width: 150,
        type: ['linkType'],
      },
      {
        field: 'customer_name',
        headerName: 'Customer',
        width: 150,
        type: ['linkType'],
      },
      {
        field: 'key_member_1',
        headerName: 'Project manager',
        width: 150,
        type: ['linkType'],
      },
      {
        field: 'key_member_2',
        headerName: 'Project accountant',
        width: 150,
        type: ['linkType'],
      },
      {
        field: 'key_member_3',
        headerName: 'Project approver',
        width: 150,
        type: ['linkType'],
      },
      {
        field: 'key_member_5',
        headerName: 'Project approver 2',
        width: 150,
        type: ['linkType'],
      },
      {
        field: 'key_member_7',
        headerName: 'Project accountant alternate',
        width: 170,
        type: ['linkType'],
      },
      {
        field: 'key_member_11',
        headerName: 'Finance lead',
        width: 150,
        type: ['linkType'],
      },
      {
        field: 'key_member_12',
        headerName: 'Finance lead 2',
        width: 150,
        type: ['linkType'],
      },
      {
        field: 'class_2',
        headerName: 'AECOM business line segment',
        width: 150,
        type: ['linkType'],
      },
      {
        field: 'class_4',
        headerName: 'AECOM Contract Type',
        width: 150,
        type: ['linkType'],
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
        type: ['linkType'],
      },
  ],
  defaultColDef: {
    wrapHeaderText: true,
    autoHeaderHeight: true,
    sortable: true,
    resizable: true,
    menuTabs: ["filterMenuTab", "generalMenuTab"],
  },
  enableRangeSelection: true,
  defaultExcelExportParams: {
    fileName: "Project search",
    sheetName: "Advanced search",
  },
  columnTypes: columnTypesConfig,
  sideBar: {
    toolPanels: [sidebarColsConfig],
  },
};


const SearchResult = ({ row }) => {
  const [update, { data }] = useUpdateDataMutation()
  const navigate = useNavigate();
  const [rec , setRec] = useState(null)
  const size = useWindowSize();
  const error = useSelector((state)=>state.portfolio.error)
  const type = useRef(null)
  const firstGridRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!row && error !== null) {
      throw new BackendError(error)
    }
  }, [row,error])

  function addToFavourite(e) {
    const flag = e.data?.favourite_flag === 'Y' ? 'N' : 'Y'
    type.current = { mode: 'add', id: e.data.project_id, flag }
    const apiData = [
      {
        FntlFavourites: {
          object_id3: '',
          object_type: 'Project',
          object_id2: '',
        },
      },
    ]
    apiData[0]['FntlFavourites']['object_id1'] = e.data.project_id

    if (flag === 'Y') {
      apiData[0]['FntlFavourites']['CRUD'] = 'C'
    } else {
      apiData[0]['FntlFavourites']['CRUD'] = 'D'
    }
    dispatch(advanceFavourite({ data : e.data}))
    update({
      name: { documentName: 'FntlFavourites' },
      body: apiData,
      __config__: {
        invalidatesTags: () => ['Projects', 'FntlFavourites.ObjectList', 'projectInfo'],
      },
    })
  }

  const tableHeight = useMemo(() => {
    const rowCount = (row || [])?.length;
    const rowHeight = rowCount * 30 + 50;
    const winHeight = getTableHeight() - 25;
    let height = rowHeight && rowHeight < winHeight ? rowHeight : winHeight;
    if (height < 250) height = 250;
    return height;
  }, [size.height, size.width, row]);

  const onCellDoubleClicked = (event) => {
    firstGridRef.current.api.refreshCells();
  };

  useEffect(() => {
    SRASConfig.ref = firstGridRef
    for(let i in SRASConfig.columnDefs){
      if(SRASConfig.columnDefs[i].field === 'favourite_flag'){
        SRASConfig.columnDefs[i].cellRenderer = (param) => {
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
      else if(SRASConfig.columnDefs[i].field === 'remove_recent'){
        SRASConfig.columnDefs[i].cellRenderer = GridIcon;
        SRASConfig.columnDefs[i].cellRendererParams = {
          onClickHandler: removeHandler,
          children: <img src={closeIcon} alt="no svg" />,
          showOnHover: true,
        }
      }
    }
    setRec({...SRASConfig})
  },[])

  const id = "searchResult";

  return (
    rec ? (
      <div className={styles.container}>
        <Grid
          id={id}
          // reduxConfig={reduxConfig}
          // uiConfig={uiConfig}
          style={{ height: tableHeight }}
          uiConfig={{
            ...rec,
            onCellDoubleClicked,
            onCellClicked: (event) => projectDrilldown(event, navigate),
          }}
          rows={row}
        />
      </div>) : <></>
    )
};

export default withErrorHandler(SearchResult,null);