import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function seed() {
  await db.user.create({
    data: {
      email: 'john@doe.com',
      name: 'John Doe',
      role: 'superadmin',
      passwordHash:
        '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    },
  })
}

seed()
