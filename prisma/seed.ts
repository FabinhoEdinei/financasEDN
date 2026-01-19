import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuários de teste
  const user1 = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao@example.com',
      password: await bcrypt.hash('senha123', 10),
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'maria@example.com',
      password: await bcrypt.hash('senha123', 10),
    },
  })

  console.log('✅ Usuários criados:', { user1, user2 })

  // Criar contas bancárias para user1
  const account1 = await prisma.bankAccount.create({
    data: {
      name: 'Conta do Salário',
      type: 'checking',
      balance: 5000,
      userId: user1.id,
    },
  })

  const account2 = await prisma.bankAccount.create({
    data: {
      name: 'Poupança',
      type: 'savings',
      balance: 10000,
      userId: user1.id,
    },
  })

  console.log('✅ Contas bancárias criadas:', { account1, account2 })

  // Criar transações
  await prisma.transaction.create({
    data: {
      type: 'salary',
      category: 'Salário',
      amount: 5000,
      description: 'Salário mensal',
      userId: user1.id,
    },
  })

  await prisma.transaction.create({
    data: {
      type: 'house_expense',
      category: 'Aluguel',
      amount: 1500,
      description: 'Aluguel do apartamento',
      userId: user1.id,
    },
  })

  await prisma.transaction.create({
    data: {
      type: 'credit_card',
      category: 'Alimentação',
      amount: 500,
      description: 'Compras no supermercado',
      userId: user1.id,
    },
  })

  console.log('✅ Transações criadas')

  // Criar investimentos
  await prisma.investment.create({
    data: {
      name: 'Ações VALE',
      type: 'stocks',
      amount: 2000,
      currentValue: 2150,
      roi: 7.5,
      userId: user1.id,
    },
  })

  await prisma.investment.create({
    data: {
      name: 'Tesouro Direto',
      type: 'bonds',
      amount: 5000,
      currentValue: 5120,
      roi: 2.4,
      userId: user1.id,
    },
  })

  console.log('✅ Investimentos criados')

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
