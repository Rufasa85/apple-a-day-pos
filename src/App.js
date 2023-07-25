import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Home, Login, NotFound, NewShift, EditShift, Reports, Service, Service2, ShiftReport, CustomerReport, NewCustomer } from './pages';
import { Navbar } from './components';
import { api } from './utils';

function App() {
	const { location } = window;

	const {
		data: response,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['checkToken'],
		queryFn: () => api.checkToken()
	});

	useEffect(() => {
		if (isLoading) return;

		const data = response?.data;
		const status = response?.status;
		const isLoginPage = location.pathname === '/login';

		if (status === 200 && isLoginPage) {
			location.replace('/');
		}

		if (status === 200) {
			return;
		}

		if (!isLoginPage) {
			location.replace('/login');
		}

		// eslint-disable-next-line
	}, [isLoading]);

	return (
		<div className='flex flex-col min-h-screen'>
			<Router>
				<Navbar />

				<Routes>
					<Route index={true} element={<Home />} />
					<Route path='/login' element={<Login refetch={refetch} />} />
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
