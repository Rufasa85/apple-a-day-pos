import { useState, useRef } from 'react';

import { classCondition } from '../utils';

export default function SearchInput({ type = 'search', name = 'search', value = '', onChange = '', placeholder = 'Search', className = '' }) {
	const [showDatePlaceholder, setShowDatePlaceholder] = useState(type === 'date');
	const inputRef = useRef(null);

	const handleDateClicks = (e) => {
		if (type === 'date' && showDatePlaceholder) {
			inputRef.current.focus();
			setShowDatePlaceholder(false);
		}
	};

	return (
		<div className={classCondition(type === 'date' ? 'cursor-pointer' : '', 'relative flex items-center', className)}>
			{/* search icon or calendar icon */}
			<span className='absolute inset-y-0 left-2 z-10 flex items-center'>
				{type === 'date' ? (
					<svg onClick={handleDateClicks} fill='none' viewBox='0 0 24 24' strokeWidth='1.8' className='h-5 w-5 stroke-gray-400'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z' />
					</svg>
				) : (
					<svg viewBox='0 0 20 20' className='h-5 w-5 fill-gray-400'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'></path>
					</svg>
				)}
			</span>

			<span className='sr-only'>Search</span>

			<input type={type} name={name} placeholder={placeholder} autoComplete='off' ref={inputRef} onClick={handleDateClicks} value={value} onChange={onChange} className='input-with-icon' />

			{/* date placeholder */}
			{type === 'date' && showDatePlaceholder && (
				<span onClick={handleDateClicks} className='px-7 mx-2 text-gray-400 bg-white absolute sm:text-sm text-base flex items-center'>
					{placeholder}
				</span>
			)}
		</div>
	);
}
