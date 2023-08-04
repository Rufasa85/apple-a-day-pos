import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';

import { SearchInput, Typeahead } from '../components';
import { api, classCondition, compare } from '../utils';

export default function AddItem({ refetch }) {
	const [allItems, setAllItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState({});
	const [itemQuery, setItemQuery] = useState({ id: null, value: '' });
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState(false);

	const { isLoading } = useQuery({
		queryKey: ['all-items'],
		queryFn: () => api.getAllItems(),

		onSuccess: (response) => {
			if (response.data) {
				const itemObjects = response.data.map(({ id, name }) => ({ id, name, typeaheadValue: name }));

				setAllItems(itemObjects);
			}
		}
	});

	const filterItems = (query) => {
		const noInput = !query.name;
		const data = { exact: [], close: [] };

		if (noInput) {
			data.close.push(...allItems);
			return data;
		}

		allItems.forEach((item) => {
			const exactMatch = compare.stringsExact(item.name, query.name);

			if (exactMatch) {
				data.exact.push(item);
				return;
			}

			const closeMatch = compare.stringIncludes(item.name, query.name);

			if (closeMatch) {
				data.close.push(item);
			}
		});

		return data;
	};

	const handleInputChange = (e) => {
		const query = {
			name: e.target.value
		};

		const filteredData = filterItems(query);
		setFilteredItems(filteredData);

		const exactMatch = filteredData.exact.length === 1 ? filteredData.exact[0] : null;
		setItemQuery(exactMatch || query);
	};

	const addItem = async (e) => {
		e.preventDefault();

		try {
			const itemObject = {
				id: itemQuery.id,
				name: itemQuery.name.trim()
			};

			if (!itemObject.name) return;

			const response = await api.createItem(itemObject);

			if (response?.status === 200) {
				setVisible(false);
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
			<button onClick={() => setVisible(true)} className='h-72 rounded-3xl add-button'>
				<div className='item-button-content'>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='3 3 18 18' strokeWidth={1.5} stroke='currentColor' className='w-16 h-16'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
					</svg>

					<h2 className='text-2xl font-semibold'>Add Menu Item</h2>
				</div>
			</button>

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
								<form onSubmit={addItem} className='modal'>
									<div className='gap-2 flex flex-col w-full'>
										<Dialog.Title as='h3' className='text-lg font-semibold text-gray-900'>
											Add Item
										</Dialog.Title>

										<Dialog.Description>Search or add an item for today's menu.</Dialog.Description>
									</div>

									<div className='relative'>
										<SearchInput placeholder={allItems[0]?.name || 'Add or Search'} value={itemQuery.name} onChange={handleInputChange} />

										<Typeahead isQuery={!!itemQuery.name} data={filteredItems} setSelection={setItemQuery} />
									</div>

									{error && <p className='input-error'>Sorry, something went wrong.</p>}

									<div className='modal-buttons'>
										<button type='button' onClick={() => setVisible(false)} className='button-secondary'>
											Cancel
										</button>

										<button type='submit' className={classCondition(itemQuery?.value?.length < 1 ? 'button-primary-off' : 'button-primary')}>
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
