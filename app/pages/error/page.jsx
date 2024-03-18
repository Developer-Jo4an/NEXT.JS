import React from 'react'

import './styles.css'
import Link from 'next/link'
const Error = () => {
    return (
        <div className={'error-page'}>
            <div className={'error-wrapper'}>
                <div className={'error-name'}>Error:</div>
                <div className={'error-message'}>Some error occurred</div>
            </div>
        </div>
    )
}

export default Error