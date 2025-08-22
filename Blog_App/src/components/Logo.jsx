import React from 'react'
import logo from '../assets/logo.jpg'

function Logo({width = "100px"}) {
  return (
    <div>
     <img src={logo} alt="logo" />
    </div>
  )
}

export default Logo
