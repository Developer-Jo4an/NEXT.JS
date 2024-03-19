import { Assets, Sprite } from 'pixi.js'
import { gsap } from 'gsap'
import ball from '@/public/assets/ball/ball.png'
import background from '@/public/assets/background/background.png'

export default class GameController {
    static BALL = 'ball'
    static BACKGROUND = 'background'
    static BALL_DROPPED = 'ball-dropped'

    constructor(container = null, app = null) {
	    this.ballEventClick = this.ballEventClick.bind(this)

        this.$container = container
        this.app = app
	    this.ball = null
    }

	async activateController() {
		if (!this.app || this.$container.children.length === 2) return
		const assetsArray = [{ alias: 'ball', src: ball }, { alias: 'background', src: background } ]

		await Promise.all([this.app.init(), Assets.load(assetsArray)])

		this.$container.insertBefore(this.app.canvas, this.$container.firstElementChild)

		this.addBackground()
		this.addBall()
		this.activateBall()
	}

	addBackground() {
		const background = Sprite.from(GameController.BACKGROUND)

		background.width = this.app.screen.width
		background.height = this.app.screen.height

		this.app.stage.addChild(background)
	}

    addBall() {
	    this.ball = Sprite.from(GameController.BALL)

	    this.ball.isAnimation = false

	    this.ball.anchor.set(0.5)

	    this.ball.width = this.app.screen.width * 0.1
	    this.ball.height = this.app.screen.width * 0.1

	    this.ball.x = this.app.screen.width / 2
	    this.ball.y = this.app.screen.height * 0.9

	    this.ball.interactive = true
	    this.ball.buttonMode = true

        this.app.stage.addChild(this.ball)
    }

    ballEventClick() {
        if (!this.ball.isAnimation) {
	        this.ball.isAnimation = true
            gsap.to(
	            this.ball,
                {
                    y: this.ball.y - this.app.screen.height / 2,
                    duration: 0.5,
                    ease: 'power2.out'
                }
            )
            .yoyo(true)
            .repeat(1)
            .then(() => {
	            this.ball.isAnimation = false
	            this.ball.emit(GameController.BALL_DROPPED)
            })
        }
    }

    activateBall() {
	    this.ball.on('click', this.ballEventClick)
    }
}

