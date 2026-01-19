import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail, verifyPassword } from '@/lib/user'
import { appLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { email, password } = await request.json()

    appLogger.log('info', 'Auth', `Tentativa de login para ${email}`)

    if (!email || !password) {
      appLogger.log('warning', 'Auth', 'Email ou senha ausentes')
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    const user = await findUserByEmail(email)
    if (!user) {
      appLogger.log('warning', 'Auth', `Usuário não encontrado: ${email}`)
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      appLogger.log('warning', 'Auth', `Senha incorreta para ${email}`)
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Simular JWT token
    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString('base64')

    appLogger.log(
      'success',
      'Auth',
      `Login bem-sucedido para ${email}`,
      { userId: user.id },
      Date.now() - startTime
    )

    return NextResponse.json(
      {
        user: { id: user.id, name: user.name, email: user.email },
        token,
      },
      { status: 200 }
    )
  } catch (error) {
    appLogger.log('error', 'Auth', 'Erro ao fazer login', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    )
  }
}
