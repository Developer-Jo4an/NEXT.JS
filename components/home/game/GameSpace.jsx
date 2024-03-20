import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTodosTodos } from '@/redux/appSlice/appSlice'
import Spinner from '@/components/general/Spinner'

const GameSpace = () => {
    const todos = useSelector(selectTodosTodos)

    const [todoTitle, setTodoTitle] = useState('')
	const [isLoading, setLoading] = useState(true)

    const gameWrapperRef = useRef()

    const randomTodo = useMemo(() => ({
        currentTodo: null,
        todosPool: todos.concat(),
        updateCurrentTodo() {
            if (!this.todosPool.length) this.todosPool = todos.concat()

            this.currentTodo = this.todosPool.splice(Math.floor(Math.random() * this.todosPool.length), 1)[0]

            setTodoTitle(this.currentTodo.title)
        }
    }), [])

    useEffect(() => {
        (async () => {
            const { Application } = await import('pixi.js')
            const { default: GameController } = await import('./game-controller')

	        const controller = new GameController(gameWrapperRef.current, new Application())
			await controller.activateController()

	        controller.ball.on(GameController.BALL_DROPPED, () => randomTodo.updateCurrentTodo())

		    setLoading(false)
        })()
    }, [])

    return (
        <div className={'game__space'} ref={ gameWrapperRef }>
	        {
		        !isLoading ?
		        <p className={'game__space-textarea'}>{ todoTitle }</p>
		        :
		        <Spinner />
	        }
        </div>
    )
}

export default GameSpace