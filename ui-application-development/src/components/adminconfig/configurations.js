import React, { useState, useMemo, useRef, useEffect } from 'react'
import download from '../../assets/Images/download1.svg'
import {
  columnTypesConfig,
  sidebarColsConfig,
  sidebarFilterConfig,
} from '../../formatCols'
import { useLazyFetchDataQuery } from '../../app/appApi'
import useWindowSize from '../../hooks/useWindowSize'
import { calculateTableHeight } from '../../components/Reportpage/helpers'
import {
  DropDown,
  ErrorBoundary,
  usePersonalization,
  hideFullScreenLoading,
  showFullScreenLoading,
} from '@frontrolinc/pace-ui-framework'
import './admin.css'
import objectData from './objectJson'
import Input from '../Common/textField'
import { useForm } from 'react-hook-form'
import AdminConfigForm from './adminConfigForm'
import { useTranslation } from 'react-i18next'

const Configurations = () => {
  const [rows, setRows] = useState([])
  const {t} = useTranslation(['label'])
  const [filterObject, setFilterObject] = useState([])
  const [payload, setPayload] = useState()
  const [currentQuery, setCurrentQuery] = useState()
  const [uiConfig, setUiConfig] = useState({})
  const [selected, setSelected] = useState({
    label: '',
    value: '',
  })
  const [flag, setFlag] = useState(false)
  const size = useWindowSize()
  const [getobject, { data, isFetching }] = useLazyFetchDataQuery()
  const { register, handleSubmit, reset } = useForm({})

  const { setCategory } = usePersonalization()
  
  const objConfig = {
    mode: 'singleSelect',
    remote: false,
    data: [
      {
        label: t('HR assignments'),
        value: 'HR Assignments',
      },
      {
        label: t('Acm currency exchange rates'),
        value: 'Acm Currency Exchange Rates',
      },
      {
        label: t('Supplier contacts'),
        value: 'Supplier Contacts',
      },
      {
        label: t('Supplier location'),
        value: 'Supplier Location',
      },
      {
        label: t('Customer location'),
        value: 'Customer Location',
      },
      {
        label: t('Customer contacts'),
        value: 'Customer Contacts',
      },
      {
        label: t('User Role assignments'),
        value: 'User Role Assignments',
      },
      {
        label: t('Acm periods'),
        value: 'Acm Periods',
      },
    ],
    itemTemplate: "<div class='left-item '><div>{label}</div></div>",
  }

  useEffect(() => {
    setCategory(selected?.label)
  }, [selected])

  useEffect(() => {
    data && setRows(data?.Data[currentQuery])
  }, [data, selected?.value])

  const getObjectValue = (val) => {
    setFlag(false)
    reset()
    setSelected(val)
    const oData = objectData.find(({ ObjectName }) => ObjectName === val?.value)
    let filter = oData?.Columns
    setFilterObject(filter)
    filter = filter.filter(({ queryString }) => queryString === true)
    const newObj = {}
    filter.forEach((f) => {
      newObj[f.ColumnName] = null
    })

    setPayload(newObj)
    const query = oData?.QueryName
    setCurrentQuery(query)
  }

  const firstGridRef = useRef()
  const tableHeight = useMemo(() => {
    return calculateTableHeight(data, '')
  }, [size.height, size.width, data])

  const onGridReady = (event) => {
    const gridData = event.api.rowRenderer.rowModel.rowsToDisplay.map(
      (row) => row.data
    )
  }

  const onFirstDataRendered = () => {
    // event.columnApi.autoSizeAllColumns(true); // "true" is passed to skip the headers when calculating the column size
  }

  const onFilterChanged = (event) => {
    // setFilters(event.api.getFilterModel()); //CG when included this link the filter is not working
    const updatedData = event.api.rowRenderer.rowModel.rowsToDisplay.map(
      (row) => row.data
    )
    setFilteredData(updatedData)
  }
  const onCellDoubleClicked = () => {
    firstGridRef.current.api.refreshCells()
  }
  const id = selected?.label

  const getGridConfig = () => {
    const uiconfigObject = filterObject.map(
      (d) => ({
        field: d.ColumnName,
        headerName: d.ColumnDisplayName,
        width: 150,
        type: d.Type,
      }),
      []
    )

    setUiConfig({
      ref: firstGridRef,
      columnDefs: uiconfigObject,
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
        fileName: 'Admin console',
        sheetName: 'Admin console',
      },
      columnTypes: columnTypesConfig,
      sideBar: {
        toolPanels: [sidebarColsConfig, sidebarFilterConfig],
      },
      onFilterChanged,
      onGridReady,
      onFirstDataRendered,
      onCellDoubleClicked,
    })
  }

  const onSubmit = (data) => {
    setFlag(true)
    getGridConfig()
    Object.keys(data).forEach((key) => {
      if (!data[key]) delete data[key]
    })

    getobject({
      queryName: currentQuery,
      ...payload,
      ...data,
    })
  }

  const onExportHandler = (e) => {
    showFullScreenLoading()
    e.preventDefault()
    e.stopPropagation()
    const interval = setInterval(() => {
      if (uiConfig && uiConfig.gridApi) {
        uiConfig.gridApi.exportDataAsExcel({ fileName: selected.label })
        hideFullScreenLoading()
        clearInterval(interval)
      }
    }, 1000)
  }

  const config = {
    type: 'adminConsole',
    layout: 'grid',
    tabs: 0,
    isFullWidth: true,
  }
  const getFilterKeyName = (columnName) =>{
     if (columnName.indexOf('Reporting Attribute') >= 0){
        const index = columnName.replaceAll('Reporting Attribute', '').trim();
        return t('Reporting Attribute', {index})
     }
     else if( columnName.indexOf('Address') >=0) {
      const index = columnName.replaceAll('Address', '').trim();
      return t('Address', {index})
     }
     else {
      return t(columnName)
     }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`pl-1 pt-4 style-select text-xs relative gap-[20px] w-full pr-[25px] flex  app-dropdown flex-wrap`}
        >
          <div className="flex flex-col">
            <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
              {t("Object")}
            </label>
            <DropDown
              config={objConfig}
              labelField="label"
              valueField="value"
              onChange={(e) => getObjectValue(e)}
            />
          </div>
          {filterObject?.length ? (
            <>
              {filterObject
                .filter((d) => d.Filter === 'Y')
                .map((data) => (
                  <>
                    <div className="flex flex-col" key={data.ColumnName}>
                      <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[14px] tracking-[3%]">
                        {getFilterKeyName(data.ColumnDisplayName)}
                      </label>

                      <div className='w-[190px]'>
                        <Input
                          type="normal"
                          fieldName={data.ColumnName}
                          register={register}
                        />
                      </div>
                    </div>
                  </>
                ))}

              <div className="float-right flex justify-between ml-[17px] items-end">
                <div className="mr-[17px]">
                  <button
                    type="submit"
                    className="bg-lightgreen text-white font-bold font-Inter text-base rounded h-[40px] px-[10px]"
                  >
                    {t("Go")}
                  </button>
                </div>
                <button
                  className="flex items-center text-lightgreen text-xs font-normal font-Inter"
                  onClick={(e) => onExportHandler(e)}
                >
                  <img src={download} alt="download" />
                  {t("Download")}
                </button>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </form>
      {selected && uiConfig && filterObject?.length && flag ? (
        <ErrorBoundary>
          <AdminConfigForm
            isFetching={isFetching}
            id={id}
            rows={rows}
            tableHeight={tableHeight}
            uiConfig={uiConfig}
            data={data}
          />
        </ErrorBoundary>
      ) : (
        ''
      )}
    </div>
  )
}

export default Configurations
