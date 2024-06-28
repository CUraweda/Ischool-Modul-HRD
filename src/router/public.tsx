import HomePage from '@/pages/public/HomePage';
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
		],
	},
];

export default publicRoutes;
