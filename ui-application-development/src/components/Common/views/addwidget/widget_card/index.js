import React from "react";
import {useTranslation} from 'react-i18next'

export default function WidgetCard({ widget, view, changeHandler, checked }) {
  const { t } = useTranslation(['message']);

  const handleClick = () => {
    changeHandler({target:{checked: !checked}}, widget)
  }

  return (
    <>
    <div className="pl-4 pt-3.5 w-full">
      <div className="mr-[9px] absolute top-0 left-0">
        <label className="checkmarkvalue ">
          <input
            type="checkbox"
            onChange={(e) => changeHandler(e, widget)}
            checked={checked}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="pl-9 pb-3.5"  onClick={handleClick}>
        <h3 className="text-sm font-medium font-Inter text-black">
          {t(`${widget?.component}_title`, {ns: 'message'})}{view?.view_name ? ", " : ""} <span className="font-normal text-lightgrey font-Inter">{view?.view_name}</span>
        </h3>
        <p className="text-xs font-normal text-lightgrey font-Inter">
          {t(`${widget?.component}_desc`, { ns : 'message'})}
        </p>
      </div>
    </div>
    </>
  );
}
