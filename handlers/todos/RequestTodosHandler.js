export class RequestTodosHandler {
    static fetchTodos = {
        pending: (state, action) => {
            state.isLoading = true
        },
        fulfilled: (state, action) => {
            state.todos = action.payload
        },
        rejected: (state, action) => {
            const { name, message } = action.payload
            state.error = { name, message }
        },
        settled: (state, action) => {
            state.isLoading = false
        }
    }
}