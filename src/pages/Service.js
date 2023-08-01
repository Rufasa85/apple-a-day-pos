import React, { useState } from 'react';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { AddCustomer, AddItem, Loading } from '../components';
import { api, classCondition, getEmoji, twColors } from '../utils';

const Service = ({ UserId }) => {
	const [items, setItems] = useState([]);
	const [customer, setCustomer] = useState({ firstName: '', lastName: '', dateOfBirth: '' });
	const [customerValue, setCustomerValue] = useState({ id: null, value: '' });
	const [order, setOrder] = useState({});
	const [itemCount, setItemCount] = useState(0);
	const [ShiftId, setShiftId] = useState(0);

	const today = dayjs().format('MM/DD/YYYY');
	const longDate = dayjs().format('dddd, MMMM D, YYYY');

	const { isLoading: itemsLoading, refetch: itemRefetch } = useQuery({
		queryKey: `items-${today}`,
		queryFn: () => api.getTodaysItems(UserId),

		onSuccess: (response) => {
			if (response?.data?.ShiftItems) {
				const itemObjects = response.data.ShiftItems.map((shiftItem) => {
					const { createdAt, Item } = shiftItem;
					const { id, name } = Item;

					return { id, name, createdAt };
				});

				setShiftId(response.data.id);
				setItems(itemObjects);
			}
		}
	});

	const reset = () => {
		setCustomerValue({ id: null, value: 'NONE' });
		setItemCount(0);
		setOrder({});
	};

	const submitOrder = async () => {
		const confirmed = window.confirm(`Are you sure you'd like to submit this order?`);

		if (confirmed) {
			const CustomerId = customerValue.id;
			const ItemIds = [];

			for (const key in order) {
				for (let i = 0; i > order[key].count; i++) {
					ItemIds.push(key);
				}
			}

			const res = await api.createOrder({
				ShiftId,
				CustomerId,
				ItemIds
			});

			if (res.status === 200) {
				console.log('order added!');
				reset();
			} else {
				window.alert('order failed');
			}
		}
	};

	const addToOrder = (id, name) => {
		if (id in order) {
			order[id].count = order[id].count + 1;
		} else {
			order[id] = { name, count: 1 };
		}

		setItemCount(itemCount + 1);
	};

	const decrementItem = (ItemId) => {
		const newOrder = { ...order };

		newOrder[ItemId].count = newOrder[ItemId].count - 1;
		setOrder(newOrder);
	};

	return (
		<main className='pt-[84px] w-screen h-screen max-w-screen max-h-screen flex'>
			<section className='p-4 overflow-y-auto w-full h-full max-w-[75%] max-h-full flex flex-col'>
				<header className='p-4 flex flex-col place-content-center'>
					<h3 className='section-headline'>{longDate}</h3>
				</header>

				{itemsLoading ? (
					<Loading />
				) : (
					<div className='p-4 gap-8 w-full grid auto-rows-min sm:grid-cols-2 grid-cols-1'>
						{items &&
							items
								.sort((a, b) => a.createdAt > b.createdAt)
								.map(({ id, name }, i) => {
									return (
										<button key={`menuitem-${id}`} onClick={() => addToOrder(id, name)} className={classCondition(twColors.getColorClass(i), 'h-72 gap-4 flex grow justify-center items-center rounded-3xl border-2 opacity-95 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:shadow-md active:shadow-gray-200 active:opacity-100')}>
											<div className='gap-4 h-28 flex flex-col justify-end items-center'>
												<h2 className='text-6xl font-semibold drop-shadow-md flex flex-col justify-end items-center'>{getEmoji(name)}</h2>
												<h2 className='text-2xl font-semibold drop-shadow-md'>{name}</h2>
											</div>
										</button>
									);
								})}

						<AddItem refetch={itemRefetch} />
					</div>
				)}
			</section>

			<section className='p-4 divide-gray-400/50 divide-y overflow-y-auto w-1/4 bg-slate-50 ring-inset ring-1 ring-gray-200 shadow-lg shadow-gray-200 min-h-full min-w-fit flex flex-col'>
				<header className='p-4 mb-4 flex flex-col place-content-center'>
					<h3 className='section-headline'>Current Order</h3>
				</header>

				<div className='px-4 py-8'>
					<AddCustomer customer={customer} setCustomer={setCustomer} />
				</div>

				<div className='h-full'>
					<ul>
						{Object.entries(order).map((item) => {
							return (
								<li key={item[0]} className='flex'>
									<p className='p-1'>
										{item[1].count}x {item[1].name}
									</p>
									<button className='p-1 bg-red-500 text-white hover:bg-red-700 rounded ml-2' onClick={() => decrementItem(item[0])}>
										Delete
									</button>
									<button className='p-1 bg-blue-500 text-white hover:bg-blue-700 rounded ml-2'>Update quantity</button>
								</li>
							);
						})}
					</ul>
				</div>

				<button disabled={itemCount === 0} onClick={submitOrder} className={classCondition(itemCount > 0 ? 'opacity-100 hover:bg-blue-500 cursor-pointer' : 'opacity-50 cursor-not-allowed', 'w-full justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto')}>
					Submit Order
				</button>
			</section>
		</main>
	);
};

export default Service;
