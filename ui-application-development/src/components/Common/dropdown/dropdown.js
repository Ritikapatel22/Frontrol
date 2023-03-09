import React, { useCallback, useRef, useState, useEffect } from "react";
import useOnClickOutside from "../../../hooks/useOutside";
import { useTranslation } from "react-i18next";

function Dropdown({ label, values, selectedValue }) {
  const [open, setOpen] = useState(false);
  const {t} = useTranslation(['label']);
  const [selected, setSelected] = useState({
    label: "",
    value: "",
  });
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setOpen(false);
  });
  useEffect(() => {
    const defaultSelected = values.find(
      ({ defaultSelected }) => defaultSelected === true
    );
    setSelected(defaultSelected);
  }, [values]);
  const getSelected = async (val) => {
    setOpen(false);
    setSelected(val);
    selectedValue(val);
  };
  return (
    <div className="flex flex-col m-2">
      <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mb-3 flex justify-between select-input font-Inter border relative border-transparent text-ellipsis overflow-hidden rounded-r whitespace-nowrap w-full shadow hover:shadow-lg bg-white  text-left pl-[10px]  items-center h-[43.8px]  flex text-sm p-3 min-w-[250px] min-h-[36px]"
        >
          <span class="flex items-center">
            <span class="ml-3 block truncate">
              {selected?.label || t( "Select")}
            </span>
          </span>
          <i className="fa-solid fa-caret-down text-slate-500"></i>
        </button>

        {open && (
          <ul
            ref={ref}
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {values.map((option) => (
              <li
                key={option.value}
                onClick={() => getSelected(option)}
                className={`${
                  selected?.value === option.value ? "bg-grey" : "bg-[#fffff]"
                } text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9 hover:text-white hover:bg-[#00353e]`}
                id="listbox-option-0"
                role="option"
              >
                <div className="flex items-center">
                  <span className="font-normal block truncate">{option.label}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
