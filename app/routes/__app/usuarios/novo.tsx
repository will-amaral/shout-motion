import SectionHeader from '@/components/SectionHeader'
import { createUser } from '@/utils/user.server'
import type { Role } from '@prisma/client'
import type { ActionFunction, RouteHandle } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const handle: RouteHandle = {
  breadcrumb: () => <Link to="/usuarios/novo">Novo</Link>,
  current: () => 'Novo Usuário',
}

const roles: { text: string; value: Role }[] = [
  { text: 'Administrador', value: 'admin' },
  { text: 'Instrutor', value: 'instructor' },
  { text: 'Aluno', value: 'student' },
]

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const name = form.get('name') as string
  const password = form.get('password') as string
  const email = form.get('email') as string
  const role = form.get('role') as Role
  const data = await createUser({ name, password, email, role })

  if (typeof data === 'string') throw new Error(data)
  return redirect('/usuarios')
}

export default function NovoUsuario() {
  return (
    <>
      <SectionHeader
        title="Adicionar usuário"
        subtitle="Preencha os campos para adicionar um novo usuário"
      />
      <form method="post">
        <div className="grid">
          <label htmlFor="name">
            Nome
            <input type="text" name="name" />
          </label>
          <label htmlFor="email">
            Email
            <input type="email" name="email" />
          </label>
        </div>
        <div className="grid">
          <label htmlFor="password">
            Senha inicial
            <input type="password" name="password" />
            <small>
              Esta senha será enviada ao usuário por email e deve ser alterada
              no primeiro login
            </small>
          </label>
          <label htmlFor="role">
            Tipo de Usuário
            <select name="role" id="role" defaultValue="student">
              {roles.map(({ text, value }) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Criar usuário</button>
      </form>
    </>
  )
}
