import { useState } from 'react';

import { BouncingApple } from '../components';
import { api, classCondition } from '../utils';

const Login = ({ setUserId }) => {
	const [password, setPassword] = useState('');
	const [infoText, setInfoText] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const isGuest = password === 'guest';
			const username = isGuest ? 'guest' : 'admin';

			const loginObj = { username, password };
			const response = await api.login(loginObj);

			if (response.status === 400) {
				setInfoText(response.data.error);
				return;
			}

			if (response.status === 200) {
				setPassword('');
				setInfoText('');

				setUserId(response.data.userId);
				localStorage.setItem('token', response.data.token);

				window.location.replace('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className='flex flex-col justify-center items-center w-full h-screen border-2 bg-gray-500 bg-opacity-50'>
			<form onSubmit={handleLogin} className='gap-6 px-24 py-10 relative flex flex-col justify-center items-center shadow-2xl border border-slate-300 bg-slate-100 rounded-lg'>
				<BouncingApple />

				<div className='z-50 flex flex-col justify-center items-center'>
					<h1 className='text-4xl'>Welcome back!</h1>
					<h1>Please login to continue.</h1>
				</div>

				<input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' className='z-50 block w-full rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600' />

				{infoText ? <p className='text-red-700 pb-3'>{infoText}</p> : null}
				<button type='submit' className={classCondition(password.length > 0 ? 'button-primary' : 'button-primary')}>
					Login
				</button>
			</form>
		</main>
	);
};

export default Login;
