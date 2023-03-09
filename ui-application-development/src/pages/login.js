import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AeCom from "../assets/Images/aecom-logo.png";
import LoginForm from "../components/form/login/loginform";
import "../components/form/login/login.css";
import { updateAuthState } from "../slices/authslice";
import { setDefaultPortfolio } from "../slices/portfolioslice";
import { setDefaultView } from "../slices/viewslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../app/appApi";
import { useTranslation } from 'react-i18next';
import {
  logger,
  loginFailed,
  setAuthToken,
  useQueryString,
} from "@frontrolinc/pace-ui-framework";
import { useGetItems } from "./selector";
import { store } from "../app/store";
import { TOKEN_RENEWAL_TIME_KEY } from "../helpers/constants";
import frontrolLogo from '../assets/Images/logo-white.svg'
import { LOGIN_MODE, useLoginMode } from "../hooks/useLoginMode";

const schema = yup.object().shape({
  username: yup.string().required(),
  userpassword: yup.string().min(8).required(),
});

const Login = () => {
  // const [errorMsg, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['label']);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoginMode, clearLoginMode } = useLoginMode()

  const location = useLocation();
  // const  = (data) => {
  //   setLoading(true);
  //   dispatch(createLogin(data))
  //     .unwrap()
  //     .then((data) => {
  //       if (data?.Status == "ERROR") {
  //         setLoading(false);
  //         setError(true);
  //       } else {
  //         setLoading(false);
  //         setError(false);
  //         dispatch(updateAuthState(true));
  //         dispatch(setDefaultPortfolio());
  //         dispatch(setDefaultView());
  //         setTimeout(() => {
  //           dispatch(updateAuthState(false));
  //         }, 3000);
  //         navigate("/");
  //       }
  //     });
  const [login, { isLoading }] = useLoginMutation();
  // const authError = useSelector((state) => state.auth.authError);
  const [authError, setAuthError] = useState();
  let [portfolioUrl, setPortfolio] = useQueryString("portfolio");
  let portfolio = useSelector((state) => state.portfolio.selectedPortfolio?.portfolio_id);

  useEffect(() => {
    document.title = t("Login to Workbench")
  }, [])

  const onSubmitHandler = async (data) => {
    try {
      clearLoginMode()
      const user = await login(data).unwrap()
      if (user?.Status == "ERROR") {
        setAuthError(user?.Message)
        dispatch(loginFailed(user?.Message))
      } else {
        await logger.clean()
        setLoginMode(LOGIN_MODE.LOGIN)
        dispatch(setAuthToken({ token: user?.Message[0].token }));
        window.localStorage.setItem('isLoggedIn', 'true')
        dispatch(updateAuthState(true));
        dispatch(setDefaultPortfolio());
        dispatch(setDefaultView());
        localStorage.removeItem(TOKEN_RENEWAL_TIME_KEY);
        setTimeout(() => {
          dispatch(updateAuthState(false));
        }, 4000);
        navigate("/");
        if (!window.location.href.split("/project/")[1]) {
          setPortfolio(portfolio);
        }
      }
    } catch (error) {
      dispatch(loginFailed(error));
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('isLoggedIn') === true) {
      navigate("/");
    }
  }, [localStorage])

  const changeData = (e) => {
    if (e.target.value) {
      clearErrors();
    } else {
      errors;
    }
  };

  return (
    <div className="login-main 2xl:overflow-auto overflow-hidden bg-no-repeat bg-cover bg-center  login-bg h-[100vh]  w-full flex justify-center items-center">
      <div className="flex justify-center align-middle ">
        <div>
          <div className="2xl:w-[500px] w-[425px] 2xl:max-h-fit mt-5 lg rounded-[20px] overflow-hidden bg-white ">
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
                    className="flex items-center  border-4 leading-[40px] font-Jockey 2xl:ml-5 ml-0 font-medium border-green text-[32px] text-green rounded-lg"
                  >
                    <span className="bg-green mr-3 ml-3 h-1.5 w-1.5 rounded"></span>
                    WORKBENCH
                    <span className="bg-green mr-3 ml-3 h-1.5 w-1.5 rounded"></span>
                  </a>
                </div>
              </div>
            </div>
            <div className={`2xl:pb-[40px] pt-[15px] pb-[15px] 2xl:px-[50px] px-[30px] ${!authError ? "mt-[20px]" : ""}`}>
              <div className="text-center 2xl:mb-[28px] xl:mb-[20px]">
                <h2 className="text-gray-600 text-2xl font-Inter font-medium">
                  {t("LOGIN TO")} WORKBENCH
                </h2>
                {authError && <p className="text-red mt-1">{authError}</p>}
              </div>

              <div className="mt-5 md:mt-0 md:col-span-2">
                <LoginForm
                  onSubmitHandler={onSubmitHandler}
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  loading={isLoading}
                  errorMsg={authError}
                  changeData={changeData}
                />
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
};

export default Login;
