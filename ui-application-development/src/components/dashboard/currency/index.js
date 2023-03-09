import React, { useRef, useState, memo, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrency } from "../../../slices/authslice";
import edited from "../../../assets/Images/edited.svg";
import { currencyFactory } from '@frontrolinc/pace-ui-framework'
import information from "../../../assets/Images/information.svg";
import { useTranslation } from 'react-i18next';
import useOnClickOutside from "../../../hooks/useOutside";

function Currency({ info, changeSelectedCurrency ,selectedPortfolio,projects}) {
  const ref = useRef(null)
  const refExpt = useRef(null);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const { t } = useTranslation(['label']);
  const currenctCurrency = useSelector(
    (state) => state.loginAuth.currenctCurrency
  );


  const disaplyCurrency = useMemo(() => {
    if (currenctCurrency === info?.currency) {
      currencyFactory.setConvertTo('USD')
      changeSelectedCurrency('USD')
      return "USD";
    }
    currencyFactory.setConvertTo(info?.currency)
    changeSelectedCurrency(info?.currency)
    return info?.currency;
  }, [currenctCurrency, info?.currency]);

  useEffect(() => {
    return () => {
      dispatch(changeCurrency('USD'))
    }
  }, [info?.currency])
  

  useOnClickOutside(ref, () => {
    setOpenPopup(false)
  });
  useOnClickOutside(refExpt, () => {});

  return (
    <div className="relative flex items-center lg:mt-0 mt-2" ref={ref}>
      {info && info?.currency === "USD" && info.currency !== '' && (
        <p className="text-lightgrey text-[12px] font-normal font-Inter sm:ml-0 mr-1">
          <>{t("All currencies in")}</> USD
        </p>
      )}
      {info && info.currency !== "USD" && info.currency !== "Multiple" && info.currency !== ''&& projects !== 0 && (
        <>
          {disaplyCurrency !== "USD" ? (
            <>
              <p className="text-lightgrey text-[11px] font-normal font-Inter sm:ml-0 ml-4 mr-1">
                {`${t("All currencies in")} ${disaplyCurrency}`}
              </p>
              {!openPopup && (
                <img
                  src={edited}
                  onClick={() => setOpenPopup(true)}
                  alt="edit"
                  className="cursor-pointer hover:bg-[#E6F3F0]"
                />
              )}
            </>
          ) : (
            <>
              <p className="text-lightgrey text-[11px] font-normal font-Inter sm:ml-0 ml-4 mr-1">
                {`${t("All currencies in")} ${disaplyCurrency} (1 ${info.currency} = ${info?.currencyRate} USD)`}
              </p>
              {!openPopup && (
                <img
                  src={edited}
                  onClick={() => setOpenPopup(true)}
                  alt="edit"
                  className="cursor-pointer hover:bg-[#E6F3F0]"
                />
              )}
            </>
          )}
        </>
      )}
      {info && info.currency === "Multiple" && info.currency !== '' && projects !== 0 && (
        <>
          <p className="text-lightgrey text-[12px] font-normal font-Inter sm:ml-0 ml-4 mr-1">
            <>{t("All currencies in")}</> USD
          </p>
          <div className="relative group w-[36px] transition-all flex items-center">
            <img src={information} alt="edit" width="16px" />
            <div className="group-hover:block w-[150px] top-[30px] left-[-24px] dropdown-menu absolute hidden h-auto z-10 p-[6px] text-sm font-medium text-white bg-black rounded-lg shadow-sm  ">
              <div className="relative">
                <p className="font-Inter leading-[16.38px] text-center text-xs">
                  Projects are in multiple currencies
                  {info.multipleCurrency.split(",").map((text, key) => (
                    <p key={key}>{text}</p>
                  ))}
                </p>
                <div className="bg-black top-[-11px] z-[-1] left-[28px]  rotate-45 absolute w-[15px] h-[15px]"></div>
              </div>
            </div>
          </div>
        </>
      )}
      {openPopup && (
        <div className="absolute right-[-97px]">
          <div
            ref={refExpt}
            className="relative  z-10 ml-4"
            onClick={() => {
              setOpenPopup(false);
              dispatch(changeCurrency(disaplyCurrency));
            }}
          >
            <p className="cursor-pointer underline font-Inter text-[12px] relative	 shadow hover:shadow-xl  bg-white py-[6px] px-[9px] rounded ">
              {t("Show in")} {`${currenctCurrency}`}
              <span className="absolute -z-10 h-3 w-3 top-[10px] left-[-7px] shadow hover:shadow-xl bg-white rotate-45"></span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

Currency.propTypes = {
  info: PropTypes.object,
};

export default memo(Currency);
