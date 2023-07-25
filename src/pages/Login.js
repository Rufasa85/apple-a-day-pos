import { useState } from 'react';

import { BouncingApple } from '../components';
import { api, classCondition } from '../utils';

const Login = ({ refetch }) => {
	const [passwordInput, setPasswordInput] = useState('');
	const { location } = window;

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const loginObj = {
				password: passwordInput
			};

			const response = await api.login(loginObj);
			console.log(response);
			if (response.status !== 200) return;

			setPasswordInput('');

			localStorage.setItem('token', response.data.token);
			location.replace('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className='flex flex-col justify-center items-center w-full h-screen border-2 bg-slate-200'>
			<form onSubmit={handleLogin} className='gap-10 px-24 py-10 relative flex flex-col justify-center items-center shadow-2xl border border-slate-300 bg-slate-100 rounded-lg'>
				<BouncingApple />

				<div className='z-50 flex flex-col justify-center items-center'>
					<h1 className='text-4xl'>Welcome back!</h1>
					<h1>Please login to continue.</h1>
				</div>

				<input type='password' placeholder='Password' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} id='password' className='z-50 block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />

				<input type='submit' value='Login' className={classCondition(passwordInput.length > 0 ? 'opacity-100 hover:bg-blue-500 cursor-pointer' : 'opacity-50 cursor-not-allowed', 'z-50 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto')} />
			</form>
		</main>
	);
};

export default Login;
