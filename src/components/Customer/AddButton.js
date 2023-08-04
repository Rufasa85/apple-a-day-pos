import { useState } from 'react';

import AddModal from './AddModal';

const AddButton = ({ setCustomer }) => {
	const [visible, setVisible] = useState(false);

	return (
		<button onClick={() => setVisible(true)} className='h-20 add-button'>
			<div className='gap-3 w-full justify-center items-center flex'>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='3 3 18 18' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
				</svg>

				<h2 className='text-lg font-semibold'>Add Customer</h2>
			</div>

			<AddModal visible={visible} setVisible={setVisible} setCustomer={setCustomer} />
		</button>
	);
};

export default AddButton;
