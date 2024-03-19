import axios from 'axios'
import { RequestErrorService } from '@/error-services/RequestErrorService'
import { AUTH_LOGIN, AUTH_URL, SERVER_URL, TODOS_GENERAL_URL } from '@/constants/urls'

export class RequestAppService {
    static async fetchTodos(args, thunkAPI) {
        try {
            const todos = await axios.get(`${SERVER_URL}/${TODOS_GENERAL_URL}`)
	        return RequestErrorService.checkRequestError(todos.data, TODOS_GENERAL_URL)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
    static async fetchAuth(args, thunkAPI) {
        try {
            const auth = await axios.post(`${AUTH_URL}/${AUTH_LOGIN}`, args)
            return RequestErrorService.checkRequestError(auth.data, AUTH_LOGIN)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
}