import React, { useRef, useState, useEffect } from 'react'
import useOnClickOutside from '../../hooks/useOutside'
import Search from './Search'
import './singleselect.scss'
import { useTranslation } from 'react-i18next'

// const {t} = useTranslation(['label'])

const getBaseConfigForLazyQueryList = (options) => {
  
  return {
    limit: 20,
    ...options,
    mode: 'singleSelect',
    showAdvanceSearch: false,
    recentParams: { ...options.params },
  }
}

const SingleSelect = React.forwardRef(
  
  (
    {
      lazyQueryListOptions,
      selectedValue,
      labelField = 'label',
      valueField = 'value',
      placeholder = 'Select',
      onChange,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false)
    if (ref) {
      ref.current = {
        getSelectedValue() {
          return selected
        },
        setSelectedValue(value) {
          const newSelectedValue = {
            label: value[labelField],
            value: value[valueField],
          }
          setSelected(newSelectedValue)
        },
      }
    }

    const [selected, setSelected] = useState(
      selectedValue
        ? {
            label: selectedValue[labelField] || selectedValue[valueField] || '',
            value: selectedValue[valueField] || '',
          }
        : null,
    )

    useEffect(() => {
      setSelected(
        selectedValue
          ? {
              label:
                selectedValue[labelField] || selectedValue[valueField] || '',
              value: selectedValue[valueField] || '',
            }
          : null,
      )
    }, [selectedValue])

    const lazyQueryConfig = getBaseConfigForLazyQueryList(lazyQueryListOptions)
    lazyQueryConfig.onClickSearchItem = (event) => {
      const oldSelectedValue = { ...selected }
      const newSelectedValue = {
        label: event.data[labelField],
        value: event.data[valueField],
      }
      setSelected(newSelectedValue)
      onChange && onChange(newSelectedValue, oldSelectedValue)
      setOpen(false)
    }

    const containerRef = useRef(null)
    useOnClickOutside(containerRef, () => {
      setOpen(false)
    })

    const triggerDropdownOpenClose = () => {
      setOpen(!open)
    }

    return (
      <div className="lazy-select-input" ref={containerRef}>
        <button
          type="button"
          onClick={triggerDropdownOpenClose}
          className="dropDownBtn mb-3 flex justify-between select-input font-Inter border relative border-transparent text-ellipsis overflow-hidden rounded-r whitespace-nowrap w-full shadow hover:shadow-lg bg-white  text-left pl-[10px]  items-center h-[43.8px]  flex text-sm p-3 min-w-[250px] min-h-[36px]"
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">
              {selected?.label || placeholder}
            </span>
          </span>
          <i className="fa-solid fa-caret-down text-slate-500"></i>
        </button>

        {open && (
          <div
            className="dropdownbtn-container absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex="-1"
            style={{ height: '20rem' }}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            <div>
              <Search
                config={lazyQueryConfig}
                alwaysShowingrsearchResult={true}
              />
            </div>
          </div>
        )}
      </div>
    )
  },
)

export default SingleSelect
