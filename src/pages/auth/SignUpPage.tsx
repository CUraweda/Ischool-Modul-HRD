import React from 'react';
import { Input } from '@/components/atoms';
import { useAppDispatch } from '@/hooks';
import { registerUser } from '@/middlewares/api';
import { setUser } from '@/stores/user';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const registrationSchema = Yup.object().shape({
	full_name: Yup.string().required('Nama lengkap harus diisi'),
	email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
	password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
	confirm_password: Yup.string()
		.oneOf([Yup.ref('password')], 'Konfirmasi password tidak cocok')
		.required('Konfirmasi password harus diisi'),
});

const SignUp: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate(); // useNavigate hook for navigation

	const signUpForm = useFormik({
		initialValues: {
			full_name: '',
			email: '',
			password: '',
			confirm_password: '',
			role_id: 12,
		},
		validateOnChange: false,
		validationSchema: registrationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);
			try {
				const res = await registerUser(
					values.full_name,
					values.email,
					values.password,
					values.confirm_password,
					values.role_id
				);

				if (res.status === 201 && res.data.data) {
					const userData = res.data.data;

					dispatch(setUser(userData));

					toast.success('Registrasi berhasil!');

					navigate('/login');
				}
			} catch (error) {
				toast.error('Registrasi gagal, silakan coba lagi.');
			} finally {
				setSubmitting(false);
			}
		},
	});

	return (
		<div className="signup-page">
			<h2 className="mb-6 text-center">Sign Up</h2>
			<form onSubmit={signUpForm.handleSubmit}>
				<Input
					type="text"
					label="Nama Lengkap"
					name="full_name"
					value={signUpForm.values.full_name}
					onChange={signUpForm.handleChange}
					errorMessage={signUpForm.errors.full_name}
				/>
				<Input
					type="email"
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
					label="Konfirmasi Password"
					name="confirm_password"
					value={signUpForm.values.confirm_password}
					onChange={signUpForm.handleChange}
					errorMessage={signUpForm.errors.confirm_password}
				/>

				<button type="submit" disabled={signUpForm.isSubmitting} className="btn btn-primary mt-4 w-full">
					{signUpForm.isSubmitting ? <span className="loading loading-dots loading-md mx-auto"></span> : 'Sign Up'}
				</button>
			</form>
			<p className="mt-16 text-center">
				Sudah punya akun?{' '}
				<Link to="/login" className="btn btn-link ps-0">
					Sign In
				</Link>
			</p>
		</div>
	);
};

export default SignUp;
