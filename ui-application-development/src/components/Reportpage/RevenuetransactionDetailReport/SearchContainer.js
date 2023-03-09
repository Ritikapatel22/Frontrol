import React, { useState } from 'react'
import { projectSelectConfig } from './projectSelectConfig'
import { projectResentConfig } from './ProjectRecentConfig'
import { DropDown } from '@frontrolinc/pace-ui-framework'

const SearchContainer = () => {
  const multiCurrency = { ...projectSelectConfig, ['mode']: 'multiSelect' }
  const statusesDDConfig = {
    mode: 'singleSelect',
    remote: false,
    data: [
      {
        id: 'OPEN',
        status: 'OPEN',
      },
      {
        id: 'CLOSED',
        status: 'CLOSED',
      },
      {
        id: 'IN_REVIEW',
        status: 'IN REVIEW',
      },
    ],
    itemTemplate: "<div class='left-item '><div>{status}</div></div>",
  }

  const statusConfig = {
    mode: 'multiSelect',
    remote: false,
    data: [
      {
        project_number: '60337301',
        project_name: 'TCC, Liverpool',
        project_id: 2596,
      },
      {
        project_number: '60337302',
        project_name: 'PCSMTH',
        project_id: 2595,
      },
      {
        project_number: '60337303',
        project_name: 'Liverpool',
        project_id: 2598,
      },
      {
        project_number: '603373074',
        project_name: 'Liverpool',
        project_id: 2598,
      },
      {
        project_number: '60337306',
        project_name: 'Liverpool',
        project_id: 2598,
      },
    ],
    itemTemplate:
      "<div class='left-item '><div>{project_number} ({project_name})</div><div class='full-name'></div><div>{employee_number}</div></div><div class='right-item'>{customer_name}</div>",
  }

  const [statusSelected] = useState({
    status: 'OPEN',
    id: 'OPEN',
  })
  const [defaultProjectSelected] = useState({
    project_number: '60337301',
    project_name: 'TCC, Liverpool',
    project_id: 2596,
  })
  const [multiSelectDefault] = useState([
    {
      project_number: '60337301',
      project_name: 'TCC, Liverpool',
      project_id: 2596,
    },
  ])
  const onStatusChange = (e) => {
    console.log('onStatusChange = ', e)
  }

  return (
    <>
      <div className="flex">
        <div className="flex flex-col m-2">
          <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
            Project
          </label>
          <div className="drop-down-Con d-flex">
            <DropDown
              config={projectResentConfig}
              labelField="project_name"
              valueField="project_number"
              value={defaultProjectSelected}
              onChange={onStatusChange}
            />
          </div>
        </div>
        <div className="flex flex-col m-2">
          <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
            Status
          </label>
          <div className="drop-down-Con d-flex">
            <DropDown
              config={statusesDDConfig}
              labelField="status"
              valueField="id"
              placeholder="Select Status"
              value={statusSelected}
              onChange={onStatusChange}
            />
          </div>
        </div>
        <div className="flex flex-col m-2">
          <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
            MultiSelect
          </label>
          <div className="drop-down-Con d-flex">
            <DropDown
              config={multiCurrency}
              labelField="project_name"
              valueField="project_number"
              placeholder="Select Status"
              onChange={onStatusChange}
              maxSelection={5}
              value={multiSelectDefault}
              disable={true}
            />
          </div>
        </div>
        <div className="flex flex-col m-2">
          <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
            MultiSelect status
          </label>
          <div className="drop-down-Con d-flex">
            <DropDown
              config={statusConfig}
              labelField="project_name"
              valueField="project_number"
              placeholder="Select Status"
              onChange={onStatusChange}
              maxSelection={4}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchContainer
