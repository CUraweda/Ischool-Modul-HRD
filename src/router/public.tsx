import HomePage from '@/pages/public/HomePage';
import FormPage from '@/pages/public/FormPage';
import FormDataPage from '@/pages/public/FormDataPage';
import PublicLayout from '@/pages/public/PublicLayout';
import { RouteObject } from 'react-router-dom';

const publicRoutes: RouteObject[] = [
	{
		path: '',
		element: <PublicLayout />,
		children: [
			{
				path: '',
				element: <HomePage />,
			},
			{
				path: '/public/form',
				element: <FormPage />,
			},
			{
				path: '/public/form-data',
				element: <FormDataPage />,
			},
		],
	},
];

export default publicRoutes;
