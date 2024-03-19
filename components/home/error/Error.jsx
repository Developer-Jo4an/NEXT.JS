import { useDispatch, useSelector } from 'react-redux'
import { resetAppErrorAction, selectAppError } from '@/redux/appSlice/appSlice'
import { IoReload } from 'react-icons/io5'
import './styles.css'

const Error = () => {
	const dispatch = useDispatch()

	const error = useSelector(selectAppError)

	return (
		<div className={'error-container'}>
			<div className={'error-wrapper'}>
				<div className={'error-name'}>{ error?.name }</div>
				<div className={'error-message'}>{ error?.message }</div>
			</div>
			<button
				className={'error-button'}
				onClick={ () => window.location.reload() }
			>Reload <IoReload /></button>
		</div>
	)
}

export default Error