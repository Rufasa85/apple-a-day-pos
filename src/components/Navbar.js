import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { Logout } from '../components';
import { classCondition } from '../utils';

const Navbar = () => {
	const { pathname } = useLocation();

	const navigation = [
		{ name: 'Service', href: '/service' },
		{ name: 'Reports', href: '/reports/shifts' }
	];

	return (
		<Disclosure as='nav' className='z-10 bg-gray-900 shadow-lg shadow-gray-400/25 box-border absolute w-screen h-[84px]'>
			{({ open }) => (
				<>
					<div className='px-8 py-6 grid grid-cols-3 items-center relative mx-auto'>
						<div className='px-3 flex'>
							<h1 className='text-3xl rounded-full flex justify-center items-center'>🍎</h1>
						</div>

						<div className='relative flex items-center justify-center'>
							<div className='flex items-center sm:items-stretch sm:justify-start'>
								<div className='hidden sm:ml-6 sm:block'>
									<nav className='gap-0.5 ring-2 ring-gray-50 bg-gray-50 rounded-md flex justify-center items-center'>
										{navigation.map((item) => (
											<Link key={item.name} to={item.href} className={classCondition(item.name.toLowerCase() === pathname.split("/")[1] ? 'bg-gray-900 text-white cursor-default peer/active' : 'hover:bg-gray-200 ring-inset ring-2 ring-gray-50', 'w-36 rounded-md px-4 py-2 font-semibold text-sm flex justify-center items-center')} aria-current={item.current ? 'page' : undefined}>
												{item.name}
											</Link>
										))}
									</nav>
								</div>
							</div>
						</div>

						<div className='hidden sm:flex justify-end'>
							<Logout className='button-base text-white ring-0 hover:bg-gray-800' />
						</div>

						<div className='flex justify-end sm:hidden'>
							{/* Mobile menu button*/}
							<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-1 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
								<span className='sr-only'>Open main menu</span>
								{open ? <XMarkIcon className='stroke-slate-300 block h-8 w-8' aria-hidden='true' /> : <Bars3Icon className='stroke-slate-300 block h-8 w-8' aria-hidden='true' />}
							</Disclosure.Button>
						</div>
					</div>

					{/* Mobile menu */}
					<Disclosure.Panel className='sm:hidden'>
						<div className='gap-2 grid grid-flow-row px-2 pb-3 pt-2 bg-gray-50 text-right'>
							{navigation.map((item) => (
								<Link key={item.name} to={item.href} className={classCondition(item.name.toLowerCase() === pathname.split("/")[1] ? 'bg-gray-800 text-white' : 'hover:bg-gray-200', 'block rounded-md px-8 py-2 text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
									{item.name}
								</Link>
							))}

							<hr className='my-px h-px w-full bg-gray-800/20 flex border-0 sm:hidden' />

							<div className='w-full sm:hidden flex'>
								<Logout className='px-8 py-2 rounded-md text-right hover:bg-gray-200 cursor-pointer w-full' />
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Navbar;
