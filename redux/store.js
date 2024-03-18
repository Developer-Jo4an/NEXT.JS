import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { todosSlice } from '@/redux/todosSlice/todosSlice'

const rootReducer = combineReducers({
    [todosSlice.name]: todosSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})