import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Application } from 'pixi.js'
import { selectTodosTodos } from '@/redux/appSlice/appSlice'
import ball from '@/public/assets/ball/ball.png'
import background from '@/public/assets/background/background.png'
import GameController from '@/components/home/game/game-controller'

const GameSpace = () => {
    const todos = useSelector(selectTodosTodos)
    const [droppedTodos, setDroppedTodos] = useState([])

    const dropTodo = useCallback(() => {
        setDroppedTodos(prevTodos => {
            if (prevTodos.length === todos.length) return []

            const getRandomTodo = () => {
                const randomIndex = (Math.random() * (todos.length - 1)).toFixed(0)
                const randomTodo = todos[randomIndex]
                const isHaveTodo = !!prevTodos.find(todo => randomTodo.id === todo.id)

                return [randomTodo, isHaveTodo]
            }

            let trueRandomTodo = false

            while (!trueRandomTodo) {
                const [todo, isHave] = getRandomTodo()

                if (!isHave) trueRandomTodo = todo
            }

            return [...prevTodos, trueRandomTodo]
        })
    }, [])

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

            controller.ball.on(controller.BALL_DROPPED, dropTodo)

        }; activateGame()
    })
    return (
        <div className={'game__space'}>
          <p className={'game__space-textarea'}>{ droppedTodos.at(-1)?.title }</p>
        </div>
    )
}

export default GameSpace