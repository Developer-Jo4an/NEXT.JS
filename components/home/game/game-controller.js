import { Assets, Container, Sprite } from 'pixi.js'
import ball from '../../../public/assets/ball/ball.png'
import back from '../../../public/assets/background/background.png'
import { Ball } from '@/components/home/game/sprites/Ball'

export default class GameController {
	static BALL_DROPPED = 'ball-dropped'

	constructor(container = null, app = null) {
		if (!GameController.instance) GameController.instance = this

		this.resizeApp = this.resizeApp.bind(this)
		this.ballEventClick = this.ballEventClick.bind(this)

		this.app = app
		this.$container = container
		this.gameArea = null
		this.ball = null
	}

	async activateController() {
		await this.app.init({ width: this.$container.offsetWidth, height: this.$container.offsetHeight })
		await this.addGameArea()
		await this.addBall()

		this.attach()

		this.$container.insertBefore(this.app.canvas, this.$container.firstElementChild)
	}

	async addGameArea() {
		const texture = await Assets.load(back)
		const background = new Sprite(texture)

		background.anchor.set(0.5)
		background.width = +this.$container.offsetWidth
		background.height = +this.$container.offsetHeight

		this.gameArea = new Container()

		this.gameArea.x = this.$container.offsetWidth / 2
		this.gameArea.y = this.$container.offsetHeight / 2
		this.gameArea.ratio = background.width / background.height

		this.gameArea.addChild(background)
		this.app.stage.addChild(this.gameArea)
	}

	async addBall() {
		const texture = await Assets.load(ball)
		this.ball = Ball.ballFrom(texture, this.gameArea)

		this.gameArea.addChild(this.ball)
	}

	ballEventClick() { this.ball.animation(this.gameArea, GameController.BALL_DROPPED) }

	resizeApp() {
		const width = +this.$container.offsetWidth
		const height = +this.$container.offsetHeight
		const areaWidth = this.gameArea.width
		const areaHeight = this.gameArea.height

		this.app.renderer.resize(width, height)

		if (width < areaWidth) {
			this.gameArea.width = width
			this.gameArea.height = width / this.gameArea.ratio
		}

		if (height < areaHeight) {
			this.gameArea.height = height
			this.gameArea.width = height * this.gameArea.ratio
		}

		if (width > areaWidth && (height > areaHeight)) {
			this.gameArea.width = width
			this.gameArea.height = width / this.gameArea.ratio
		}

		if (height > areaHeight && (width > areaWidth)) {
			this.gameArea.height = height
			this.gameArea.width = height * this.gameArea.ratio
		}

		this.gameArea.x = 0.5 * (width - this.gameArea.width) + (this.gameArea.width / 2)
		this.gameArea.y = 0.5 * (height - this.gameArea.height) + (this.gameArea.height / 2)
	}

	attach() {
		this.ball.on('click', this.ballEventClick)
		window.addEventListener('resize', this.resizeApp)
	}
}

