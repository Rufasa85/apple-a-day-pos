import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';

import Loading from '../components/Loading';
import api from '../utils/API';

const AddItemModal = ({ modalVisible, setModalVisible, refetch }) => {
	const [itemNameInput, setItemNameInput] = useState('');
	// const [itemStockInput, setItemStockInput] = useState(0);

	const today = dayjs().format('MMMM D, YYYY');

	const { data: response, isLoading } = useQuery({
		queryKey: `${today}/all-items`,
		queryFn: () => api.getAllItems()
	});

	const addItem = async () => {
		const itemObj = {
			name: itemNameInput
		};

		await api.createItem(itemObj);
		setModalVisible(false);
		refetch();
	};

	return (
		<Transition.Root show={modalVisible} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={setModalVisible}>
				{/* Modal background */}
				<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				{/* Modal body */}
				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-6 text-center sm:items-center sm:p-0'>
						<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
							<Dialog.Panel className='relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
								<div className='bg-white'>
									<div className='sm:flex sm:items-start'>
										<div className='flex flex-col w-full p-4 gap-8 text-center'>
											<Dialog.Title as='h3' className='text-lg text-center font-semibold text-gray-900'>
												Add Menu Item
											</Dialog.Title>

											<div className='flex flex-col gap-6 w-full'>
												<div className='relative flex flex-col gap-1 w-full'>
													<label htmlFor='name' className='block text-sm text-left font-medium text-gray-900'>
														Name
													</label>

													<input type='text' name='name' placeholder='Soup' value={itemNameInput} onChange={(e) => setItemNameInput(e.target.value)} id='name' className='block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />

													{isLoading ? (
														<Loading />
													) : (
														<ol className='flex flex-col text-left w-full h-36 rounded-md border bg-white overflow-scroll px-3 mt-3 divide-y divide-solid'>
															{response?.data
																.filter(({ name }) => name.toLowerCase().startsWith(itemNameInput.toLowerCase()))
																.map(({ id, name }) => (
																	<li key={`typeahead-${id}`} onClick={() => setItemNameInput(name)} className='flex w-full text-sm px-1 py-2 text-gray-900'>
																		<button className='flex w-full'>{name}</button>
																	</li>
																))}
														</ol>
													)}
												</div>

												{/* <div className='flex flex-col gap-1 w-full'>
														<label htmlFor='stock' className='block text-sm text-left font-medium text-gray-900'>
															Stock
														</label>

														<input type='number' name='stock' placeholder='200' value={itemStockInput} onChange={(e) => e.target.value >= 0 && setItemStockInput(e.target.value)} id='stock' className='block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
													</div> */}
											</div>

											<div className='sm:flex sm:flex-row-reverse'>
												<button type='button' className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto' onClick={addItem}>
													Add
												</button>
												<button type='button' className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto' onClick={() => setModalVisible(false)}>
													Cancel
												</button>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default AddItemModal;
