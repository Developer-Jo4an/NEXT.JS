import { Sprite } from 'pixi.js'
import { gsap } from 'gsap'

export class Ball extends Sprite {
    constructor(texture, area, emitter) {
        super(texture)
        this.area = area
        this.emitter = emitter
        this.isAnimation = false
        this.interactive = true
        this.buttonMode = true

        this.width = 50
        this.height = 50
        this.anchor.set(0.5)
        this.on('click', this.animation)
        this.x = this.area.width * 0.5
        this.y = this.area.height - 50
    }

    animation() {
        if (this.isAnimation) return true

        this.isAnimation = true

        const animation = gsap.timeline({
            onComplete: () => {
                this.isAnimation = false
                this.emit(this.emitter)
            }
        })

        animation
        .to(this, {
            y: this.y - 300,
            ease: 'power.out',
            duration: 0.5,
            onStart: () => {
                gsap.to(this.scale, {
                    y: this.scale.y * 1.1,
                    x: this.scale.x * 0.9
                })
            },
        })
        .to(this, {
            y: this.y,
            ease: 'bounce.out',
            duration: 1,
            onStart: () => {
                gsap.to(this.scale, {
                    y: this.scale.y * 0.9,
                    x: this.scale.x * 1.1
                })
            },
        }).to(this.scale, {
            y: this.scale.y,
            x: this.scale.x
        })
    }
}
