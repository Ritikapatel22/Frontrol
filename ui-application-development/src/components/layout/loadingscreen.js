import React, { useMemo } from "react";
import Lottie from "react-lottie-player";
import { useSelector } from "react-redux";
import lottieJson from "../../assets/Images/lf20_HX0isy.json";
import { useFetchDataQuery } from "../../app/appApi";
import { useTranslation } from 'react-i18next';

const Animation = () => {
  const { data } = useFetchDataQuery({
    queryName: "FntlUserProfile.userProfile",
  });
  const { t } = useTranslation(['label', 'message']);

  let today = new Date();
  const curHr = today.getHours();

  const time = useMemo(() => {
    if (curHr < 12) {
      return t("morning");
    } else if (curHr < 17) {
      return t("afternoon");
    }
    return t("evening");
  }, []);

  return (
    <div className="bg-bgcolor fixed top-0 left-0 right-0 bottom-0 z-[99999]">
      <div className="animation flex items-center h-[100vh] sm:mt-6 mt-10 flex-col">
        <div className="flex items-center flex-shrink-0 text-white w-1/2 sm:w-auto">
          <a
            href="/"
            className="flex items-center  border-4 leading-[40px] font-Jockey ml-5 font-medium border-green text-[32px] text-green rounded-lg"
          >
            <span className="bg-green mr-3 ml-3 h-1.5 w-1.5 rounded"></span>
            WORKBENCH
            <span className="bg-green mr-3 ml-3 h-1.5 w-1.5 rounded"></span>
          </a>
        </div>
        {data?.Data?.["FntlUserProfile.userProfile"]?.[0]?.first_name && (
          <span className="flex flex-col items-center">
            <span className="font-Inter text-xl font-bold sm:mt-3 mt-9">
              {t("Good")} {`${time}`} {`${data.Data?.["FntlUserProfile.userProfile"]?.[0]?.first_name}!`}
            </span>
            <span className="font-Inter text-xl font-normal sm:mt-1 mt-3">
              {t("setup account", { ns : 'message'})}...
            </span>
          </span>
        )}
        <div className="">
          <Lottie
            className="mt-[5px] w-full sm:w-[500px] sm:h-[500px]"
            loop
            animationData={lottieJson}
            play
          />
        </div>
      </div>
    </div>
  );
};

export default Animation;
