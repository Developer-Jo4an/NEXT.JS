import { useSelector } from 'react-redux'
import { selectAppError } from '@/redux/appSlice/appSlice'
import { IoReload } from 'react-icons/io5'

const Error = () => {
	const error = useSelector(selectAppError)

	return (
		<div className={'error page'}>
			<div className={'error__inner'}>
				<div className={'error__name'}>{ error?.name }</div>
				<div className={'error__message'}>{ error?.message }</div>
			</div>
			<button
				className={'error__button button'}
				onClick={ () => window.location.reload() }
			>Reload <IoReload /></button>
		</div>
	)
}

export default Error