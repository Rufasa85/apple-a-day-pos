import { useState, useRef } from 'react';

import { Icon } from '../components';

const DateInput = ({ name = 'date', placeholder, value = '', onChange = (e) => console.log(e), className = '' }) => {
	const [showPlaceholder, setShowPlaceholder] = useState(true);
	const inputRef = useRef(null);

	const handleClicks = (e) => {
		if (showPlaceholder) {
			inputRef.current.focus();
			setShowPlaceholder(false);
		}
	};

	const handleChange = (e) => {
		onChange(e);

		if (showPlaceholder) {
			setShowPlaceholder(false);
		}
	};

	return (
		<div className={className + ' cursor-pointer relative flex items-center'}>
			<span onClick={handleClicks} className='absolute inset-y-0 left-2 z-10 flex items-center'>
				<Icon.Date className='h-5 w-5 stroke-gray-400' />
			</span>

			<span className='sr-only'>Date</span>

			<input type='date' name={name} autoComplete='off' ref={inputRef} onClick={handleClicks} value={value} onChange={handleChange} className='input-with-icon' />

			{showPlaceholder && !value && (
				<span onClick={handleClicks} className='px-7 mx-2 text-gray-400 bg-white absolute sm:text-sm text-base flex items-center'>
					{placeholder}
				</span>
			)}
		</div>
	);
};

export default DateInput;
