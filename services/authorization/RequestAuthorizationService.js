import axios from 'axios'

import { RequestErrorService } from '@/error-services/RequestErrorService'

import { AUTH_LOGIN, AUTH_URL } from '@/constants/urls'

export class RequestAuthorizationService {
    static async fetchAuth(args, thunkAPI) {
        try {
            const auth = await axios.post(`${AUTH_URL}/${AUTH_LOGIN}`, args)

            return RequestErrorService.checkRequestError(auth.data, AUTH_LOGIN)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
}