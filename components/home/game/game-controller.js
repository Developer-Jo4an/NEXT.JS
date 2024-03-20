import { Assets, Container, Sprite } from 'pixi.js'
import { gsap } from 'gsap'
import ball from '@/public/assets/ball/ball.png'
import background from '@/public/assets/background/background.png'

export default class GameController {
    static BALL = 'ball'
    static BACKGROUND = 'background'
    static BALL_DROPPED = 'ball-dropped'

    constructor(container = null, app = null) {
	    this.ballEventClick = this.ballEventClick.bind(this)
		this.moveGameArea = this.moveGameArea.bind(this)

        this.app = app
		this.$container = container
		this.gameArea = null
	    this.ball = null
    }

	async activateController() {
		if (!this.app || this.$container.children.length === 2) return
		const assetsArray = [{ alias: 'ball', src: ball }, { alias: 'background', src: background } ]

		await Promise.all([this.app.init({ resizeTo: window }), Assets.load(assetsArray)])

		this.addGameArea()
		this.addBackground()
		this.addBall()
		this.activateBall()
		this.windowResize()
		this.moveGameArea()

		this.$container.insertBefore(this.app.canvas, this.$container.firstElementChild)
	}

	addGameArea() {
		this.gameArea = new Container()

		this.app.stage.addChild(this.gameArea)
	}

	addBackground() {
		const background = Sprite.from(GameController.BACKGROUND)

		background.width = 1000
		background.height = 600

		this.gameArea.addChild(background)
	}

    addBall() {
	    this.ball = Sprite.from(GameController.BALL)

	    this.ball.isAnimation = false

	    this.ball.anchor.set(0.5)

	    this.ball.width = 50
	    this.ball.height = 50

	    this.ball.x = this.gameArea.width / 2
	    this.ball.y = this.gameArea.height - 50

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


		    for (let i = 0; i < 12; i++) {
			    let bounceHeight = this.app.screen.height / 2 / (i + 1)
			    let bounceDuration = 0.5 / (i + 1)

			    bounceTimeline
				.to(this.ball, {
				    y: this.ball.y - bounceHeight,
				    duration: bounceDuration,
				    ease: 'power2.out',
					onStart: () => {
						gsap.to(this.ball.scale, { x: 0.9, y: 1.1, duration: bounceDuration })
					},
			    })
			    .to(this.ball, {
				    y: this.ball.y,
				    duration: bounceDuration,
				    ease: 'power2.in',
					onStart: () => {
						gsap.to(this.ball.scale, { x: 1.1, y: 0.9, duration: bounceDuration })
					},
				    onComplete: () => {
					    gsap.to(this.ball.scale, { x: 1, y: 1, duration: 0.1 })
				    }
			    })
		    }
	    }

    }

	activateBall() {
	    this.ball.on('click', this.ballEventClick)
    }

	moveGameArea() {
		this.gameArea.pivot.x = this.gameArea.width / 2
		this.gameArea.pivot.y = this.gameArea.height / 2

		this.gameArea.x = window.innerWidth / 2
		this.gameArea.y = window.innerHeight / 2
	}

	windowResize() {
		window.addEventListener('resize', this.moveGameArea)
	}
}

