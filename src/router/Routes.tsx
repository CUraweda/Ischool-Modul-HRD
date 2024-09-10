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
import PenilaianPage from '@/pages/hrd/PenilaianPage';
import PelatihanPage from '@/pages/hrd/PelatihanPage';
import RekrutmenPage from '@/pages/hrd/RekrutmenPage';
import DetailRekrutmenPage from '@/pages/hrd/DetailRekrutmenPage';
import ProbationPage from '@/pages/hrd/ProbationPage';
import DetailProbationPage from '@/pages/hrd/DetailProbationPage';
import DetailCardProbationPage from '@/pages/hrd/DetailCardProbationPage';
import DataKaryawanPage from '@/pages/hrd/DataKaryawanPage';
import PenggajianPage from '@/pages/hrd/PenggajianPage';
import DetailPenggajianPage from '@/pages/hrd/DetailPenggajianPage';
import AturGajiPage from '@/pages/hrd/AturGajiPage';
import DetailProfilKaryawanPage from '@/pages/hrd/DetailProfilKaryawanPage';
import FormPage from '@/pages/public/FormPage';
import FormDataPage from '@/pages/public/FormDataPage';
import CustomerCarePage from '@/pages/hrd/CustomerPage';
import DetailPenggajianUserPage from '@/pages/hrd/DetailPenggajianUserPage';
import DaftarAsessorPage from '@/pages/hrd/DaftarAsessorPage';
import DaftarPenilaianPage from '@/pages/hrd/DaftarPenilaianPage';
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
					<Route path="penilaian" element={<PenilaianPage />} />
					<Route path="pelatihan" element={<PelatihanPage />} />
					<Route path="rekrutmen" element={<RekrutmenPage />} />
					<Route path="rekrutmen/:id" element={<DetailRekrutmenPage />} />
					<Route path="employee" element={<ProbationPage />} />
					<Route path="employee/:id" element={<DetailProbationPage />} />
					<Route path="employee/:id/:id2" element={<DetailCardProbationPage />} />
					<Route path="data-karyawan" element={<DataKaryawanPage />} />
<<<<<<< HEAD
					<Route path="data-karyawan/1" element={<DetailProfilKaryawanPage />} />
					<Route path="penggajian" element={<PenggajianPage />} />
					<Route path="rekap-penggajian" element={<DetailPenggajianPage />} />
					<Route path="rekap-penggajian/:id" element={<DetailPenggajianUser />} />
=======
					<Route path="data-karyawan/:id" element={<DetailProfilKaryawanPage />} />
					<Route path="daftar-asessor" element={<DaftarAsessorPage />} />
					<Route path="daftar-penilaian" element={<DaftarPenilaianPage />} />
					<Route path="dashboard-penggajian" element={<PenggajianPage />} />
					<Route path="rekap-gaji" element={<DetailPenggajianPage />} />
					<Route path="rekap-gaji/1" element={<DetailPenggajianUserPage />} />
					<Route path="atur-gaji" element={<AturGajiPage />} />
>>>>>>> cd9783cb3dd295cfd040f6f044de43da7dd8a538
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
