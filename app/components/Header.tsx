import { Link } from '@remix-run/react'

import logo from '@/assets/logo.png'
import type { User } from '@prisma/client'

type HeaderProps = {
  user?: Partial<User> | null
}

export default function Header(props: HeaderProps) {
  const { user } = props

  return (
    <nav className="container-fluid">
      <ul>
        <li>
          <img className="logo" src={logo} alt="Logo" />
        </li>
        <li>
          <strong>ShoutMotion</strong>
        </li>
      </ul>
      {user && (
        <ul>
          {process.env.NODE_ENV === 'development' && (
            <li>
              <kbd>{user.role}</kbd>
            </li>
          )}
          <li>
            <Link to="/meus-dados" className="with-icon">
              {user.email}
            </Link>
          </li>
          <li>
            <form action="/logout" method="post">
              <button type="submit" className="outline ghost">
                Sair
              </button>
            </form>
          </li>
        </ul>
      )}
    </nav>
  )
}
