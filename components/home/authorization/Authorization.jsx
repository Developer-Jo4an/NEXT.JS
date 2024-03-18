import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fetchAuthAction } from '@/redux/appSlice/appSlice'
import { PASSWORD, USERNAME } from '@/constants/variables'
import { generalInputSettings, userNameInputSettings } from '@/utils/authorization'
import './styles.css'

const Authorization = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const errorGen = inputName =>
        errors?.[inputName] &&
        <p className={'auth-errors-info'}>
            { errors?.[inputName]?.message || `Invalid ${inputName}` }
        </p>


    const onSubmit = data => { dispatch(fetchAuthAction(data)); reset() }

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