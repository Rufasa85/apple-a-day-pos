import { useState } from 'react';

import { BouncingApple } from '../components';
import { api, classCondition } from '../utils';

const Login = () => {
	const [passwordInput, setPasswordInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const { location } = window;

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const loginObj = {
        email: emailInput,
				password: passwordInput
			};

			const response = await api.login(loginObj);
			console.log(response);
			if (response.status !== 200) return;

			setEmailInput('');
			setPasswordInput('');
			localStorage.setItem('token', response.data.token);
			location.replace('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className='flex flex-col justify-center items-center w-full h-screen border-2 bg-gray-500 bg-opacity-50'>
			<form onSubmit={handleLogin} className='gap-6 px-24 pt-10 relative flex flex-col justify-center items-center shadow-2xl border border-slate-300 bg-slate-100 rounded-lg'>
				<BouncingApple />

				<div className='z-50 flex flex-col justify-center items-center'>
					<h1 className='text-4xl'>Welcome back!</h1>
					<h1>Please login to continue.</h1>
				</div>

				<input type='text' placeholder='email' value={emailInput} onChange={(e) => setEmailInput(e.target.value)} id='email' className='z-50 block w-full rounded-md border-0 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600' />

				<input type='password' placeholder='password' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} id='password' className='z-50 block w-full rounded-md border-0 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600' />

				<input type='submit' value='Login' className={classCondition(passwordInput.length > 0 ? 'opacity-100 hover:bg-blue-500 cursor-pointer' : 'opacity-50 cursor-not-allowed', 'z-50 inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto')} />
			</form>
		</main>
	);
};

export default Login;
