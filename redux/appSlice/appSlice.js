import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { RequestAppHandler } from '@/handlers/app/RequestAppHandler'
import { RequestAppService } from '@/services/app/RequestAppService'
import { PRELOADER_LOCATION } from '@/constants/locations'

const createAsyncSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const initialState = {
	error: null,
	location: PRELOADER_LOCATION,
    todos: [],
    userData: {}
}

export const appSlice = createAsyncSlice({
    name: 'app',
    initialState,
    selectors: {
        selectTodosState: sliceState => sliceState,
	    selectAppError: sliceState => sliceState.error,
	    selectAppLocation: sliceState => sliceState.location,
        selectTodosTodos: sliceState => sliceState.todos,
        selectAuthUserData: sliceState => sliceState.userData,
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
	    changeLocationAction: create.reducer((state, action) => {
			state.location = action.payload
	    }),
	    resetAppErrorAction: create.reducer(state => {
			state.error = null
	    })
    })
})

export const {
    selectTodosState,
	selectAppError,
	selectAppLocation,
    selectTodosTodos,
    selectAuthUserData,
} = appSlice.selectors

export const {
    fetchTodosAction,
    fetchAuthAction,
	changeLocationAction,
	resetAppErrorAction
} = appSlice.actions