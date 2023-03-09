import { LazyQueryList } from '@frontrolinc/pace-ui-framework'
import { useState, useRef, useId, useEffect } from 'react'
import './search.scss'
import SearchIcon from '../../assets/Images/searchIcon.svg'
import close_rounded from '../../assets/Images/close-icon.svg'
import useOnClickOutside from '../../hooks/useOutside'
const Search = (props) => {
  const compId = useId()
  const inputFocus = false
  const { searchTypeLabel } = props.config
  const [textValue, setTextValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('')
  const [onClickTrigger, setOnClickTrigger] = useState(true)
  const inputText = useRef(null)
  const timerRef = useRef()
  const ref = useRef(null)
  const refExpt = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  useOnClickOutside(ref, () => {
  })
  useOnClickOutside(refExpt, () => {})

  useEffect(() => {
    if (props.config.mode === 'simple' && !onClickTrigger) {
      if (inputText.current) inputText.current.value = ''
      setTextValue('')
    }
    setOnClickTrigger(true)
  }, [onClickTrigger])

  const inputTextFocus = () => {
  }

  const crossIconActive = () => {
    setOnClickTrigger(true)
  }

  const debounceFun = debounce(() => {
    if (inputText.current) {
      setTextValue(inputText.current.value)
    }
  }, 500)
  function debounce(func, timeout) {
    return (...args) => {
      timerRef.current && clearTimeout(timerRef.current)
      const debounceTimer = setTimeout(() => {
        func(...args)
      }, timeout)
      timerRef.current = debounceTimer
    }
  }

  return (
    <>
      <div ref={ref} className="parent-container">
        <div
          className={`search-Container min-w-[250px] h-[43.8px]  ${inputFocus ? 'Container-focus' : ''}`}
        >
          <div className="image-container">
            <div className="input-container">
              <div className="searchicon-temp">
                <img
                  src={SearchIcon}
                  width="16px"
                  height="16px"
                  alt="searchicon"
                />
              </div>
              <input
                type="text"
                ref={inputText}
                placeholder={
                  inputFocus
                    ? `Start typing here to search for ${searchTypeLabel}`
                    : `Search`
                }
                className={`focus-visible:outline-none search min-w-[216px] ${inputFocus ? 'focus' : ''} ${
                  isLoading && inputFocus ? 'image-container-loading' : ''
                }`}
                onFocus={inputTextFocus}
                onChange={debounceFun}
              />
            </div>
            {isLoading && inputFocus && <div className="loader"></div>}
            <img
              src={close_rounded}
              className={`cross-icon ${inputFocus ? 'active-icon' : ''}`}
              onClick={crossIconActive}
            />
          </div>
        </div>
        {onClickTrigger && inputFocus && (
          <LazyQueryList
            open={inputFocus}
            searchInputRef={inputText}
            setTextValue={setTextValue}
            compId={compId}
            config={props.config}
            searchTerm={textValue}
            setSearchLoadingState={setIsLoading}
            setSelectedValue={setSelectedValue}
            setOnClickTrigger={setOnClickTrigger}
          />
        )}
      </div>
    </>
  )
}
export default Search
