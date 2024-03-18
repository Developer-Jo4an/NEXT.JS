import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodosAction, selectTodosState } from '@/redux/appSlice/appSlice'
import { AUTHORIZATION_LOCATION, PRELOADER_LOCATION } from '@/constants/variables'
import Navigation from '@/components/home/navigation/Navigation'
import Preloader from '@/components/home/preloader/Preloader'
import Authorization from '@/components/home/authorization/Authorization'
import './styles.css'

const HomeContent = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(selectTodosState)

    const [location, setLocation] = useState(PRELOADER_LOCATION)

    const homeComponents = useMemo(() => [
        { route: PRELOADER_LOCATION, component: <Preloader /> },
        { route: AUTHORIZATION_LOCATION, component: <Authorization /> }
    ], [])

    useEffect(() => {
        if (location === PRELOADER_LOCATION)
            dispatch(fetchTodosAction()) },
        [location]
    )

    useEffect(() => {
        if (!isLoading) setLocation(AUTHORIZATION_LOCATION) },
        [isLoading]
    )

    return (
        <div className={'container'}>
            <div className={'home-content-wrapper'}>
                { homeComponents.find(({ route, component }) => route === location).component }
            </div>
            <Navigation setLocation={ setLocation } components={ homeComponents } />
        </div>
    )
}

export default HomeContent