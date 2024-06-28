import { ProtectedRoute } from '@/middlewares';
import DashboardPage from '@/pages/hrd/DashboardPage';
import HrdLayout from '@/pages/hrd/HrdLayout';
import { RouteObject } from 'react-router-dom';

const hrdRoutes: RouteObject[] = [
	{
		path: '',
		element: (
			<ProtectedRoute roles={[1, 5]}>
				<HrdLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: '/dashboard',
				element: <DashboardPage />,
			},
		],
	},
];

export default hrdRoutes;
