import { Inter } from 'next/font/google'

import '../styles/zeroing/zeroing.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js',
  description: 'Next Js Course',
}

export default function RootLayout({ children }) {
	return (
        <html lang='en'>
            <body className={ inter.className }>
                <main>
                    { children }
                </main>
            </body>
        </html>
    )
}
