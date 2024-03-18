import React from 'react'
import Link from 'next/link'
import './styles.css'
const Header = () => {
    return (
        <header>
            <Link className={'header-link'} href={ '/' }>Home</Link>
            <Link className={'header-link'} href={ '/pages/blog' }>Blog</Link>
            <Link className={'header-link'} href={ '/pages/about' }>About</Link>
            <Link className={'header-link'} href={ '/pages/posts' }>Posts</Link>
        </header>
    )
}

export default Header