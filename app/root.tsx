import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
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
