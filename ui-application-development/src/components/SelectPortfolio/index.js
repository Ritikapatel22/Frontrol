import React, { useState, useMemo, memo, useEffect } from 'react'
import { DropDown } from '@frontrolinc/pace-ui-framework'
import { projectNumberConfig } from '../Search/projectNumberConfig'
import { projectNameConfig } from '../Search/projectNameConfig'
import { projectLongNameConfig } from '../Search/projectLongNameConfig'
import { customerNumConfig } from '../Search/customerNumberConfig'
import { customerNameConfig } from '../Search/customerNameConfig'
import { employeeSelectConfig } from '../Search/EmployeeSelectConfig'
import { operatingUnitConfig } from '../Search/operatingUnitConfig'
import { orgLevel4Config } from '../Search/orgLevel4Config'
import { orgLevel5Config } from '../Search/orgLevel5Config'
import { orgLevel8Config } from '../Search/orgLevel8Config'
import { orgLevel9Config } from '../Search/orgLevel9Config'
import { useTranslation } from 'react-i18next'

function SelectUnit({
  projectStatusQuery,
  index,
  unit,
  dataValue,
  valueType,
  handelMapping,
  saperateValue,
  defalultValue,
  setDefaultValue,
  xValue2,
  setxValue2,
  show,
  disable,
  portfolioCriterias,
  Error,
}) {
  const value = useMemo(() => dataValue?.criteria_id)
  const option = useMemo(() =>
    portfolioCriterias?.Data['Portfolio.GetPortfolioCriterias']?.find(
      (o) => o.criteria_id === value,
    ),
  )
  const fieldDisable = useMemo(() =>
    !show ? (disable ? true : defalultValue ? false : true) : false,
  )
  const { t } = useTranslation(['message'])

  const [multiValue, setMultiValue] = useState('')

  const statusConfig = {
    mode: 'multiSelect',
    remote: false,
    data: projectStatusQuery?.Data[unit]
      ? projectStatusQuery?.Data[unit]?.map((item, key) => {
          return {
            label: item?.option,
            value: item?.value,
          }
        })
      : [],
    itemTemplate: "<div class='left-item '><div>{label}</div>",
  }

  const dataValueConfig =
    option?.search_pop_up === 'ProjectNameSearch'
      ? 'project_name'
      : option?.search_pop_up === 'ProjectNumberSearch'
      ? 'project_number'
      : option?.search_pop_up === 'ProjectLongNameSearch'
      ? 'project_long_name'
      : option?.search_pop_up === 'CustomerNumberSerarch'
      ? 'customer_number'
      : option?.search_pop_up === 'CustomerNameSearch'
      ? 'customer_name'
      : option?.search_pop_up === 'KeyMemberSearch'
      ? 'full_name'
      : option?.search_pop_up === 'OperatingUnitSearch'
      ? 'level9_org_name'
      : option?.search_pop_up === 'OrgLevel4Search'
      ? 'level4_org_name'
      : option?.search_pop_up === 'OrgLevel5Search'
      ? 'level5_org_name'
      : option?.search_pop_up === 'OrgLevel6Search'
      ? 'level8_org_name'
      : option?.search_pop_up === 'OrgLevel7Search'
      ? 'level9_org_name'
      : 'value'

  useEffect(() => {
    setMultiValue(
      saperateValue.length > 0
        ? saperateValue?.map((val) => {
            return { [dataValueConfig]: val }
          })
        : '',
    )
  }, [saperateValue])

  if (
    valueType === 'Number,Dropdown(multi-select)' ||
    valueType === 'Text,Dropdown(multi-select)' ||
    valueType === 'Dropdown(multi-select)'
  ) {
    if (
      dataValue?.operator === 'in_list' ||
      dataValue?.operator === 'not_in_list'
    ) {
      return (
        <div
          className={`multiselect ${dataValue.value_1 === undefined && Error} `}
        >
          <DropDown
            config={
              option?.search_pop_up === 'ProjectNameSearch'
                ? { ...projectNameConfig, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'ProjectNumberSearch'
                ? { ...projectNumberConfig, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'ProjectLongNameSearch'
                ? { ...projectLongNameConfig, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'CustomerNumberSerarch'
                ? { ...customerNumConfig, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'CustomerNameSearch'
                ? { ...customerNameConfig, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'KeyMemberSearch'
                ? { ...employeeSelectConfig, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'OperatingUnitSearch'
                ? { ...operatingUnitConfig, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'OrgLevel4Search'
                ? { ...orgLevel4Config, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'OrgLevel5Search'
                ? { ...orgLevel5Config, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'OrgLevel6Search'
                ? { ...orgLevel8Config, ['mode']: 'multiSelect' }
                : option?.search_pop_up === 'OrgLevel7Search'
                ? { ...orgLevel9Config, ['mode']: 'multiSelect' }
                : statusConfig
            }
            labelField={dataValueConfig}
            valueField={dataValueConfig}
            value={multiValue}
            placeholder={option?.search_pop_up === '' ? 'Select' : 'Search'}
            onChange={handelMapping}
            maxSelection={20}
            disable={fieldDisable}
            className={'value-field'}
          />
        </div>
      )
    } else if (dataValue?.operator === 'between') {
      return (
        <>
          <input
            type={`${
              valueType === 'Number,Dropdown(multi-select)' ? 'number' : 'text'
            }`}
            maxLength="50"
            name="value_1"
            disabled={fieldDisable}
            value={defalultValue ? defalultValue : ''}
            autoComplete="off"
            className={`${
              dataValue.value_1 === undefined ||
              dataValue.value_1 === null ||
              dataValue.value_1 === ''
                ? Error === 'errorField' && 'inputError'
                : ''
            } w-[138px] pl-[10px] value-field text-black mr-[0px] border-2 ${
              !fieldDisable
                ? 'bg-[#ffff] border-[#9BBEAF] text-[#333333]'
                : 'bg-[#F2F2F2] border-[#ececec] text-[#9f9fa1]'
            } border-[#9BBEAF] bg-[#ffff] rounded-md focus:outline-earthgreen  focus:ring-earthgreen focus:bg-white focus:border-gray-500 lastfild`}
            onChange={(e) => {
              handelMapping(e.target.value, index, e.target.name)
              setDefaultValue(e.target.value)
            }}
            onKeyPress={
              valueType === 'Number,Dropdown(multi-select)'
                ? (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }
                : () => {}
            }
          />
          <input
            type={`${
              valueType === 'Number,Dropdown(multi-select)' ? 'number' : 'text'
            }`}
            maxLength="50"
            name="value_2"
            disabled={fieldDisable}
            value={xValue2 ? xValue2 : ''}
            autoComplete="off"
            className={`${
              dataValue.value_2 === undefined ||
              dataValue.value_2 === null ||
              dataValue.value_2 === ''
                ? Error === 'errorField' && 'inputError'
                : ''
            } w-[138px] pl-[10px] value-field text-black mr-[10px] border-2 ${
              !fieldDisable
                ? 'bg-[#ffff] border-[#9BBEAF] text-[#333333]'
                : 'bg-[#F2F2F2] border-[#ececec] text-[#9f9fa1]'
            } border-[#9BBEAF] bg-[#ffff] rounded-md focus:outline-earthgreen  focus:ring-earthgreen focus:bg-white focus:border-gray-500 lastfild`}
            onChange={(e) => {
              handelMapping(e.target.value, index, e.target.name)
              setxValue2(e.target.value)
            }}
            onKeyPress={
              valueType === 'Number,Dropdown(multi-select)'
                ? (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }
                : () => {}
            }
          />
        </>
      )
    } else {
      return (
        <input
          type={`${
            valueType === 'Number,Dropdown(multi-select)' ? 'number' : 'text'
          }`}
          maxLength="50"
          name="value_1"
          disabled={fieldDisable}
          value={defalultValue ? defalultValue : ''}
          autoComplete="off"
          className={`${
            dataValue.value_1 === undefined ||
            dataValue.value_1 === null ||
            dataValue.value_1 === ''
              ? Error === 'errorField' && 'inputError'
              : ''
          } w-[296px] pl-[10px] value-field text-black mr-[10px] border-2 ${
            !fieldDisable
              ? 'bg-[#ffff] border-[#9BBEAF] text-[#333333]'
              : 'bg-[#F2F2F2] border-[#ececec] text-[#9f9fa1]'
          } border-[#9BBEAF] bg-[#ffff] rounded-md focus:outline-[#008768]  focus:ring-[#008768] focus:bg-white focus:border-[#008768] lastfild`}
          onChange={(e) => {
            handelMapping(e.target.value, index, e.target.name)
            setDefaultValue(e.target.value)
          }}
          onKeyPress={
            valueType === 'Number,Dropdown(multi-select)'
              ? (event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault()
                  }
                }
              : () => {}
          }
        />
      )
    }
  } else if (valueType === 'Date') {
    if (dataValue?.operator === 'between') {
      return (
        <>
          <input
            type="date"
            value={defalultValue ? defalultValue : ''}
            disabled={fieldDisable}
            name="value_1"
            className={`${
              (!fieldDisable && dataValue.value_1 === undefined) ||
              dataValue.value_1 === null ||
              dataValue.value_1 === ''
                ? Error === 'errorField' && 'inputError'
                : ''
            } w-[138px] pl-[10px] value-field border-solid border-2 ${
              !fieldDisable
                ? 'bg-[#ffff] border-[#9BBEAF] text-[#333333] lastfild'
                : 'bg-[#F2F2F2] border-[#ececec] text-[#9f9fa1]'
            } rounded-md focus:outline-[#008768]  focus:ring-[#008768] focus:bg-white focus:border-[#008768]`}
            onChange={(e) => {
              handelMapping(e.target.value, index, e.target.name)
              setDefaultValue(e.target.value)
            }}
          />
          <input
            type="date"
            value={xValue2 ? xValue2 : ''}
            disabled={fieldDisable}
            name="value_2"
            className={`${
              (!fieldDisable && dataValue.value_2 === undefined) ||
              dataValue.value_2 === null ||
              dataValue.value_2 === ''
                ? Error === 'errorField' && 'inputError'
                : ''
            } w-[138px] pl-[10px] value-field mr-[10px] border-solid border-2 ${
              !fieldDisable
                ? 'bg-[#ffff] border-[#9BBEAF] text-[#333333] lastfild'
                : 'bg-[#F2F2F2] border-[#ececec] text-[#9f9fa1]'
            } rounded-md focus:outline-[#008768]  focus:ring-[#008768] focus:bg-white focus:border-[#008768]`}
            onChange={(e) => {
              handelMapping(e.target.value, index, e.target.name)
              setxValue2(e.target.value)
            }}
          />
        </>
      )
    } else {
      return (
        <input
          type="date"
          value={defalultValue ? defalultValue : ''}
          disabled={fieldDisable}
          name="value_1"
          className={`${
            (!fieldDisable && dataValue.value_1 === undefined) ||
            dataValue.value_1 === null ||
            dataValue.value_1 === ''
              ? Error === 'errorField' && 'inputError'
              : ''
          } w-[296px] pl-[10px] value-field border-solid border-2 ${
            !fieldDisable
              ? 'bg-[#ffff] border-[#9BBEAF] text-[#333333] lastfild'
              : 'bg-[#F2F2F2] border-[#ececec] text-[#9f9fa1]'
          } mr-[10px] rounded-md focus:outline-[#008768]  focus:ring-[#008768] focus:bg-white focus:border-[#008768]`}
          onChange={(e) => {
            handelMapping(e.target.value, index, e.target.name)
            setDefaultValue(e.target.value)
          }}
        />
      )
    }
  } else {
    return (
      <input
        type="text"
        name="value_1"
        disabled={fieldDisable ? fieldDisable : ''}
        maxLength="50"
        value={defalultValue ? defalultValue : ''}
        autoComplete="off"
        className={`${
          (!fieldDisable && dataValue.value_1 === undefined) ||
          dataValue.value_1 === null ||
          dataValue.value_1 === ''
            ? Error === 'errorField' && 'inputError'
            : ''
        } w-[296px] pl-[10px] value-field border-2 ${
          !fieldDisable
            ? 'bg-[#ffff] border-[#9BBEAF] text-[#333333] lastfild'
            : 'bg-[#F2F2F2] border-[#ececec] text-[#9f9fa1]'
        } mr-[10px] rounded-md focus:outline-[#008768]  focus:ring-[#008768] focus:bg-white focus:border-[#008768]`}
        onChange={(e) => {
          handelMapping(e.target.value, index, e.target.name)
          setDefaultValue(e.target.value)
        }}
      />
    )
  }
}

export default memo(SelectUnit)
