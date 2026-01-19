import prisma from './prisma'
import bcrypt from 'bcryptjs'

export async function createUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  })
}
