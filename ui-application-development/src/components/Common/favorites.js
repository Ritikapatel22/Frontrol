import React, { useEffect, useMemo, useRef, useState } from 'react'
import star_border from '../../assets/Images/star_purple.svg'
import { useDispatch, useSelector } from 'react-redux'
import closeIcon from '../../assets/Images/close-icon.svg'
import { PropTypes } from 'prop-types'
import folderStar from '../../assets/Images/folderstar.svg'
import { useNavigate } from 'react-router-dom'
import { useFetchDataQuery, useUpdateDataMutation } from '../../app/appApi'
import useOnClickOutside from '../../hooks/useOutside'
import { useTranslation } from 'react-i18next';
import { selectedPortFolio, setRoute } from '../../slices/portfolioslice'
const Favorites = ({ open, setOpen }) => {
  const { t } = useTranslation(['label', 'message']);
  const selected = useSelector((state) => state?.favorites?.selectedFavorites)
  const portfolios = useSelector((state) => state.portfolio?.data)
  const [select, setSelect] = useState(selected)
  const [top, setTop] = useState()
  const [selPortfolio, setSelPortfolio] = useState()
  const [portfolioId, setPortfolioId] = useState()
  const dispatch = useDispatch()
  const [newTabData, setNewTabData] = useState()
  const [isNeWOpen, setIsNewOpen] = useState(false)
  const ref = useRef(null)
  const ref1 = useRef(null)
  const navigate = useNavigate()
  const { data } = useFetchDataQuery({
    queryName: 'FntlFavourites.ObjectList',
    __config__: {
      providesTags: () => ['FntlFavourites.ObjectList'],
    },
  })
  useOnClickOutside(ref1, () => {
    setIsNewOpen(false)
  })

  const [favId, setFavId] = useState()
  const [update, { data: deletedData }] = useUpdateDataMutation()
  const openInNewTab = () => {
    setIsNewOpen(false)
    setOpen(false)
    if (newTabData.object_type === 'Project') {
      window.open(`/project/${newTabData.object_id}`, '_blank')
    } else {
      window.open(`/?portfolio=${newTabData.object_id}`, '_blank')
    }
  }

  const handleClick = (e, id, obj_type) => {
    if (obj_type === 'Project') {
      navigate(`/project/${id}`, { replace: true })
    } else {

      const porFolioData = portfolios.find(
        ({ portfolio_id }) => portfolio_id === Number(id),
      )
      setSelPortfolio(porFolioData)
      setPortfolioId(id)
    } 
    setOpen(false)
  }

  useEffect(() => {
    const getData = async() => {
      selPortfolio && dispatch(selectedPortFolio(selPortfolio))
      dispatch(setRoute('Portfolio dashboard'));
      portfolioId && navigate(`/?portfolio=${portfolioId}`, { replace: true })
    }
    getData()
  }, [selPortfolio, portfolioId])

  const favs = useMemo(() => {
    return data?.Data['FntlFavourites.ObjectList']
  }, [])

  const [filterFavorites, setFilterFavorites] = useState(favs)
  const [favorites, setFavorites] = useState(favs)
  useEffect(() => {
    setFilterFavorites(data?.Data['FntlFavourites.ObjectList'])
    setFavorites(data?.Data['FntlFavourites.ObjectList'])
  }, [data])

  const removeFromFavorite = (obj) => {
    setFavId(obj.object_id)
    const apiData = [
      {
        FntlFavourites: {
          object_id2: '',
          object_id3: '',
          CRUD: 'D',
        },
      },
    ]
    apiData[0]['FntlFavourites']['object_id1'] = obj.object_id
    apiData[0]['FntlFavourites']['object_type'] = obj.object_type
    if (obj.object_type === 'Project') {
      update({
        name: { documentName: 'FntlFavourites' },
        body: apiData,
        __config__: {
          invalidatesTags: () => ['Projects', 'FntlFavourites.ObjectList','projectInfo'],
        },
      })
      return
    }
    update({
      name: { documentName: 'FntlFavourites' },
      body: apiData,
      __config__: {
        invalidatesTags: () => [
          'FntlFavourites.ObjectList',
          'Portfolio.GetPortfolioHeader',
        ],
      },
    })
  }

  function onDataSave(data) {
    const updatedFavaorites =
      favorites?.length && favorites.filter((ele) => ele?.object_id !== favId)
    const updatedFilteredFavaorites =
      filterFavorites?.length &&
      filterFavorites.filter((ele) => ele?.object_id !== favId)
    setFavorites(updatedFavaorites)
    setFilterFavorites(updatedFilteredFavaorites)
  }

  useEffect(() => {
    onDataSave()
  }, [deletedData])

  useEffect(() => {}, [document.documentElement.scrollTop])

  const getFilteredList = (e) => {
    const data = e.target.value
    setSelect(data)
    const updatedFavaorites =
      favorites?.length &&
      favorites.filter((ele) =>
        data
          ? ele?.object_name.toLowerCase().includes(data.toLowerCase())
          : ele?.object_id !== favId,
      )
    setFilterFavorites(updatedFavaorites)
  }

  const getEmptyDiv = () => {
    if (select) {
      return (
        <div className="p-3 text-center m-2 bg-grey">
          {t("No result", { ns : 'message'})} '{select}'.
        </div>
      )
    }
    return ''
  }
  return (
    <div>
      <div
        ref={ref}
        className={`top-0 w-full transition-all duration-250 ease-linear animation-all fixed h-[100vh]  overflow-y-auto  bg-[#fffffd] z-[999]`}
      >
        {isNeWOpen && (
          <div
            ref={ref1}
            className={`shadow-sm border border-3 border-[#babfc7] rounded-md p-[7px] mt-[7px] left-[200px] absolute z-[2] bg-[#f8f8f8] cursor-pointer shadow-sm ${top} hover:bg-[#e5e7eb]`}
            onClick={openInNewTab}
            style={{ top: `${top}px` }}
          >
            Open link in new tab
          </div>
        )}
        <div
          id="open-n-new-window"
          className="flex justify-between flex-col h-full relative py-4"
        >
          <div>
            <div className="flex items-center justify-between px-[10px] sm:px-[30px]">
              <h1 className="flex justify-between text-base sm:text-2xl text-[#0e3943] font-bold font-Inter">
                <img
                  src={folderStar}
                  alt="plus"
                  className="w-[25px] sm:w-auto"
                />
                <span className="ml-2">{t("Favorites")}</span>
              </h1>
              <button
                onClick={() => {
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
            <div className="mt-5 x-[10px] sm:px-[30px]">
              <div className="relative">
                <input
                  onChange={getFilteredList}
                  type="text"
                  placeholder={t("Search")}
                  value={select}
                  className="search_input pr-7 !border bg-inherit  focus:outline-lightgreen focus:ring-lightgreen focus:bg-white focus:border-lightgreen rounded py-3 text-xs font-Inter w-full 7xl:w-[500px] lg:w-96 pl-12"
                ></input>
                <div className="search absolute top-2.5 left-3">
                  <i className="fa-solid fa-magnifying-glass text-lightgreen"></i>
                </div>
              </div>
            </div>
            <div className="pb-4">
              {filterFavorites?.length ? (
                filterFavorites.map((data, key) => {
                  return (
                    <div
                      key={key}
                      className="highirse border-0  hover:shadow-lg p-[5px] mt-1 py-2 rounded-lg shadow-xl mx-[10px] sm:mx-[30px]"
                    >
                      <div className="ml-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center group relative">
                            <h1
                              onContextMenu={(e) => {
                                e.preventDefault()
                                setIsNewOpen(true)
                                setTop(
                                  e.pageY -
                                    Number(
                                      document
                                        .getElementById('open-n-new-window')
                                        .getBoundingClientRect().y + 10,
                                    ),
                                )
                                setNewTabData(data)
                              }}
                              className="relative text-sm font-Inter acm-hyperlink"
                              onClick={(e) =>
                                handleClick(e, data.object_id, data.object_type)
                              }
                            >
                              {data.object_name.length > 50
                                ? data.object_name.substring(0, 50) + '...'
                                : data.object_name}
                            </h1>
                            {data.object_name.length > 50 && (
                              <div className="group-hover:block w-[200px] top-[50px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-[4px] shadow-sm  ">
                                <div className="relative">
                                  <p className="font-Inter leading-[16.38px] text-center text-xs">
                                    {data.object_name}
                                  </p>
                                  <div className="bg-black top-[-11px] z-[-1] left-[28px] rotate-45 absolute w-[15px] h-[15px]"></div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div
                            className="flex cursor-pointer"
                            onClick={() => removeFromFavorite(data)}
                          >
                            <p className="text-[13px] mr-[20px]">
                              {t(data.object_type)}
                            </p>
                            <img
                              src={star_border}
                              alt="star"
                              className="text-lightgreen mr-[14px] star hover:bg-[#E6F3F0] p-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <>{getEmptyDiv()}</>
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

Favorites.prototype = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
}

export default Favorites
