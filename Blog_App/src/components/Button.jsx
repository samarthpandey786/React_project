import React from 'react'

function Button({
    BtnText,
    type = "button",
    bgColor = "bg-blue-600",
    textColor ="text-white",
    className = "",
    ...props
}) {
  return (
    <div>
      <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} ${type}`}{...props} >
        {BtnText}
      </button>
    </div>
  )
}

export default Button
