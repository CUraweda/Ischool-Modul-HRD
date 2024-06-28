import { RedirectRoute } from '@/middlewares';
import AuthLayout from '@/pages/auth/AuthLayout';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import NotfoundPage from '@/pages/NotfoundPage';
import { RouteObject } from 'react-router-dom';

const authRoutes: RouteObject[] = [
	{
		path: '',
		element: (
			<RedirectRoute>
				<AuthLayout />
			</RedirectRoute>
		),
		children: [
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'signup',
				element: <SignUpPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotfoundPage />,
	},
];

export default authRoutes;
