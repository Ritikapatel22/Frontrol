import React, { useEffect, useRef, useState } from 'react'
import {
  DropDown,
  getAllQueryStringValue,
  setQueryStringValue,
} from '@frontrolinc/pace-ui-framework'
import { taskSelectConfig } from '../Search/taskSelectConfig'
import { employeeSelectConfig } from '../Search/EmployeeSelectConfig'
import { supplierSelectConfig } from '../Search/supplierSelectConfig'
import { organizationSelectConfig } from '../Search/OrganizationSelectConfig'
import closeIcon from '../../assets/Images/close-icon.svg'
import { setSelectedfilters } from '../../slices/reportslice'
import { useDispatch, useSelector } from 'react-redux'
import ProceedButton from '../Common/button/proceedButton'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

const SearchContainer = ({
  onSubmit,
  onInitialRender,
  projectId,
  open,
  setOpen,
  resCatConfig,
}) => {
  const { t } = useTranslation(['label', 'message'])

  const schema = yup.object({
    start_date: yup.string(),
    end_date: yup
      .string()
      .test('is-greater', t('End after start', { ns: 'message' }), function (
        value,
      ) {
        const { start_date } = this.parent
        var startD = new Date(start_date)
        var endD = new Date(value)
        return start_date && value ? startD.getTime() < endD.getTime() : true
      }),
  })

  const data = [
    {
      period_id: 'ptd',
      period_name: 'Current period',
    },
    {
      period_id: 'itd',
      period_name: 'Inception to date',
    },
    {
      period_id: 'pptd',
      period_name: 'Previous period',
    },
    {
      period_id: 'ytd',
      period_name: 'Year to date',
    },
  ]

  const periodConfig = {
    mode: 'singleSelect',
    remote: false,
    data: data.map((e) => {
      return { ...e, period_name: t(e.period_name) }
    }),
    itemTemplate: "<div class='left-item '><div>{period_name}</div></div>",
  }

  const reports = getAllQueryStringValue()
  if (reports?.period_name && reports?.period_id) {
    reports.period_name = data.find((item) => {
      return item.period_id === reports?.period_id
    })?.period_name
  }
  const dispatch = useDispatch()
  const sFilters = useSelector((state) => state.reports?.selectedFilters)
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const [queryItem, setQueryItem] = useState({
    task_id: reports?.task_id || '',
    supplier_id: reports?.supplier_id || '',
    person_id: reports?.person_id || '',
    organization_id: reports?.organization_id || '',
    resource_category: reports?.resource_category || '',
    period_id: reports?.period_id || 'ptd',
    start_date: reports?.start_date || null,
    end_date: reports?.end_date || null,
  })
  const [displayItem, setDisplayItem] = useState({
    task_name: reports?.task_name || '',
    supplier_name: reports?.supplier_name || '',
    full_name: reports?.full_name || '',
    organization_name: reports?.organization_name || '',
    res_name: t(reports?.res_name) || '',
    period_name: t(reports?.period_name) || t('Current period'),
    start_date: reports?.start_date || null,
    end_date: reports?.end_date || null,
  })

  const ref = useRef(null)
  const [keysToDelete, setKeysToDelete] = useState([])
  const [startDate, setStartDate] = useState(reports?.start_date || null)
  const [endDate, setEndDate] = useState(reports?.end_date || null)
  const [taskSelected, setTaskSelected] = useState({
    task_name: reports?.task_name || '',
    task_id: reports?.task_id || '',
  })
  const [supplierSelected, setSupplierSelected] = useState({
    supplier_name: reports?.supplier_name || '',
    supplier_id: reports?.supplier_id || '',
  })

  const [employeeSelected, setEmployeeSelected] = useState({
    full_name: reports?.full_name || '',
    person_id: reports?.person_id || '',
  })
  const [orgSelected, setOrgSelected] = useState({
    organization_name: reports?.organization_name || '',
    organization_id: reports?.organization_id || '',
  })
  const [resSelected, setResSelected] = useState({
    resource_category: reports?.resource_category || '',
    res_name: t(reports?.res_name) || '',
  })
  const [periodSelected, setPeriodSelected] = useState({
    period_id: reports?.period_id || 'ptd',
    period_name: t(reports?.period_name) || t('Current period'),
  })

  useEffect(() => {
    open && onClose()
  }, [open])

  taskSelectConfig.reduxConfig.params.queryConfig.project_id = projectId
  useEffect(() => {
    onInitialRender(displayItem, queryItem)
  }, [])

  const onChangeValue = (e, key1, key2, setSelected) => {
    if (e) {
      setQueryItem({
        ...queryItem,
        [key1]: e[key1],
      })
      setDisplayItem({ ...displayItem, [key2]: e[key2] })
      setSelected(e)
    } else {
      setQueryItem({ ...queryItem, [key1]: '' })
      setDisplayItem({ ...displayItem, [key2]: '' })
      setSelected({
        [key2]: '',
        [key1]: '',
      })
      const dd = { ...sFilters.report }
      delete dd[key1]
      delete dd[key2]
      dispatch(setSelectedfilters({ report: { ...dd } }))
      setKeysToDelete([...keysToDelete, key1, key2])
    }
  }

  const onDateChange = (val, key, setDate) => {
    if (val) {
      setQueryItem({ ...queryItem, [key]: val })
      setDisplayItem({
        ...displayItem,
        [key]: val,
      })
      setDate(val)
    } else {
      const dd = { ...sFilters.report }
      delete dd[key]
      dispatch(setSelectedfilters({ report: { ...dd } }))
      setQueryItem({ ...queryItem, [key]: null })
      setKeysToDelete([...keysToDelete, key])
      setDisplayItem({
        ...displayItem,
        [key]: null,
      })
      setDate(null)
    }
  }

  useEffect(() => {
    if (startDate || endDate) {
      onChangeValue(
        { period_name: t('Inception to date'), period_id: 'itd' },
        'period_id',
        'period_name',
        setPeriodSelected,
      )
    }
    if (startDate && endDate) {
      var startD = new Date(startDate)
      var endD = new Date(endDate)
      startD.getTime() < endD.getTime()
      clearErrors()
    } else if (!(startDate && endDate)) {
      clearErrors()
    }
  }, [startDate, endDate])

  useEffect(() => {
    if (periodSelected.period_id !== 'itd') {
      setStartDate('')
      setEndDate('')
    }
  }, [periodSelected])

  useEffect(() => {
    open
      ? (document.querySelector('body').style.overflow = 'hidden')
      : (document.querySelector('body').style.overflow = 'auto')
  }, [open])

  const onClose = () => {
    setTaskSelected({
      task_name: reports?.task_name || '',
      task_id: reports?.task_id || '',
    })
    setSupplierSelected({
      supplier_name: reports?.supplier_name || '',
      supplier_id: reports?.supplier_id || '',
    })

    setEmployeeSelected({
      full_name: reports?.full_name || '',
      person_id: reports?.person_id || '',
    })
    setOrgSelected({
      organization_name: reports?.organization_name || '',
      organization_id: reports?.organization_id || '',
    })
    setResSelected({
      resource_category: reports?.resource_category || '',
      res_name: t(reports?.res_name) || '',
    })
    setPeriodSelected({
      period_id: reports?.period_id || 'ptd',
      period_name: t(reports?.period_name) || t('Current period'),
    })
    setStartDate(reports?.start_date || undefined)
    setEndDate(reports?.end_date || undefined)
  }

  const getDropdown = (
    field_name,
    field_id,
    state_var,
    field_config,
    field_val,
    isClearable = true,
  ) => {
    return (
      <DropDown
        clearable={isClearable}
        config={field_config}
        labelField={field_name}
        valueField={field_id}
        value={field_val}
        onChange={(e) => onChangeValue(e, field_id, field_name, state_var)}
      />
    )
  }

  return (
    <div>
      <div
        ref={ref}
        className={`app-dropdown top-0 transition-all w-full z-[999] right-0 duration-250 ease-linear animation-all fixed h-[100vh]  overflow-y-auto  bg-[#fffffd] `}
      >
        <form
          onSubmit={handleSubmit(() => {
            if (keysToDelete.length > 0) {
              keysToDelete.map((val) => setQueryStringValue(val, undefined))
            }
            setOpen(false)
            onSubmit(displayItem, queryItem)
          })}
        >
          <div className="flex justify-between flex-col h-full relative py-4">
            <div>
              <div className="flex items-center justify-between px-[10px] sm:px-[30px]">
                <h1 className="text-base sm:text-2xl text-[#0e3943] font-bold font-Inter">
                  {t('Parameters')}
                </h1>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                  }}
                >
                  <img
                    src={closeIcon}
                    alt="close-icon"
                    className="hover:bg-[#E6F3F0]"
                  />
                </button>
              </div>
              <div className="overflow-x-auto drawer-height">
                <div className="p-[5px] mx-[10px] sm:mx-[30px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t('task_name')}
                  </label>
                  {getDropdown(
                    'task_name',
                    'task_id',
                    setTaskSelected,
                    taskSelectConfig,
                    taskSelected,
                  )}
                </div>
                <div className="p-[5px] mx-[10px] sm:mx-[30px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t('full_name')}
                  </label>
                  {getDropdown(
                    'full_name',
                    'person_id',
                    setEmployeeSelected,
                    employeeSelectConfig,
                    employeeSelected,
                  )}
                </div>
                <div className="p-[5px] mx-[10px] sm:mx-[30px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t('supplier_name')}
                  </label>
                  {getDropdown(
                    'supplier_name',
                    'supplier_id',
                    setSupplierSelected,
                    supplierSelectConfig,
                    supplierSelected,
                  )}
                </div>
                <div className="p-[5px] mx-[10px] sm:mx-[30px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t('organization_name')}
                  </label>
                  {getDropdown(
                    'organization_name',
                    'organization_id',
                    setOrgSelected,
                    organizationSelectConfig,
                    orgSelected,
                  )}
                </div>
                <div className="p-[5px] mx-[10px] sm:mx-[30px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t('res_name')}
                  </label>
                  {getDropdown(
                    'res_name',
                    'resource_category',
                    setResSelected,
                    resCatConfig,
                    resSelected,
                  )}
                </div>
                <div className="p-[5px] mx-[10px] sm:mx-[30px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t('Period')}
                  </label>
                  {getDropdown(
                    'period_name',
                    'period_id',
                    setPeriodSelected,
                    periodConfig,
                    periodSelected,
                    false,
                  )}
                </div>
                <div className="p-[5px] mx-[10px] sm:mx-[30px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t('From date')}
                  </label>
                  <input
                    {...register('start_date')}
                    name="start_date"
                    value={startDate || ''}
                    onChange={(e) =>
                      onDateChange(e.target.value, 'start_date', setStartDate)
                    }
                    type="date"
                    className="mb-3 flex justify-between select-input font-Inter border-solid border-2 rounded-md bg-[#ffff] border-[#9BBEAF] text-[#333333] focus:outline-earthgreen  focus:ring-earthgreen focus:bg-white focus:border-earthgreen relative text-ellipsis overflow-hidden rounded-r whitespace-nowrap w-[100%] text-left pl-[10px]  items-center h-[2.2rem]  flex text-sm p-3 min-h-[36px]"
                    placeholder="Select date"
                  />
                </div>
                <div className="p-[5px] mx-[10px] sm:mx-[30px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t('To date')}
                  </label>
                  <input
                    {...register('end_date')}
                    name="end_date"
                    value={endDate || ''}
                    onChange={(e) =>
                      onDateChange(e.target.value, 'end_date', setEndDate)
                    }
                    type="date"
                    className="mb-1 flex justify-between select-input font-Inter border-solid border-2 rounded-md bg-[#ffff] border-[#9BBEAF] text-[#333333] focus:outline-earthgreen  focus:ring-earthgreen focus:bg-white focus:border-earthgreen relative text-ellipsis overflow-hidden rounded-r whitespace-nowrap w-[100%] text-left pl-[10px]  items-center h-[2.2rem]  flex text-sm p-3 min-h-[36px]"
                    placeholder="Select date"
                  />
                  {errors.end_date && (
                    <p className="text-red text-xs">
                      {errors.end_date?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="proceed">
              <div className="flex items-center pt-5 mx-[10px] sm:mx-[30px] pb-1">
                <ProceedButton type="primaryButton" label={t('Apply')} />
                <ProceedButton
                  type="secondaryButton"
                  label={t('Cancel')}
                  handleClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {open && (
        <div className="fixed overlay h-[100vh] w-[100%] right-0 top-0 bottom-0 left-0  z-[98]"></div>
      )}
    </div>
  )
}

export default SearchContainer
