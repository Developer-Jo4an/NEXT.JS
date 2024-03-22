import { Assets, Sprite } from 'pixi.js'
import ball from '../../../public/assets/ball/ball.png'
import back from '../../../public/assets/background/background.png'
import { Ball } from '@/components/home/game/sprites/Ball'

export default class GameController {
	static BALL_DROPPED = 'ball-dropped'

	constructor(container = null, app = null) {
		if (!GameController.instance) GameController.instance = this

		this.app = app
		this.$container = container
		this.ball = null
	}

	async activateController() {
		await this.app.init({
			width: this.$container.offsetWidth,
			height: this.$container.offsetHeight
		})
		await this.addGameArea()
		await this.addBall()
		this.resizeHandler()

		this.$container.appendChild(this.app.canvas)
	}

	async addGameArea() {
		const texture = await Assets.load(back)
		const background = new Sprite(texture)

		background.width = +this.$container.offsetWidth
		background.height = +this.$container.offsetHeight

		this.app.stage.addChild(background)

		const sizes = {
			appWidth: this.app.screen.width,
			appHeight: this.app.screen.height,
			stageWidth: this.app.stage.width,
			stageHeight: this.app.stage.height,
		}

		this.app.stage.x = 0.5 * (sizes.appWidth - sizes.stageWidth)
		this.app.stage.y = 0.5 * (sizes.appHeight - sizes.stageHeight)
	}

	async addBall() {
		const texture = await Assets.load(ball)

		const animationBall = new Ball(
			texture,
			this.app.stage,
			GameController.BALL_DROPPED
		)

		this.app.stage.addChild(this.ball = animationBall)
	}
	resizeHandler() { window.addEventListener('resize',  function () {
		const width = +this.$container.offsetWidth
		const height = +this.$container.offsetHeight
		const areaWidth = this.app.screen.width
		const areaHeight = this.app.screen.height

		this.app.renderer.resize(width, height)

		const multiplier = Math.min(areaWidth / width, areaHeight / height)

		this.app.stage.scale.set(this.app.stage.scale.x * multiplier, this.app.stage.scale.y * multiplier)

	}.bind(this)) }
}

