import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

import { RequestTodosHandler } from '@/handlers/todos/RequestTodosHandler'
import { RequestTodosService } from '@/services/todos/RequestTodosService'

const createAsyncSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const initialState = {
    isLoading: true,
    error: null,
    todos: []
}

export const todosSlice = createAsyncSlice({
    name: 'todos',
    initialState,
    selectors: {
        selectTodosState: sliceState => sliceState,
        selectTodosTodos: sliceState => sliceState.todos,
        selectTodosIsLoading: sliceState => sliceState.isLoading,
        selectTodosError: sliceState => sliceState.error
    },
    reducers: create => ({
        fetchTodosAction: create.asyncThunk(
            RequestTodosService.fetchTodos,
            RequestTodosHandler.fetchTodos
        )
    })
})

export const {
    selectTodosState,
    selectTodosTodos,
    selectTodosIsLoading,
    selectTodosError
} = todosSlice.selectors

export const {
    fetchTodosAction
} = todosSlice.actions