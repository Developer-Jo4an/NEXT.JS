import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodosAction, resetErrorTodosAction, selectTodosState } from '@/redux/todosSlice/todosSlice'
import { useRouter } from 'next/navigation'

import Preloader from '@/components/home/preloader/Preloader'
import Authorization from '@/components/home/authorization/Authorization'

import './styles.css'

const HomeContent = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const { isLoading, error, todos } = useSelector(selectTodosState)

    useEffect(() => {
        dispatch(fetchTodosAction())
    }, [])

    if (error) {
        console.log(error)
        router.push('/pages/error')
        dispatch(resetErrorTodosAction())
    }


    return (
        <div className={'container'}>
            <div className={'home-content-wrapper'}>
                {
                    isLoading ?
                    <Preloader />
                    :
                    <Authorization />
                }
            </div>
        </div>
    )
}

export default HomeContent