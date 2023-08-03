import { useState, useRef } from 'react';

export default function DateInput({ name = 'date', placeholder = new Date(), value = '', onChange = (e) => console.log(e), className = '' }) {
	const [showPlaceholder, setShowPlaceholder] = useState(true);
	const inputRef = useRef(null);

	const handleClicks = (e) => {
		if (showPlaceholder) {
			inputRef.current.focus();
			setShowPlaceholder(false);
		}
	};

	return (
		<div className={className + ' cursor-pointer relative flex items-center'}>
			{/* calendar icon */}
			<span className='absolute inset-y-0 left-2 z-10 flex items-center'>
				<svg onClick={handleClicks} fill='none' viewBox='0 0 24 24' strokeWidth='1.8' className='h-5 w-5 stroke-gray-400'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z' />
				</svg>
			</span>

			<span className='sr-only'>Date</span>

			<input type='date' name={name} placeholder={placeholder} autoComplete='off' ref={inputRef} onClick={handleClicks} value={value} onChange={onChange} className='input-with-icon' />

			{/* placeholder */}
			{showPlaceholder && (
				<span onClick={handleClicks} className='px-7 mx-2 text-gray-400 bg-white absolute sm:text-sm text-base flex items-center'>
					{placeholder}
				</span>
			)}
		</div>
	);
}
