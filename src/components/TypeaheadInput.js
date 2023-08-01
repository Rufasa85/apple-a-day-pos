import { useState, useEffect } from 'react';

// query: selected or input value
// query format: { id: number | null, value: string }
// setQuery: input state setter
// data: typeahead terms
// data format: Array({ id: number, value: string })
export default function TypeaheadInput({ query, setQuery, data }) {
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(true);

	const handleInputChange = (e) => {
		const inputValue = e.target.value;

		const haveSuggestions = suggestions.length > 0 && inputValue.length > 0;
		setShowSuggestions(haveSuggestions);

		const filteredData = inputValue === '' ? data : data.filter((item) => item.value.toLowerCase().replace(/\s+/g, '').includes(query?.value?.toLowerCase().replace(/\s+/g, '')));
		setSuggestions(filteredData);

		const dataMatch = filteredData.length === 1 ? filteredData[0] : null;
		setQuery(dataMatch || { id: null, value: inputValue });
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			setShowSuggestions(false);
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
			<label className='relative block'>
				{/* search icon - magnifying glass */}
				<span className='absolute inset-y-0 left-2 flex items-center'>
					<svg className='h-5 w-5 fill-slate-300' viewBox='0 0 20 20'>
						<path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path>
					</svg>
				</span>

				<span className='sr-only'>Search</span>

				<input type='search' name='search' placeholder={data[0]?.value || 'Add or Search'} autoComplete='off' value={query?.value} onChange={handleInputChange} className='input-with-icon' />
			</label>

			{query?.value?.length > 0 && suggestions.length > 0 && showSuggestions ? (
				<div className='h-fit max-h-60 overflow-auto mt-2 shadow-xl w-full top-full rounded-md bg-white absolute flex flex-col z-10'>
					<ol className='w-full h-fit rounded-md flex flex-col divide-y'>
						{suggestions.map((suggestion) => {
							if (suggestion.value === '') return null;

							return (
								<li key={'typeahead-term-' + suggestion.id} onClick={() => setQuery(suggestion)} className='input-with-icon ring-0 rounded-none shadow-none hover:shadow-none hover:bg-blue-600 hover:text-white hover:font-semibold hover:cursor-pointer'>
									{suggestion.value}
								</li>
							);
						})}
					</ol>
				</div>
			) : null}
		</div>
	);
}
