import React from "react";
import PropTypes from "prop-types";

function Button({ icon, iconLabel, handleClick, label }) {
  return (
    <button onClick={handleClick} className="flex add" type="button">
      {icon && <img src={icon} alt={iconLabel} />}
      {label && (
        <span className="text-lightgrey ml-[12px] font-Inter text-sm font-normal">
          {(label.substring(0, 18))}
        </span>
      )}
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.node,
  iconLabel: PropTypes.string,
  label: PropTypes.string,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  handleClick: function (e) {
    return e;
  },
};

export default Button;
