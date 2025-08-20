import React, {useState, useEffect} from 'react'
import  DBService from '../appwrite/conf'
import { Container, Postcards } from '../components'

function AllPost() {
    const [posts, setpost] = useState([])
    useEffect(()=>{},[])
    DBService.getPosts([]).then((posts) => {
        if(posts){
            setpost(posts.documents)
        }
    })
  return (
    <div className='w-full py-8 '>
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1'>
                        <Postcards post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost
