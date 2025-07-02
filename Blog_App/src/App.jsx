import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authservice from './appwrite/auth'
import { logout } from './store/AuthSlice'
import {Footer, Header} from './components'
function App() {
  
const [loading , setloading] = useState(true);
const dispatch = useDispatch()

useEffect(()=>{
  authservice.getCurrentUser()
  .then((userData)=>{
     if(userData){
      dispatch(login({userData}))
     }else{
      dispatch(logout())
     }
  })
  .catch(()=>{
    console.log("error:: authservice :: app.jsx")
  })
  .finally(()=>setloading(false))
},[])


  return ! loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
     
      <div className=' w-full block'>
        <Header/>
        <main>
          {/* Outlet */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}
  
export default App
