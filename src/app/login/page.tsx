'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { useAuthStore } from '@/store/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/auth/login', { email, password })
      const { user, token } = response.data
      setUser(user, token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-cyber flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-purple rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-panel p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-black mb-2 glow-text text-center">
            ACESSO
          </h1>
          <p className="text-cyber-cyan opacity-60 text-center mb-8">Sistema Financeiro Seguro</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cyber-cyan text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                className="input-cyber w-full"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-cyber-cyan text-sm font-bold mb-2">Senha</label>
              <input
                type="password"
                className="input-cyber w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="glass-panel p-4 border-cyber-pink border-2">
                <p className="text-cyber-pink text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-cyber w-full text-white disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Acessar Sistema'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-cyber-cyan opacity-60">Novo no sistema?</p>
            <Link href="/register" className="text-cyber-purple hover:text-cyber-pink font-bold">
              Criar conta agora
            </Link>
          </div>

          <div className="neon-divider"></div>
          <Link href="/" className="block text-center text-cyber-cyan opacity-60 hover:opacity-100 transition">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  )
}
