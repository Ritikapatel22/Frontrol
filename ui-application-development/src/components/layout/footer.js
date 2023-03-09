import React from 'react'
import frontrolLogo from '../../assets/Images/frontrol.png'
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation(['label']);
  return (
    <div className="flex absolute bottom-0 ml-[30px] mb-[6px] ">
      <div className="text-lightgrey font-normal text-xs mr-[7px]">
        {t("Powered by")}
      </div>
      <div>
        <img src={frontrolLogo} />
      </div>
    </div>
  )
}

export default Footer
