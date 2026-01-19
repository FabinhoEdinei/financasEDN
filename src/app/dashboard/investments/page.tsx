'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import axios from 'axios'
import Link from 'next/link'

interface Investment {
  id: string
  name: string
  type: string
  amount: number
  currentValue: number
  roi: number
}

export default function InvestmentsPage() {
  const router = useRouter()
  const token = useAuthStore((state) => state.token)
  const [investments, setInvestments] = useState<Investment[]>([])
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: 'stocks',
    amount: '',
    currentValue: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }
    loadInvestments()
  }, [token])

  const loadInvestments = async () => {
    try {
      const response = await axios.get('/api/investments', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setInvestments(response.data)
    } catch (error) {
      console.error('Erro ao carregar investimentos:', error)
    }
  }

  const handleAddInvestment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(
        '/api/investments',
        {
          name: newInvestment.name,
          type: newInvestment.type,
          amount: newInvestment.amount,
          currentValue: newInvestment.currentValue || newInvestment.amount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewInvestment({ name: '', type: 'stocks', amount: '', currentValue: '' })
      setShowForm(false)
      loadInvestments()
    } catch (error) {
      console.error('Erro ao criar investimento:', error)
    }
  }

  const handleUpdateValue = async (id: string, newValue: string) => {
    try {
      const investment = investments.find((i) => i.id === id)
      if (investment) {
        const roi = ((parseFloat(newValue) - investment.amount) / investment.amount) * 100
        await axios.put(
          '/api/investments',
          { id, currentValue: newValue, roi },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
      setEditingId(null)
      loadInvestments()
    } catch (error) {
      console.error('Erro ao atualizar investimento:', error)
    }
  }

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalCurrent = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalROI = totalInvested > 0 ? ((totalCurrent - totalInvested) / totalInvested) * 100 : 0

  return (
    <main className="min-h-screen bg-gradient-cyber p-4 md:p-8">
      {/* Header */}
      <header className="glass-panel p-6 mb-8 flex justify-between items-center">
        <div>
          <Link href="/dashboard" className="text-cyber-cyan hover:text-cyber-green transition mb-2">
            ← Voltar
          </Link>
          <h1 className="text-3xl md:text-4xl font-black glow-text">
            INVESTIMENTOS
          </h1>
        </div>
      </header>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-panel p-6">
          <p className="text-cyber-cyan opacity-60 text-sm mb-2">INVESTIDO</p>
          <h2 className="text-2xl font-black text-cyber-purple">
            R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </div>
        <div className="glass-panel p-6">
          <p className="text-cyber-cyan opacity-60 text-sm mb-2">VALOR ATUAL</p>
          <h2 className="text-2xl font-black text-cyber-cyan">
            R$ {totalCurrent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </div>
        <div className="glass-panel p-6">
          <p className="text-cyber-cyan opacity-60 text-sm mb-2">ROI</p>
          <h2 className={`text-2xl font-black ${totalROI >= 0 ? 'text-cyber-green' : 'text-cyber-pink'}`}>
            {totalROI > 0 ? '+' : ''}{totalROI.toFixed(2)}%
          </h2>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-2xl font-bold text-cyber-purple mb-4">Novo Investimento</h2>
          <form onSubmit={handleAddInvestment} className="space-y-4">
            <div>
              <label className="block text-cyber-cyan text-sm font-bold mb-2">Nome</label>
              <input
                type="text"
                className="input-cyber w-full"
                placeholder="Ex: Ações XPTO"
                value={newInvestment.name}
                onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cyber-cyan text-sm font-bold mb-2">Tipo</label>
                <select
                  className="input-cyber w-full"
                  value={newInvestment.type}
                  onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value })}
                >
                  <option value="stocks">Ações</option>
                  <option value="bonds">Títulos</option>
                  <option value="crypto">Criptomoedas</option>
                  <option value="funds">Fundos</option>
                </select>
              </div>

              <div>
                <label className="block text-cyber-cyan text-sm font-bold mb-2">Valor Investido</label>
                <input
                  type="number"
                  className="input-cyber w-full"
                  placeholder="0.00"
                  value={newInvestment.amount}
                  onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-cyber-cyan text-sm font-bold mb-2">Valor Atual (opcional)</label>
              <input
                type="number"
                className="input-cyber w-full"
                placeholder="Se deixar em branco, usará o valor investido"
                value={newInvestment.currentValue}
                onChange={(e) => setNewInvestment({ ...newInvestment, currentValue: e.target.value })}
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
          + Novo Investimento
        </button>
      )}

      {/* Investments List */}
      <div className="space-y-4">
        {investments.length === 0 ? (
          <div className="glass-panel p-8 text-center">
            <p className="text-cyber-cyan opacity-60">Nenhum investimento cadastrado</p>
          </div>
        ) : (
          investments.map((inv) => {
            const roi = ((inv.currentValue - inv.amount) / inv.amount) * 100
            return (
              <div key={inv.id} className="glass-panel p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-cyber-cyan">{inv.name}</h3>
                    <p className="text-cyber-cyan opacity-60 text-sm">
                      Tipo: {inv.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyber-purple font-black">
                      R$ {inv.currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className={`text-sm ${roi >= 0 ? 'text-cyber-green' : 'text-cyber-pink'}`}>
                      {roi > 0 ? '+' : ''}{roi.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-cyber-cyan opacity-30">
                  <div>
                    <p className="text-cyber-cyan opacity-60 text-sm">Investido</p>
                    <p className="text-cyber-cyan font-bold">
                      R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-cyber-cyan opacity-60 text-sm">Lucro/Perda</p>
                    <p className={`font-bold ${(inv.currentValue - inv.amount) >= 0 ? 'text-cyber-green' : 'text-cyber-pink'}`}>
                      R$ {(inv.currentValue - inv.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                {editingId === inv.id ? (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="input-cyber flex-1"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                    />
                    <button
                      onClick={() => handleUpdateValue(inv.id, editingValue)}
                      className="btn-cyber text-white text-sm"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn-cyber text-white text-sm border-2 border-cyber-cyan bg-transparent"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(inv.id)
                      setEditingValue(inv.currentValue.toString())
                    }}
                    className="text-cyber-purple hover:text-cyber-pink transition"
                  >
                    ✎ Atualizar valor
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </main>
  )
}
