import { useState, useRef } from 'react';

export default function SearchInput({ type = 'search', name = 'search', id = '', value = '', onChange = '', placeholder = 'Search', className = '' }) {
	const [showDatePlaceholder, setShowDatePlaceholder] = useState(type === 'date');
	const inputRef = useRef(null);

	const handleInputChange = (e) => {
		setShowDatePlaceholder(false);

		onChange(e.target.value);
	};

	const handleDateClick = () => {
		setShowDatePlaceholder(false);

		if (showDatePlaceholder) {
			inputRef.current.focus();
		}
	};

	return (
		<div className={'relative flex items-center ' + className}>
			{/* search icon - magnifying glass */}
			<span className='absolute inset-y-0 left-2 z-10 flex items-center'>
				<svg className='h-5 w-5 fill-slate-300' viewBox='0 0 20 20'>
					<path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path>
				</svg>
			</span>

			<span className='sr-only'>Search</span>

			<input type={type} name={name} id={id} placeholder={placeholder} autoComplete='off' ref={inputRef} onClick={handleDateClick} value={value} onChange={handleInputChange} className='input-with-icon' />

			{/* date placeholder */}
			{type === 'date' && showDatePlaceholder && (
				<span onClick={handleDateClick} className='px-7 mx-2 text-gray-400 bg-white absolute sm:text-sm text-base flex items-center'>
					{placeholder}
				</span>
			)}
		</div>
	);
}
