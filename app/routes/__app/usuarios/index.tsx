import { db } from '@/utils/db.server'
import { requireSession } from '@/utils/session.server'
import type { User } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import SectionHeader from '@/components/SectionHeader'
import Data from '@/components/Data'

type LoaderData = {
  users: Partial<User>[]
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireSession(request)
  const users = await db.user.findMany({
    select: {
      email: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      role: true,
    },
  })
  const data: LoaderData = {
    users,
  }
  return json(data)
}

export default function Usuarios() {
  const { users } = useLoaderData<LoaderData>()
  return (
    <>
      <SectionHeader
        title="Usuários"
        subtitle="Veja, edite ou adicione novos usuários"
        action={
          <Link to="novo" role="button">
            Adicionar Usuário
          </Link>
        }
      />
      <Data data={users} />
    </>
  )
}
