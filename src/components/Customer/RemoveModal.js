import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const RemoveModal = ({ visible, setVisible, customer, setCustomer }) => {
	const handleClick = () => {
		const storedOrder = JSON.parse(localStorage.getItem('order'));

		if (storedOrder) {
			storedOrder.customer = null;
			localStorage.setItem('order', JSON.stringify(storedOrder));
		}

		setCustomer(null);
		setVisible(false);
	};

	const injectCustomer = (
		<span className='font-semibold'>
			{customer.firstName} {customer.lastName}
		</span>
	);

	return (
		<Transition.Root show={visible} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={setVisible}>
				{/* Modal background */}
				<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
					<div className='modal-background' />
				</Transition.Child>

				{/* Modal body */}
				<div className='flex min-h-full items-center justify-center p-6 sm:p-0 fixed inset-0 z-10'>
					<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
						<Dialog.Panel className='relative overflow-hidden rounded-lg shadow-xl text-left transition-all sm:my-8 sm:w-full sm:max-w-lg'>
							<div className='modal'>
								<div className='gap-2 flex flex-col w-full'>
									<Dialog.Title as='h3' className='text-lg font-semibold text-gray-900'>
										Remove Customer
									</Dialog.Title>

									<Dialog.Description>Are you sure you want to remove {customer ? injectCustomer : 'the customer'} from this order?</Dialog.Description>
								</div>

								<div className='modal-buttons'>
									<button type='button' onClick={() => setVisible(false)} className='button-secondary'>
										Cancel
									</button>

									<button type='button' onClick={handleClick} className='button-danger'>
										Remove
									</button>
								</div>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default RemoveModal;
