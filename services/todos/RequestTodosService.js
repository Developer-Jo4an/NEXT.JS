import axios from 'axios'

import { RequestErrorService } from '@/error-services/RequestErrorService'

import { SERVER_URL, TODOS_GENERAL_URL } from '@/constants/urls'

export class RequestTodosService {
    static async fetchTodos(args, thunkAPI) {
        try {
            const todos = await axios.get(`${SERVER_URL}/${TODOS_GENERAL_URL}`)

            return RequestErrorService.checkRequestError(todos.data, TODOS_GENERAL_URL)

        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
}