import { Outlet } from '@remix-run/react'

import Header from '@/components/Header'

export default function AuthLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
