import { Stage, Container, Sprite, Text } from '@pixi/react'
import './styles.css'

const Game = () => {


	return (
		<div className={'game-container'}>
			<Stage>
				<Sprite
					image={ '@/assets/bunny/bunny.png' }
					x={ 400 }
					y={ 270 }
					anchor={{ x: 0.5, y: 0.5 }}
				/>

				<Container x={ 400 } y={ 330 }>
					<Text text={'Hello World'} anchor={{ x: 0.5, y: 0.5 }} />
				</Container>
			</Stage>
		</div>
	)
}

export default Game