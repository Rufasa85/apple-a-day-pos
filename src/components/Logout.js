import { useState } from 'react';

import { Modal } from '../components';
import { api } from '../utils';

const Logout = ({ className }) => {
	const [visible, setVisible] = useState(false);

	const modalOptions = {
		visible,
		setVisible,
		title: 'Logout',
		description: 'Are you sure you want to logout?',
		buttonText: 'Logout',
		buttonClassName: 'button-danger',
		onSubmit: api.logout
	};

	return (
		<div className='sm:w-auto w-full'>
			<div className='inset-0 flex items-center sm:justify-center justify-end'>
				<button onClick={() => setVisible(true)} className={className}>
					Logout
				</button>
			</div>

			<Modal options={modalOptions} />
		</div>
	);
};

export default Logout;
