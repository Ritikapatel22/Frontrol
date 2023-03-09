import { useEffect, useRef, useState } from 'react'

import { useFetchDataQuery } from '../../../app/appApi'
import { useForm } from 'react-hook-form'
import { selectedPortFolio } from '../../../slices/portfolioslice'
import { useDispatch } from 'react-redux'
import {
  useCustomization,
  showToast,
  getQueryStringValue,
} from '@frontrolinc/pace-ui-framework'
import { uid } from '../../../helpers/utils'
import { memo } from 'react'
import SelectField from '../../SelectPortfolio/selectField'
import Skeleton from '../../Skeleton'
import ProceedButton from '../button/proceedButton'
import Input from '../textField'
import { useTranslation } from 'react-i18next';
import back from '../../../assets/Images/back.svg'
import add from '../../../assets/Images/add.svg'
import { useMemo } from 'react'

function NewPortfolio({
  projectStatusQuery,
  criteriaLoading,
  portfolioCriterias,
  setNewPortfolio,
  formIntialdata,
  setPortfolio,
  portfolioData,
  handleAddNewView,
  portfolioHandle,
  setSelect,
  select,
  portfolios,
}) {

  const { t } = useTranslation(['label', 'message']);

  // Get portfolio filters
  let {
    isLoading,
    isFetching,
    data: portfolioFilter,
    refetch: reftechFilters,
  } =
    portfolioData?.portfolio_id &&
    useFetchDataQuery({
      queryName: `Portfolio.GetPortfolioDetailsByPortfolioId`,
      portfolio_id: portfolioData.portfolio_id,
    })

  useEffect(() => {
    if (portfolioData?.portfolio_id) {
      reftechFilters()
    }
  }, [portfolioData])

  // store portfolio filters
  const [inputList, setInputList] = useState([])
  const [Error, setError] = useState('')
  const [scroll, setScroll] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    clearErrors,
  } = useForm({ defaultValues: portfolioData })
  const { syncToDataBase } = useCustomization()
  const refFrom = useRef()

  useEffect(() => {
    setInputList(
      portfolioFilter?.Status === 'ERROR'
        ? []
        : portfolioFilter?.Data[
            'Portfolio.GetPortfolioDetailsByPortfolioId'
          ]?.map((val) => {
            return {
              CRUD: 'C',
              id: uid(),
              criteria_id: val.criteria_id,
              operator: val.criteria_operator,
              value_1: val.value_1,
              value_2: val.value_2,
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
          }),
    )
  }, [portfolioFilter])

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

  const handleBackButton = () => {
    setPortfolio(formIntialdata)
    setNewPortfolio(false)
  }
  const handleCancelButton = () => {
    handleBackButton()
    portfolioHandle
  }
  const onSubmit = (data) => {
    // data.portfolio_name = portfolioName
    const finalObj =
      inputList && [...inputList]?.map(({ id, ...rest }) => ({ ...rest }))
    const checkNullFilters = finalObj?.find((val) => {
      if (val.criteria_id !== null) {
        if (val.operator === 'between') {
          return (
            val.operator === null ||
            val.value_1 === undefined ||
            val.value_1 === '' ||
            val.value_2 === undefined ||
            val.value_2 === ''
          )
        } else {
          return (
            val.operator === null ||
            val.value_1 === undefined ||
            val.value_1 === ''
          )
        }
      }
    })
    const checkLongName = finalObj?.find((val) => {
      if (val.criteria_id !== null) {
        return val.value_1?.length > 60
      }
    })
    const checkDuplicate =
      portfolioData.portfolio_name !== data.portfolio_name ||
      !portfolioData?.portfolio_id
        ? portfolios.Data['Portfolio.GetPortfolioHeader'].find((val) => {
            return val.portfolio_name === data.portfolio_name
          })
        : undefined
    if (checkDuplicate === undefined && checkNullFilters === undefined && checkLongName === undefined) {
      data.PortfolioDetails = finalObj
      delete data.seed_order, delete data.favorite_flag
      if (data?.length === 0) {
        setNewPortfolio(true)
        return
      }
      const newData = JSON.parse(JSON.stringify(data))
      let newView = false
      let CRUD = 'U'
      if (!newData?.portfolio_id) {
        delete newData.portfolio_id
        newView = true
        CRUD = 'C'
      }
      handleAddNewView({ data: newData, newView })
      setNewPortfolio(false)
      setSelect(select)
      if (CRUD === 'U') {
        syncToDataBase(newData, CRUD)
      } else {
        newData.default_portfolio = 'N'
        syncToDataBase(newData, CRUD)
      }

      setError('')
    } else {
      if (checkDuplicate) {
        showToast(
          'error',
          // `Portfolio name ${checkDuplicate.portfolio_name} already exists`,
          `${t("Portfolio name exists", { ns : 'message', name: checkDuplicate.portfolio_name})}`,
          'drawer',
        )
      } else if (checkLongName) {
        showToast(
          'error',
          t("Port long name 60"),
          'drawer',
        )
      } else {
        setError('errorField')
        showToast(
          'error',
          `${t('highlighted field', { ns : 'message'})}`,
          'drawer',
        )
      }
    }
  }

  const changeData = (e) => {
    if (e.target.value) {
      clearErrors()
    } else {
      errors
    }
  }

  const config = {
    type: 'dashboardWidget',
    layout: '',
    tabs: 0,
    isFullWidth: true,
  }

  const handleScroll = () => {
    if (inputList?.length > 5) {
      setScroll('editdropdown')
    } else {
      setScroll('')
    }
  }
  const disable = useMemo(() => (portfolioData.public === 'Y' ? true : false))

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={refFrom}
        className="max-w-[55rem]"
      >
        <div className="fixed right-0 top-0 h-[100vh] w-[55rem] bg-white rounded overflow-y-auto shadow-lg side-drawer">
          <div className="flex flex-col h-full">
            <div className="h-[60vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[70vh] pl-9 pr-11 pt-5">
              <div className="flex items-center pb-6 cursor-pointer">
                <div className="w-[32px] h-[36px] ml-[-8px]">
                  <img
                    src={back}
                    alt="back"
                    className="w-full h-full"
                    onClick={() => {
                      handleBackButton()
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold font-Inter text-green ml-3 ">
                  {portfolioData?.portfolio_id
                    ? disable
                      ? t('View portfolio')
                      : t('Edit portfolio')
                    : t('New portfolio')}
                </h2>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[6px] tracking-[3%]">
                  {t("Portfolio name")} <span className="text-red">*</span>
                </label>
                <Input
                  type={disable ? 'disable' : 'normal'}
                  fieldName="portfolio_name"
                  register={register}
                  placeHolder={t("portfolio name", { ns : 'message'})}
                  isRequired={true}
                  errors={errors}
                  disable={disable ? true : false}
                  handleClick={(e) => changeData(e)}
                  maxLength= "60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-normal leading-[16.38px] font-Inter mb-[6px]">
                  {t("Description")}
                </label>
                <Input
                  type={disable ? 'disable' : 'normal'}
                  fieldName="description"
                  register={register}
                  placeHolder={t("portfolio description", { ns : 'message'})}
                  isRequired={false}
                  errors={errors}
                  disable={disable ? true : false}
                  maxLength= "60"
                />
              </div>

              <div className="flex pt-5 mb-3">
                {!disable && (
                  <button
                    type="button"
                    disabled={disable}
                    className={`${
                      disable && 'cursor-not-allowed'
                    } flex justify-center items-center hover:bg-[#E6F3F0] py-[10px] px-[12px] text-lightgreen font-bold text-sm font-Inter border border-lightgreen rounded-md h-[36px]`}
                    onClick={() => handleAddClick()}
                  >
                    <img src={add} alt="add" className="mr-[10px]" />
                    {t("Add filters")}
                  </button>
                )}
              </div>
              <div
                className={`overflow-x-auto h-[50vh] pb-[10px] lg:h-[47vh] xl:h-[46vh] 2xl:h-[53vh] ${scroll}`}
                onClick={handleScroll}
              >
                {(portfolioData?.portfolio_id && isLoading) || isFetching ? (
                  <Skeleton {...config} />
                ) : (
                  inputList?.map((x, i) => {
                    return (
                      <div key={x.id}>
                        <SelectField
                          register={register}
                          index={i}
                          dataValue={x}
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
                  })
                )}
              </div>
            </div>
            <div className="proceed mt-auto z-[10] bg-white">
              <div className="flex items-center pt-5 mx-[10px] sm:mx-[30px] pb-5">
                {!disable && (
                  <ProceedButton
                    type="primaryButton"
                    label={
                      portfolioData?.portfolio_id
                        ? t('Save portfolio')
                        : t('Create portfolio')
                    }
                  />
                )}
                <ProceedButton
                  type="secondaryButton"
                  label={t("Cancel")}
                  handleClick={() => handleCancelButton()}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default memo(NewPortfolio)
