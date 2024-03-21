import { Assets, Container, Sprite } from 'pixi.js'
import ball from '../../../public/assets/ball/ball.png'
import back from '../../../public/assets/background/background.png'
import { Ball } from '@/components/home/game/sprites/Ball'

export default class GameController {
	static BALL_DROPPED = 'ball-dropped'

	constructor(container = null, app = null) {
		if (!GameController.instance) GameController.instance = this

		this.app = app
		this.$container = container
		this.gameArea = null
		this.ball = null
	}

	async activateController() {
		await this.app.init({ width: this.$container.offsetWidth, height: this.$container.offsetHeight })
		await this.addGameArea()
		await this.addBall()
		this.resizeHandler()

		this.$container.appendChild(this.app.canvas)
	}

	async addGameArea() {
		const texture = await Assets.load(back)
		const background = new Sprite(texture)

		background.anchor.set(0.5)
		background.width = +this.$container.offsetWidth
		background.height = +this.$container.offsetHeight

		const gameArea = new Container()

		gameArea.x = this.$container.offsetWidth / 2
		gameArea.y = this.$container.offsetHeight / 2
		gameArea.ratio = background.width / background.height

		gameArea.addChild(background)

		this.app.stage.addChild(this.gameArea = gameArea)
	}

	async addBall() {
		const texture = await Assets.load(ball)

		const ballSize = this.gameArea.width / 15

		const animationBall = Ball.ballFrom(
			texture,
			this.gameArea,
			GameController.BALL_DROPPED,
			{
				width: ballSize,
				height: ballSize,
			}
		)

		this.gameArea.addChild(this.ball = animationBall)
	}
	resizeHandler() { window.addEventListener('resize',  function () {
		const width = +this.$container.offsetWidth
		const height = +this.$container.offsetHeight
		const areaWidth = this.gameArea.width
		const areaHeight = this.gameArea.height

		this.app.renderer.resize(width, height)

		if (width < areaWidth || height > areaHeight) {
			this.gameArea.width = width
			this.gameArea.height = width / this.gameArea.ratio
		}

		if (height < areaHeight || width > areaWidth) {
			this.gameArea.height = height
			this.gameArea.width = height * this.gameArea.ratio
		}

		this.gameArea.x = 0.5 * (width - this.gameArea.width) + (this.gameArea.width / 2)
		this.gameArea.y = 0.5 * (height - this.gameArea.height) + (this.gameArea.height / 2)
	}.bind(this)) }
}

