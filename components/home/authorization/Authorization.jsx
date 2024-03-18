import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAuthAction, selectAuthState } from '@/redux/authorizationSlice/authorizationSlice'

import './styles.css'

const USERNAME = 'username'
const PASSWORD = 'password'

const Authorization = () => {

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const generalInputSettings = inputName => ({
        required: `Necessarily ${inputName}!`,
        minLength: {
            value: 6,
            message: `${inputName} must be more than 6 symbols`
        },
    })

    const userNameInputSettings = {
        pattern: {
            value: /^[A-Za-z]+$/,
            message: `${USERNAME} must be in Latin characters only`
        }
    }

    const errorGen = inputName => (
        errors?.[inputName] &&
        <p className={'auth-errors-info'}>
            { errors?.[inputName]?.message || `Invalid ${inputName}` }
        </p>
    )

    const onSubmit = data => {
        dispatch(fetchAuthAction(data))
        reset()
    }

    return (
        <div className={'authorization'}>
            <h2>Authorization</h2>
            <form onSubmit={ handleSubmit(onSubmit) } className={'auth-form'}>
                <label className={'auth-form-label'}>
                    { USERNAME }:
                    <input
                        type={ 'text' }
                        { ...register(USERNAME, { ...generalInputSettings(USERNAME), ...userNameInputSettings })}
                        className={'auth-form-input'}
                    />
                </label>
                <label className={'auth-form-label'}>
                    { PASSWORD }:
                    <input
                        type={ 'password' }
                        { ...register(PASSWORD, { ...generalInputSettings(USERNAME) })}
                        className={'auth-form-input'}
                    />
                </label>
                <div className={'auth-errors'}>
                    { errorGen(USERNAME) }
                    { errorGen(PASSWORD) }
                </div>
                <label>
                    <input
                        type={'submit'}
                        className={ 'auth-form-submit-btn' }
                        value={ 'Auth' }
                    />
                </label>
            </form>
        </div>
    )
}

export default Authorization