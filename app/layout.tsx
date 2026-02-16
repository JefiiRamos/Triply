import type { Metadata, Viewport } from 'next'
import { Inter, DM_Sans } from 'next/font/google'

import appIcon from '@/lib/images/plann.er-mini.png'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  title: 'Plann.er - Descubra voos e hoteis pelo melhor preco',
  description:
    'Compare precos de voos e hoteis e encontre sua proxima viagem pagando menos. Busque as melhores ofertas em tempo real.',
  icons: {
    icon: [
      { url: appIcon.src, type: 'image/png', sizes: '32x32' },
      { url: appIcon.src, type: 'image/png', sizes: '16x16' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
