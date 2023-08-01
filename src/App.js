import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Home, Login, Layout, NotFound, NewShift, EditShift, Reports, Service, Service2, ShiftReport, CustomerReport, NewCustomer } from './pages';
import { Navbar } from './components';
import { api } from './utils';

function App() {
	const [UserId, setUserId] = useState(0);
	const { location } = window;

	const { isLoading } = useQuery({
		queryKey: `check-token`,
		queryFn: () => api.checkToken(),

		onSuccess: (response) => {
			const token = response?.data?.token;
			const UserId = response?.data?.UserId;
			const isLoginPage = location.pathname === '/login';

			if (token && isLoginPage) {
				location.replace('/');
			}

			if (token) {
				setUserId(UserId);
				localStorage.setItem('token', token);
				return;
			}

			if (!isLoginPage) {
				location.replace('/login');
			}
		}
	});

	return (
		<div className='flex flex-col box-border w-screen max-w-screen h-screen max-h-screen'>
			<Router>
				<Routes>
					<Route path='/login' element={<Login setUserId={setUserId} />} />

					<Route path='/' element={<Layout />}>
						<Route path='service' element={<Service UserId={UserId} />} />
						<Route path='reports' element={<Reports />} />
					</Route>

					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</div>

		// <div className='flex flex-col min-h-screen'>
		// 	<Router>
		// 		{showNav ? <Navbar /> : null}

		// 		<Routes>
		// 			<Route index element={<Home />} />
		// 			<Route path='/login' element={<Login setUserId={setUserId} />} />
		// 			<Route path='/new-shift' element={<NewShift UserId={UserId} />} />
		// 			<Route path='/edit-shift' element={<EditShift />} />
		// 			<Route path='/service' element={<Service UserId={UserId} />} />
		// 			<Route path='/service2' element={<Service2 />} />
		// 			<Route path='/new-customer' element={<NewCustomer />} />
		// 			<Route path='/reports' element={<Reports />} />
		// 			<Route path='/reports/shifts/:id' element={<ShiftReport />} />
		// 			<Route path='/reports/customers/:id' element={<CustomerReport />} />
		// 			<Route path='*' element={<NotFound />} />
		// 		</Routes>
		// 	</Router>
		// </div>
	);
}

export default App;
