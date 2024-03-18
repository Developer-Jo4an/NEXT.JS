export class RequestAppHandler {
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

    static fetchAuth = {
        pending: (state, action) => {
            state.isLoading = true
        },
        fulfilled: (state, action) => {
            state.userData = action.payload
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