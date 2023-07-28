import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { api } from '../utils';

export default function ItemInput({ query, setQuery, addItem }) {
	const [items, setItems] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(true);

	const { isLoading } = useQuery({
		queryKey: ['all-items'],
		queryFn: () => api.getAllItems(),

		onSuccess: (response) => {
			if (response.data) {
				const allItemNames = response.data.map((item) => item.name);
				setItems(allItemNames);
				setSuggestions(allItemNames);
			}
		}
	});

	const handleInputChange = (e) => {
		const search = e.target.value;

		const haveSuggestions = suggestions.length > 0 && search.length > 0;
		setShowSuggestions(haveSuggestions);

		const filteredItems = search === '' ? items : items.filter((item) => item.toLowerCase().replace(/\s+/g, '').includes(query?.toLowerCase().replace(/\s+/g, '')));
		setSuggestions(filteredItems);

		setQuery(search);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			setShowSuggestions(false);
		}

		if (e.key === 'Enter' && !showSuggestions) {
			addItem();
		}

		if (e.key === 'Tab') {
			e.preventDefault();
			setShowSuggestions(false);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};

		// eslint-disable-next-line
	}, []);

	return (
		<div onClick={() => setShowSuggestions(false)} className='relative flex flex-col w-full'>
			<input type='text' placeholder='Soup' value={query} onChange={handleInputChange} className='border-gray-300 shadow-sm flex w-full rounded-md' />

			{query?.length > 0 && suggestions.length > 0 && showSuggestions ? (
				<div className='h-fit max-h-60 overflow-auto mt-2 shadow-xl w-full top-full rounded-md bg-white absolute flex flex-col'>
					<ol className='w-full h-fit rounded-md flex flex-col'>
						{suggestions.map((item, i) => {
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
