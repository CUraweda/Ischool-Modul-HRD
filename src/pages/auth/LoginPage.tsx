import { Input } from '@/components/atoms';
import { useAppDispatch } from '@/hooks';
import { loginUser } from '@/middlewares/api';
import { setSession, setUser } from '@/stores/user';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
	email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
	password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
});

function LoginPage() {
	const dispatch = useAppDispatch();

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

				if (res.status == 200 && res.data.data) {
					dispatch(
						setUser({
							...res.data.data,
						})
					);
					dispatch(
						setSession({
							access_token: res.data.tokens.access.token,
							role_id: res.data.data.role_id,
							full_name: res.data.data.full_name,
						})
					);
				}
			} catch (error) {
				toast.warn('Email atau password salah');
			} finally {
				setSubmitting(false);
			}
		},
	});

	return (
		<>
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
				<Input
					type="password"
					label="Password"
					name="password"
					value={loginForm.values.password}
					onChange={loginForm.handleChange}
					errorMessage={loginForm.errors.password}
				/>
				<div className="flex">
					<button type="button" className="btn btn-link ms-auto">
						Lupa password?
					</button>
				</div>
				<button type="submit" disabled={loginForm.isSubmitting} className="btn btn-primary mt-4 w-full">
					{loginForm.isSubmitting ? <span className="loading loading-dots loading-md mx-auto"></span> : 'Log In'}
				</button>
			</form>
			<p className="mt-16 text-center">
				Belum punya akun?
				<Link to={'/signup'} className="btn btn-link ps-0">
					Sign Up
				</Link>
			</p>
		</>
	);
}

export default LoginPage;
