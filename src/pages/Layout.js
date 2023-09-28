import { Outlet, useNavigate } from 'react-router-dom'

import { Navbar } from '../components'

const Layout = () => {
  const { pathname } = window.location
  const navigate = useNavigate()

  if (pathname === '/') {
    navigate('/service')
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
