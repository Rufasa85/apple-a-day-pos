import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { api } from '../utils';

export default function ItemInput({ query, setQuery, addItem }) {
	const [items, setItems] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(true);

	const filteredItems = query === '' ? items : items.filter((item) => item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));

	const { data: response, isLoading } = useQuery({
		queryKey: ['all-items'],
		queryFn: () => api.getAllItems()
	});

	const handleInputChange = (e) => {
		setQuery(e.target.value);
		setShowSuggestions(true);
	};

	useEffect(() => {
		if (isLoading) return;

		const data = response?.data;
		const status = response?.status;

		if (status === 200) {
			const allItemNames = data.map((item) => item.name);
			setItems(allItemNames);
		}

		window.addEventListener('keydown', (e) => {
			if (e.isComposing) return;

			if (e.key === 'Enter' || e.key === 'Tab' || e.key === 'Escape') {
				e.preventDefault();
				setShowSuggestions(false);
			}

			if (e.key === 'Enter' && (!showSuggestions || filteredItems.length === 0)) {
				addItem();
			}
		});

		// eslint-disable-next-line
	}, [isLoading]);

	return (
		<div onClick={() => setShowSuggestions(false)} className='relative flex flex-col w-full'>
			<input type='text' placeholder='Soup' value={query} onChange={handleInputChange} className='border-gray-300 shadow-sm flex w-full rounded-md' />

			{query.length > 0 && filteredItems.length > 0 && showSuggestions ? (
				<div className='h-fit max-h-60 overflow-auto mt-2 shadow-xl w-full top-full rounded-md bg-white absolute flex flex-col'>
					<ol className='w-full h-fit rounded-md flex flex-col'>
						{filteredItems.map((item, i) => {
							if (item === '') return null;

							return (
								<li key={'typeahead-term-' + i} onClick={() => setQuery(item)} className='hover:bg-blue-600 hover:text-white hover:cursor-pointer flex px-4 py-2'>
									{item}
								</li>
							);
						})}
					</ol>
				</div>
			) : null}
		</div>
	);
}
