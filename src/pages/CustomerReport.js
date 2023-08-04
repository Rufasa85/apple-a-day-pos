import { useState } from 'react';
import { useQuery } from 'react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../utils/API';
import Loading from '../components/Loading';
import dayjs from 'dayjs';

const CustomerReport = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState();

	const customerId = window.location.pathname.split('/')[3];

	const { data: response, isLoading } = useQuery({
		queryKey: `customer/${customerId}`,
		queryFn: () => api.getOneCustomer(customerId),
		onSuccess: (response) => {
			setFirstName(response.data.firstName);
			setLastName(response.data.lastName);
			setDateOfBirth(dayjs(response.data.dateOfBirth).format('MM/DD/YYYY'));
		}
	});

	const updateCustomer = async (event) => {
		event.preventDefault();
		if (firstName === '') {
			return alert('First name cannot be blank');
		}
		if (lastName === '') {
			return alert('Last name cannot be blank');
		}
		const response = await api.updateCustomer(customerId, {
			firstName,
			lastName,
			dateOfBirth
		});
		if (response.status === 200) {
			window.location.assign('/reports');
		} else {
			console.log(response);
			alert('something went wrong (check console for more info)');
		}
	};

	return (
		<div className='container'>
			<h3>Customer Report</h3>
			{isLoading ? <Loading /> : null}
			{response ? (
				<div>
					<h3 className='my-5 text-xl'>Edit Info</h3>
					<form onSubmit={updateCustomer}>
						<div className='mb-4'>
							<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='first-name'>
								First Name
							</label>
							<input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='first-name' type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='last-name'>
								Last Name
							</label>
							<input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='last-name' type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='birthday'>
								Birthday
							</label>
							<DatePicker selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)} id='birthday' placeholderText='MM/DD/YYYY' />
						</div>
						<button className='bg-primary text-white rounded shadow-md p-2 hover:bg-red-600' type='submit'>
							Save Customer
						</button>
					</form>
					<h2>Orders:</h2>
					{response.data.Orders.map(orderCard)}
				</div>
			) : null}
		</div>
	);
};

const orderCard = (order) => {
	return (
		<div className='p-4 bg-white'>
			<h3>Date: {order.Shift.date}</h3>
			<h3>Items:</h3>
			<ul>
				{order.OrderItems.map((orderItem) => {
					return <li>{orderItem.Item.name}</li>;
				})}
			</ul>
		</div>
	);
};

export default CustomerReport;
