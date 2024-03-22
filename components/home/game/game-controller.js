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

		this.toCenterStage()
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

    toCenterStage() {
        this.app.stage.position.set(
            0.5 * (this.app.screen.width - this.app.stage.width),
            0.5 * (this.app.screen.height - this.app.stage.height)
        )
    }

    resizeHandler() {
        window.addEventListener('resize',  function () {
            const newWidth = this.$container.offsetWidth
            const newHeight = this.$container.offsetHeight
            const prevWidth = this.app.stage.width
            const prevHeight = this.app.stage.height

            this.app.renderer.resize(newWidth, newHeight)

            const multiplier = Math.min(newWidth / prevWidth, newHeight / prevHeight)

            this.app.stage.scale.set(multiplier * this.app.stage.scale.x)

            this.toCenterStage()
        }.bind(this))
    }
}

