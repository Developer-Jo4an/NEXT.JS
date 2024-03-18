import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

import { RequestAppHandler } from '@/handlers/app/RequestAppHandler'
import { RequestAppService } from '@/services/app/RequestAppService'

const createAsyncSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const initialState = {
    isLoading: true,
    error: null,
    todos: [],
    userData: {}
}

export const appSlice = createAsyncSlice({
    name: 'app',
    initialState,
    selectors: {
        selectTodosState: sliceState => sliceState,
        selectTodosTodos: sliceState => sliceState.todos,
        selectAuthUserData: sliceState => sliceState.userData,
        selectTodosIsLoading: sliceState => sliceState.isLoading,
        selectTodosError: sliceState => sliceState.error,
    },
    reducers: create => ({
        fetchTodosAction: create.asyncThunk(
            RequestAppService.fetchTodos,
            RequestAppHandler.fetchTodos
        ),
        fetchAuthAction: create.asyncThunk(
            RequestAppService.fetchAuth,
            RequestAppHandler.fetchAuth
        ),
        resetErrorAction: create.reducer(state => {
            state.error = null
        })
    })
})

export const {
    selectTodosState,
    selectTodosTodos,
    selectAuthUserData,
    selectTodosIsLoading,
    selectTodosError
} = appSlice.selectors

export const {
    fetchTodosAction,
    fetchAuthAction,
    resetErrorTodosAction
} = appSlice.actions