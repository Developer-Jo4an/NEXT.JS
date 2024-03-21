import { AUTHORIZATION_LOCATION, ERROR_LOCATION, GAME_LOCATION, PRELOADER_LOCATION } from '@/constants/locations'
import { BAD_REQUEST_400 } from '@/constants/statuses'

export class RequestAppHandler {
    static fetchTodos = {
        pending: (state, action) => {
	        state.location = PRELOADER_LOCATION
        },
        fulfilled: (state, action) => {
            state.todos = action.payload
	        state.location = AUTHORIZATION_LOCATION
        },
        rejected: (state, action) => {
	        state.error = {
		        name: action.payload.name,
		        message: action.payload.message
	        }
            state.location = ERROR_LOCATION
        },
        settled: (state, action) => {

        }
    }

    static fetchAuth = {
        pending: (state, action) => {

        },
        fulfilled: (state, action) => {
            state.userData = action.payload
	        state.location = GAME_LOCATION
        },
        rejected: (state, action) => {
            const { status, data } = action.payload.response

	        if (status === BAD_REQUEST_400) { state.error = { message: data.message }; return }

	        state.error = {
		        name: action.payload.name,
		        message: action.payload.message
	        }
	        state.location = ERROR_LOCATION
        },
        settled: (state, action) => {

        }
    }
}