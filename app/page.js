'use client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import RootContent from '@/components/home/content/RootContent'
import './styles.css'

export default function Root() {

	return (
        <Provider store={ store }>
            <div className={'home-container'}>
                <RootContent />
            </div>
        </Provider>
    )
}
