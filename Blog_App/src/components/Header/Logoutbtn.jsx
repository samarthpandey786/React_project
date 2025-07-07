import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import {logout} from '../../store/AuthSlice'



function Logoutbtn() {
    const dispatch = useDispatch()
    const logouthandler = () =>{
        authservice.logout().then(()=>{
            dispatch(logout())
        }).catch(()=>{
          console.log("error in the logout :: Logoutbtn.jsx")
        })
    }
  return (
   
      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      onClick={logouthandler}>
        Logout
      </button>
    
  )
}

export default Logoutbtn
