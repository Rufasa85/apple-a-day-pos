import { useState } from 'react';
import dayjs from 'dayjs';

import { Icons, Modal } from '../../components';

const Card = ({ customer, setCustomer }) => {
	const [visible, setVisible] = useState(false);
	const { firstName, lastName, dateOfBirth } = customer;

	const month = dayjs(dateOfBirth).format('MM');
	const day = dayjs(dateOfBirth).format('DD');
	const year = dayjs(dateOfBirth).format('YYYY');

	const dateSeperator = <span className='mx-px text-gray-400'>/</span>;

	const handleRemove = (e) => {
		e.preventDefault();

		setCustomer(null);
		localStorage.removeItem('customer');

		setVisible(false);
	};

	const dynamicDescription = (
		<p>
			Are you sure you want to remove{' '}
			<span className='font-semibold'>
				{customer.firstName} {customer.lastName}
			</span>{' '}
			from this order?
		</p>
	);

	const modalOptions = {
		visible,
		setVisible,
		title: 'Remove Customer',
		description: dynamicDescription,
		buttonText: 'Remove',
		buttonClassName: 'button-danger',
		onSubmit: handleRemove
	};

	return (
		<div onClick={() => setVisible(true)} className='p-5 bg-white ring-inset ring-1 ring-gray-200 shadow shadow-gray-200 cursor-pointer h-20 gap-3 rounded-2xl w-full flex relative'>
			<div className='ring-2 ring-gray-900 rounded-full aspect-square h-full overflow-hidden justify-center flex'>
				<Icons.User className='w-12 h-12 fill-gray-900' />
			</div>

			<div className='h-full justify-center items-center grow flex flex-col'>
				<div className='sm:text-sm text-base w-full justify-between flex'>
					<div className='gap-1 h-fit justify-end items-end flex'>
						<p className='font-semibold'>{firstName}</p>
					</div>
				</div>

				<div className='sm:text-sm text-base w-full justify-between flex'>
					<div className='gap-1 h-fit justify-end items-end flex'>
						<p className=''>{lastName}</p>
					</div>

					{dateOfBirth && (
						<div className='gap-1 h-full justify-end items-end flex'>
							<p className='items-end flex'>
								{month}
								{dateSeperator}
								{day}
								{dateSeperator}
								{year}
							</p>

							<Icons.Cake className='my-[3px] w-4 h-4 fill-gray-900' />
						</div>
					)}
				</div>
			</div>

			<p className='text-gray-400 hover:text-red-600 p-px inset-0 top-full w-full text-center sm:text-sm text:base absolute'>Remove Customer</p>

			<Modal options={modalOptions} />
		</div>
	);
};

export default Card;
