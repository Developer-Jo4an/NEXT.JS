'use client'
import { useRef } from 'react'
import './styles.css'

export default function Posts() {

    const inputRef = useRef()

    return (
        <div className={'page-container'}>
            <div className={'post-wrapper'}>
                <input type="text" className={'posts-input'}/>
                <button ref={ inputRef } className={'post-btn'}>GO!</button>
            </div>
        </div>
    )
}

