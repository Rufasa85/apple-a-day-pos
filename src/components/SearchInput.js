export default function SearchInput({ name = 'search', placeholder = 'Search', value = '', onChange = (e) => console.log(e), className = '' }) {
	return (
		<div className={className + ' relative flex items-center'}>
			{/* search icon */}
			<span className='absolute inset-y-0 left-2 z-10 flex items-center'>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' className='h-5 w-5 fill-gray-400'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'></path>
				</svg>
			</span>

			<span className='sr-only'>Search</span>

			<input type='search' name={name} placeholder={placeholder} autoComplete='off' value={value} onChange={onChange} className='input-with-icon' />
		</div>
	);
}
