import React, { useState } from 'react';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { AddItemButton, ComboboxEl, Loading } from '../components';
import { api, classCondition, getEmoji, twColors } from '../utils';

const Service = ({ userId }) => {
	const [items, setItems] = useState([]);
	const [order, setOrder] = useState({});
	// const [orderIds, setOrderIds] = useState([]);
	const [itemCount, setItemCount] = useState(0);
	const [shiftId, setShiftId] = useState(0);
	const [customer, setCustomer] = useState({ id: 0, name: 'NONE' });

	const today = dayjs().format('MM/DD/YYYY');

	const { isLoading: itemsLoading, refetch: itemRefetch } = useQuery({
		queryKey: `items-${today}`,
		queryFn: () => api.getTodaysItems(userId),
		onSuccess: (response) => {
			if (response) {
				setShiftId(response.data.id);
				setItems(response.data.Items);
			}
		}
	});

	const { data: customerData, isLoading: customerLoading } = useQuery({
		queryKey: `all-customers`,
		queryFn: () => api.getAllCustomers()
	});

	const submitOrder = async () => {
		const yes = window.confirm(`Are you sure you'd like to submit this order?`);
		if (yes) {
			const orderIds = [];
			for (const key in order) {
				for (let i = 0; i > order[key].count; i++) {
					orderIds.push(key);
				}
			}
			const res = await api.createOrder({
				ShiftId: shiftId,
				CustomerId: customer.id === 0 ? null : customer.id,
				ItemIds: orderIds
			});
			if (res.status === 200) {
				console.log('order added!');
				reset();
			} else {
				window.alert('order failed');
			}
		}
	};

	const reset = () => {
		setCustomer({ id: 0, name: 'NONE' });
		setItemCount(0);
		setOrder({});
		// setOrderIds([]);
	};

	const addToOrder = (id, name) => {
		if (id in order) {
			order[id].count = order[id].count + 1;
		} else {
			order[id] = { name, count: 1 };
		}
		// setOrderIds([...orderIds, id]);
		setItemCount(itemCount + 1);
	};

	const decrementItem = (itemId) => {
		// setOrder(prevState => {
		//   const temp = {itemId: {...prevState[itemId], count: prevState[itemId].count - 1}}
		//   return temp
		// })
		const temp = { ...order };

		temp[itemId].count = temp[itemId].count - 1;
		setOrder(temp);
	};

	return (
		<main className='gap-12 w-full h-full flex flex-grow'>
			<section className='pl-12 pt-8 pb-12 gap-8 w-full max-w-[75%] flex flex-col'>
				<header className='gap-1 flex flex-col place-content-center'>
					<h3 className='text-2xl'>{today}</h3>
				</header>

				{itemsLoading ? (
					<Loading />
				) : (
					<div className='gap-8 overflow-scroll w-full max-h-full grid grid-cols-2'>
						{items &&
							items
								.sort((a, b) => a.ShiftItem.createdAt > b.ShiftItem.createdAt)
								.map(({ id, name }, i) => {
									return (
										<button key={`menuitem-${id}`} onClick={() => addToOrder(id, name)} className={classCondition(twColors.getColorClass(i), 'p-12 h-72 gap-4 flex grow place-content-center place-items-center rounded-3xl border-2 opacity-95 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:shadow-md active:shadow-gray-200 active:opacity-100')}>
											<div>
												<h2 className='text-9xl font-semibold drop-shadow-md'>{getEmoji(name)}</h2>
												<h2 className='text-3xl font-semibold drop-shadow-md'>{name}</h2>
											</div>
										</button>
									);
								})}

						<AddItemButton refetch={itemRefetch} className='flex' />
					</div>
				)}
			</section>

			<section className='px-8 pt-8 pb-12 gap-8 w-1/4 bg-slate-50 border-l border-gray-300 shadow-lg shadow-gray-200 min-h-full min-w-fit flex flex-col'>
				<header className='flex flex-col place-content-center'>
					<h3 className='text-2xl'>Current Order</h3>
				</header>

				<hr className='h-px bg-gray-400 border-0' />

				{customerLoading ? null : (
					<div className='pb-2'>
						<h2 className='text-xl mb-4'>
							Customer <span className='text-gray-500'>(optional)</span>
						</h2>

						<ComboboxEl
							customerList={[
								{ id: 0, name: 'NONE' },
								...customerData.data.map((x) => {
									return { id: x.id, name: x.firstName + ' ' + x.lastName };
								})
							]}
							customer={customer}
							setCustomer={setCustomer}
						/>
					</div>
				)}

				<hr className='h-px bg-gray-400 border-0' />

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
