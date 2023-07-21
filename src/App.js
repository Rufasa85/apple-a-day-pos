import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NewShift from './pages/NewShift';
import EditShift from './pages/EditShift';
import Reports from './pages/Reports';
import Service from './pages/Service';
import Service2 from './pages/Service2';
import ShiftReport from './pages/ShiftReport';
import CustomerReport from './pages/CustomerReport';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route index={true} element={<Home />} />
				<Route path='/new-shift' element={<NewShift />} />
				<Route path='/edit-shift' element={<EditShift />} />
				<Route path='/service' element={<Service />} />
				<Route path='/service2' element={<Service2 />} />
				<Route path='/reports' element={<Reports />} />
				<Route path='/reports/shifts/:id' element={<ShiftReport />} />
				<Route path='/reports/customers/:id' element={<CustomerReport />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
