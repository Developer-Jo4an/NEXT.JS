import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

import { RequestAuthorizationHandler } from '@/handlers/authorization/RequestAuthorizationHandler'
import { RequestAuthorizationService } from '@/services/authorization/RequestAuthorizationService'

const createAsyncSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const initialState = {
    isLoading: false,
    error: false,
    userData: {}
}

export const authorizationSlice = createAsyncSlice({
    name: 'authorization',
    initialState,
    selectors: {
        selectAuthState: sliceState => sliceState,
        selectAuthIsLoading: sliceState => sliceState.isLoading,
        selectAuthError: sliceState => sliceState.error,
        selectAuthUserData: sliceState => sliceState.userData
    },
    reducers: create => ({
        fetchAuthAction: create.asyncThunk(
            RequestAuthorizationService.fetchAuth,
            RequestAuthorizationHandler.fetchAuth
        ),
        resetErrorAuthAction: create.reducer(state => {
            state.error = null
        })
    })
})

export const {
    selectAuthState,
    selectAuthIsLoading,
    selectAuthError,
    selectAuthIsAuth,
    selectAuthUserData
} = authorizationSlice.selectors

export const {
    fetchAuthAction,
} = authorizationSlice.actions