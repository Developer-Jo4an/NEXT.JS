'use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import RootContent from '@/components/home/content/HomeInner'
import '../styles/main/main.css'

export default function Root() {

	return (
        <Provider store={ store }>
            <div className={'home'}>
                <RootContent />
            </div>
        </Provider>
    )
}
