import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignUpPage';
import HrdLayout from '@/components/layouts/HrdLayout';
import PublicLayout from '@/pages/public/PublicLayout';
import AuthLayout from '@/pages/auth/AuthLayout';
import ForbiddenPage from '@/pages/ForbiddenPage';
// import ProtectedRoute from '@/middlewares/ProtectedRoute';
import DashboardPage from '../pages/hrd/DashboardPage';
import RekapPresensiPage from '../pages/hrd/RekapPresensi';
import PengajuanCutiPage from '../pages/hrd/PengajuanCuti';
import DinasLuarPage from '@/pages/hrd/DinasLuarPage';
import RekapPenilaianPage from '@/pages/hrd/RekapPenilaian';
import DetailRekapPage from '@/pages/hrd/DetailRekap';
import PelatihanPage from '@/pages/hrd/PelatihanPage';
import RekrutmenPage from '@/pages/hrd/RekrutmenPage';
import DetailRekrutmenPage from '@/pages/hrd/DetailRekrutmenPage';
import ProbationPage from '@/pages/hrd/ProbationPage';
import DetailProbationPage from '@/pages/hrd/DetailProbationPage';
import DetailCardProbationPage from '@/pages/hrd/DetailCardProbationPage';
import DataKaryawanPage from '@/pages/hrd/DataKaryawanPage';
import PenggajianPage from '@/pages/hrd/PenggajianPage';
import DetailPenggajianPage from '@/pages/hrd/DetailPenggajianPage';
import DetailPenggajianUser from '@/pages/hrd/DetailPenggajianUserPage';
import DetailProfilKaryawanPage from '@/pages/hrd/DetailProfilKaryawanPage';
import FormPage from '@/pages/public/FormPage';
import FormDataPage from '@/pages/public/FormDataPage';
import CustomerCarePage from '@/pages/hrd/CustomerPage';
const AppRoutes: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						// <ProtectedRoute roles={[1, 5]}>
						<HrdLayout />
						// </ProtectedRoute>
					}
				>
					<Route path="" element={<DashboardPage />} />
				</Route>
				<Route
					path="/login"
					element={
						<AuthLayout>
							<LoginPage />
						</AuthLayout>
					}
				/>
				<Route
					path="/signup"
					element={
						<AuthLayout>
							<SignupPage />
						</AuthLayout>
					}
				/>
				<Route
					path="/hrd/"
					element={
						// <ProtectedRoute roles={[1, 5]}>
						<HrdLayout />
						// </ProtectedRoute>
					}
				>
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path="rekap-presensi" element={<RekapPresensiPage />} />
					<Route path="pengajuan-cuti" element={<PengajuanCutiPage />} />
					<Route path="dinas-luar" element={<DinasLuarPage />} />
					<Route path="rekap-penilaian" element={<RekapPenilaianPage />} />
					<Route path="rekap-penilaian/detail" element={<DetailRekapPage />} />
					<Route path="pelatihan" element={<PelatihanPage />} />
					<Route path="rekrutmen" element={<RekrutmenPage />} />
					<Route path="rekrutmen/:id" element={<DetailRekrutmenPage />} />
					<Route path="employee" element={<ProbationPage />} />
					<Route path="employee/:id" element={<DetailProbationPage />} />
					<Route path="employee/:id/:id2" element={<DetailCardProbationPage />} />
					<Route path="data-karyawan" element={<DataKaryawanPage />} />
					<Route path="data-karyawan/1" element={<DetailProfilKaryawanPage />} />
					<Route path="penggajian" element={<PenggajianPage />} />
					<Route path="penggajian/1" element={<DetailPenggajianPage />} />
					<Route path="penggajian/1/1" element={<DetailPenggajianUser />} />
					<Route path="customer-care" element={<CustomerCarePage />} />
				</Route>
				<Route
					path="/public/"
					element={
						// <ProtectedRoute roles={[1, 5]}>
						<PublicLayout />
						// </ProtectedRoute>
					}
				>
					<Route path="form" element={<FormPage />} />
					<Route path="form-data" element={<FormDataPage />} />

					<Route path="*" element={<ForbiddenPage />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default AppRoutes;
