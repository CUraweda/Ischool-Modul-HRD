import { ProtectedRoute } from '@/middlewares';
import DashboardPage from '@/pages/hrd/DashboardPage';
import RekrutmenPage from '@/pages/hrd/RekrutmenPage';
import DetailRekrutmenPage from '@/pages/hrd/DetailRekrutmenPage';
import ProbationPage from '@/pages/hrd/ProbationPage';
import DetailProbationPage from '@/pages/hrd/DetailProbationPage';
import DetailCardProbationPage from '@/pages/hrd/DetailCardProbationPage';
import DataKaryawanPage from '@/pages/hrd/DataKaryawanPage';
import DetailProfilKaryawanPage from '@/pages/hrd/DetailProfilKaryawanPage';
import HrdLayout from '@/pages/hrd/HrdLayout';
import { RouteObject } from 'react-router-dom';

const hrdRoutes: RouteObject[] = [
	{
		path: '',
		element: (
			// <ProtectedRoute roles={[1, 5]}>
			<HrdLayout />
			// </ProtectedRoute>
		),
		children: [
			{
				path: '/dashboard',
				element: <DashboardPage />,
			},
			{
				path: '/rekrutmen',
				element: <RekrutmenPage />,
			},
			{
				path: '/rekrutmen/1',
				element: <DetailRekrutmenPage />,
			},
			{
				path: '/probation',
				element: <ProbationPage />,
			},
			{
				path: '/probation/1',
				element: <DetailProbationPage />,
			},
			{
				path: '/probation/1/1',
				element: <DetailCardProbationPage />,
			},
			{
				path: '/data-karyawan',
				element: <DataKaryawanPage />,
			},
			{
				path: '/data-karyawan/1',
				element: <DetailProfilKaryawanPage />,
			},
		],
	},
];

export default hrdRoutes;
