import React, { useState } from "react";

const title = [
  "Dashboard",
  "Reports"
];

function Tab() {
  const [select, setSelect] = useState("Dashboard");
  const handleChange = (data) => {
    setSelect(data);
  };
  return (
    <div className="my-[10px] mx-[14px]">
      <div className="max-w-[1104px]  border-earthgreen">
        {title.map((val, indx) => {
          return (
            <>
              <button
                key={indx}
                onClick={() => {
                  handleChange(val);
                }}
                className={`${
                  select !== val &&
                  "tracking-wider text-lightgrey border-b-2  text-xs font-medium font-Inter  p-[10px]"
                } ${
                  select === val &&
                  " text-lightgreen tracking-wider border-b-2 text-xs font-Inter  font-medium  p-[10px] border-lightgreen"
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
