import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getQueryStringValue } from "@frontrolinc/pace-ui-framework/dist/cjs";
import AeCom from "../assets/Images/aecom-logo.png";
import frontrolLogo from "../assets/Images/logo-white.svg";
import checkmark from "../assets/Images/checkmark.svg";
import { openSSO } from "../helpers/utils";
import { Toast } from "../components/Common/toast";

function SsoLogin() {

  const { t } = useTranslation(['label', 'message']);

  const logout = getQueryStringValue('logout');

  useEffect(() => {
    if (logout) {
      Toast('success', t('LOGGED_OUT', { ns: 'message' }))
    }
  }, [logout])

  return (
    <div className="login-main 2xl:overflow-auto overflow-hidden bg-no-repeat bg-cover bg-center login-bg h-[100vh] w-full flex justify-center items-center">
      <div className="flex justify-center align-middle ">
        <div>
          <div className="2xl:w-[465px] w-[425px] 2xl:max-h-fit rounded-[20px] overflow-hidden bg-white ">
            <div className="login-header bg-lightgraygreen 2xl:py-[20px] py-[10px] flex justify-center">
              <div className="xl:h-[100px] 2xl:h-auto">
                <div>
                  <img
                    src={AeCom}
                    alt="aecom-logo"
                    className="h-[50px] 2xl:h-full mx-auto"
                  ></img>
                </div>
                <div className="flex items-center flex-shrink-0 text-white w-1/2 sm:w-auto">
                  <a
                    href="/"
                    className="flex items-center border-4 leading-[40px] font-Jockey 2xl:ml-5 ml-0 font-medium border-green text-[32px] text-green rounded-lg"
                  >
                    <span className="bg-green mr-3 ml-3 h-1.5 w-1.5 rounded"></span>
                    WORKBENCH
                    <span className="bg-green mr-3 ml-3 h-1.5 w-1.5 rounded"></span>
                  </a>
                </div>
              </div>
            </div>
            <div
              className={`pt-[20px] pb-[55px] px-[30px]`}
            >
              <div className="text-center 2xl:mb-[28px] xl:mb-[20px]">
                <h2 className="text-gray-600 text-2xl font-Inter font-medium">
                  {t("LOGIN TO")} WORKBENCH
                </h2>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <img src={checkmark} alt="checkmark" className="block mr-auto ml-auto mt-[15px]" />
                <div className={`px-4 mt-[30px] text-center sm:px-6`}>
                  <button
                    type="submit"
                    className={
                      "py-2 px-20 border border-transparent shadow-sm text-[17px]  rounded-md  text-white bg-lightgreen hover:bg-lightgreen focus:outline-none  focus:ring-lightgreen"
                    }
                    onClick={openSSO}
                  >
                    <span className="font-Inter font-medium">
                      {t("LOGIN_WITH_OKTA")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bottom-text text-center absolute bottom-0 h-[27px] w-1/2 p-[10px] left-0 right-0 m-auto justify-center">
            <div className="text-white text-sm font-Inter font-normal mr-[7px]">
              {t("Powered by")}
            </div>
            <div>
              <img src={frontrolLogo} className="w-[62px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SsoLogin;
