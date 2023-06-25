import {configureStore} from '@reduxjs/toolkit'
import MenuSlice from './MenuSlice'
import SuggestionSlice from './SuggestionSlice'
import ChatSlice from './ChatSlice'
//imported SuggestionSlice = Suggestion.Reducer (any name for default export)


const Store=configureStore({
    reducer:{
        Menu:MenuSlice,
        Suggestion:SuggestionSlice,
        Chat:ChatSlice
    }
})
export default Store