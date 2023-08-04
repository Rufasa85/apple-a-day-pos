import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';

import { DateInput, SearchInput, Typeahead } from '..';
import { api, compareCustomers, classCondition } from '../../utils';

const AddModal = ({ visible, setVisible, setCustomer }) => {
	const [allCustomers, setAllCustomers] = useState([]);
	const [filteredCustomers, setFilteredCustomers] = useState({});
	const [customerQuery, setCustomerQuery] = useState({ firstName: '', lastName: '', dateOfBirth: '' });
	const [error, setError] = useState(false);

	const { isLoading } = useQuery({
		queryKey: ['all-customers'],
		queryFn: () => api.getAllCustomers(),

		onSuccess: (response) => {
			if (response.data) {
				const customerObjects = response.data.map(({ id, firstName, lastName, dateOfBirth }) => {
					const typeaheadValue = `${firstName} ${lastName}`;

					return { id, firstName, lastName, dateOfBirth, typeaheadValue };
				});

				setAllCustomers(customerObjects);
				setFilteredCustomers({ exact: [], close: [], partial: customerObjects, date: [] });
			}
		}
	});

	const filterCustomers = (query) => {
		const noInput = !query.firstName && !query.lastName && !query.dateOfBirth;
		const data = { exact: [], close: [], partial: [], date: [] };

		if (noInput) {
			data.close.push(...allCustomers);
			return data;
		}

		allCustomers.forEach((customer) => {
			const match = compareCustomers(customer, query);

			if (match === 'exact') data.exact.push(customer);
			if (match === 'close') data.close.push(customer);
			if (match === 'partial') data.partial.push(customer);
			if (match === 'date') data.date.push(customer);
		});

		return data;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const { firstName, lastName, dateOfBirth } = customerQuery;

		const query = {
			firstName: name === 'first-name' ? value : firstName,
			lastName: name === 'last-name' ? value : lastName,
			dateOfBirth: name === 'date-of-birth' ? value : dateOfBirth
		};

		const filteredData = filterCustomers(query);
		setFilteredCustomers(filteredData);

		const exactMatch = filteredData.exact.length === 1 ? filteredData.exact[0] : null;
		setCustomerQuery(exactMatch || query);
	};

	const addCustomer = async (e) => {
		e.preventDefault();

		try {
			const customerObject = {
				id: customerQuery.id,
				firstName: customerQuery.firstName.trim(),
				lastName: customerQuery.lastName.trim(),
				dateOfBirth: customerQuery.dateOfBirth
			};

			if (!customerQuery.firstName || !customerQuery.firstName) return;

			const response = await api.createCustomer(customerObject);

			if (response?.status === 200) {
				setVisible(false);

				const selectedCustomer = response.data.customer[0];
				setCustomer(selectedCustomer);

				const storedOrder = JSON.parse(localStorage.getItem('order')) || {};
				storedOrder.customer = selectedCustomer;

				localStorage.setItem('order', JSON.stringify(storedOrder));
			} else {
				setError(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Transition.Root show={visible} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={setVisible}>
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
									<SearchInput name='first-name' placeholder={'First Name'} value={customerQuery.firstName} onChange={handleInputChange} />
									<SearchInput name='last-name' placeholder={'Last Name'} value={customerQuery.lastName} onChange={handleInputChange} />
									<DateInput name='date-of-birth' placeholder={'Date of Birth'} value={customerQuery.dateOfBirth} onChange={handleInputChange} className='col-span-2 peer' />

									<Typeahead isQuery={customerQuery.firstName || customerQuery.lastName || customerQuery.dateOfBirth} data={filteredCustomers} setSelection={setCustomerQuery} className='peer-focus-within:hidden' />
								</div>

								{error && <p className='input-error'>Sorry, something went wrong.</p>}

								<div className='modal-buttons'>
									<button type='button' onClick={() => setVisible(false)} className='button-secondary'>
										Cancel
									</button>

									<button type='submit' className={classCondition(!customerQuery.firstName || !customerQuery.lastName ? 'button-primary-off' : 'button-primary')}>
										Add Customer
									</button>
								</div>
							</form>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default AddModal;
