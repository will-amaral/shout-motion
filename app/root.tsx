import type { LinksFunction, MetaFunction, RouteHandle } from '@remix-run/node'
import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import picoCss from '@picocss/pico/css/pico.min.css'

import globalCss from './styles/global.styles.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'ShoutMotion',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: picoCss },
  { rel: 'stylesheet', href: globalCss },
]

export const handle: RouteHandle = {
  breadcrumb: () => <Link to="/">Home</Link>,
  current: () => 'Home',
}

export default function App() {
  return (
    <html lang="pt-BR">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
