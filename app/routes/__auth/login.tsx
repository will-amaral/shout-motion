import type { ActionFunction, LinksFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import styles from '@/styles/login/styles.css'
import desktopStyles from '@/styles/login/styles.desktop.css'
import { Link, useSearchParams } from '@remix-run/react'
import { createUserSession, login } from '@/utils/session.server'

type ActionData = {
  formError?: string
  fieldErrors?: {
    email: string | undefined
    password: string | undefined
  }
  fields?: {
    email: string
    password: string
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: 'screen and (min-width: 992px)',
  },
]

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')
  const redirectTo = form.get('redirectTo')

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  )
    return badRequest({ formError: 'Erro no formulário' })

  const user = await login({ email, password })
  if (!user) return badRequest({ formError: 'Erro no formulário' })

  return createUserSession(user.id, redirectTo)
}

export default function Login() {
  const [searchParams] = useSearchParams()

  return (
    <section className="container">
      <article className="grid">
        <div className="wrapper">
          <hgroup>
            <h1>Entrar</h1>
            <h2>Entre na sua conta</h2>
          </hgroup>
          <form method="post">
            <input
              type="hidden"
              name="redirectTo"
              value={searchParams.get('redirectTo') ?? '/'}
            />
            <label htmlFor="email">
              Email
              <input type="email" name="email" />
            </label>
            <label htmlFor="password">
              Senha
              <input type="password" name="password" />
            </label>
            <fieldset>
              <label htmlFor="rememberMe">
                <input type="checkbox" name="rememberMe" role="switch" />
                Lembrar de mim
              </label>
            </fieldset>
            <button type="submit">Entrar</button>
          </form>
          <Link to="/recuperar-senha">Esqueci a minha senha</Link>
        </div>
        <div className="hero" />
      </article>
    </section>
  )
}
