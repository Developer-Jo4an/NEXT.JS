import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { todosSlice } from '@/redux/todosSlice/todosSlice'
import { authorizationSlice } from '@/redux/authorizationSlice/authorizationSlice'

const rootReducer = combineReducers({
    [todosSlice.name]: todosSlice.reducer,
    [authorizationSlice.name]: authorizationSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})