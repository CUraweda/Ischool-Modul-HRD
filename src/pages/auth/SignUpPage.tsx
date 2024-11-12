import React, { useState } from 'react';
import { Input } from '@/components/atoms';
import { useAppDispatch } from '@/hooks';
import { registerUser } from '@/middlewares/api';
import { setUser } from '@/stores/user';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

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
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const toggleShowPassword = () => setShowPassword((prev) => !prev);
	const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

	const signUpForm = useFormik({
		initialValues: {
			full_name: '',
			email: '',
			password: '',
			confirm_password: '',
			role_id: 11,
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

					navigate('/');
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
				<div className="relative">
					<Input
						type={showPassword ? 'text' : 'password'}
						label="Password"
						name="password"
						value={signUpForm.values.password}
						onChange={signUpForm.handleChange}
						errorMessage={signUpForm.errors.password}
					/>
					<button
						type="button"
						onClick={toggleShowPassword}
						className="absolute inset-y-[3.2rem] right-0 px-3 text-gray-500 hover:text-gray-700"
					>
						{showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
					</button>
				</div>
				<div className="relative">
					<Input
						type={showConfirmPassword ? 'text' : 'password'}
						label="Konfirmasi Password"
						name="confirm_password"
						value={signUpForm.values.confirm_password}
						onChange={signUpForm.handleChange}
						errorMessage={signUpForm.errors.confirm_password}
					/>
					<button
						type="button"
						onClick={toggleShowConfirmPassword}
						className="absolute inset-y-[3.2rem] right-0 px-3 text-gray-500 hover:text-gray-700"
					>
						{showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
					</button>
				</div>
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
