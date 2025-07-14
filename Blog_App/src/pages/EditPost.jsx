import { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import { DBService } from '../appwrite/conf';
import { useNavigate, useParams } from 'react-router-dom';


function EditPost() {
     const [posts,setposts] = useState(null)
     const {slug} = useParams()
     const navigate = useNavigate()


     useEffect(()=>{
        if(slug){
            DBService.getPost(slug).then((post)=>{
                if(post){
                    setposts(post)
                }
            })
        }else{
            navigate("/")
        }
     },[slug,navigate])

  return posts ? (
    <div className='py-8 '>
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ) : null;
}

export default EditPost
