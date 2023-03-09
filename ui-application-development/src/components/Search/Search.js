import { LazyQueryList } from '@frontrolinc/pace-ui-framework'
import { useState, useRef, useId, useEffect } from 'react'
import './search.scss'
import SearchIcon from '../../assets/Images/searchIcon.svg'
import close_rounded from '../../assets/Images/close-icon.svg'
import useOnClickOutside from '../../hooks/useOutside'
import { useTranslation } from 'react-i18next';
const Search = (props) => {
  const { t } = useTranslation(['label' , 'message']);
  const compId = useId()
  const { searchTypeLabel } = props.config
  const [inputFocus, setInputFocus] = useState(
    props.alwaysShowingrsearchResult ? true : false,
  )
  const [textValue, setTextValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('')
  const [onClickTrigger, setOnClickTrigger] = useState(true)
  const inputText = useRef(null)
  const timerRef = useRef()
  const ref = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  useOnClickOutside(ref, () => {
    setInputFocus(false)
    if (inputText.current) inputText.current.value = ''
    setTextValue('')
  })

  useEffect(() => {
    if (props.config.mode === 'simple' && !onClickTrigger) {
      setInputFocus(false)
      if (inputText.current) inputText.current.value = ''
      setTextValue('')
    }
    setOnClickTrigger(true)
  }, [onClickTrigger])

  const inputTextFocus = () => {
    setInputFocus(true)
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
          className={`search-Container ${
            inputFocus && !props.alwaysShowingrsearchResult
              ? 'Container-focus'
              : ''
          } ${props.alwaysShowingrsearchResult ? 'dropdown-container' : ''}`}
        >
          <div
            className={`image-container ${
              props.alwaysShowingrsearchResult ? 'dropdown-img' : ''
            }`}
          >
            <div
              className={`input-container ${
                props.alwaysShowingrsearchResult
                  ? 'dropdown-input-container'
                  : ''
              }`}
            >
              <div className="searchicon">
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
                    ? `${t("Search any", { ns : 'message'})} ${searchTypeLabel}`
                    : `${t("Search")} ${searchTypeLabel}`
                }
                className={` search ${
                  !props.alwaysShowingrsearchResult && inputFocus ? 'focus' : ''
                } 
                ${
                  props.alwaysShowingrsearchResult ? 'dropdown-input-focus' : ''
                }
                ${
                  !props.alwaysShowingrsearchResult && isLoading && inputFocus
                    ? 'image-container-loading'
                    : ''
                }`}
                onFocus={inputTextFocus}
                onChange={debounceFun}
              />
            </div>
          </div>
        </div>
        {(props.alwaysShowingrsearchResult ||
          (onClickTrigger && inputFocus)) && (
          <LazyQueryList
            open={inputFocus}
            setOpen={setInputFocus}
            alwaysShowingrsearchResult={props.alwaysShowingrsearchResult}
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
