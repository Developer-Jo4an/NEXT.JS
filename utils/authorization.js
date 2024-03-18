import { USERNAME } from '@/constants/variables'

export const generalInputSettings = inputName => ({
    required: `Necessarily ${inputName}!`,
    minLength: {
        value: 6,
        message: `${inputName} must be more than 6 symbols`
    }
})

export const userNameInputSettings = {
    pattern: {
        value: /^[A-Za-z]+$/,
        message: `${USERNAME} must be in Latin characters only`
    }
}