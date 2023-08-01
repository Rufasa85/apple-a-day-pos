import { Fragment, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import DatePicker from 'react-date-picker';
// import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { SearchInput, Typeahead } from '../components';
import { api, classCondition } from '../utils';

export default function AddCustomer({ customer, setCustomer }) {
	const [customers, setCustomers] = useState([]);
	const [inputValue, setInputValue] = useState({ id: null, value: '' });
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
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
			}
		}
	});

	const addCustomer = async (e) => {
		e.preventDefault();

		try {
			const { id, value } = inputValue;

			const name = value.trim();
			if (name === '') return;

			const response = await api.createCustomer({ id, name });

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
			<button onClick={() => setIsOpen(true)} className='button-secondary w-full hover:text-current'>
				Add Customer
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
										<SearchInput id='first-name' value={firstName} onChange={setFirstName} placeholder={'First Name'} />
										<SearchInput type='search' value={lastName} onChange={setLastName} placeholder={'Last Name'} />
										<SearchInput type='date' value={dateOfBirth} onChange={setDateOfBirth} placeholder={'Date of Birth'} className='col-span-2' />

										<Typeahead query={{ firstName, lastName, dateOfBirth }} data={customers} setSelection={setCustomer} />
									</div>

									{error && <p className='input-error'>Sorry, something went wrong.</p>}

									<div className='modal-buttons'>
										<button type='button' onClick={() => setIsOpen(false)} className='button-secondary'>
											Cancel
										</button>

										<button type='submit' className={classCondition(inputValue?.value?.length < 1 ? 'button-primary-off' : 'button-primary')}>
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
