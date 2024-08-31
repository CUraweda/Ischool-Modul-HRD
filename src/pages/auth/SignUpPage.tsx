import React from 'react';
import { Input } from '@/components/atoms';
import { useAppDispatch } from '@/hooks';
import { loginUser } from '@/middlewares/api';
import { setSession, setUser } from '@/stores/user';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { setSessionStorageItem } from '@/utils/storageUtils';

const loginSchema = Yup.object().shape({
	email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
	password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
});

const SignUp: React.FC = () => {
	const dispatch = useAppDispatch();

	const signUpForm = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			confirm_password: '',
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

					dispatch(setUser(userData));
					dispatch(
						setSession({
							access_token: accessToken,
							role_id: userData.role_id,
							full_name: userData.full_name,
						})
					);

					// Store access_token and role_id in sessionStorage
					setSessionStorageItem('access_token', accessToken);
					setSessionStorageItem('role_id', userData.role_id);
					setSessionStorageItem('id', userData.id);

					toast.success('Login berhasil!');
				}
			} catch (error) {
				toast.warn('Email atau password salah');
			} finally {
				setSubmitting(false);
			}
		},
	});

	return (
		<div className="login-page">
			<h2 className="mb-6 text-center">Sign Up</h2>
			<form onSubmit={signUpForm.handleSubmit}>
				<Input
					type="text"
					label="Username"
					name="username"
					value={signUpForm.values.username}
					onChange={signUpForm.handleChange}
					errorMessage={signUpForm.errors.username}
				/>
				<Input
					type="text"
					label="Email"
					name="email"
					value={signUpForm.values.email}
					onChange={signUpForm.handleChange}
					errorMessage={signUpForm.errors.email}
				/>
				<Input
					type="password"
					label="Password"
					name="password"
					value={signUpForm.values.password}
					onChange={signUpForm.handleChange}
					errorMessage={signUpForm.errors.password}
				/>
				<Input
					type="password"
					label="Confirm Password"
					name="confirm_password"
					value={signUpForm.values.confirm_password}
					onChange={signUpForm.handleChange}
					errorMessage={signUpForm.errors.confirm_password}
				/>

				<button type="submit" disabled={signUpForm.isSubmitting} className="btn btn-primary mt-4 w-full">
					{signUpForm.isSubmitting ? <span className="loading loading-dots loading-md mx-auto"></span> : 'Log In'}
				</button>
			</form>
			<p className="mt-16 text-center">
				Sudah Punya Akun?{' '}
				<Link to="/login" className="btn btn-link ps-0">
					Sign In
				</Link>
			</p>
		</div>
	);
};

export default SignUp;
