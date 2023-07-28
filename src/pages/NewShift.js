import { useState } from 'react';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { Loading, AddItem } from '../components';
import { api, getEmoji, twColors, classCondition } from '../utils';

const NewShift = ({ userId }) => {
	const [items, setItems] = useState([]);
	const today = dayjs().format('MMMM D, YYYY');

	const { isLoading, refetch } = useQuery({
		queryKey: `${today}/todays-items`,
		queryFn: () => api.getTodaysItems(),
		onSuccess: (response) => {
			if (response) setItems(response.data.Items);
		}
	});

	return (
		<main className='pt-8 px-24 pb-16 gap-8 flex flex-col'>
			<header className='p-4 gap-1 flex flex-col place-content-center place-items-center  rounded-3xl'>
				<h1 className='text-4xl font-medium'>Today's Menu</h1>
				<h3 className='text-xl font-light'>{today}</h3>
			</header>

			{isLoading ? (
				<Loading />
			) : (
				<section className='grid grid-cols-2 gap-8'>
					{items &&
						items
							.sort((a, b) => a.ShiftItem.createdAt > b.ShiftItem.createdAt)
							.map(({ id, name }, i) => {
								return (
									<button key={`menuitem-${id}`} className={classCondition(twColors.getColorClass(i), 'p-12 h-72 gap-4 flex grow place-content-center place-items-center rounded-3xl border-2 opacity-95 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:shadow-md active:shadow-gray-200 active:opacity-100')}>
										<div>
											<h2 className='text-9xl font-semibold drop-shadow-md'>{getEmoji(name)}</h2>
											<h2 className='text-3xl font-semibold drop-shadow-md'>{name}</h2>
										</div>
									</button>
								);
							})}

					<AddItem refetch={refetch} className='flex' />
				</section>
			)}
		</main>
	);
};

export default NewShift;
