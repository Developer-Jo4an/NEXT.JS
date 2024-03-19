import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthAction, resetAppErrorAction, selectAppError } from '@/redux/appSlice/appSlice'
import { PASSWORD, USERNAME } from '@/constants/variables'
import { generalInputSettings, userNameInputSettings } from '@/utils/authorization'
import { CiWarning } from 'react-icons/ci'
import './styles.css'

const Authorization = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

	const error = useSelector(selectAppError)
	const username = watch(USERNAME)
	const password = watch(PASSWORD)
	const errorGen = inputName =>
		errors?.[inputName] &&
		<p className={'authorization-error-info'}>
			<CiWarning />
			{ errors?.[inputName]?.message || `Invalid ${inputName}` }
		</p>

	useEffect(() => { if (error?.message) dispatch(resetAppErrorAction()) }, [username, password])

    const onSubmit = data => { dispatch(fetchAuthAction(data)); reset() }

    return (
        <div className={'authorization-container'}>
	        <div className={'authorization-wrapper'}>
		        <h2 className={'authorization-header'}>Authorization</h2>
		        <form
			        onSubmit={handleSubmit(onSubmit)}
			        className={'authorization-form'}
		        >
			        <label className={'authorization-form-label'}>
				        { USERNAME }:
				        <input
					        type={'text'}
					        { ...register(USERNAME, {...generalInputSettings(USERNAME), ...userNameInputSettings}) }
					        className={'authorization-form-input'}
				        />
			        </label>
			        <div className={'authorization-error'}>{errorGen(USERNAME)}</div>
			        <label className={'authorization-form-label'}>
				        { PASSWORD }:
				        <input
					        type={'password'}
					        { ...register(PASSWORD, {...generalInputSettings(PASSWORD)}) }
					        className={'authorization-form-input'}
				        />
			        </label>
			        <div className={'authorization-error'}>{ errorGen(PASSWORD) }</div>
			        <div className={'authorization-form-buttons'}>
				        <input
					        type={'submit'}
					        className={'authorization-form-submit-btn'}
					        value={'Auth'}
				        />
			        </div>
			        {
				        error?.message &&
					    <p className={'authorization-error-info'}><CiWarning />{error.message}</p>
			        }
		        </form>
	        </div>
        </div>
    )
}

export default Authorization