import type { Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { db } from './db.server'

type NewUser = {
  name: string
  email: string
  password: string
  role: Role
}

export async function createUser({ name, email, password, role }: NewUser) {
  const userExists = await db.user.findFirst({ where: { email } })
  if (userExists) return `Usuário com email ${email} já existe`
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await db.user.create({
    data: { name, email, passwordHash, role },
  })
  if (!user) return 'Algo deu errado na criação do usuário'
  return { id: user.id, name: user.name, email: user.email, role: user.role }
}
