import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finanças EDN - Gestão Inteligente',
  description: 'Aplicação de finanças pessoais com design cyberpunk',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${orbitron.className} bg-gradient-cyber text-cyber-cyan antialiased`}>
        {children}
      </body>
    </html>
  )
}
