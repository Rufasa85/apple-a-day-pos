import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Aside from '../components/Aside'

const Reports = () => {
  const [view, setView] = useState(window.location.pathname.split('/')[2])
  const navigate = useNavigate()
  useEffect(() => {
    if (!view) {
      navigate('/reports/shifts')
    }
  }, [navigate, view])

  return (
    <main className="bg-slate-50 grid grid-cols-6 pt-[84px] h-screen">
      <aside className="bg-white shadow-md col-span-1">
        <Aside setView={setView} view={view} />
      </aside>
      <section className="col-span-5 overflow-auto">
        <div className="max-w-6xl mx-auto px-10">
          <Outlet />
        </div>
      </section>
    </main>
  )
}

export default Reports
