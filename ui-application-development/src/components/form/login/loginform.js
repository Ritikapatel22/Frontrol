import React from "react";
import svgIcon from "../../../assets/Symbol/svgIcon";
import PropTypes from "prop-types";
import error from "../../../assets/Images/errorcode.svg";
import { useTranslation } from 'react-i18next';
import { openSSO } from "../../../helpers/utils";
const LoginForm = ({
  onSubmitHandler,
  register,
  handleSubmit,
  errors,
  loading,
  errorMsg,
}) => {
  const { t } = useTranslation(['label' , 'message']);
  
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={`${!errorMsg && "h-[145px]"}`}>
        <div className="2xl:mb-[22px] mb-[14px]">
          <label
            htmlFor="username"
            className={
            "block text-sm font-normal font-Inter text-gray-700 mb-[10px]"
            }
          >
            {t("Username")} <span className="text-red">*</span>
          </label>
          <input
            {...register("username", { required: true })}
            type="text"
            name="username"
            placeholder="Eg., john@aecom.com"
            className={`${
              errors?.username || errorMsg
                ? "border-2 border-rose-600 focus:outline-rose-600 focus:ring-rose-600 focus:bg-white focus:border-ring-rose-600"
                : "border-2 border-[#CFDFD7] focus:outline-[#008768]  focus:ring-[#008768] focus:bg-white focus:border-[#008768]"
            } 
          h-[38px] text-sm rounded-[6px] py-[12px] px-[10px] font-Inter w-full`}
          />
          {errors.username && (
            <p className="text-red text-xs mt-1">{t("Email required", { ns : 'message'})}</p>
          )}
        </div>
        <div className="2xl:mb-[22px] mb-[14px]">
        <label
            htmlFor="userpassword"
            className={
              "block text-sm font-normal font-Inter  text-gray-700 mb-[10px]"
            }
          >
            {t("Password")} <span className="text-red" >*</span>
          </label>
          <input
            {...register("userpassword", { required: true })}
            type="password"
            name="userpassword"
            placeholder="********"
            className={`${
              errors?.userpassword || errorMsg
                ? "border-2 border-rose-600 focus:outline-rose-600 focus:ring-rose-600 focus:bg-white focus:border-ring-rose-600"
                : "border-2 border-[#CFDFD7] focus:outline-[#008768]  focus:ring-[#008768] focus:bg-white focus:border-[#008768]"
            } 
          h-[36px] text-sm rounded-[6px] py-[12px] px-[10px] font-Inter w-full`}
          />
          {errors.userpassword && (
            <p className="text-red text-xs mt-1">{t("Password required", { ns : 'message'})}</p>
          )}
        </div>
      </div>
      {errorMsg ? (
        <div
          htmlFor="username"
          className={
            !errorMsg
              ? "opacity-0"
              : "text-darkred font-medium text-sm font-Inter flex items-center bg-lightred py-[10px] pl-[14px] rounded mb-5"
          }
        >
          <img src={error} alt="error" className="mr-3" />
          <p>{t("Invalid credentials", { ns : 'message'})}</p>
        </div>
      ) : (
        ""
      )}

      {/* <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            className=" focus:outline-lightgreen focus:ring-lightgreen focus:bg-white focus:border-lightgreen h-4 w-4  border-gray-300 rounded accent-lightgreen"
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="comments"
            className="font-normal text-black text-sm font-Inter"
          >
            Remember me
          </label>
        </div>
      </div> */}
      <div className={`px-4 mt-[40px] ${errorMsg ? "mt-[40px]" : " mt-[60px]"}  text-center sm:px-6`}>
        <button
          type="submit"
          className={"flex items-center w-[100%] justify-center py-2 px-4 border border-transparent shadow-sm text-[17px] uppercase  rounded-md  text-white bg-lightgreen hover:bg-lightgreen focus:outline-none  focus:ring-lightgreen"}
        >
          {loading ? (
            <svg
              className="inline mr-2 w-4 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            <>
              <span className="capitalize font-Inter font-medium">{t("Login")}</span>
              <img
                className="ml-1"
                src={svgIcon.leftarrow.default}
                alt="info"
              />
            </>
          )}
        </button>
      </div>
      <div className="2xl:mt-[30px] mt-[20px] text-center">
          <p className="text-gray-500 font-Inter Grotesk Corp text-sm font-normal">
            <a onClick={openSSO} className="text-lightgreen cursor-pointer">{t("Click here")}</a> {t("login Okta", { ns : 'message'})}
          </p>
        </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmitHandler: PropTypes.func,
  register: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  errorMsg: PropTypes.bool,
};

export default LoginForm;
