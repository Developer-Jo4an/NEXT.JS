export class RequestErrorService {
    static checkRequestError(data, errorUrl) {
        if (!data) {
            const error = new Error(`Invalid ${errorUrl}, status: 500`)
            error.name = 'Response from server error(500)'
            throw error
        }
        return data
    }
}