import React, { useMemo, useState, memo, useEffect } from 'react'

import SearchIcon from '../../../assets/Images/searchIcon.svg'
import CloseIcon from '../../../assets/Images/close-icon.svg'
import add from '../../../assets/Images/add.svg'

import { showToast } from '@frontrolinc/pace-ui-framework'
import { useNavigate } from 'react-router-dom'
import { uid } from '../../../helpers/utils'
import {
  useFetchDataQuery,
  useGetProjectStatusQuery,
  useUpdateDataMutation,
} from '../../../app/appApi'

import SelectField from '../../SelectPortfolio/selectField'
import ProceedButton from '../button/proceedButton'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  setFilterValue,
  setSearchResult,
  setStatus,
  setErrorValue,
} from '../../../slices/portfolioslice'

function AdvanceOption({ setAdvance, prevFilters }) {
  const navigate = useNavigate()
  const { t } = useTranslation(['label', 'message'])

  let {
    isLoading: criteriaLoading,
    data: portfolioCriterias,
  } = useFetchDataQuery({
    queryName: 'Portfolio.GetPortfolioCriterias',
  })
  const dispatch = useDispatch()
  const { data: projectStatusQuery } = useGetProjectStatusQuery()

  const [update, { isLoading }] = useUpdateDataMutation()
  const [Error, setError] = useState('')
  const [inputList, setInputList] = useState([])

  useEffect(() => {
    setInputList(
      prevFilters
        ? prevFilters?.map((val) => {
            return {
              CRUD: 'C',
              id: uid(),
              criteria_id:
                val.criteria_id !== null
                  ? ('P' + val.criteria_id)?.substring(1)
                  : null,
              operator:
                val.operator !== null
                  ? ('P' + val?.operator)?.substring(1)
                  : null,
              value_1: val?.value_1,
              value_2: val?.value_2,
              value_3: val?.value_3,
              value_4: val?.value_4,
              value_5: val?.value_5,
              value_6: val?.value_6,
              value_7: val?.value_7,
              value_8: val?.value_8,
              value_9: val?.value_9,
              value_10: val?.value_10,
              value_11: val?.value_11,
              value_12: val?.value_12,
              value_13: val?.value_13,
              value_14: val?.value_14,
              value_15: val?.value_15,
              value_16: val?.value_16,
              value_17: val?.value_17,
              value_18: val?.value_18,
              value_19: val?.value_19,
              value_20: val?.value_20,
            }
          })
        : [
            {
              CRUD: 'C',
              id: uid(),
              criteria_id: null,
              operator: null,
              value_1: null,
              value_2: null,
              value_3: null,
              value_4: null,
              value_5: null,
              value_6: null,
              value_7: null,
              value_8: null,
              value_9: null,
              value_10: null,
              value_11: null,
              value_12: null,
              value_13: null,
              value_14: null,
              value_15: null,
              value_16: null,
              value_17: null,
              value_18: null,
              value_19: null,
              value_20: null,
            },
          ],
    )
  }, [prevFilters, setAdvance])

  const handleAddClick = () => {
    setError('')
    const list = inputList ? inputList : []
    setInputList([
      ...list,
      {
        CRUD: 'C',
        id: uid(),
        criteria_id: null,
        operator: null,
        value_1: null,
        value_2: null,
        value_3: null,
        value_4: null,
        value_5: null,
        value_6: null,
        value_7: null,
        value_8: null,
        value_9: null,
        value_10: null,
        value_11: null,
        value_12: null,
        value_13: null,
        value_14: null,
        value_15: null,
        value_16: null,
        value_17: null,
        value_18: null,
        value_19: null,
        value_20: null,
      },
    ])
  }
  const onSubmit = () => {
    const finalObj =
      inputList &&
      [...inputList]
        ?.filter((val) => {
          return val.criteria_id != null || val.criteria_id != undefined
        })
        ?.map(({ id, CRUD, ...rest }) => ({ ...rest }))
    const checkNullFilters = finalObj?.find((val) => {
      if (val.criteria_id !== null) {
        return (
          val.operator === null ||
          val.operator === undefined ||
          val.value_1 === undefined ||
          val.value_1 === ''
        )
      }
    })
    if (checkNullFilters === undefined) {
      setError('')
      setAdvance(false)
      const apiData = finalObj
      dispatch(setFilterValue(inputList))
      update({
        body: apiData,
        __config__: {
          url: 'advance-search?searchName=Portfolio.AdvanceProjectSearch',
        },
      })
        .unwrap()
        .then((res) => {
          if (res?.Status === 'ERROR') {
            dispatch(setErrorValue(res?.Message))
          } else if (res?.Status === 'SUCCESS') {
            dispatch(setSearchResult(res?.Data))
            dispatch(setErrorValue(null))
          }
        })
      if (window.location.pathname !== '/projects/project-advanced-search') {
        navigate(`/projects/project-advanced-search`)
      }
    } else {
      setError('errorField')
      showToast(
        'error',
        `${t('highlighted field', { ns: 'message' })}`,
        'drawer',
      )
    }
  }

  useEffect(() => {
    dispatch(setStatus(isLoading))
  }, [isLoading])

  const disable = useMemo(() => false)

  return (
    <div className="fixed right-0 top-0 z-[999] h-[100vh] max-w-[55rem] min-w-[55rem] text-xs bg-white rounded overflow-y-auto shadow-lg">
      <div className="flex flex-col h-full">
        <div className=" pl-9 pr-11 pt-9">
          <div className="flex items-center justify-between pb-8 cursor-pointer">
            <div className="flex items-center mt-[1px]">
              <div className="w-[32px] h-[32px] ml-[-8px]">
                <img src={SearchIcon} alt="back" className="w-full h-full" />
              </div>
              <h2 className="ml-3 text-2xl font-bold font-Inter text-green ">
                {t("Advanced search")}
              </h2>
            </div>
            <div className="w-[32px] h-[32px] ml-[-8px]">
              <img
                src={CloseIcon}
                alt="back"
                className="w-full h-full hover:bg-[#E6F3F0]"
                onClick={() => setAdvance(false)}
              />
            </div>
          </div>
          <div className="flex mb-3">
            <ProceedButton
              type="secondaryButton"
              label={t('Add filters')}
              handleClick={() => handleAddClick()}
              icon={add}
            />
          </div>
          <div className="overflow-x-auto h-[60vh] lg:h-[63vh] xl:h-[vh] 2xl:h-[64vh] pb-[10px] advancedSearch">
            {inputList.map((val, indx) => {
              return (
                <div className="style-select select" key={val.id}>
                  <SelectField
                    index={indx}
                    dataValue={val}
                    setInputList={setInputList}
                    inputList={inputList}
                    disable={disable}
                    projectStatusQuery={projectStatusQuery}
                    criteriaLoading={criteriaLoading}
                    portfolioCriterias={portfolioCriterias}
                    Error={Error}
                    setError={setError}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="proceed mt-auto z-[10] bg-white">
          <div className="flex items-center pt-5 mx-[10px] sm:mx-[30px] pb-5">
            <ProceedButton
              type="primaryButton"
              label={t('Search')}
              handleClick={() => onSubmit()}
            />
            <ProceedButton
              type="secondaryButton"
              label={t('Cancel')}
              handleClick={() => setAdvance(false)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(AdvanceOption)
