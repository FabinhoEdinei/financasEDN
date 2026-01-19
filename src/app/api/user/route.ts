import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { appLogger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    appLogger.log('info', 'User', 'Tentativa de acesso ao perfil do usuário')
    
    if (!token) {
      appLogger.log('warning', 'User', 'Token não fornecido')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        accounts: true,
        investments: true,
      },
    })

    if (!user) {
      appLogger.log('warning', 'User', `Usuário não encontrado: ${decoded.userId}`)
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    appLogger.log('success', 'User', `Perfil acessado: ${user.email}`, { userId: user.id }, Date.now() - startTime)
    return NextResponse.json(user)
  } catch (error) {
    appLogger.log('error', 'User', 'Erro ao buscar usuário', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 })
  }
}
