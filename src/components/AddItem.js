import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';

import { TypeaheadInput } from '../components';
import { api, classCondition } from '../utils';

export default function AddItem({ refetch }) {
	const [items, setItems] = useState([]);
	const [inputValue, setInputValue] = useState({ id: null, value: '' });
	const [error, setError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const { isLoading } = useQuery({
		queryKey: ['all-items'],
		queryFn: () => api.getAllItems(),

		onSuccess: (response) => {
			if (response.data) {
				const itemObjects = response.data.map(({ id, name }) => ({ id, value: name }));
				setItems(itemObjects);
			}
		}
	});

	const addItem = async (e) => {
		e.preventDefault();

		try {
			const { id, value } = inputValue;

			const name = value.trim();
			if (name === '') return;

			const response = await api.createItem({ id, name });

			if (response?.status === 200) {
				setIsOpen(false);
				refetch();
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
			<button onClick={() => setIsOpen(true)} className='h-72 gap-4 flex grow flex-col justify-center items-center bg-slate-50/50 text-slate-400/50 border-slate-400/50 rounded-3xl border-dashed border-2 opacity-95 hover:shadow-lg hover:shadow-gray-100 hover:opacity-90 active:bg-slate-100 active:shadow-md active:shadow-gray-100 active:opacity-100'>
				<div className='gap-4 h-28 flex flex-col justify-end items-center'>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='3 3 18 18' strokeWidth={1.5} stroke='currentColor' className='w-16 h-16'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
					</svg>

					<h2 className='text-2xl font-semibold'>Add Menu Item</h2>
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
								<form onSubmit={addItem} className='modal'>
									<div className='gap-2 flex flex-col w-full'>
										<Dialog.Title as='h3' className='text-lg font-semibold text-gray-900'>
											Add Item
										</Dialog.Title>

										<Dialog.Description>Search or add an item for today's menu.</Dialog.Description>
									</div>

									<TypeaheadInput query={inputValue} setQuery={setInputValue} data={items} />

									{error && <p className='input-error'>Sorry, something went wrong.</p>}

									<div className='modal-buttons'>
										<button type='button' onClick={() => setIsOpen(false)} className='button-secondary'>
											Cancel
										</button>

										<button type='submit' className={classCondition(inputValue?.value?.length < 1 ? 'button-primary-off' : 'button-primary')}>
											Add Item
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
