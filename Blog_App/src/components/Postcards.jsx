import React from 'react'
import DBService from "../appwrite/conf"
import {Link} from "react-router-dom"



function Postcards({$id , title , featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={DBService.previewfile(featuredImage)} alt={title} className='rounded-xl ' />
        </div>
        <h2 className='text-xl font-bold text-gray-400 hover:text-emerald-300 transition-all duration-300 truncate'
        >{title}</h2>
      </div>
    </Link>
  )
}

export default Postcards
