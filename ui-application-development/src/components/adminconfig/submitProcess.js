import React, { useState, useMemo, useRef, useEffect } from 'react'
import { columnTypesConfig, sidebarColsConfig } from '../../formatCols'
import { useLazyFetchDataQuery, useUpdateDataMutation } from '../../app/appApi'
import useWindowSize from '../../hooks/useWindowSize'
import { calculateTableHeight } from '../../components/Reportpage/helpers'
import {
  DropDown,
  ErrorBoundary,
} from '@frontrolinc/pace-ui-framework'
import './admin.css'
import Input from '../Common/textField'
import { useForm } from 'react-hook-form'
import AdminConfigForm from './adminConfigForm'
import Retry from '../../assets/Images/refresh.svg'
import Profilepic from '../Common/views/profilepic'
import { useTranslation } from "react-i18next";

export const SPConfig = {
  columnDefs: [
    {
      field: 'category',
      headerName: 'Process name',
      width: 120,
    },
    {
      field: 'run_start_date',
      headerName: 'Stared on',
      width: 120,
      type: ['dateFormat'],
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
    },
    {
      field: 'run_end_date',
      headerName: 'Completed on',
      width: 120,
      type: ['dateFormat'],
    },
    {
      field: 'container_name',
      headerName: 'Container name',
      width: 120,
    },
    {
      field: 'error_details',
      headerName: 'Error details',
      width: 120,
    },
    {
      field: 'file_name',
      headerName: 'File name',
      width: 120,
    },
    {
      field: 'message',
      headerName: 'Message',
      width: 120,
    },
    {
      field: 'payload_name',
      headerName: 'Payload name',
      width: 120,
    },
    {
      field: 'process_log_id',
      headerName: 'Process log id',
      width: 120,
    },
    {
      field: 'retry_date',
      headerName: 'Retry date',
      width: 120,
      type: ['dateFormat'],
    },
    {
      field: 'full_name',
      headerName: 'Created by',
      width: 170,
    },
    {
      field: 'log_file_path',
      headerName: 'Action',
      width: 120,
      pinned: 'right',
      cellClass: 'acm-hyperlink',
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

const SubmitProcess = () => {
  const [rows, setRows] = useState([])
  const [process, setProcess] = useState()
  const size = useWindowSize()
  const [getobject, { data, isFetching, isLoading }] = useLazyFetchDataQuery()
  const { register, handleSubmit, reset } = useForm({})
  const [retry, { data: response }] = useUpdateDataMutation()
  const {t} = useTranslation(['label'])

  useEffect(() => {
    SPConfig.ref = firstGridRef
    for(let i in SPConfig.columnDefs){
      if(SPConfig.columnDefs[i].field === 'status' && SPConfig.columnDefs[i].field === 'status'){
        SPConfig.columnDefs[i].cellRenderer = (param) => {
          return (
            <div className="flex items-center justify-between">
              <span>{param.value}</span>
              {param.value === "Error" && (
                <img src={Retry} alt="retry" className="w-[17px] h-[17px] cursor-pointer" onClick={() => retryProcess(param?.data?.process_log_id)}/>
              )}
            </div>
          );
        }
      }
      else if(SPConfig.columnDefs[i].field === 'full_name'){
        SPConfig.columnDefs[i].cellRenderer = (param) => {
          const data = param?.value?.split(", ")
          return (
            <div className="flex items-center justify-between">
              <Profilepic user={{
                  first_name: data?.[0],
                  last_name: data?.[1],
                }}
                id={param?.data?.person_id}
                classData="w-[20px] h-[20px]"
                textClass="text-xs"
                 />
              <span className='ml-[10px]'>{data}</span>
            </div>
          );
        }
      }
      else if(SPConfig.columnDefs[i].field === 'log_file_path' && SPConfig.columnDefs[i].field === 'log_file_path'){
        SPConfig.columnDefs[i].cellRenderer = (param) => {
          return (
            <div>
             {param.value && <a href={param.value} className="acm-hyperlink" target="_blank">Log</a>}
            </div>
          );
        }
      }
    }
  },[])


  const objConfig = {
    mode: 'singleSelect',
    remote: false,
    data: [
      {
        label: t("Rebuild snapshot"),
        value: 'RecalcSnapshot',
      },
      {
        label: t('Update cache'),
        value: 'UpdateCache',
      },
    ],
    itemTemplate: "<div class='left-item '><div>{label}</div></div>",
  }


  useEffect(() => {
    getobject({
      queryName: 'FntlServerlessProcessLog.getAllProcessLogs',
      __config__: {
        providesTags: () => ['FntlServerlessProcessLog.retry'],
      },
    })
  }, [])

  useEffect(() => {
    data && setRows(data?.Data['FntlServerlessProcessLog.getAllProcessLogs'])
  }, [data])

  const firstGridRef = useRef()

  const tableHeight = useMemo(() => {
    return calculateTableHeight(data, '')
  }, [size.height, size.width, data])

  const retryProcess = (id) => {
    retry({
      __config__: {
        url: '/serverlessprocess/retryprocess',
        method: 'POST',
        invalidatesTags: () => ['FntlServerlessProcessLog.retry'],
      },
      body: {
        processLogId: id,
      },
    })
  }

  const id = 'favourite'

  const onSubmit = (data) => {
    console.log(process, data)
    let body
    if(process?.value === 'UpdateCache') {
      body = {
        category: process?.value,
      }
    } else {
      body = {
        category: process?.value,
        projectNumbers: data?.parameter
      }
    }
    retry({
      __config__: {
        url: '/serverlessprocess/startprocess',
        method: 'POST',
        invalidatesTags: () => ['FntlServerlessProcessLog.retry'],
      },
      body
    })
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`pl-1 pt-4 style-select text-xs relative gap-[20px] w-full pr-[25px] app-dropdown flex`}
        >
          <div className="flex flex-col">
            <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
            {t("Select process")}
            </label>
            <DropDown
              config={objConfig}
              labelField="label"
              valueField="value"
              onChange={setProcess}
            />
          </div>
          <>
            <div className="flex flex-col">
              <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
              {t("Enter parameters")}
              </label>

              <div className="w-[250px]">
                <Input
                  type="normal"
                  fieldName="parameter"
                  register={register}
                />
              </div>
            </div>
            <div className="float-right flex justify-between ml-[17px] items-end">
              <div className="mr-[17px]">
                <button
                  disabled={!process}
                  type="submit"
                  className={`${!process ? 'bg-[#9BBEAF]' : 'bg-lightgreen'} text-white font-bold font-Inter text-base rounded h-[40px] px-[10px]`}
                >
                  {t("Go")}
                </button>
              </div>
            </div>
          </>
        </div>
      </form>
      {SPConfig ? (
        <ErrorBoundary>
          <AdminConfigForm
            isFetching={isFetching}
            id={id}
            rows={rows}
            tableHeight={tableHeight}
            uiConfig={SPConfig}
            data={data}
          />
        </ErrorBoundary>
      ) : (
        ''
      )}
    </div>
  )
}

export default SubmitProcess