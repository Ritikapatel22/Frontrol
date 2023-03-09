import React from 'react'
import { logger } from '@frontrolinc/pace-ui-framework'
import PropTypes from 'prop-types'

function ProceedButton({ type, icon, iconLabel, handleClick, label }) {
  switch (type) {
    case 'primaryButton':
      return (
        <button
          className="p-2 mx-1 sm:py-3 h-[36px] sm:pl-[14px] sm:pr-[10px] shadow items-center flex text-[12px] sm:text-sm font-bold bg-[#00886d] hover:bg-[#015e4b] px-3.5 rounded text-white"
          onClick={handleClick}
        >
          {icon && <img src={icon} alt={iconLabel} className="mr-2" />}
          {label}
        </button>
      )
    case 'secondaryButton':
      return (
        <button
          className="border mx-1 border-lightgreen h-[36px] hover:bg-[#CFDFD7] transition-all px-3 flex justify-center items-center font-bold font-Inter text-sm ml-1 rounded text-lightgreen"
          onClick={handleClick}
        >
          {icon && <img src={icon} alt={iconLabel} className="mr-2" />}
          {label}
        </button>
      )
    default:
      break
  }
}

ProceedButton.propTypes = {
  icon: PropTypes.node,
  iconLabel: PropTypes.string,
  label: PropTypes.string,
  handleClick: PropTypes.func,
  type: PropTypes.string,
  action: PropTypes.string,
}

ProceedButton.defaultProps = {
  handleClick: function (e) {
    return e
  },
}

export default ProceedButton
