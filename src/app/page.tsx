'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-cyber flex flex-col items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyber-purple rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyber-cyan rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-6xl md:text-7xl font-black mb-4 glow-text">
          FINANÇAS
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink">
            EDN
          </span>
        </h1>

        <p className="text-cyber-cyan text-xl md:text-2xl mb-8 opacity-80">
          Gestão inteligente de finanças pessoais • Design Cyberpunk Futurístico
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="btn-cyber text-white"
          >
            Entrar no Sistema
          </Link>
          <Link
            href="/register"
            className="btn-cyber text-white border-2 border-cyber-cyan bg-transparent hover:bg-cyber-dark"
          >
            Criar Conta
          </Link>
          <Link
            href="/settings"
            className="btn-cyber text-white border-2 border-cyber-green bg-transparent hover:bg-cyber-dark absolute top-8 right-8"
            title="Configurações e Testes"
          >
            ⚙️ Config
          </Link>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
          {[
            { icon: '💰', label: 'Salário' },
            { icon: '🏠', label: 'Despesas' },
            { icon: '💳', label: 'Cartões' },
            { icon: '🏦', label: 'Contas' },
            { icon: '📈', label: 'Investimentos' },
            { icon: '👥', label: 'Multi-usuário' },
          ].map((feature) => (
            <div key={feature.label} className="glass-panel p-4">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <p className="text-sm text-cyber-cyan">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-cyber-cyan opacity-50 text-sm">
        <p>© 2024 Finanças EDN | Sistema Seguro de Finanças Pessoais</p>
      </footer>
    </main>
  )
}
