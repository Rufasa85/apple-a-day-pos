import { Icon } from '../components';

const SearchInput = ({ name = 'search', placeholder = 'Search', value = '', onChange = (e) => console.log(e), className = '' }) => {
	return (
		<div className={className + ' relative flex items-center'}>
			<span className='absolute inset-y-0 left-2 z-10 flex items-center'>
				<Icon.Search className='h-5 w-5 fill-gray-400' />
			</span>

			<span className='sr-only'>Search</span>

			<input type='search' name={name} placeholder={placeholder} autoComplete='off' value={value} onChange={onChange} className='input-with-icon' />
		</div>
	);
};

export default SearchInput;
