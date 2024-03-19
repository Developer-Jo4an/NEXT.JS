import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthAction, resetAppErrorAction, selectAppError } from '@/redux/appSlice/appSlice'
import { PASSWORD, USERNAME } from '@/constants/variables'
import { generalInputSettings, userNameInputSettings } from '@/utils/authorization'
import { CiWarning } from 'react-icons/ci'

const Authorization = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

	const error = useSelector(selectAppError)
	const username = watch(USERNAME)
	const password = watch(PASSWORD)
	const errorGen = inputName =>
		errors?.[inputName] &&
		<>
			<CiWarning />
			{ errors?.[inputName]?.message || `Invalid ${inputName}` }
		</>

	useEffect(() => { if (error?.message) dispatch(resetAppErrorAction()) }, [username, password])

    const onSubmit = data => { dispatch(fetchAuthAction(data)); reset() }

    return (
        <div className={'authorization page'}>
	        <div className={'authorization__inner'}>
		        <h2 className={'authorization__title'}>Authorization</h2>
		        <form
			        onSubmit={handleSubmit(onSubmit)}
			        className={'authorization__form'}
		        >
			        <label className={'authorization__label'}>
				        { USERNAME }:
				        <input
					        type={'text'}
					        { ...register(USERNAME, {...generalInputSettings(USERNAME), ...userNameInputSettings}) }
					        className={'authorization__input'}
				        />
			        </label>
					<p className={'authorization__error'}>{ errorGen(USERNAME) }</p>
			        <label className={'authorization__label'}>
				        { PASSWORD }:
				        <input
					        type={'password'}
					        { ...register(PASSWORD, {...generalInputSettings(PASSWORD)}) }
					        className={'authorization__input'}
				        />
			        </label>
					<p className={'authorization__error'}>{errorGen(PASSWORD)}</p>
						<div className={'authorization__buttons'}>
				        <input
					        type={'submit'}
					        className={'authorization__button button'}
					        value={'Auth'}
				        />
			        </div>
			        {
				        error?.message &&
					    <p className={'authorization__error'}><CiWarning />{error.message}</p>
			        }
					<div>kminchelle</div>
					<div>0lelplR</div>
		        </form>
	        </div>
        </div>
    )
}

export default Authorization