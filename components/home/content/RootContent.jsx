import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodosAction, selectAppLocation } from '@/redux/appSlice/appSlice'
import { PRELOADER_LOCATION, AUTHORIZATION_LOCATION, ERROR_LOCATION, GAME_LOCATION } from '@/constants/locations'
import Preloader from '@/components/home/preloader/Preloader'
import Authorization from '@/components/home/authorization/Authorization'
import Error from '@/components/home/error/Error'
import Game from '@/components/home/game/Game'
import './styles.css'

const RootContent = () => {
    const dispatch = useDispatch()

	const location = useSelector(selectAppLocation)

    const homeComponents = useMemo(() => ({
	    [PRELOADER_LOCATION]: <Preloader />,
		[AUTHORIZATION_LOCATION]: <Authorization />,
		[ERROR_LOCATION]: <Error />,
		[GAME_LOCATION]: <Game />
    }), [])

	useEffect(() => { dispatch(fetchTodosAction()) }, [])

	return (
		<div className={'container'}>
			<div className={'home-content-wrapper'}>
				{ homeComponents[location] }
			</div>
		</div>
	)
}

export default RootContent