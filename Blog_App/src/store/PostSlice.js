import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    allpost: "",
    userpost:""
}

const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{
        islogined: (state,action)=>{
            state.allpost = action.payload
            state.userpost = action.payload
        }
        
        
    } 
})

export const{islogined} = PostSlice.actions
export default PostSlice.reducer