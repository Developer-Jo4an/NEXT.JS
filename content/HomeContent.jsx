'use client'
import React, { useState } from 'react'

import './styles.css'

const COLUMN_LOCATION = 'column'
const ROW_LOCATION = 'row'
const HomeContent = () => {

    const [location, setLocation] = useState(COLUMN_LOCATION)

    return (
        <div className={'container'}>
            <h1>Location: { location }</h1>
            <div className={`squares-wrapper container-${ location }-mode`}>
                <div className={'square'}></div>
                <div className={'square'}></div>
            </div>
            <button
                className={'toggle-location'}
                onClick={ () => setLocation(prev => prev === COLUMN_LOCATION ? ROW_LOCATION : COLUMN_LOCATION) }
            >{ location }
            </button>
        </div>
    )
}

export default HomeContent