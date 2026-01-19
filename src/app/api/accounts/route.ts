import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { appLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      appLogger.log('warning', 'Accounts', 'Token não fornecido na criação de conta')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    const { name, type, balance } = await request.json()

    appLogger.log('info', 'Accounts', `Criando conta: ${name}`, { userId: decoded.userId })

    const account = await prisma.bankAccount.create({
      data: {
        name,
        type,
        balance: parseFloat(balance) || 0,
        userId: decoded.userId,
      },
    })

    appLogger.log('success', 'Accounts', `Conta criada: ${name}`, { accountId: account.id }, Date.now() - startTime)
    return NextResponse.json(account, { status: 201 })
  } catch (error) {
    appLogger.log('error', 'Accounts', 'Erro ao criar conta', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json({ error: 'Erro ao criar conta' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      appLogger.log('warning', 'Accounts', 'Token não fornecido na busca de contas')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))

    appLogger.log('info', 'Accounts', 'Buscando contas do usuário', { userId: decoded.userId })

    const accounts = await prisma.bankAccount.findMany({
      where: { userId: decoded.userId },
    })

    appLogger.log('success', 'Accounts', `Buscou ${accounts.length} contas`, { userId: decoded.userId }, Date.now() - startTime)
    return NextResponse.json(accounts)
  } catch (error) {
    appLogger.log('error', 'Accounts', 'Erro ao buscar contas', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json({ error: 'Erro ao buscar contas' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      appLogger.log('warning', 'Accounts', 'Token não fornecido na atualização de conta')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    const { id, name, balance } = await request.json()

    appLogger.log('info', 'Accounts', `Atualizando conta: ${id}`, { userId: decoded.userId })

    const account = await prisma.bankAccount.update({
      where: { id },
      data: {
        name,
        balance: balance !== undefined ? parseFloat(balance) : undefined,
      },
    })

    appLogger.log('success', 'Accounts', `Conta atualizada: ${name}`, { accountId: id }, Date.now() - startTime)
    return NextResponse.json(account)
  } catch (error) {
    appLogger.log('error', 'Accounts', 'Erro ao atualizar conta', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json({ error: 'Erro ao atualizar conta' }, { status: 500 })
  }
}
