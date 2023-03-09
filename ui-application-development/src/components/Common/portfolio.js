import React, { useCallback, useRef, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  useQueryString,
  useCustomization,
  showConfirmation,
  Skeleton,
} from '@frontrolinc/pace-ui-framework'
import {
  useFetchDataQuery,
  useGetProjectStatusQuery,
  useLazyFetchDataQuery,
  useUpdateDataMutation,
} from '../../app/appApi'
import {
  selectedPortFolio,
  handlePortfolioOperation,
  setNewCreatedPortfolio,
} from '../../slices/portfolioslice'
import { PropTypes } from 'prop-types'
import { Popover } from 'react-tiny-popover'
import useOnClickOutside from '../../hooks/useOutside'
import ProceedButton from './button/proceedButton'
import NewPortfolio from './newPortfolio'
import Button from './button'
import { useTranslation } from 'react-i18next'
import more from '../../assets/Images/more.svg'
import star_border from '../../assets/Images/star_border.svg'
import star from '../../assets/Images/star_purple.svg'
import plus from '../../assets/Images/plus.svg'
import del from '../../assets/Images/deleteicon.svg'
import delfault from '../../assets/Images/default.svg'
import global from '../../assets/Images/global.svg'

import pen from '../../assets/Images/pencil.svg'
import file from '../../assets/Images/document.svg'

const Portfolio = ({
  open,
  setOpen,
  data,
  newPortfolio,
  setNewPortfolio,
  isFetching,
  isLoading,
}) => {
  // Get filter criterias
  let {
    isLoading: criteriaLoading,
    data: portfolioCriterias,
  } = useFetchDataQuery({
    queryName: 'Portfolio.GetPortfolioCriterias',
  })

  // Get filter status query
  const { data: projectStatusQuery } = useGetProjectStatusQuery()
  const { t } = useTranslation(['label', 'message'])

  const [update, response] = useUpdateDataMutation()

  const type = useRef(null)

  const formIntialdata = {
    default_portfolio: '',
    description: '',
    portfolio_id: '',
    portfolio_name: '',
    public: '',
    published: '',
    PortfolioDetails: [
      {
        criteria_id: '',
        operator: '',
        value_1: '',
        value_2: '',
      },
    ],
  }

  const portfolios = useSelector((state) => state.portfolio.data)
  const newCreated = useSelector((state) => state.portfolio.newPortfolio)
  let [urlValue, setUrlValue] = useQueryString('portfolio')
  const selectedPortfolio = useSelector(
    (state) => state.portfolio?.selectedPortfolio,
  )
  // const [newPortfolio, setNewPortfolio] = useState(false);
  const [portfolio, setPortfolio] = useState(formIntialdata)
  const [select, setSelect] = useState(selectedPortfolio)
  const [searchField, setSearchField] = useState('')
  const [popUp, setPopUp] = useState({ status: false, id: '' })
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [results, setResults] = useState([])
  const [favorites, setFavorites] = useState({ status: '', id: '' })
  const [scroll, setScroll] = useState(false)

  // Fetch criteria details for duplicate portfolio
  const [getobject, { data: portfolioFilters }] = useLazyFetchDataQuery()
  const { syncToDataBase } = useCustomization()
  const ref = useRef(null)
  const refExpt = useRef(null)
  const dispatch = useDispatch()

  useOnClickOutside(ref, () => {
    // setNewPortfolio(false),
    setPopUp({ status: false, id: '' }), setSearchField('')
    setIsPopoverOpen(false)
  })
  useOnClickOutside(refExpt, () => {})

  // useEffect(() => {
  //   if (newCreated) {
  //     console.log('inside useEffect')
  //     // setOpen(true)
  //     dispatch(selectedPortFolio(newCreated))
  //     setSelect(newCreated)
  //     dispatch(setNewCreatedPortfolio(null))
  //   }
  // }, [newCreated])

  useEffect(() => {
    if (selectedPortfolio) {
      setUrlValue(selectedPortfolio.portfolio_id)
    }
  }, [selectedPortfolio])

  useEffect(() => {
    const filtered = portfolios?.filter(
      (order) =>
        order && order?.portfolio_name?.toLowerCase().includes(searchField),
    )
    setResults(filtered)
  }, [searchField, portfolios])

  useEffect(() => {
    setSelect(selectedPortfolio)
  }, [open, selectedPortfolio])

  const deletePortfolio = (data) => {
    showConfirmation({
      msg: t('delete warning port', { ns: 'message' }),
      title: t('delete portfolio', { ns: 'message' }),
      onConfirm: () => {
        console.log('Confirmation result: confirmed')
        dispatch(
          handlePortfolioOperation({ data, op: 'delete', syncToDataBase }),
        )
      },
      onClose: () => {
        console.log('close portfolio delete popup')
      },
      confirmLabel: t('Yes'),
      cancelLabel: t('No'),
    })
  }

  const duplicateHandler = async (data) => {
    const test = await getobject({
      queryName: `Portfolio.GetPortfolioDetailsByPortfolioId`,
      portfolio_id: data.portfolio_id,
    })
    const dataFilter = await test?.data?.Data[
      'Portfolio.GetPortfolioDetailsByPortfolioId'
    ].map(({ portfolio_id, criteria_operator, ...rest }) => ({
      CRUD: 'C',
      operator: criteria_operator,
      ...rest,
    }))
    dispatch(
      handlePortfolioOperation({
        data,
        op: 'duplicate',
        syncToDataBase,
        PortfolioDetails: dataFilter,
      }),
    )
  }

  const handleDefaultPortfolio = (data) => {
    dispatch(handlePortfolioOperation({ data, op: 'default', syncToDataBase }))
  }

  const handlFavorite = (favData) => {
    const data = { ...favData }
    const apiData = [
      {
        FntlFavourites: {
          object_id3: '',
          object_type: 'Portfolio',
          object_id2: '',
        },
      },
    ]
    apiData[0]['FntlFavourites']['object_id1'] = data.portfolio_id

    if (data.favorite_flag !== 'Y') {
      setFavorites({ status: true, id: data.portfolio_id })
      apiData[0]['FntlFavourites']['CRUD'] = 'C'
    } else {
      apiData[0]['FntlFavourites']['CRUD'] = 'D'
      setFavorites({ status: false, id: data.portfolio_id })
    }
    dispatch(handlePortfolioOperation({ data, op: 'favorite', syncToDataBase }))
    update({
      name: { documentName: 'FntlFavourites' },
      body: apiData,
      __config__: {
        invalidatesTags: () => [
          'Portfolio.GetPortfolioHeader',
          'FntlFavourites.ObjectList',
        ],
      },
    })
      .unwrap()
      .then((res) => {
        if (res?.error) {
          data['favorite_flag'] = 'Y'
          dispatch(
            handlePortfolioOperation({
              data: data,
              op: 'favorite',
              syncToDataBase,
            }),
          )
        } else if (res?.Status === 'SUCCESS') {
          setFavorites({ status: '', id: '' })
        }
      })
  }

  const handleProceed = async () => {
    setOpen(false)
    dispatch(setNewCreatedPortfolio(null))
    dispatch(selectedPortFolio(select))
  }

  const portfolioHandle = () => {
    setNewPortfolio(!newPortfolio)
    setOpen(!open)
    setPopUp({ status: false, id: '' })
  }

  const handleClick = useCallback((portfolio) => {
    setSelect(portfolio)
  }, [])

  useEffect(() => {
    return function cleanup() {
      setNewPortfolio(false)
      setPortfolio(formIntialdata)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      setNewPortfolio(false)
    }
    setPortfolio(formIntialdata)
  }, [open])

  const handleEditPortfolio = (data) => {
    setNewPortfolio(true)
    setPopUp({ status: false, id: '' })
    setPortfolio({ ...data })
  }

  const handleAddNewView = (data) => {
    setNewPortfolio(false)
    setPortfolio({ ...formIntialdata })
  }

  const handleScroll = (event) => {
    if (event?.currentTarget.scrollTop > 1) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  useEffect(() => {
    handleScroll()
  }, [])
  const searchHandler = (event) => {
    setSearchField(event.target.value)
  }

  const config = {
    type: '',
    layout: '',
    tabs: 0,
    isFullWidth: false,
  }

  return (
    <div>
      <div
        ref={ref}
        className={`top-0 w-full transition-all duration-250 ease-linear animation-all fixed h-[100vh]  overflow-y-auto  bg-[#fffffd] z-[999]`}
      >
        <div className="relative flex flex-col justify-between h-full py-4">
          <div className={scroll ? 'shadow-md' : ''}>
            <div className="flex items-center justify-between px-[10px] sm:px-[30px]">
              <h1 className="text-base sm:text-2xl text-[#0e3943] font-bold font-Inter">
                {t("Select portfolio")}
              </h1>
              <ProceedButton
                type="primaryButton"
                icon={plus}
                iconLabel="plus"
                label={t('New portfolio')}
                handleClick={() => setNewPortfolio(true)}
              />
            </div>
            <div className="mt-3 x-[10px] sm:px-[30px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('Search')}
                  value={searchField}
                  onChange={searchHandler}
                  className="search_input rounded-[10px] px-[10px] border-2 border-earthgreen mb-2 text-[#646363] focus:text-black focus:outline-[#9BBEAF]  focus:ring-[#9BBEAF] focus:bg-white focus:border-[#9BBEAF] py-3 text-xs font-Inter w-full 7xl:w-[500px] lg:w-96 pl-12"
                ></input>
                <div className="search absolute top-2.5 left-3">
                  <i className="fa-solid fa-magnifying-glass text-lightgreen"></i>
                </div>
              </div>
            </div>
          </div>
          <div
            className="overflow-x-auto h-[65vh] lg:h-[65vh] xl:h-[68vh] 2xl:h-[76vh]"
            onScroll={handleScroll}
          >
            {portfolios?.length < 0 ? (
              <div className="portfolioSkeleton">
                {' '}
                <Skeleton {...config} />{' '}
              </div>
            ) : results?.length > 0 ? (
              results?.map((data, i) => {
                return (
                  <div
                    key={i}
                    className={
                      select?.portfolio_id !== data?.portfolio_id
                        ? `highirse border-0 relative hover:shadow-lg cursor-pointer ${
                            data.public === 'Y' ? 'bg-[#CFDFD7]' : ''
                          } mb-[10px] mt-1.5 rounded-lg shadow-xl mx-[10px] sm:ml-[32px] sm:mr-[23px] ${
                            data?.default_portfolio === 'Y'
                              ? ' border-lightgreen '
                              : ''
                          }`
                        : `highirse border mt-1.5 hover:shadow-lg mb-[10px] cursor-pointer ${
                            data.public === 'Y' ? 'bg-[#CFDFD7]' : ''
                          } mx-[10px] sm:ml-[32px] sm:mr-[23px] rounded-lg shadow-xl border-lightgreen relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen ${
                            data?.default_portfolio === 'Y' ? '' : ''
                          }`
                    }
                  >
                    <div className="flex cursor-pointer absolute right-[14px] top-[11px]">
                      {data.favorite_flag === 'Y' ||
                      (favorites.status !== false &&
                        favorites.id === data.portfolio_id) ? (
                        <img
                          src={star}
                          alt="star"
                          onClick={() => handlFavorite(data)}
                          className={
                            select?.portfolio_name !== data.portfolio_name
                              ? 'mr-[14px] hover:bg-[#E6F3F0] p-1'
                              : 'text-lightgreen mr-[14px] star hover:bg-[#E6F3F0] p-1'
                          }
                        />
                      ) : (
                        <img
                          src={star_border}
                          alt="star"
                          onClick={() => handlFavorite(data)}
                          className={
                            select?.portfolio_name !== data.portfolio_name
                              ? 'mr-[14px] hover:bg-[#E6F3F0] p-1'
                              : 'text-lightgreen mr-[14px] star hover:bg-[#E6F3F0] p-1'
                          }
                        />
                      )}
                      <Popover
                        isOpen={isPopoverOpen}
                        // reposition={true}
                        positions={['left']} // preferred positions by priority
                        content={
                          popUp.status &&
                          popUp.id == data.portfolio_id && (
                            <div ref={ref}>
                              <div
                                className="export bg-white -right-[6px] w-[160px] z-20 cursor-pointer"
                                onClick={() => {
                                  setPopUp({ status: false, id: '' })
                                  setIsPopoverOpen(false)
                                }}
                              >
                                <div>
                                  {data.default_portfolio !== 'Y' && (
                                    <>
                                      <div
                                        onClick={() =>
                                          handleDefaultPortfolio(data)
                                        }
                                        className="py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                      >
                                        <Button
                                          icon={delfault}
                                          iconLabel="default"
                                          label={t('Set as default')}
                                          // handleClick={() => handleDefaultView(data)}
                                        />
                                      </div>
                                      <hr className="bg-darkgrey"></hr>
                                    </>
                                  )}
                                  <div
                                    className="py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                    onClick={() => handleEditPortfolio(data)}
                                  >
                                    <div className="relative">
                                      <Button
                                        icon={global}
                                        iconLabel="edit"
                                        label={`${
                                          data?.public !== 'Y'
                                            ? t('Edit portfolio')
                                            : t('View portfolio')
                                        }`}
                                        // handleClick={() => {
                                        //   handleEditPortfolio(data);
                                        // }}
                                      />
                                      <div className="absolute top-1 left-[6px]">
                                        <img src={pen} alt="pencil" />
                                      </div>
                                    </div>
                                  </div>
                                  {data?.public !== 'Y' ? (
                                    <>
                                      <hr className="bg-darkgrey"></hr>
                                      <div
                                        onClick={() => deletePortfolio(data)}
                                        className="flex py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                      >
                                        <Button
                                          icon={del}
                                          iconLabel="delete"
                                          label={t('Delete')}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  <hr className="bg-darkgrey"></hr>
                                  <div
                                    onClick={() => duplicateHandler(data)}
                                    className="py-3 pl-[10px] hover:bg-[#E6F3F0]"
                                  >
                                    <Button
                                      icon={file}
                                      iconLabel="Duplicate"
                                      label={t('Duplicate')}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      >
                        <div
                          className="hover:bg-[#E6F3F0] w-[28px] h-[28px] flex justify-center item-center"
                          onClick={() => {
                            setPopUp({ status: true, id: data.portfolio_id })
                            setIsPopoverOpen(true)
                          }}
                        >
                          <img
                            src={more}
                            alt="more"
                            className="cursor-pointer px-[5px] w-[28px]"
                          />
                        </div>
                      </Popover>
                    </div>
                    <div
                      className="ml-2 cursor-pointer py-3.5 p-[5px]"
                      onClick={() => handleClick(data)}
                    >
                      <div
                        onClick={() => handleClick(data)}
                        className="flex items-center justify-between pr-[10px] pl-[12px] cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div
                            className="checkbox-box"
                            onClick={() => handleClick(data)}
                          >
                            <input
                              // id="default-radio-1"
                              type="radio"
                              value={data?.portfolio_id}
                              onChange={() => handleClick(data)}
                              // name="default-radio-1"
                              isselected={(
                                select?.portfolio_id === data?.portfolio_id
                              ).toString()}
                              checked={
                                select?.portfolio_id === data?.portfolio_id
                              }
                              className="radio w-4 h-4 text-lightgreen bg-lightgreen border-lightgreen border focus:ring-lightgreen dark:ring-lightgreen dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600 mr-[10px]"
                            />
                          </div>
                          <h1
                            className={`${data.default_portfolio !== 'Y' ? "w-[445px]" : data.portfolio_name?.length > 50 && "w-[350px]"} text-sm name font-bold cursor-pointer font-Inter`}
                            onClick={() => handleClick(data)}
                          >
                            {data.portfolio_name}{' '}
                            {data?.public === 'Y' && (
                              <span className="font-light">
                                ({t('Seeded portfolio')})
                              </span>
                            )}
                          </h1>
                          <h1 className="text-sm font-bold font-Inter">
                            {data.default_portfolio === 'Y' && (
                              <span className="font-normal text-white bg-lightgreen text-[10px] rounded-full ml-[10px] px-[10px] pt-[5px] pb-[6px]">
                                {t('Default')}
                              </span>
                            )}
                          </h1>
                        </div>
                      </div>
                      <div className="mt-[1px] cursor-pointer">
                        <div className="items-center block sm:flex">
                          <p className="text-[13px] px-3 sm:ml-6">
                            {data.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : searchField !== '' ? (
              <div className="p-3 m-2 text-center bg-grey">
                {t('No result', { ns: 'message' })} '{searchField}'
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="proceed">
            <div className="flex items-center pt-5 mx-[10px] sm:mx-[30px] pb-1">
              <ProceedButton
                type="primaryButton"
                label={t('Proceed')}
                handleClick={handleProceed}
              />
              <ProceedButton
                type="secondaryButton"
                label={t('Cancel')}
                handleClick={() => setOpen(!open)}
              />
              {newPortfolio && (
                <NewPortfolio
                  setNewPortfolio={setNewPortfolio}
                  formIntialdata={formIntialdata}
                  setPortfolio={setPortfolio}
                  portfolioData={portfolio}
                  portfolioHandle={portfolioHandle}
                  handleAddNewView={(data) => handleAddNewView(data)}
                  select={select}
                  setSelect={setSelect}
                  projectStatusQuery={projectStatusQuery}
                  criteriaLoading={criteriaLoading}
                  portfolioCriterias={portfolioCriterias}
                  portfolios={data}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed overlay h-[100vh] w-[100%] right-0 top-0 bottom-0 left-0  z-[98]"></div>
      )}
    </div>
  )
}

Portfolio.prototype = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
}

export default Portfolio
