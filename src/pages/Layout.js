import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar } from '../components'

const Layout = () => {
  const { pathname } = window.location
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/service')
    }
  }, [pathname, navigate])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
