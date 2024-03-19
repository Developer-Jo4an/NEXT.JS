import { lazy } from 'react'
const GameSpace = lazy(() => import('./GameSpace'))

const Game = () => {
	return (
		<div className={'game page'}>
			<GameSpace />
		</div>
	)
}

export default Game