import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useQuery } from 'react-query'

import { Login, Layout, NotFound, Reports, Service, ShiftReport, CustomerReport, NewCustomer } from './pages'
import { Customers, Loading, Shifts } from './components'
import { api } from './utils'

function App() {
  const [UserId, setUserId] = useState(null)
  const { location } = window

  const { isLoading } = useQuery({
    queryKey: `check-token`,
    queryFn: () => api.checkToken(),

    onSuccess: (response) => {
      const token = response?.data.token
      const userId = response?.data.UserId
      const isLoginPage = location.pathname === '/login'

      if (token && isLoginPage) {
        location.replace('/')
      }

      if (token) {
        setUserId(userId)
        localStorage.setItem('token', token)
        return
      }

      if (!isLoginPage) {
        location.replace('/login')
      }
    },
  })

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col box-border w-screen max-w-screen h-screen max-h-screen">
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUserId={setUserId} />} />

          <Route path="/" element={<Layout />}>
            <Route path="service" element={<Service UserId={UserId} />} />
            <Route path="reports" element={<Reports />}>
              <Route path="shifts" element={<Shifts UserId={UserId} />} />
              <Route path="shifts/:id" element={<ShiftReport UserId={UserId} />} />
              <Route path="customers" element={<Customers UserId={UserId} />} />
              <Route path="customers/:id" element={<CustomerReport UserId={UserId} />} />
              <Route path="new-customer" element={<NewCustomer UserId={UserId} />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
