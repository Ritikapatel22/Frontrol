import React, { useState } from "react";

const defaultTitle = [
  "Dashboard",
  "Reports",
  // "Information",
  // "WBS",
  // "Funding",
  // "Budget",
  // "Forecast",
  // "Estimate",
  // "Progress",
  // "Change",
  // "Status report",
  // "Approval",
];

function Tab({ select, setSelect, title = defaultTitle}) {

  const handleChange = (data) => {
    setSelect(data);
  };
  return (
    <div className="mx-[14px]">
      <div className="max-w-[1104px]  border-earthgreen">
        {title.map((val, indx) => {
          return (
            <>
              <button
                key={indx}
                onClick={() => {
                  handleChange(val);
                }}
                className={` ${select !== val &&
                  "tracking-wider text-lightgrey border-earthgreen border-b-2  text-xs font-medium font-Inter  p-[10px]"
                  }tracking-wider text-xs font-medium font-Inter  p-[10px] ${select === val &&
                  " text-lightgreen tracking-wider border-b-2 text-xs font-Inter  p-[10px] border-lightgreen"
                  }`}
              >
                {val}
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
}
export default Tab;
