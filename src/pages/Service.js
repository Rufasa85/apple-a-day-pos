import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { Customer, Item, AddItem, Loading } from '../components';
import { api, classCondition, getEmoji, twColors } from '../utils';

const Service = ({ UserId }) => {
	const [ShiftId, setShiftId] = useState(0);
	const [shiftItems, setShiftItems] = useState([]);
	const [customer, setCustomer] = useState();
	const [orderItems, setOrderItems] = useState([]);

	const today = dayjs().format('MM/DD/YYYY');
	const longDate = dayjs().format('dddd, MMMM D, YYYY');

	const { isLoading, refetch } = useQuery({
		queryKey: `shiftItems-${today}`,
		queryFn: () => api.getTodaysItems(UserId),

		onSuccess: (response) => {
			if (response?.data?.ShiftItems) {
				const { id, ShiftItems } = response.data;

				const itemsSortedByCreation = ShiftItems.sort((a, b) => a.createdAt > b.createdAt);
				const itemObjects = itemsSortedByCreation.map((shiftItem) => shiftItem.Item);

				setShiftId(id);
				setShiftItems(itemObjects);

				const storedCustomer = JSON.parse(localStorage.getItem('customer'));
				if (storedCustomer) setCustomer(storedCustomer);

				const storedItems = JSON.parse(localStorage.getItem('items'));
				if (storedItems) setOrderItems(storedItems);
			} else {
				localStorage.removeItem('customer');
				localStorage.removeItem('items');
			}
		}
	});

	const addOrderItem = (ItemId, name) => {
		for (let i = 0; i < orderItems.length; i++) {
			const item = orderItems[i];

			if (item.ItemId === ItemId) {
				const updatedOrderItems = [...orderItems];
				updatedOrderItems[i].quantity += 1;

				setOrderItems(updatedOrderItems);
				localStorage.setItem('items', JSON.stringify(updatedOrderItems));
				return;
			}
		}

		const updatedOrderItems = [...orderItems, { ItemId, name, quantity: 1 }];

		setOrderItems(updatedOrderItems);
		localStorage.setItem('items', JSON.stringify(updatedOrderItems));
	};

	const submitOrder = async () => {
		const confirmed = window.confirm(`Are you sure you'd like to submit this order?`);

		if (confirmed) {
			const CustomerId = customer.id;

			const items = orderItems.map((item) => {
				const { ItemId, quantity } = item;
				return { ItemId, quantity };
			});

			const res = await api.createOrder({ ShiftId, CustomerId, items });

			if (res.status === 200) {
				console.log(res);
				setCustomer();
				setOrderItems([]);
			} else {
				window.alert('order failed');
			}
		}
	};

	return (
		<main className='pt-[84px] w-screen h-screen max-w-screen max-h-screen flex'>
			<section className='p-4 overflow-y-auto w-full h-full max-w-[75%] max-h-full flex flex-col'>
				<header className='p-4 flex flex-col place-content-center'>
					<h3 className='section-headline'>{longDate}</h3>
				</header>

				{isLoading ? (
					<Loading />
				) : (
					<div className='p-4 gap-8 w-full grid auto-rows-min sm:grid-cols-2 grid-cols-1'>
						{shiftItems?.map(({ id, name }, i) => {
							return (
								<button key={`shiftitem-${id}`} onClick={() => addOrderItem(id, name)} className={classCondition(twColors.getColorClass(i), 'h-72 gap-4 flex grow justify-center items-center rounded-3xl border-2 opacity-95 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:shadow-md active:shadow-gray-200 active:opacity-100')}>
									<div className='gap-4 h-28 flex flex-col justify-end items-center'>
										<h2 className='text-6xl font-semibold drop-shadow-md flex flex-col justify-end items-center'>{getEmoji(name)}</h2>
										<h2 className='text-2xl font-semibold drop-shadow-md'>{name}</h2>
									</div>
								</button>
							);
						})}

						<AddItem refetch={refetch} />
					</div>
				)}
			</section>

			<section className='p-4 w-1/4 bg-slate-50 ring-inset ring-1 ring-gray-200 shadow-lg shadow-gray-200 min-h-full min-w-fit flex flex-col'>
				<header className='p-4 flex flex-col place-content-center'>
					<h3 className='section-headline'>Current Order</h3>
				</header>

				<div className='px-4 py-4 flex'>{customer ? <Customer.Card customer={customer} setCustomer={setCustomer} /> : <Customer.AddButton customer={customer} setCustomer={setCustomer} />}</div>

				<ul className='px-3 py-8 gap-8 mx-1 my-4 border-t border-b h-full overflow-y-auto flex flex-col'>
					{orderItems.map((item, i) => {
						return <Item.OrderItem key={`orderitem-${i}`} index={i} item={item} orderItems={orderItems} setOrderItems={setOrderItems} />;
					})}
				</ul>

				<button disabled={orderItems.length < 1} onClick={submitOrder} className={classCondition(orderItems.length < 1 ? 'button-primary-off' : 'button-primary', 'm-4')}>
					Submit Order
				</button>
			</section>
		</main>
	);
};

export default Service;
