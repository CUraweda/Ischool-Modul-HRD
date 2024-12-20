import React, { useState } from 'react';
import { Input } from '@/components/atoms';
import { useAppDispatch } from '@/hooks';
import { loginUser } from '@/middlewares/api';
import { setSession, setUser } from '@/stores/user';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { setSessionStorageItem } from '@/utils/storageUtils';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const loginSchema = Yup.object().shape({
	email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
	password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
});

const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword((prevShow) => !prevShow);
	};

	const loginForm = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validateOnChange: false,
		validationSchema: loginSchema,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);
			try {
				const res = await loginUser(values.email, values.password);

				if (res.status === 200 && res.data.data) {
					const userData = res.data.data;
					const accessToken = res.data.tokens.access.token;
					const employee_id = res.data.data.employee?.id;
					const is_asessor = res.data.data.employee?.is_asessor;

					dispatch(setUser(userData));
					dispatch(
						setSession({
							access_token: accessToken,
							role_id: userData.role_id,
							full_name: userData.full_name,
							employee_id: userData.employee?.id,
							is_asessor: is_asessor,
						})
					);

					setSessionStorageItem('access_token', accessToken);
					setSessionStorageItem('role_id', userData.role_id);
					setSessionStorageItem('id', userData.id);
					setSessionStorageItem('employee_id', employee_id);
					setSessionStorageItem('is_asessor', is_asessor);

					const role_id = sessionStorage.getItem('role_id');

					switch (role_id) {
						case '5':
							navigate('/hrd/dashboard');
							break;
						case '11':
							navigate('/');
							break;
						default:
							userData.employee ? navigate('/default') : toast.warn('anda tidak memiliki akses');
							break;
					}
				}
				window.location.reload();
			} catch (error: any) {
				console.error('Login error:', error);
				const message = error.response.data.message;
				toast.warn(message);
			} finally {
				setSubmitting(false);
			}
		},
	});

	return (
		<div className="login-page">
			<h2 className="mb-6 text-center">Log In</h2>
			<form onSubmit={loginForm.handleSubmit}>
				<Input
					type="text"
					label="Email"
					name="email"
					value={loginForm.values.email}
					onChange={loginForm.handleChange}
					errorMessage={loginForm.errors.email}
				/>
				<div className="relative">
					<Input
						type={showPassword ? 'text' : 'password'}
						label="Password"
						name="password"
						value={loginForm.values.password}
						onChange={loginForm.handleChange}
						errorMessage={loginForm.errors.password}
					/>
					<button
						type="button"
						onClick={toggleShowPassword}
						className="absolute inset-y-[3.2rem] right-0 px-3 text-gray-500 hover:text-gray-700"
					>
						{showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
					</button>
				</div>
				{/* <div className="flex">
					<Link to="/forgot-password" className="btn btn-link ms-auto">
						Lupa password?
					</Link>
				</div> */}
				<button type="submit" disabled={loginForm.isSubmitting} className="btn btn-primary mt-4 w-full">
					{loginForm.isSubmitting ? <span className="loading loading-dots loading-md mx-auto"></span> : 'Log In'}
				</button>
			</form>
			<p className="mt-16 text-center">
				Belum punya akun?
				<Link to="/signup" className="btn btn-link ps-0">
					Sign Up
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
