import { useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import classNames from '../utils/classNames';

export default function Example() {
	const { pathname } = useLocation();

	const navigation = [
		{ name: 'New Day', href: '/new-shift' },
		{ name: 'Service', href: '/service' },
		{ name: 'Reports', href: '/reports' }
	];

	return (
		<Disclosure as='nav' className='bg-gray-200 shadow-lg shadow-gray-100'>
			{({ open }) => (
				<>
					<div className='mx-auto py-2 px-8'>
						<div className='relative flex h-16 items-center justify-center'>
							<div className='absolute inset-y-0 right-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>Open main menu</span>
									{open ? <XMarkIcon className='block h-6 w-6' aria-hidden='true' /> : <Bars3Icon className='block h-6 w-6' aria-hidden='true' />}
								</Disclosure.Button>
							</div>

							<div className='flex items-center sm:items-stretch sm:justify-start'>
								<div className='absolute inset-y-0 left-0 flex flex-shrink-0 items-center'>
									<h1 className='text-4xl'>🍎</h1>
								</div>

								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex gap-4'>
										{navigation.map((item) => (
											<a key={item.name} href={item.href} className={classNames(item.href === pathname ? 'bg-gray-700 text-white' : ' hover:bg-gray-300', 'rounded-md px-3 py-2  font-medium')} aria-current={item.current ? 'page' : undefined}>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Mobile menu */}
					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pb-3 pt-2'>
							{navigation.map((item) => (
								<Disclosure.Button key={item.name} as='a' href={item.href} className={classNames(item.href === pathname ? 'bg-gray-700 text-white' : ' hover:bg-gray-300', 'block rounded-md px-3 py-2 text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
