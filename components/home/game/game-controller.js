import { Assets, Container, Sprite } from 'pixi.js'
import { gsap } from 'gsap'
import ball from '@/public/assets/ball/ball.png'
import background from '@/public/assets/background/background.png'

export default class GameController {
    static BALL = 'ball'
    static BACKGROUND = 'background'
    static BALL_DROPPED = 'ball-dropped'

    constructor(container = null, app = null) {
		if (!GameController.instance) GameController.instance = this

		this.resizeApp = this.resizeApp.bind(this)
	    this.ballEventClick = this.ballEventClick.bind(this)

        this.app = app
		this.$container = container
		this.gameArea = null
		this.background = null
	    this.ball = null
    }

	async activateController() {
		if (!this.app || this.$container.children.length === 2) return
		const assetsArray = [{ alias: 'ball', src: ball }, { alias: 'background', src: background } ]

		await Promise.all([this.app.init({ width: this.$container.offsetWidth, height: this.$container.offsetHeight }), Assets.load(assetsArray)])

		this.addGameArea()
		this.addBackground()
		this.addBall()
		this.attach()

		this.$container.insertBefore(this.app.canvas, this.$container.firstElementChild)
	}

	addGameArea() {
		this.gameArea = new Container()

		this.gameArea.x = (this.app.screen.width - this.gameArea.width) / 2
		this.gameArea.y = (this.app.screen.height - this.gameArea.height) / 2

		this.app.stage.addChild(this.gameArea)
	}

	addBackground() {
		const background = Sprite.from(GameController.BACKGROUND)

		background.anchor.set(0.5)

		background.width = +this.$container.offsetWidth
		background.height = +this.$container.offsetHeight
		background.ratio = background.width / background.height

		this.background = background

		this.gameArea.addChild(background)
	}

    addBall() {
	    this.ball = Sprite.from(GameController.BALL)

	    this.ball.isAnimation = false

	    this.ball.anchor.set(0.5)

	    this.ball.width = this.gameArea.width / 15
	    this.ball.height = this.gameArea.width / 15

		this.ball.y = (this.gameArea.height / 2) - this.ball.width

	    this.ball.interactive = true
	    this.ball.buttonMode = true

        this.gameArea.addChild(this.ball)
    }

    ballEventClick() {
	    if (!this.ball.isAnimation) {
		    this.ball.isAnimation = true

		    let bounceTimeline = gsap.timeline({
			    onComplete: () => {
				    this.ball.isAnimation = false
				    this.ball.emit(GameController.BALL_DROPPED)
			    }
		    })

			const currentState = {
				scaleY: this.ball.scale.y,
				scaleX: this.ball.scale.x,
				y: this.ball.y
			}

		    for (let i = 0; i < 12; i++) {
			    let bounceHeight = this.gameArea.height / 2 / (i + 1)
			    let bounceDuration = 0.5 / (i + 1)

			    bounceTimeline
				.to(this.ball, {
				    y: this.ball.y - bounceHeight,
				    duration: bounceDuration,
				    ease: 'power2.out',
					onStart: () => {
						gsap.to(this.ball.scale, { x: currentState.scaleX * 0.9, y: currentState.scaleY * 1.1, duration: bounceDuration })
					},
			    })
			    .to(this.ball, {
				    y: this.ball.y + this.ball.height * 0.11,
				    duration: bounceDuration,
				    ease: 'power2.in',
					onStart: () => {
						gsap.to(this.ball.scale, { x: currentState.scaleX * 1.1, y: currentState.scaleY * 0.9, duration: bounceDuration })
					},
				    onComplete: () => {
					    gsap.to(this.ball.scale, { x: currentState.scaleX, y: currentState.scaleY, duration: 0.1 })
				    }
			    })
		    }
			bounceTimeline.to(this.ball, { y: currentState.y, duration: 0.1 })
	    }

    }

	resizeApp() {
		const width = +this.$container.offsetWidth
		const height = +this.$container.offsetHeight

		this.app.renderer.resize(width, height)


		if (width < this.gameArea.width) {
			this.gameArea.width = width
			this.gameArea.height = width / this.background.ratio
		}

		if (height < this.gameArea.height) {
			this.gameArea.height = height
			this.gameArea.width = height * this.background.ratio
		}

		if (width > this.gameArea.width && (height > this.gameArea.height)) {
			this.gameArea.width = width
			this.gameArea.height = width / this.background.ratio
		}

		if (height > this.gameArea.height && (width > this.gameArea.width)) {
			this.gameArea.height = height
			this.gameArea.width = height * this.background.ratio
		}

		this.gameArea.x = 0.5 * (width - this.gameArea.width) + (this.gameArea.width / 2)
		this.gameArea.y = 0.5 * (height - this.gameArea.height) + (this.gameArea.height / 2)

		this.ball.width = this.gameArea.width < 1500 ? 100 : this.gameArea.width / 15
		this.ball.height = this.gameArea.width < 1500 ? 100 : this.gameArea.width / 15
	}

	attach() {
	    this.ball.on('click', this.ballEventClick)
		window.addEventListener('resize', this.resizeApp)
	}
}

