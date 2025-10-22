import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Inter } from 'next/font/google'
import { MovieProvider } from '@/components/MovieProvider'
import { WalletProvider } from '@/components/WalletProvider'

const inter = Inter({ subsets: ["latin"], display: 'swap' })

export const metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <WalletProvider>
          <MovieProvider>
            {children}
          </MovieProvider>
        </WalletProvider>
        <Analytics />
      </body>
    </html>
  )
}
