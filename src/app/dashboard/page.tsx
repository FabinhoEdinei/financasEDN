'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, initAuthFromStorage } from '@/store/auth'
import axios from 'axios'
import Link from 'next/link'

interface Stats {
  totalIncome: number
  totalExpenses: number
  balance: number
  totalInvestments: number
}

export default function DashboardPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const [stats, setStats] = useState<Stats>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    totalInvestments: 0,
  })
  const [accounts, setAccounts] = useState<any[]>([])
  const [investments, setInvestments] = useState<any[]>([])

  useEffect(() => {
    initAuthFromStorage()
    if (!token) {
      router.push('/login')
      return
    }
    loadData()
  }, [token])

  const loadData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      
      const [accountsRes, investmentsRes, transactionsRes] = await Promise.all([
        axios.get('/api/accounts', { headers }),
        axios.get('/api/investments', { headers }),
        axios.get('/api/transactions', { headers }),
      ])

      setAccounts(accountsRes.data)
      setInvestments(investmentsRes.data)

      const transactions = transactionsRes.data
      let totalIncome = 0
      let totalExpenses = 0

      transactions.forEach((t: any) => {
        if (t.type === 'salary') totalIncome += t.amount
        else totalExpenses += t.amount
      })

      const totalAccountBalance = accountsRes.data.reduce((sum: number, acc: any) => sum + acc.balance, 0)
      const totalInvestmentsValue = investmentsRes.data.reduce((sum: number, inv: any) => sum + inv.currentValue, 0)

      setStats({
        totalIncome,
        totalExpenses,
        balance: totalAccountBalance,
        totalInvestments: totalInvestmentsValue,
      })
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-cyber p-4 md:p-8">
      {/* Header */}
      <header className="glass-panel p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-black glow-text">
            FINANÇAS <span className="text-cyber-purple">EDN</span>
          </h1>
          <p className="text-cyber-cyan opacity-60">Bem-vindo, {user.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="btn-cyber text-white text-sm"
        >
          Sair
        </button>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Stats Cards */}
        <div className="card-cyber">
          <p className="text-cyber-cyan opacity-60 text-sm mb-2">RENDA TOTAL</p>
          <h2 className="text-2xl md:text-3xl font-black text-cyber-green">
            R$ {stats.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </div>

        <div className="card-cyber">
          <p className="text-cyber-cyan opacity-60 text-sm mb-2">DESPESAS</p>
          <h2 className="text-2xl md:text-3xl font-black text-cyber-pink">
            R$ {stats.totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </div>

        <div className="card-cyber">
          <p className="text-cyber-cyan opacity-60 text-sm mb-2">SALDO BANCÁRIO</p>
          <h2 className="text-2xl md:text-3xl font-black text-cyber-cyan">
            R$ {stats.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </div>

        <div className="card-cyber">
          <p className="text-cyber-cyan opacity-60 text-sm mb-2">INVESTIMENTOS</p>
          <h2 className="text-2xl md:text-3xl font-black text-cyber-purple">
            R$ {stats.totalInvestments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contas Bancárias */}
        <section className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-cyber-purple">CONTAS BANCÁRIAS</h2>
            <Link href="/dashboard/accounts" className="text-cyber-cyan hover:text-cyber-green transition">
              Gerenciar →
            </Link>
          </div>
          <div className="space-y-3">
            {accounts.length === 0 ? (
              <p className="text-cyber-cyan opacity-60">Nenhuma conta cadastrada</p>
            ) : (
              accounts.map((account) => (
                <div key={account.id} className="glass-panel p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-cyber-cyan font-bold">{account.name}</p>
                      <p className="text-cyber-cyan opacity-60 text-sm">{account.type}</p>
                    </div>
                    <p className="text-cyber-green font-black">
                      R$ {account.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Investimentos */}
        <section className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-cyber-purple">INVESTIMENTOS</h2>
            <Link href="/dashboard/investments" className="text-cyber-cyan hover:text-cyber-green transition">
              Gerenciar →
            </Link>
          </div>
          <div className="space-y-3">
            {investments.length === 0 ? (
              <p className="text-cyber-cyan opacity-60">Nenhum investimento cadastrado</p>
            ) : (
              investments.map((inv) => (
                <div key={inv.id} className="glass-panel p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-cyber-cyan font-bold">{inv.name}</p>
                      <p className="text-cyber-cyan opacity-60 text-sm">{inv.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyber-purple font-black">
                        R$ {inv.currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className={`text-sm ${inv.roi >= 0 ? 'text-cyber-green' : 'text-cyber-pink'}`}>
                        {inv.roi > 0 ? '+' : ''}{inv.roi.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        <Link href="/dashboard/transactions" className="btn-cyber text-white text-center">
          💰 Transações
        </Link>
        <Link href="/dashboard/accounts" className="btn-cyber text-white text-center">
          🏦 Contas
        </Link>
        <Link href="/dashboard/investments" className="btn-cyber text-white text-center">
          📈 Investimentos
        </Link>
        <Link href="/settings" className="btn-cyber text-white text-center border-2 border-cyber-green bg-transparent">
          ⚙️ Configurações
        </Link>
        <button onClick={handleLogout} className="btn-cyber text-white text-center">
          🚪 Sair
        </button>
      </div>
    </main>
  )
}
