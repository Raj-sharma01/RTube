import { createSlice } from "@reduxjs/toolkit";


const ChatSlice = createSlice({
    name:"Chat",
    initialState:{
        messages:[],
    },
    reducers:{
        addMessage:(state,action)=>{
         state.messages.splice(action.payload.offset,1)
         console.log("slice updated")
         state.messages.push(action.payload)
        //  console.log(action)
        }
    }
})

export const {addMessage}=ChatSlice.actions
export default ChatSlice.reducer
