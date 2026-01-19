'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import axios from 'axios'
import Link from 'next/link'

interface BankAccount {
  id: string
  name: string
  balance: number
  type: string
}

export default function AccountsPage() {
  const router = useRouter()
  const token = useAuthStore((state) => state.token)
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [newAccount, setNewAccount] = useState({ name: '', type: 'checking', balance: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }
    loadAccounts()
  }, [token])

  const loadAccounts = async () => {
    try {
      const response = await axios.get('/api/accounts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAccounts(response.data)
    } catch (error) {
      console.error('Erro ao carregar contas:', error)
    }
  }

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(
        '/api/accounts',
        {
          name: newAccount.name,
          type: newAccount.type,
          balance: newAccount.balance || 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewAccount({ name: '', type: 'checking', balance: '' })
      setShowForm(false)
      loadAccounts()
    } catch (error) {
      console.error('Erro ao criar conta:', error)
    }
  }

  const handleEditAccount = async (id: string, newName: string) => {
    try {
      await axios.put(
        '/api/accounts',
        { id, name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setEditingId(null)
      loadAccounts()
    } catch (error) {
      console.error('Erro ao editar conta:', error)
    }
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
            CONTAS BANCÁRIAS
          </h1>
        </div>
      </header>

      {/* Form */}
      {showForm && (
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-2xl font-bold text-cyber-purple mb-4">Nova Conta</h2>
          <form onSubmit={handleAddAccount} className="space-y-4">
            <div>
              <label className="block text-cyber-cyan text-sm font-bold mb-2">Nome da Conta</label>
              <input
                type="text"
                className="input-cyber w-full"
                placeholder="Ex: Conta do Salário"
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cyber-cyan text-sm font-bold mb-2">Tipo</label>
                <select
                  className="input-cyber w-full"
                  value={newAccount.type}
                  onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                >
                  <option value="checking">Corrente</option>
                  <option value="savings">Poupança</option>
                </select>
              </div>

              <div>
                <label className="block text-cyber-cyan text-sm font-bold mb-2">Saldo Inicial</label>
                <input
                  type="number"
                  className="input-cyber w-full"
                  placeholder="0.00"
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-cyber text-white flex-1">
                Criar Conta
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
          + Nova Conta
        </button>
      )}

      {/* Accounts List */}
      <div className="space-y-4">
        {accounts.length === 0 ? (
          <div className="glass-panel p-8 text-center">
            <p className="text-cyber-cyan opacity-60">Nenhuma conta cadastrada</p>
          </div>
        ) : (
          accounts.map((account) => (
            <div key={account.id} className="glass-panel p-6">
              <div className="flex justify-between items-center mb-4">
                {editingId === account.id ? (
                  <input
                    type="text"
                    className="input-cyber flex-1"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-cyber-cyan">{account.name}</h3>
                    <p className="text-cyber-cyan opacity-60 text-sm">
                      {account.type === 'checking' ? 'Conta Corrente' : 'Poupança'}
                    </p>
                  </div>
                )}

                <div className="text-right">
                  <p className="text-2xl font-black text-cyber-green">
                    R$ {account.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {editingId === account.id ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditAccount(account.id, editingName)}
                    className="btn-cyber text-white text-sm flex-1"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn-cyber text-white text-sm flex-1 border-2 border-cyber-cyan bg-transparent"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(account.id)
                    setEditingName(account.name)
                  }}
                  className="text-cyber-purple hover:text-cyber-pink transition"
                >
                  ✎ Editar nome
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  )
}
