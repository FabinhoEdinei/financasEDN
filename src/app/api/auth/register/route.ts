import { NextRequest, NextResponse } from 'next/server'
import { createUser, findUserByEmail } from '@/lib/user'
import { appLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { name, email, password } = await request.json()

    appLogger.log('info', 'Auth', `Tentativa de registro para ${email}`)

    if (!name || !email || !password) {
      appLogger.log('warning', 'Auth', 'Dados incompletos no registro')
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      appLogger.log('warning', 'Auth', `Email já cadastrado: ${email}`)
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 409 }
      )
    }

    const user = await createUser(name, email, password)
    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString('base64')

    appLogger.log(
      'success',
      'Auth',
      `Novo usuário registrado: ${email}`,
      { userId: user.id },
      Date.now() - startTime
    )

    return NextResponse.json(
      {
        user: { id: user.id, name: user.name, email: user.email },
        token,
      },
      { status: 201 }
    )
  } catch (error) {
    appLogger.log('error', 'Auth', 'Erro ao registrar usuário', { error: String(error) }, Date.now() - startTime)
    return NextResponse.json(
      { error: 'Erro ao registrar usuário' },
      { status: 500 }
    )
  }
}
