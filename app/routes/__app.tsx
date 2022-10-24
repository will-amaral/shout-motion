import { NavLink, Outlet, useLoaderData, useMatches } from '@remix-run/react'
import Header from '@/components/Header'
import menu from '@/utils/menu'
import { getUser, requireSession } from '@/utils/session.server'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireSession(request)
  const user = await getUser(request)
  const data: LoaderData = { user }
  return json(data)
}

export default function DashboardLayout() {
  const { user } = useLoaderData<LoaderData>()
  const crumbs = useMatches().filter(
    match => match.handle && match.handle.breadcrumb
  )
  return (
    <>
      <Header user={user} />
      <div>
        <aside>
          <nav>
            <ul>
              {menu
                .filter(entry => entry.allowed_roles.includes(user?.role || ''))
                .map(({ to, text, icon: Icon }) => (
                  <li key={to}>
                    <NavLink to={to} end={to === '/'}>
                      <Icon /> {text}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </nav>
        </aside>
        <main>
          <nav aria-label="breadcrumb">
            <ul>
              {crumbs.map((match, index) => (
                <li key={index}>
                  {index === crumbs.length - 1
                    ? match.handle?.current(match)
                    : match.handle?.breadcrumb(match)}
                </li>
              ))}
            </ul>
          </nav>
          <Outlet />
        </main>
      </div>
    </>
  )
}
