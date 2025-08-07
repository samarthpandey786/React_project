import React from 'react'
import PropTypes from 'prop-types';

function Button({
    BtnText,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <div>
      <button
        type={type} // ✅ Correct use
        className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
        {...props}
      >
        {BtnText}
      </button>
    </div>
  );
}

Button.propTypes = {
  BtnText: PropTypes.string.isRequired,
  type: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
