import { Inter } from 'next/font/google'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

import '../styles/zeroing.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js',
  description: 'Next Js course',
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={ inter.className }>
                <Header/>
                <main>
                    { children }
                </main>
                <Footer/>
            </body>
        </html>
    )
}
