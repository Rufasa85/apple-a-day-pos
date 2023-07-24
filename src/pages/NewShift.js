import { useState } from 'react';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import Loading from '../components/Loading';
import AddItemModal from '../components/AddItemModal';
import api from '../utils/API';
import getEmoji from '../utils/emojis';
import twColors from '../utils/twColors';
import classCondition from '../utils/classCondition';

const NewShift = () => {
	const [modalVisible, setModalVisible] = useState(false);

	const today = dayjs().format('MMMM D, YYYY');

	const { data: response, isLoading } = useQuery({
		queryKey: `${today}/todays-items`,
		queryFn: () => api.getTodaysItems()
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
					{response?.data.length > 0 &&
						response?.data.map(({ id, name }, i) => {
							return (
								<button key={`menuitem-${id}`} className={classCondition(twColors.getColorClasses(i), 'p-12 h-72 gap-4 flex grow flex-col place-content-center place-items-center rounded-3xl border-2 opacity-95 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:shadow-md active:shadow-gray-200 active:opacity-100')}>
									<h2 className='text-9xl font-semibold'>{getEmoji(name)}</h2>
									<h2 className='text-3xl font-semibold'>{name}</h2>
								</button>
							);
						})}

					<button className='p-12 h-72 gap-4 flex grow flex-col place-content-center place-items-center bg-slate-50 text-slate-400 rounded-3xl border-dashed border border-current opacity-95 hover:shadow-xl hover:shadow-gray-200 hover:opacity-90 active:bg-slate-100 active:shadow-lg active:shadow-gray-200 active:opacity-100' onClick={() => setModalVisible(true)}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-36 h-36'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
						</svg>

						<h2 className='text-3xl font-semibold'>Add Menu Item</h2>
					</button>
				</section>
			)}

			<AddItemModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
		</main>
	);
};

export default NewShift;
