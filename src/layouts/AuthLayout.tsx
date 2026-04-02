import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/ui/Header'

// Auth layout: renders a consistent header for login/register related routes
export default function AuthLayout(): JSX.Element {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
