'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import axios from 'axios'
import Link from 'next/link'

interface Transaction {
  id: string
  type: string
  category: string
  amount: number
  description: string
  date: string
}

export default function TransactionsPage() {
  const router = useRouter()
  const token = useAuthStore((state) => state.token)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [newTransaction, setNewTransaction] = useState({
    type: 'house_expense',
    category: 'Aluguel',
    amount: '',
    description: '',
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }
    loadTransactions()
  }, [token])

  const loadTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTransactions(response.data)
    } catch (error) {
      console.error('Erro ao carregar transações:', error)
    }
  }

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(
        '/api/transactions',
        {
          type: newTransaction.type,
          category: newTransaction.category,
          amount: newTransaction.amount,
          description: newTransaction.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewTransaction({
        type: 'house_expense',
        category: 'Aluguel',
        amount: '',
        description: '',
      })
      setShowForm(false)
      loadTransactions()
    } catch (error) {
      console.error('Erro ao criar transação:', error)
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      salary: '💰 Salário',
      house_expense: '🏠 Despesa Casa',
      credit_card: '💳 Cartão Crédito',
      investment: '📈 Investimento',
    }
    return labels[type] || type
  }

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      salary: 'text-cyber-green',
      house_expense: 'text-cyber-pink',
      credit_card: 'text-cyber-purple',
      investment: 'text-cyber-cyan',
    }
    return colors[type] || 'text-cyber-cyan'
  }

  return (
    <main className="min-h-screen bg-gradient-cyber p-4 md:p-8">
      {/* Header */}
      <header className="glass-panel p-6 mb-8 flex justify-between items-center">
        <div>
          <Link href="/dashboard" className="text-cyber-cyan hover:text-cyber-green transition mb-2">
            ← Voltar
          </Link>
          <h1 className="text-3xl md:text-4xl font-black glow-text">
            TRANSAÇÕES
          </h1>
        </div>
      </header>

      {/* Form */}
      {showForm && (
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-2xl font-bold text-cyber-purple mb-4">Nova Transação</h2>
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cyber-cyan text-sm font-bold mb-2">Tipo</label>
                <select
                  className="input-cyber w-full"
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                >
                  <option value="salary">Salário</option>
                  <option value="house_expense">Despesa Casa</option>
                  <option value="credit_card">Cartão Crédito</option>
                  <option value="investment">Investimento</option>
                </select>
              </div>

              <div>
                <label className="block text-cyber-cyan text-sm font-bold mb-2">Categoria</label>
                <input
                  type="text"
                  className="input-cyber w-full"
                  placeholder="Ex: Aluguel, Alimentação"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-cyber-cyan text-sm font-bold mb-2">Valor</label>
              <input
                type="number"
                className="input-cyber w-full"
                placeholder="0.00"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-cyber-cyan text-sm font-bold mb-2">Descrição</label>
              <input
                type="text"
                className="input-cyber w-full"
                placeholder="Descrição da transação"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-cyber text-white flex-1">
                Adicionar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-cyber text-white flex-1 border-2 border-cyber-cyan bg-transparent"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="btn-cyber text-white mb-8"
        >
          + Nova Transação
        </button>
      )}

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="glass-panel p-8 text-center">
            <p className="text-cyber-cyan opacity-60">Nenhuma transação registrada</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="glass-panel p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-bold ${getTypeColor(transaction.type)}`}>
                      {getTypeLabel(transaction.type)}
                    </span>
                    <span className="text-cyber-cyan opacity-60 text-sm">• {transaction.category}</span>
                  </div>
                  <p className="text-cyber-cyan opacity-60 text-sm">{transaction.description}</p>
                  <p className="text-cyber-cyan opacity-40 text-xs mt-1">
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`text-xl font-black ${
                    transaction.type === 'salary' ? 'text-cyber-green' : 'text-cyber-pink'
                  }`}>
                    {transaction.type === 'salary' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
