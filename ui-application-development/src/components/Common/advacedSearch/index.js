import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Inner from '../../layout/inner'
import Drawer from '../drawer';
import AdvanceOption from '../newPortfolio/advanceOption';
import SearchResult from './searchResult';
import Footer from '../../layout/footer';
import { setRoute } from '../../../slices/portfolioslice';
import Skeleton from '../../Skeleton';
import { useTranslation } from 'react-i18next';
import { withErrorHandler } from "@frontrolinc/pace-ui-framework";

function AdvanceSearch() {

    const {t} = useTranslation(['label'])
    const dispatch = useDispatch()
    const [isCollepse, setIsCollepse] = useState(true);
    const [isExpand, setIsExpand] = useState(false);
    const [advance, setAdvance] = useState(false)
    const rowData = useSelector((state) => state.portfolio.searchResult)
    const filterDtata = useSelector((state) => state.portfolio.filter)
    const location = useLocation()
    const isLoading = useSelector((state) => state.portfolio.isLoading)

    const collepsExpandeHandler = () => {
        setIsCollepse(!isCollepse);
        setIsExpand(!isExpand);
    };
    const config = {
        type: 'advanced-search',
        layout: 'grid',
        tabs: 0,
        isFullWidth: true,
    }

    useEffect(() => {
        document.title = t('Advanced search results')
    }, [])

    useEffect(() => {
        rowData === null && filterDtata === null && setAdvance(true)
        dispatch(setRoute(location.pathname));
    }, [setAdvance])

    const dataNull = filterDtata?.filter((val) => { return val?.criteria_id !== null }).map((item) => {
        return item
    })

    return (
        <Inner
            isCollepse={isCollepse}
            collepsExpandeHandler={collepsExpandeHandler}
            isExpand={isExpand}
        >
            <div
                className={
                    isCollepse
                        ? "main_dashboard duration-500 ease-in-out transition-all bg-[#f7f9ff] pl-16"
                        : "new_dashboard duration-500 ease-in-out transition-all bg-[#f7f9ff]  pb-[29px] h-[90vh] lg:pl-60"
                }>
                <div className="relative ml-0 md:pl-15 ">
                    <div className="xl:flex block justify-between pt-5 sm:mr-[25px] mr-3 relative items-center">
                        <div className="dashboard block items-center justify-between pl-3 sm:pl-[27px] sm:pr-9 lg:pr-5">
                            <div className="title">
                                <h1 className="text-base sm:text-xl xl:text-2xl font-Inter text-green m-[-3px] font-bold ">
                                    {t("Advanced search results")}
                                </h1>
                            </div>
                        </div>
                        <div className='lg:flex block text-[#008768] items-center  ml-3 sm:ml-[30px] mt-3 lg:mt-0 refresh-menu cursor-pointer'
                            onClick={() => setAdvance(!advance)}
                        >
                            <div className=' text-sm'>
                                {t("Advanced search")}
                            </div>
                            <div className="bg-[#008768] text-white text-xs ml-1 mr-1 h-[19.35px] w-[19.35px] rounded-full flex justify-center items-center">
                                <span className='block'>{!dataNull ? 0 : dataNull?.length}</span>
                            </div>
                            {`>`}
                        </div>
                    </div>
                </div>
                {
                    isLoading || rowData === null && filterDtata !== null
                        ?
                        <div className='p-5'><Skeleton {...config} /></div>
                        :
                        <SearchResult row={rowData?.length > 0 && rowData} />
                }
                <Footer />
            </div>
            <Drawer isOpen={advance} setIsOpen={setAdvance}>
                <AdvanceOption advance={advance} setAdvance={setAdvance} prevFilters={filterDtata} rowData={rowData} />
            </Drawer>
        </Inner>
    )
}

export default withErrorHandler(AdvanceSearch, null)