import { memo, useEffect } from 'react'
import { Application } from 'pixi.js'
import ball from '@/public/assets/ball/ball.png'
import background from '@/public/assets/background/background.png'
import GameController from '@/components/home/game/game-controller'

const GameSpace = memo(() => {
    useEffect(() => {
        const app = new Application()
        const assets = [{ alias: 'ball', src: ball }, { alias: 'background', src: background }]
        const container = document.querySelector('.game-space')

        const activateGame = async () => {
            const controller = new GameController(container, assets, app)
            await controller.setupGame()
            await controller.preloadGame()
            controller.installGame()
            controller.addBackground()
            controller.addBall()
            controller.activateBall()
        }; activateGame()
    })
    return <div className={'game-space'}></div>
}, () => true)

export default GameSpace