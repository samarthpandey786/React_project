import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import {logout} from '../../store/AuthSlice'



function Logoutbtn() {
    const dispatch = useDispatch()
    const logouthandler = () =>{
        authservice.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <div className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
    onClick={logouthandler}>
      <button>logout</button>
    </div>
  )
}

export default Logoutbtn
