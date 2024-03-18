import { memo } from 'react'

import './styles.css'

const Navigation = memo(({ components, setLocation }) => {

    return (
        <nav className={'navigation'}>
            <ul className={'navigation-list'}>
                { components.map(({ route }) => {
                    return <li
                        key={ route }
                        className={'navigation-item'}
                        onClick={ () => setLocation(route) }
                    >{ route }</li>
                }) }
            </ul>
        </nav>
    )
})

export default Navigation