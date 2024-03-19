import { Assets, Sprite } from 'pixi.js'
import { gsap } from 'gsap'

export default class GameController {
    BALL = 'ball'
    BACKGROUND = 'background'
    BALL_DROPPED = 'ball-dropped'
    constructor(container = null, assets = null, app = null) {
        this.$container = container
        this.assets = assets
        this.app = app
        this.ball = null
        this.ballEventClick = this.ballEventClick.bind(this)
        this.ballAnimation = false
    }

    addApp(app) { this.app = app }
    deleteApp() { this.app = null }
    addContainer(container) { this.container = container }
    deleteContainer() { this.container = null }
    addAssets(assets) { this.assets = assets }
    deleteAssets() { this.assets = null }

    async setupGame() {
        if (!this.app) return

        await this.app.init({
            width: 500,
            height: 281
        })
    }

    installGame() {
        if (!this.app || this.$container.children.length === 2) return
        this.$container.insertBefore(this.app.canvas, this.$container.firstElementChild)
    }

    async preloadGame() {
        if (!this.assets) return
        await Assets.load(this.assets)
    }

    addBall() {
        if (!this.app || !Assets.resolver._assetMap[this.BALL]) return

        this.ball = Sprite.from(this.BALL)

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
        if (!this.ballAnimation) {
            this.ballAnimation = true
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
                this.ball.emit(this.BALL_DROPPED)
                this.ballAnimation = false
            })
        }

    }

    activateBall() {
        if (!this.app || !Assets.resolver._assetMap[this.BALL]) return

        this.ball.on('click', this.ballEventClick)
    }

    deactivateBall() {
        if (!this.app || !Assets.resolver._assetMap[this.BALL]) return

        this.ball.off('click', this.ballEventClick)
    }

    addBackground() {
        if (!this.app || !Assets.resolver._assetMap[this.BACKGROUND]) return

        const background = Sprite.from(this.BACKGROUND)

        background.width = this.app.screen.width
        background.height = this.app.screen.height

        this.app.stage.addChild(background)
    }
}

