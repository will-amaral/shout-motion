import { db } from '@/utils/db.server'
import { requireSession } from '@/utils/session.server'
import type { User } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import { SectionHeader, Table } from '@/components'
import { formatDate } from '@/helpers/date.helpers'

type LoaderData = {
  users: Partial<User>[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireSession(request)
  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      role: true,
    },
  })
  const data: LoaderData = {
    users: users.filter(({ id }) => id !== userId),
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
      <Table
        rows={users}
        columns={[
          { title: 'Nome', field: 'name' },
          { title: 'Email', field: 'email' },
          {
            title: 'Data de Criação',
            field: 'createdAt',
            render: value => formatDate(value as string),
          },
          {
            title: 'Nível de Usuário',
            field: 'role',
          },
          {
            title: 'Ações',
            field: 'id',
            render: id => <Link to={id as string}>Ver mais </Link>,
          },
        ]}
      />
    </>
  )
}
