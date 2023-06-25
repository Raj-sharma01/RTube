import { createSlice } from "@reduxjs/toolkit";

const SuggestionSlice=createSlice({
    name:"Suggestion",
    initialState:{
        suggestionCache:{}
    },
    reducers:{
     addSuggestion:(state,action)=>{
        state.suggestionCache={...state.suggestionCache,...action.payload}
     }
    }
})

export const {addSuggestion} =SuggestionSlice.actions;
export default SuggestionSlice.reducer;