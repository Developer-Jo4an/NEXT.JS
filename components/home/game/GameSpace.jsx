import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Application } from 'pixi.js'
import { selectTodosTodos } from '@/redux/appSlice/appSlice'
import ball from '@/public/assets/ball/ball.png'
import background from '@/public/assets/background/background.png'
import GameController from '@/components/home/game/game-controller'

const GameSpace = () => {
    const todos = useSelector(selectTodosTodos)
    const [todoTitle, setTodoTitle] = useState('')
    const ref = useRef()

    const randomTodo = useMemo(() => ({
        current: null,
        variants: [...todos],
        updateCurrent() {
            if (!this.variants.length) this.variants = [...todos]
            this.current = this.variants.splice(Math.floor(Math.random() * this.variants.length), 1)[0]
            setTodoTitle(this.current.title)
        }
    }), [])

    useEffect(() => {
        const app = new Application()
        const assets = [{ alias: 'ball', src: ball }, { alias: 'background', src: background }]
        const container = ref.current

        ;(async () => {
            const controller = new GameController(container, assets, app)
            await controller.setupGame()
            await controller.preloadGame()
            controller.installGame()
            controller.addBackground()
            controller.addBall()
            controller.activateBall()

            controller.ball.on(controller.BALL_DROPPED, () => randomTodo.updateCurrent())
        })()
    }, [])

    return (
        <div className={'game__space'} ref={ref}>
            <p className={'game__space-textarea'}>{ todoTitle }</p>
        </div>
    )
}

export default GameSpace