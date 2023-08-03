import { useState, useEffect } from 'react';

import { classCondition } from '../utils';

const defaultData = { exact: [], close: [], partial: [], date: [] };

export default function Typeahead({ data = defaultData, setSelection }) {
	const [showSuggestions, setShowSuggestions] = useState(true);
	const dataKeyArray = Object.keys(data);

	console.log(data);

	const handleClick = (item) => {
		setSelection(item);
		setShowSuggestions(false);
	};

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

	return showSuggestions && dataKeyArray.some((key) => data[key].length > 0) ? (
		<div className='mt-2 max-h-60 shadow-xl w-full h-fit top-full overflow-y-auto ring-inset ring-1 ring-gray-200 rounded-lg bg-white absolute flex flex-col z-10'>
			<ol className='w-full h-fit rounded-lg flex flex-col'>
				{dataKeyArray.map((key) =>
					data[key].map((item) => (
						<li key={'typeahead-term-' + item.id} onClick={() => handleClick(item)} className={classCondition(key === 'partial' ? 'font-thin' : '', 'group px-9 py-2 sm:text-sm text-base hover:bg-blue-600 hover:text-white hover:font-semibold hover:cursor-pointer flex items-center')}>
							{/* search icon */}
							{key === 'exact' && (
								<span className='absolute left-2 z-10 flex items-center'>
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2.8' className='h-4 w-5 stroke-green-600 group-hover:stroke-white'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' className='' />
									</svg>
								</span>
							)}

							{item.typeaheadValue}
						</li>
					))
				)}
			</ol>
		</div>
	) : null;
}
