'use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

import HomeContent from '@/components/home/content/HomeContent'

import './styles.css'
export default function Home() {
    return (
        <Provider store={ store }>
            <div className={'home-container'}>
                <HomeContent />
            </div>
        </Provider>
    )
}
