import { Data, SectionHeader } from '@/components'
import { db } from '@/utils/db.server'
import { requireSession } from '@/utils/session.server'
import type { User } from '@prisma/client'
import type { LoaderFunction, RouteHandle } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

type LoaderData = {
  user: User
}

export const handle: RouteHandle = {
  breadcrumb: ({
    pathname,
    data: {
      user: { name },
    },
  }: {
    pathname: string
    data: { user: { name: string } }
  }) => <Link to={pathname}>{name}</Link>,
  current: ({
    data: {
      user: { name },
    },
  }: {
    data: { user: { name: string } }
  }) => name,
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireSession(request)
  const user = await db.user.findUnique({
    where: { id: params.userId },
  })
  if (!user) return redirect('/usuarios')
  const data: LoaderData = { user }
  return json(data)
}

export default function DetalheUsuario() {
  const { user } = useLoaderData<LoaderData>()

  return (
    <>
      <SectionHeader title={user.name || ''} subtitle={`Nível: ${user.role}`} />
      <Data data={user} />
    </>
  )
}
