import { useState, useEffect } from 'react';

export default function Typeahead({ query, data = [], setSelection }) {
	const [queryString, setQueryString] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(true);

	const queryMatchesData = (dataItem) => {
		for (const key in query) {
			const dataValue = dataItem[key];
			const queryValue = query[key];

			console.log(dataValue, queryValue);

			const valuesMatch = dataValue.toLowerCase().replace(/\s+/g, '').includes(queryValue.toLowerCase().replace(/\s+/g, ''));
			return valuesMatch;
		}
	};

	useEffect(() => {
		const concatQueryValues = Object.values(query).join('');
		setQueryString(concatQueryValues);

		const haveSuggestions = suggestions.length > 0 && queryString.length > 0;
		setShowSuggestions(haveSuggestions);

		const filteredData = queryString === '' ? data : data.filter(queryMatchesData);
		setSuggestions(filteredData);

		const dataMatch = filteredData.length === 1 ? filteredData[0] : null;
		setSelection(dataMatch || query);
	}, []);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === 'Tab') {
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

	return queryString?.length > 0 && showSuggestions ? (
		<div className='mt-2 max-h-60 shadow-xl w-full h-fit top-full overflow-y-auto ring-inset ring-1 ring-gray-200 rounded-lg bg-white absolute flex flex-col z-10'>
			<ol className='w-full h-fit rounded-lg flex flex-col'>
				{data.map((item) => {
					if (item.typeaheadValue === '') return null;

					return (
						<li key={'typeahead-term-' + item.id} onClick={() => setSelection(item)} className='px-9 py-2 sm:text-sm text-base hover:bg-blue-600 hover:text-white hover:font-semibold hover:cursor-pointer'>
							{item.typeaheadValue}
						</li>
					);
				})}
			</ol>
		</div>
	) : null;
}
