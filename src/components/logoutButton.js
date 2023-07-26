import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { api } from '../utils';

export default function LogoutButton({ className }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		api.logout();
	};

	return (
		<div className={className}>
			<div className='inset-0 flex items-center justify-center'>
				<button onClick={() => setIsOpen(true)} className='w-full justify-center shadow-sm sm:w-auto'>
					Logout
				</button>
			</div>

			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={setIsOpen}>
					{/* Modal background */}
					<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-md transition-opacity' />
					</Transition.Child>

					{/* Modal body */}
					<div className='flex min-h-full items-center justify-center p-6 sm:p-0 fixed inset-0 z-10'>
						<Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
							<Dialog.Panel className='relative overflow-hidden rounded-lg shadow-xl text-left transition-all sm:my-8 sm:w-full sm:max-w-lg'>
								<div className='gap-6 flex flex-col w-full p-6 bg-white'>
									<div className='gap-2 flex flex-col w-full'>
										<Dialog.Title as='h3' className='text-lg font-semibold text-gray-900'>
											Logout
										</Dialog.Title>

										<Dialog.Description>Are you sure you want to logout?</Dialog.Description>
									</div>

									<div className='gap-3 flex justify-end w-full'>
										<button type='button' onClick={() => setIsOpen(false)} className='w-full justify-center rounded-md bg-white px-4 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto'>
											Cancel
										</button>

										<button type='button' onClick={handleLogout} className='w-full justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto'>
											Logout
										</button>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
}
