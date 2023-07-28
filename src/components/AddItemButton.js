import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { ItemInput } from '../components';
import { api, classCondition } from '../utils';

const AddItemModal = ({ className, UserId, refetch }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');

	const addItem = async (e) => {
		e.preventDefault();

		if (query === '') return;

		await api.createItem({
			name: query
		});

		setIsOpen(false);
		refetch();
	};

	return (
		<div className={className}>
			<button className='p-12 h-72 gap-4 flex grow flex-col place-content-center place-items-center bg-slate-50 text-slate-400 rounded-3xl border-dashed border border-current opacity-95 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:bg-slate-100 active:shadow-lg active:shadow-gray-200 active:opacity-100' onClick={() => setIsOpen(true)}>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-36 h-36'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
				</svg>

				<h2 className='text-3xl font-semibold'>Add Menu Item</h2>
			</button>

			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={setIsOpen}>
					{/* Modal background */}
					<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-md transition-opacity' />
					</Transition.Child>

					{/* Modal body */}
					<div className='flex min-h-full items-center justify-center p-6 sm:p-0 fixed inset-0 z-10'>
						<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
							<Dialog.Panel className='relative rounded-lg shadow-xl text-left transition-all sm:my-8 sm:w-full sm:max-w-lg'>
								<form onSubmit={addItem} className='gap-6 flex flex-col w-full p-6 bg-slate-100 rounded-lg'>
									<div className='gap-2 flex flex-col w-full'>
										<Dialog.Title as='h3' className='text-lg font-semibold text-gray-900'>
											Add Item
										</Dialog.Title>

										<Dialog.Description>Enter or search an item for today's menu.</Dialog.Description>
									</div>

									<ItemInput query={query} setQuery={setQuery} addItem={addItem} />

									<div className='gap-3 flex justify-end w-full'>
										<button type='button' onClick={() => setIsOpen(false)} className='w-full justify-center rounded-md bg-white px-4 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-stone-50 sm:w-auto'>
											Cancel
										</button>

										<button type='submit' className={classCondition(query?.length === 0 ? 'opacity-75 cursor-default hover:bg-blue-600' : null, 'w-full justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto')}>
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
};

export default AddItemModal;
