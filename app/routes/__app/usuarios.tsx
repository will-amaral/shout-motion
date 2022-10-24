import type { RouteHandle } from '@remix-run/node'
import { Link, Outlet } from '@remix-run/react'

export const handle: RouteHandle = {
  breadcrumb: () => <Link to="/usuarios">Usuários</Link>,
  current: () => 'Usuários',
}

export default function Usuarios() {
  return <Outlet />
}
