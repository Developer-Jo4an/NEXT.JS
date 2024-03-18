import axios from 'axios'

import { SERVER_URL, TODOS_GENERAL_URL } from '@/constants/urls'

export class RequestTodosService {
    static async fetchTodos(args, thunkAPI) {
        try {
            const todos = await axios.get(`${SERVER_URL}/${TODOS_GENERAL_URL}`)
            const { data } = todos

            if (!data) {
                const error = new Error('Invalid todos, status: 500')
                error.name = 'Server error'
                throw error
            }

            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
}