export class RequestErrorService {
    static checkRequestError(data, errorUrl) {
        if (!data) {
            const error = new Error(`Invalid ${errorUrl}, status: 500`)
            error.name = 'Server error'
            throw error
        }
        return data
    }
}