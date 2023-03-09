import React, { useState, useRef, useEffect } from 'react'
import { reset, updateAuthState } from '../../slices/authslice'
import { clearAuth, logger } from '@frontrolinc/pace-ui-framework'
import { clearPortfolio } from '../../slices/portfolioslice'
import { useDispatch } from 'react-redux'
import information from '../../assets/Images/notification.svg'
import workbench from '../../assets/Images/Group.png'
import arrow from '../../assets/Images/arrow.svg'
import Search from '../Search/Search'
import social_user from '../../assets/Images/social_user.svg'
import setting from '../../assets/Images/more_setting.svg'
import download from '../../assets/Images/download.svg'
import header_logo from '../../assets/Images/collapse.svg'
import plus from '../../assets/Images/plus.svg'
import folderStar from '../../assets/Images/folderstar.svg'
import { useNavigate } from 'react-router-dom'
import useOnClickOutside from '../../hooks/useOutside'
import { Drawer, Views } from '../Common'
import Favorites from '../Common/favorites'
import Profilepic from '../Common/views/profilepic'
import { useSelector } from 'react-redux'
import { Userprofile } from '../Userprofile'
import { searchConfig } from '../Search/ProjectSearchConfig'
import { projectDrilldown } from '../../TransposeData'
import { Usersetting } from '../UserSetting'
import { getLoginUrl } from '../../helpers/utils'
import AdvanceOption from '../Common/newPortfolio/advanceOption'
import { TOKEN_RENEWAL_TIME_KEY } from '../../helpers/constants'
import { useTranslation } from 'react-i18next';
import { useLoginMode } from '../../hooks/useLoginMode'

const HeaderStats = () => {
  const dispatch = useDispatch()
  const { clearLoginMode } = useLoginMode()
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [open, setOpen] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)
  const [advance , setAdvance] = useState(false)
  const [showSelectedLog, setShowSelectedLog] = useState()
  const { t } = useTranslation(['label']);

  const [isActive, setIsActive] = useState(false)
  let history = useNavigate()
  const userProfile = useSelector((state) => state?.loginAuth?.userProfile)
  const header = document.getElementById('sub-header')
  const stickyHeader = header?.offsetTop
  searchConfig.onClickSearchItem = (event) => {
    let e = { ...event, isSkipColDefCheck: true }
    projectDrilldown(e, history)
  }

  searchConfig.onAdvanceSearchClickHandler = ()=>{
    setAdvance(!advance)
  }
  function handleLogOut() {
    const redirectUrl = getLoginUrl()
    dispatch(updateAuthState(false))

    dispatch(reset());

    localStorage.removeItem('token')
    localStorage.setItem('isLoggedIn', 'false')
    // localStorage.removeItem('i18nextLng')
    localStorage.removeItem('hasAlert')
    logger.clearLogLevel()
    localStorage.removeItem(TOKEN_RENEWAL_TIME_KEY)
    clearLoginMode()
    window.location.replace(`${redirectUrl}?logout=true`);
  }
  const ref = useRef(null)

  useOnClickOutside(ref, () => {
    setIsActive(false)
  })

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > stickyHeader) {
        setIsActive(false)
      }
    }
    // clean up code
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [stickyHeader, header])
  const translatedSearchConfig = {...searchConfig}
  translatedSearchConfig.reduxConfig = {...searchConfig.reduxConfig}
  translatedSearchConfig.reduxConfig.recentText = t(searchConfig.reduxConfig.recentText);
  translatedSearchConfig.advanceSearch = t(searchConfig.advanceSearch);
  translatedSearchConfig.searchTypeLabel = t(searchConfig.searchTypeLabel).toLowerCase();

  return (
    <div
      className="mainheader left-0 right-0 bg-white border-b-[1px]"
      id="main-header"
    >
      <nav className="md:flex block items-center justify-between pr-[10px] relative lg:pr-[25px] h-[55px] ml-[23px]">
        <div className="flex items-center flex-shrink-0 w-1/2 text-white sm:w-auto">
          <img
            src={header_logo}
            alt="header_logo"
            className="w-[30px] lg:w-[30px]"
          />
          <a
            href="/"
            className="flex items-center ml-2 lg:ml-8"
          >
            <img 
            src={workbench}
            alt="workbench"
            className="cursor-pointer w-[155px]"
            />
            {/* <span className="bg-green mr-3 ml-3 h-1.5 w-1.5 rounded"></span>
            WORKBENCH
            <span className="bg-green mr-3 ml-3 h-1.5 w-1.5 rounded"></span> */}
          </a>
        </div>
        <div className="flex items-center justify-between mt-4 md:mt-0">
          <div className="w-1/3 searchinput">
            <div className="w-auto relative mr-0 md:mr-[15px]">
              <Search config={translatedSearchConfig} />
            </div>
          </div>
          <div className="flex items-center justify-end w-2/3 pl-2 sm:pl-0 sm:w-auto dropdown">
            <div className="flex-wrap items-center justify-between hidden mt-flex sm:mt-0 add">
              <button className="flex items-center justify-center text-[12px] sm:text-base bg-lightgreen w-[22px] sm:w-[32px] h-[22px] sm:h-[32px] font-Inter rounded-md text-white">
                <img src={plus} width="13px" height="13px" alt="plus" />
              </button>
            </div>
            <div className="ml-2 sm:ml-2 sm-0 sm:mr-2 cursor-pointer p-0.5 hover:bg-[#E6F3F0]">
              <img
                src={folderStar}
                alt="plus"
                className="w-[25px] sm:w-auto"
                onClick={() => setOpen(!open)}
              />
            </div>
            {/* <div className="relative mr-2 cursor-pointer notification sm:mr-4">
              <img src={information} alt="information" />
              <div className="badge absolute top-[15px] left-[15px] bg-[#e32a1a] w-[19.35px] h-[19.35px] flex items-center justify-center rounded-full text-center text-white text-sm">
                <span>2</span>
              </div>
            </div> */}
            <div
              ref={ref}
              className={`natalie ${
                isActive && 'user-profile-dropdown'
              } relative py-[6px] px-0 sm:px-[8px] rounded hover:bg-[#E6F3F0]`}
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsActive(!isActive)}
              >
                <div className="profile mr-1 sm:mr-2.5">
                  <Profilepic
                    user={userProfile}
                    classData="w-[26px] sm:w-[32px] h-[26px] sm:h-[32px]"
                    textClass="text-xs"
                  />
                  {/* <img
                    src={image}
                    alt=""
                    className="w-[26px] sm:w-[32px] h-[26px] sm:h-[32px]"
                  /> */}
                </div>
                <div className="flex items-center">
                  <span className="mr-0 sm:mr-2 font-Inter text-sm sm:text-[16px]  font-medium">
                    {userProfile?.first_name}
                  </span>

                  <img src={arrow} alt="arrow" width="13px" height="6.5px"/>
                </div>
              </div>
              {isActive && (
                <div className="sub_natalie z-[99] bg-[#ffffff] min-w-[230px] hover:shadow-xl fixed top-[56px]  md:right-[25px] z-[99]">
                  <div className="text-center flex items-center  flex-col bg-[#cfdfd7] px-7 py-3.5">
                    <Profilepic
                      user={userProfile}
                      classData="w-[69px] h-[69px]"
                      textClass="text-2xl"
                    />
                    <span className="mt-2 ">{userProfile?.full_name}</span>
                    <a href="/" className="text-[#9d9d9d]">
                      {userProfile?.user_name}
                    </a>
                  </div>
                  <div className="pt-[15px] pb-2.5">
                    <div
                      className="flex items-center p-2 px-5 cursor-pointer hover:bg-[#E6F3F0]"
                      onClick={() => setOpenProfile(true)}
                    >
                      <img
                        src={social_user}
                        alt="social_user"
                        className="w-4 ml-3"
                      />
                      <span className="ml-5 text-[#9d9d9d] text-sm">
                        {t("Profile")}
                      </span>
                    </div>
                    <div
                      className="flex items-center p-2 px-5  cursor-pointer hover:bg-[#E6F3F0]"
                      onClick={() => setOpenSetting(true)}
                    >
                      <img src={setting} alt="setting" className="w-6 ml-2" />
                      <span className="ml-4 text-[#9d9d9d] text-sm">
                        {t("Settings")}
                      </span>
                    </div>
                  </div>
                  <hr className="bg-red h-[2px]"></hr>
                  <div className="px-5 cursor-pointer pt-[15px] pb-2.5 hover:bg-[#E6F3F0]" onClick={handleLogOut}>
                    <div className="flex items-center ml-2 mx-45">
                      <img src={download} alt="download" />
                      <span
                        className="ml-5 text-sm text-red"
                      >
                        {t("Logout")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Drawer isOpen={open} setIsOpen={setOpen}>
        <Favorites open={open} setOpen={setOpen} />
      </Drawer>
      <Drawer isOpen={advance} setIsOpen={setAdvance} >
        <AdvanceOption advance={advance} setAdvance={setAdvance} showSmall="w-4/12"/>
      </Drawer>
      <Drawer isOpen={openProfile} setIsOpen={setOpenProfile} showSmall="w-4/12">
        <Userprofile
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
      </Drawer>
      <Drawer isOpen={openSetting} setIsOpen={setOpenSetting} newPopup={showSelectedLog}>
        <Usersetting
          openSetting={openSetting}
          setOpenSetting={setOpenSetting}
          setShowSelectedLog={setShowSelectedLog}
          showSelectedLog={showSelectedLog}
        />
      </Drawer>
    </div>
  )
}

export default HeaderStats
