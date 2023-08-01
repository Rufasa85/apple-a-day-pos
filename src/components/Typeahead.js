import { useState, useEffect } from 'react';

export default function Typeahead({ isQuery, data = [], setSelection }) {
	const [showSuggestions, setShowSuggestions] = useState(true);

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

	return isQuery && showSuggestions ? (
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
