import { classCondition, getEmoji, twColors } from '../../utils';

const ShiftItem = ({ index, item, orderItems, setOrderItems }) => {
	const { id, name } = item;

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

	return (
		<button onClick={() => addOrderItem(id, name)} className={classCondition(twColors.getColorClass(index), 'h-72 gap-4 flex grow justify-center items-center rounded-3xl border-2 opacity-95 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:shadow-md active:shadow-gray-200 active:opacity-100')}>
			<div className='gap-4 h-28 flex flex-col justify-end items-center'>
				<h2 className='text-6xl font-semibold drop-shadow-md flex flex-col justify-end items-center'>{getEmoji(name)}</h2>
				<h2 className='text-2xl font-semibold drop-shadow-md'>{name}</h2>
			</div>
		</button>
	);
};

export default ShiftItem;
