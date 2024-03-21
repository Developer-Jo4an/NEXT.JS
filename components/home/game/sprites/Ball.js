import { Sprite } from 'pixi.js'
import { gsap } from 'gsap'

export class Ball extends Sprite {
    constructor(texture) {
        super(texture)
        this.isAnimation = false
        this.interactive = true
        this.buttonMode = true
    }

    animation(area, emitter) {
        if (!this.isAnimation) {
            this.isAnimation = true

            let bounceTimeline = gsap.timeline({
                onComplete: () => {
                    this.isAnimation = false
                    this.emit(emitter)
                }
            })

            const currentState = {
                scaleY: this.scale.y,
                scaleX: this.scale.x,
                y: this.y
            }

            const reductionMultiplier = 0.9
            const magnificationMultiplier = 1.1

            for (let i = 0; i < 12; i++) {
                let bounceHeight = area.height / 2 / (i + 1)
                let bounceDuration = 0.5 / (i + 1)

                bounceTimeline
                .to(this, {
                    y: this.y - bounceHeight,
                    duration: bounceDuration,
                    ease: 'power2.out',
                    onStart: () => {
                        gsap.to(this.scale, {
                            x: currentState.scaleX * reductionMultiplier,
                            y: currentState.scaleY * magnificationMultiplier,
                            duration: bounceDuration * 2
                        })
                    },
                })
                .to(this, {
                    y: this.y + this.height * magnificationMultiplier * 0.1,
                    duration: bounceDuration,
                    ease: 'power2.in',
                    onStart: () => {
                        gsap.to(this.scale, {
                            x: currentState.scaleX * magnificationMultiplier,
                            y: currentState.scaleY * reductionMultiplier,
                            duration: bounceDuration * 2
                        })
                    },
                    onComplete: () => {
                        gsap.to(this.scale, {
                            x: currentState.scaleX,
                            y: currentState.scaleY,
                            duration: 0.1
                        })
                    }
                })
            }
            bounceTimeline.to(this, {
                y: currentState.y,
                duration: 0.1
            })
        }
    }

    static ballFrom(texture, area) {
        const ball = new Ball(texture)
        ball.width = area.width / 15
        ball.height = area.width / 15
        ball.anchor.set(0.5)
        ball.y = (area.height / 2) - ball.width

        return ball
    }
}
