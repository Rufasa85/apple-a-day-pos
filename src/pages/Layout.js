import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Navbar } from '../components'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    if (pathname === '/') {
      navigate('/service')
    }
    const page = pathname.split('/')
    document.title = pathname.length > 1 ? `Apple a Day Cafe | ${page[1][0].toUpperCase() + page[1].slice(1)}` : 'Apple a Day Cafe'
  }, [location, navigate])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
