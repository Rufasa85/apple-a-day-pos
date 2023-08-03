import { Fragment, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';

import { DateInput, SearchInput, Typeahead } from '../components';
import { api, compareCustomers, classCondition } from '../utils';

export default function AddCustomer({ customer, setCustomer }) {
	const [customers, setCustomers] = useState([]);
	const [filteredCustomers, setFilteredCustomers] = useState({});
	const [error, setError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const { isLoading } = useQuery({
		queryKey: ['all-customers'],
		queryFn: () => api.getAllCustomers(),

		onSuccess: (response) => {
			if (response.data) {
				const customerObjects = response.data.map(({ id, firstName, lastName, dateOfBirth }) => {
					const typeaheadValue = `${firstName} ${lastName}`;

					return { id, firstName, lastName, dateOfBirth, typeaheadValue };
				});

				setCustomers(customerObjects);
				setFilteredCustomers({ exact: [], close: [], partial: customerObjects, date: [] });
			}
		}
	});

	const filterCustomers = (query) => {
		const noInput = !query.firstName && !query.lastName && !query.dateOfBirth;
		const data = { exact: [], close: [], partial: [], date: [] };

		if (noInput) {
			data.close.push(...customers);
			return data;
		}

		customers.forEach((customer) => {
			const match = compareCustomers(customer, query);

			if (match === 'exact') data.exact.push(customer);
			if (match === 'close') data.close.push(customer);
			if (match === 'partial') data.partial.push(customer);
			if (match === 'date') data.date.push(customer);
		});

		console.log(data);

		return data;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		const firstName = name === 'first-name' ? value : customer.firstName;
		const lastName = name === 'last-name' ? value : customer.lastName;
		const dateOfBirth = name === 'date-of-birth' ? value : customer.dateOfBirth;

		const query = { firstName, lastName, dateOfBirth };

		const filteredData = filterCustomers(query);
		setFilteredCustomers(filteredData);

		const exactMatch = filteredData.exact.length === 1 ? filteredData.exact[0] : null;
		setCustomer(exactMatch || query);
	};

	const addCustomer = async (e) => {
		e.preventDefault();

		try {
			const response = await api.createCustomer(customer);

			if (response?.status === 200) {
				setIsOpen(false);
			} else {
				console.log(response);
				setError(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='overflow-visible flex h-fit'>
			<button onClick={() => setIsOpen(true)} className='h-20 add-button'>
				<div className='gap-3 w-full justify-center items-center flex'>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='3 3 18 18' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
					</svg>

					<h2 className='text-lg font-semibold'>Add Customer</h2>
				</div>
			</button>

			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={setIsOpen}>
					{/* Modal background */}
					<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
						<div className='modal-background' />
					</Transition.Child>

					{/* Modal body */}
					<div className='flex min-h-full items-center justify-center p-6 sm:p-0 fixed inset-0 z-10'>
						<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
							<Dialog.Panel className='relative rounded-lg shadow-xl text-left transition-all sm:my-8 sm:w-full sm:max-w-lg'>
								<form onSubmit={addCustomer} className='modal'>
									<div className='gap-2 flex flex-col w-full'>
										<Dialog.Title as='h3' className='text-lg font-semibold text-gray-900'>
											Add Customer
										</Dialog.Title>

										<Dialog.Description>Search or add a customer for this order.</Dialog.Description>
									</div>

									<div className='gap-x-3 gap-y-4 grid grid-cols-2 relative'>
										<SearchInput name='first-name' placeholder={'First Name'} value={customer.firstName} onChange={handleInputChange} />
										<SearchInput name='last-name' placeholder={'Last Name'} value={customer.lastName} onChange={handleInputChange} />
										<DateInput name='date-of-birth' placeholder={'Date of Birth'} value={customer.dateOfBirth} onChange={handleInputChange} className='col-span-2' />

										<Typeahead data={filteredCustomers} setSelection={setCustomer} />
									</div>

									{error && <p className='input-error'>Sorry, something went wrong.</p>}

									<div className='modal-buttons'>
										<button type='button' onClick={() => setIsOpen(false)} className='button-secondary'>
											Cancel
										</button>

										<button type='submit' className={classCondition(!customer.firstName || !customer.lastName ? 'button-primary-off' : 'button-primary')}>
											Add Customer
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
}
