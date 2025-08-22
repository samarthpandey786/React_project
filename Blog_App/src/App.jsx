import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authservice from './appwrite/auth'
import { logout, login } from './store/AuthSlice'
import {Footer, Header} from './components'
import { Outlet } from 'react-router-dom'
function App() {
  
const [loading , setloading] = useState(true);
const dispatch = useDispatch()

useEffect(()=>{
  authservice.getCurrentUser()
  .then((userData)=>{
    //  console.log(">>> current user from Appwrite:", userData) 
     if(userData){
      dispatch(login({userData}))
     }else{
      dispatch(logout())
     }
  })
  .catch(()=>{
    // console.log("error:: authservice :: app.jsx")
  })
  .finally(()=>setloading(false))
},[])


  return ! loading ? (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gray-800 ">
  <div className="w-full">
    <Header />
    <main className="">
      <Outlet />
    </main>
    
  </div>
  <Footer />
</div>
  ) : null
}
  
export default App
