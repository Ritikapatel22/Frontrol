import React, { useEffect, useState } from 'react'
import './userprofile.css'
import { useSelector } from 'react-redux'
import Profilepic from '../Common/views/profilepic'
import closeIcon from '../../assets/Images/close-icon.svg'
import social_user from '../../assets/Images/social_user.svg'
import { useTranslation } from 'react-i18next';
import {
  useUploadFileMutation,
  useUpdateDataMutation,
} from '../../app/appApi'
import { Toast } from '../Common/toast'

const Userprofile = ({ openProfile, setOpenProfile }) => {
  const { userProfile, profilePicAvailable } = useSelector(
    (state) => state?.loginAuth,
  )
  const [update, { data }] = useUploadFileMutation()
  const [updateProfile, {data: response}] = useUpdateDataMutation()
  const { t } = useTranslation(['label']);
  const [inprogress, setInprogress] = useState(false)
  useEffect(() => {
    if (data?.Status === 'SUCCESS') {
      Toast('success', t('Profile picture updated successfully', { ns : 'message'}))
    } else if (data?.Status === 'ERROR') {
      Toast('error', data?.Message || t('Something went wrong', { ns : 'message'}))
    }
  }, [data])

  useEffect(() => {
    if (response?.Status === "SUCCESS" && response?.Message === "User Profile Photo deleted Successfully.") {
      Toast("success", t("Profile picture deleted successfully", { ns : 'message'}));
    } else if (response?.Status === "ERROR") {
      Toast("error", response?.Message || t('Something went wrong', { ns : 'message'}));
    }
  }, [response]);

  const onClickHandler = async (file) => {
    setInprogress(true)
    const config = {
      url: '',
      file: file,
      invalidatesTags: () => ["profilepic"]

    }
    await update({
      ...config,
      __config__: {invalidatesTags: () => ["profilepic"]},
    })
    setInprogress(false)
  }


  const removeFile = () => {
    updateProfile({
      __config__: {
        url: "/user-profile/delete",
        method: "POST",
        invalidatesTags: () => ["profilepic"]
      },
      body:{CRUD: "D"}
    })
  }

  const getText = () => {
    if (inprogress) {
      return t('Updating')
    } else if (profilePicAvailable) {
      return t('Change picture')
    }
    return t('Upload picture')
  }
  return (
    <div>
      <div className="top-0 w-full transition-all duration-250 ease-linear animation-all fixed h-[100vh]  overflow-y-auto  bg-[#fffffd] z-[999]">
        <div className="flex justify-between flex-col h-full relative py-4">
          <div>
            <div className="flex items-center justify-between px-[10px] sm:px-[30px]">
              <h1 className="flex items-center justify-between text-base sm:text-2xl text-[#0e3943] font-bold font-Inter">
                <img
                  src={social_user}
                  alt="social_user"
                  className="w-[25px] h-[20px] sm:w-auto"
                />
                <span className="ml-2">{t("User profile")}</span>
              </h1>
              <button
                onClick={() => {
                  setOpenProfile(false)
                }}
              >
                <img src={closeIcon} alt="close-icon" className='hover:bg-[#E6F3F0]' />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2 sm:px-[30px] ml-8 mt-8">
              <div className="col-span-3 ">
                <div className="grid grid-cols-3 gap-3 mb-2">
                  <div>
                    <h6 className="text-lightgreen text-xs">{t("Full name")} :</h6>
                  </div>
                  <div className="col-span-2 ">
                    <span className="text-green leading-[140%] text-xs flex">
                      {userProfile?.full_name}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-2">
                  <div>
                    <h6 className="text-lightgreen text-xs">{t("Email")} : </h6>
                  </div>
                  <div className="col-span-2 ">
                    <span className="break-all text-green leading-[140%] text-xs flex">
                      {userProfile?.email_id}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-2">
                  <div>
                    <h6 className="text-lightgreen text-xs">{t("Manager")} :</h6>
                  </div>
                  <div className="col-span-2 ">
                    <span className="text-green leading-[140%] text-xs flex">
                      {userProfile?.manager}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-2">
                  <div>
                    <h6 className="text-lightgreen text-xs">
                      {t("Roles assigned")} :
                    </h6>
                  </div>
                  <div className="col-span-2 ">
                    <span className="text-green leading-[140%] text-xs flex">
                      <ul>
                      {
                        userProfile?.roles?.length &&
                        userProfile?.roles.map((item) => {
                          return <li key={item.role_name}>{item?.role_name}</li>
                        })
                      }
                      </ul>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile items-center flex m-10">
              <Profilepic
                classData="w-[80px] sm:w-[110px] h-[80px] sm:h-[110px]"
                textClass="text-4xl"
                user={userProfile}
              />

              <div className="flex flex-col text-sm text-lightgreen m-5">
                <input
                  type="file"
                  id="upload"
                  disabled={inprogress}
                  hidden
                  onChange={(e) => {
                    onClickHandler(e.target.files[0])
                  }}
                />
                <label
                  htmlFor="upload"
                  className={inprogress ? 'disable-upload-button' : 'acm-hyperlink'}
                >
                  {getText()}
                </label>
                {profilePicAvailable && <span onClick={removeFile} className="acm-hyperlink">
                  {t("Remove picture")}
                </span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openProfile && (
        <div className="fixed overlay h-[100vh] w-[100%] right-0 top-0 bottom-0 left-0  z-[98]"></div>
      )}
    </div>
  )
}

export default Userprofile
