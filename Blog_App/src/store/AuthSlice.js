import { createSlice } from "@reduxjs/toolkit";


// to track the user authentication if it's aunthenticated or not :

const initialState = {
    status: false,
    userData: null
}
const authslice = createSlice({
    name: 'auth',
    initialState,
    reducers:{ 
        login: (state, action)=>{
            state.status = true;// welcome
            state.userData = action.payload.userData;// shows the user data;
        },
        logout: (state)=>{
            state.status = false; // you are logout 
            state.userData = null;// not showing the data
        }
    }
})

export const {login, logout} = authslice.actions;
export default authslice.reducer;