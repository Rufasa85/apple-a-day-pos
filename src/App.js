import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import NewShift from './pages/NewShift';
import EditShift from './pages/EditShift';
import Reports from './pages/Reports';
import Service from './pages/Service';
import Service2 from './pages/Service2';
import ShiftReport from './pages/ShiftReport';
import CustomerReport from './pages/CustomerReport';
import NewCustomer from './pages/NewCustomer';

function App() {
	// check for token
	// redirect

	return (
		<div className='flex flex-col min-h-screen'>
			<Router>
				<Navbar />
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
