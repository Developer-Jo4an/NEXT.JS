'use client'
import React, { useMemo, useState } from 'react'

import Preloader from '@/components/home/preloader/Preloader'
import Authorization from '@/components/home/authorization/Authorization'
import Navigation from '@/components/home/navigation/Navigation'

import './styles.css'

const PRELOADER_ROUTE = 'preloader'
const AUTHORIZATION_ROUTE = 'authorization'

const HomeContent = () => {

    const [location, setLocation] = useState(PRELOADER_ROUTE)

    const homeComponents = useMemo(() =>[
        { route: PRELOADER_ROUTE, component: <Preloader /> },
        { route: AUTHORIZATION_ROUTE, component: <Authorization /> },
    ], [])

    return (
        <div className={'container'}>
            <div className={'home-content-wrapper'}>
                { homeComponents.find(({ route, component }) => route === location).component }
            </div>
            <Navigation components={ homeComponents } setLocation={ setLocation } />
        </div>
    )
}

export default HomeContent