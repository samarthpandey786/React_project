import React from 'react'
import { useForm } from 'react-hook-form';
import {Button , Input , Select , RTE} from "../index"
import { DBService as service } from '../../appwrite/conf';
import { useNavigate, } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Postfrom({post}) {
  const {register , handleSubmit , watch,
     setValue, control,  getValues
  } = useForm({
    defaultValues: {
      title: post?.title || "" ,
      slug: post?.slug || "" ,
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const navigate  = useNavigate()
  const userdata = useSelector(state => state.user.userdata)

  const submit = async(data)=>{
    if(post){
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null

      if(file){
        service.deleteFile(post.featuredImage)
      }
      const DBpost = await service.updatePost(post.$id,{
        ...data,
        featuredImage: file ? file.$id : undefined,
      })
      if(DBpost){
            navigate(`/post/${DBpost.$id}`)
        }
    }else{
      const file = data
    }
  }
  return (
    <div>
      
    </div>
  )
}

export default Postfrom;
