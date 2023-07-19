import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import * as emoji from 'node-emoji';
import dayjs from 'dayjs';

import Loading from '../components/Loading';
import api from '../utils/API';
import foodEmojis from '../utils/emojis';
import twColors from '../utils/twColors';
import classCondition from '../utils/classCondition';

const NewShift = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [allItems, setAllItems] = useState([]);
	const [todaysItems, setTodaysItems] = useState([]);
	const [itemNameInput, setItemNameInput] = useState('');
	const [itemStockInput, setItemStockInput] = useState(0);

	const currentDay = dayjs().format('MMMM D, YYYY');

	// const availableColors = [...twColors.colors];
	// console.log(availableColors);

	const getAllItems = async () => {
		try {
			const axiosRes = await api.getAllItems();

			if (axiosRes.status === 200) {
				setAllItems(axiosRes.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getTodaysItems = async () => {
		try {
			const axiosRes = await api.getTodaysItems();

			if (axiosRes.status === 200) {
				setTodaysItems(axiosRes.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getEmoji = (search) => {
		const terms = search.toLowerCase().split(' ');

		let foundEmoji = false;

		for (let i = 0; i < terms.length; i++) {
			const term = terms[i];
			const res = emoji.search(term);

			for (let i = 0; i < res.length; i++) {
				const resObject = res[i];
				const isFood = foodEmojis.some((food) => resObject.name?.includes(food));

				if (isFood) {
					foundEmoji = resObject.emoji;
				}
			}
		}

		return foundEmoji || <img src='./assets/icons/food-icon.png' alt='food-icon' className='h-32' />;
	};

	useEffect(() => {
		getAllItems();
		getTodaysItems();
	}, []);

	return (
		<main className='px-24 py-8 gap-8 flex flex-col'>
			<header className='p-4 gap-1 flex flex-col place-content-center place-items-center  rounded-3xl'>
				<h1 className='text-4xl font-medium'>Today's Menu</h1>
				<h3 className='text-xl font-light'>{currentDay}</h3>
			</header>

			{!todaysItems ? (
				<Loading />
			) : (
				<section className='grid grid-cols-2 gap-8'>
					{todaysItems.length > 0 &&
						todaysItems.map(({ id, name }, i) => {
							return (
								<button key={`menuitem-${id}`} className={classCondition(twColors.getColorClasses(i), 'p-12 h-72 gap-4 flex grow flex-col place-content-center place-items-center rounded-3xl border-2 opacity-95 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:shadow-md active:shadow-gray-200 active:opacity-100')}>
									<h2 className='text-9xl font-semibold'>{getEmoji(name)}</h2>
									<h2 className='text-3xl font-semibold'>{name}</h2>
								</button>
							);
						})}

					<button className='p-12 h-72 gap-4 flex grow flex-col place-content-center place-items-center bg-slate-50 text-slate-400 rounded-3xl border-dashed border border-current opacity-95 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:bg-slate-100 active:shadow-lg active:shadow-gray-200 active:opacity-100' onClick={() => setModalVisible(true)}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-36 h-36'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
						</svg>

						<h2 className='text-3xl font-semibold'>Add Menu Item</h2>
					</button>
				</section>
			)}

			{/* Add item modal */}
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

												<form className='flex flex-col gap-6 w-full'>
													<div className='relative flex flex-col gap-1 w-full'>
														<label htmlFor='name' className='block text-sm text-left font-medium text-gray-900'>
															Name
														</label>

														<input type='text' name='name' placeholder='Soup' value={itemNameInput} onChange={(e) => setItemNameInput(e.target.value)} id='name' className='block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />

														{allItems.length > 0 && (
															<ol className='flex flex-col text-left w-full h-36 rounded-md border bg-white overflow-scroll px-3 mt-3 divide-y divide-solid'>
																{allItems
																	.filter(({ name }) => name.toLowerCase().startsWith(itemNameInput.toLowerCase()))
																	.map(({ id, name }) => (
																		<li key={`typeahead-${id}`} onClick={() => setItemNameInput(name)} className='text-sm px-1 py-2 text-gray-900'>
																			<button className=''>{name}</button>
																		</li>
																	))}
															</ol>
														)}
													</div>

													<div className='flex flex-col gap-1 w-full'>
														<label htmlFor='stock' className='block text-sm text-left font-medium text-gray-900'>
															Stock
														</label>

														<input type='number' name='stock' placeholder='200' value={itemStockInput} onChange={(e) => e.target.value >= 0 && setItemStockInput(e.target.value)} id='stock' className='block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
													</div>
												</form>

												<div className='sm:flex sm:flex-row-reverse'>
													<button type='button' className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto' onClick={() => setModalVisible(false)}>
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
		</main>
	);
};

export default NewShift;
