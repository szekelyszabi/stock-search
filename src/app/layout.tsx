import Providers from './providers'
import type { Metadata } from 'next'
import './globals.css'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Stock Search',
  description: 'Real-time stock search and analysis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
