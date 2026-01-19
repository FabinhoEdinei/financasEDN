import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { appLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      appLogger.log('warning', 'Investments', 'Token não fornecido na criação de investimento')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    const { name, type, amount, currentValue } = await request.json()

    appLogger.log('info', 'Investments', `Criando investimento: ${name}`, { userId: decoded.userId })

    const investment = await prisma.investment.create({
      data: {
        name,
        type,
        amount: parseFloat(amount),
        currentValue: parseFloat(currentValue) || parseFloat(amount),
        userId: decoded.userId,
      },
    })

    appLogger.log('success', 'Investments', `Investimento criado: ${name}`, { investmentId: investment.id }, Date.now() - startTime)
    return NextResponse.json(investment, { status: 201 })
  } catch (error) {
    appLogger.log('error', 'Investments', 'Erro ao criar investimento', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json({ error: 'Erro ao criar investimento' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      appLogger.log('warning', 'Investments', 'Token não fornecido na busca de investimentos')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))

    appLogger.log('info', 'Investments', 'Buscando investimentos do usuário', { userId: decoded.userId })

    const investments = await prisma.investment.findMany({
      where: { userId: decoded.userId },
    })

    appLogger.log('success', 'Investments', `Buscou ${investments.length} investimentos`, { userId: decoded.userId }, Date.now() - startTime)
    return NextResponse.json(investments)
  } catch (error) {
    appLogger.log('error', 'Investments', 'Erro ao buscar investimentos', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json({ error: 'Erro ao buscar investimentos' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      appLogger.log('warning', 'Investments', 'Token não fornecido na atualização de investimento')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id, name, currentValue, roi } = await request.json()

    appLogger.log('info', 'Investments', `Atualizando investimento: ${id}`, { name })

    const investment = await prisma.investment.update({
      where: { id },
      data: {
        name,
        currentValue: currentValue !== undefined ? parseFloat(currentValue) : undefined,
        roi: roi !== undefined ? parseFloat(roi) : undefined,
      },
    })

    appLogger.log('success', 'Investments', `Investimento atualizado: ${name}`, { investmentId: id }, Date.now() - startTime)
    return NextResponse.json(investment)
  } catch (error) {
    appLogger.log('error', 'Investments', 'Erro ao atualizar investimento', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json({ error: 'Erro ao atualizar investimento' }, { status: 500 })
  }
}
