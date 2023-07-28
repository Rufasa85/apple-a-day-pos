import { useState, useEffect } from 'react';

// query: input state
// setQuery: input state setter
// data: typeahead terms
export default function TypeaheadInput({ query, setQuery, data }) {
	const [placeholder, setPlaceholder] = useState('Enter Name');
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(true);

	const handleInputChange = (e) => {
		const search = e.target.value;

		const haveSuggestions = suggestions.length > 0 && search.length > 0;
		setShowSuggestions(haveSuggestions);

		const filteredData = search === '' ? data : data.filter((item) => item.toLowerCase().replace(/\s+/g, '').includes(query?.toLowerCase().replace(/\s+/g, '')));
		setSuggestions(filteredData);

		setQuery(search);
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
		if (suggestions.length) {
			setPlaceholder(suggestions[0]);
		}
	}, [suggestions]);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};

		// eslint-disable-next-line
	}, []);

	return (
		<div onClick={() => setShowSuggestions(false)} className='relative flex flex-col w-full'>
			<input type='text' placeholder={placeholder} value={query} onChange={handleInputChange} className='border-gray-300 shadow-sm flex w-full rounded-md' />

			{query?.length > 0 && suggestions.length > 0 && showSuggestions ? (
				<div className='h-fit max-h-60 overflow-auto mt-2 shadow-xl w-full top-full rounded-md bg-white absolute flex flex-col'>
					<ol className='w-full h-fit rounded-md flex flex-col'>
						{suggestions.map((suggestion, i) => {
							if (suggestion === '') return null;

							return (
								<li key={'typeahead-term-' + i} onClick={() => setQuery(suggestion)} className='hover:bg-blue-600 hover:text-white hover:cursor-pointer flex px-4 py-2'>
									{suggestion}
								</li>
							);
						})}
					</ol>
				</div>
			) : null}
		</div>
	);
}
