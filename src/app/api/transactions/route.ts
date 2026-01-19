import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { appLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      appLogger.log('warning', 'Transactions', 'Token não fornecido na criação de transação')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    const { type, category, amount, description } = await request.json()

    appLogger.log('info', 'Transactions', `Criando transação: ${type} - ${category}`, { userId: decoded.userId })

    const transaction = await prisma.transaction.create({
      data: {
        type,
        category,
        amount: parseFloat(amount),
        description,
        userId: decoded.userId,
      },
    })

    appLogger.log('success', 'Transactions', `Transação criada: ${category}`, { transactionId: transaction.id, amount }, Date.now() - startTime)
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    appLogger.log('error', 'Transactions', 'Erro ao criar transação', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json({ error: 'Erro ao criar transação' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      appLogger.log('warning', 'Transactions', 'Token não fornecido na busca de transações')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))

    appLogger.log('info', 'Transactions', 'Buscando transações do usuário', { userId: decoded.userId })

    const transactions = await prisma.transaction.findMany({
      where: { userId: decoded.userId },
      orderBy: { date: 'desc' },
      take: 50,
    })

    appLogger.log('success', 'Transactions', `Buscou ${transactions.length} transações`, { userId: decoded.userId }, Date.now() - startTime)
    return NextResponse.json(transactions)
  } catch (error) {
    appLogger.log('error', 'Transactions', 'Erro ao buscar transações', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json({ error: 'Erro ao buscar transações' }, { status: 500 })
  }
}
