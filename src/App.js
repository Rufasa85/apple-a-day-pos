import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Home, Login, NotFound, NewShift, EditShift, Reports, Service, Service2, ShiftReport, CustomerReport, NewCustomer } from './pages';
import { Navbar } from './components';
import { api } from './utils';

function App() {
	const [showNav, setShowNav] = useState(true);
  const [userId, setUserId] = useState(0)
	const { location } = window;

	useEffect(() => {
    if (localStorage.getItem("token")) {
      checkTokenData()
    }
  }, [])
  

	useEffect(() => {
		// if (isLoading) return;

		const isLoginPage = location.pathname === '/login';
		if (!isLoginPage) {
      setShowNav(true);
		} else {
      setShowNav(false);
    }

	}, [location.pathname]);

  const checkTokenData = async () => {
    const res = await api.checkToken()
    console.log(res)
    setUserId(res.userId)
  }

	return (
		<div className='flex flex-col min-h-screen'>
			<Router>
				{showNav ? <Navbar userId={userId}/> : null}

				<Routes>
					<Route index={true} element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/new-shift' element={<NewShift />} />
					<Route path='/edit-shift' element={<EditShift />} />
					<Route path='/service' element={<Service />} />
					<Route path='/service2' element={<Service2 />} />
					<Route path='/new-customer' element={<NewCustomer />} />
					<Route path='/reports' element={<Reports />} />
					<Route path='/reports/shifts/:id' element={<ShiftReport />} />
					<Route path='/reports/customers/:id' element={<CustomerReport />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
