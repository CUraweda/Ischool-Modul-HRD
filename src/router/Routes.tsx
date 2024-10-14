import React from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const SignupPage = lazy(() => import('@/pages/auth/SignUpPage'));
const HrdLayout = lazy(() => import('@/components/layouts/HrdLayout'));
const PublicLayout = lazy(() => import('@/pages/public/PublicLayout'));
const DefaultLayout = lazy(() => import('../pages/DefaultLayout'));
const AuthLayout = lazy(() => import('@/pages/auth/AuthLayout'));
const ForbiddenPage = lazy(() => import('@/pages/ForbiddenPage'));
const DashboardPage = lazy(() => import('../pages/hrd/DashboardPage'));
const RekapPresensiPage = lazy(() => import('../pages/hrd/RekapPresensi'));
const PengajuanCutiPage = lazy(() => import('../pages/hrd/PengajuanCuti'));
const DinasLuarPage = lazy(() => import('@/pages/hrd/DinasLuarPage'));
const RekapPenilaianPage = lazy(() => import('@/pages/hrd/RekapPenilaian'));
const DetailRekapPage = lazy(() => import('@/pages/hrd/DetailRekap'));
const PelatihanPage = lazy(() => import('@/pages/hrd/PelatihanPage'));
const RekapPelatihan = lazy(() => import('@/pages/hrd/RekapPelatihan'));
const RekrutmenPage = lazy(() => import('@/pages/hrd/RekrutmenPage'));
const DetailRekrutmenPage = lazy(() => import('@/pages/hrd/DetailRekrutmenPage'));
const ProbationPage = lazy(() => import('@/pages/hrd/ProbationPage'));
const DetailProbationPage = lazy(() => import('@/pages/hrd/DetailProbationPage'));
const DetailCardProbationPage = lazy(() => import('@/pages/hrd/DetailCardProbationPage'));
const DataKaryawanPage = lazy(() => import('@/pages/hrd/DataKaryawanPage'));
const PenggajianPage = lazy(() => import('@/pages/hrd/PenggajianPage'));
const DetailPenggajianPage = lazy(() => import('@/pages/hrd/DetailPenggajianPage'));
const AturGajiPage = lazy(() => import('@/pages/hrd/AturGajiPage'));
const DetailProfilKaryawanPage = lazy(() => import('@/pages/hrd/DetailProfilKaryawanPage'));
const FormPage = lazy(() => import('@/pages/public/FormPage'));
const FormDataPage = lazy(() => import('@/pages/public/FormDataPage'));
const CustomerCarePage = lazy(() => import('@/pages/hrd/CustomerPage'));
const DetailPenggajianUserPage = lazy(() => import('@/pages/hrd/DetailPenggajianUserPage'));
const DaftarAsessorPage = lazy(() => import('@/pages/hrd/DaftarAsessorPage'));
const DaftarPenilaianPage = lazy(() => import('@/pages/hrd/DaftarPenilaianPage'));
const DaftarInterviewPage = lazy(() => import('@/pages/hrd/DaftarInterviewPage'));
const DefaultPage = lazy(() => import('@/pages/DefaultPage'));
const VerifEmailPage = lazy(() => import('../pages/VerifEmaillPage'));
const PublicPenilaian = lazy(() => import('../pages/public/PublicPenilaian'));
const DaftarDinasLuar = lazy(() => import('@/pages/hrd/DaftarDinasLuarPage'));

import ProtectedRoute from '@/router/ProtectedRoute';
import PageDivisi from '@/pages/hrd/PageDivisi';

const AppRoutes: React.FC = () => {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route element={<PublicLayout />}>
						<Route path="/" element={<FormPage />} />
						<Route path="/verifikasi/:id" element={<VerifEmailPage />} />
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

					{/* <Route path="/default/">
						<Route element={<PublicLayout />}>
							<Route path="daftar-penilaian" element={<PublicPenilaian />} />
						</Route>
					</Route> */}

					<Route path="/hrd/" element={<ProtectedRoute roles={[5]} />}>
						<Route element={<HrdLayout />}>
							<Route path="dashboard" element={<DashboardPage />} />
							<Route path="rekap-presensi" element={<RekapPresensiPage />} />
							<Route path="pengajuan-cuti" element={<PengajuanCutiPage />} />
							<Route path="dinas-luar" element={<DinasLuarPage />} />
							<Route path="rekap-penilaian" element={<RekapPenilaianPage />} />
							<Route path="rekap-penilaian/detail" element={<DetailRekapPage />} />
							<Route path="daftar-pelatihan" element={<PelatihanPage />} />
							<Route path="rekap-pelatihan" element={<RekapPelatihan />} />
							<Route path="rekrutmen" element={<RekrutmenPage />} />
							<Route path="rekrutmen/:id" element={<DetailRekrutmenPage />} />
							<Route path="employee" element={<ProbationPage />} />
							<Route path="employee/:id" element={<DetailProbationPage />} />
							<Route path="employee/:id/:id2" element={<DetailCardProbationPage />} />
							<Route path="employee/interview/:id" element={<DaftarInterviewPage />} />
							<Route path="data-karyawan" element={<DataKaryawanPage />} />
							<Route path="data-karyawan/:id" element={<DetailProfilKaryawanPage />} />
							<Route path="daftar-asessor" element={<DaftarAsessorPage />} />
							<Route path="daftar-penilaian" element={<DaftarPenilaianPage />} />
							<Route path="dashboard-penggajian" element={<PenggajianPage />} />
							<Route path="rekap-gaji" element={<DetailPenggajianPage />} />
							<Route path="rekap-gaji/:id" element={<DetailPenggajianUserPage />} />
							<Route path="atur-gaji" element={<AturGajiPage />} />
							<Route path="customer-care" element={<CustomerCarePage />} />
							<Route path="division" element={<PageDivisi />} />
							<Route path="daftar-dinas" element={<DaftarDinasLuar />} />
						</Route>
					</Route>

					<Route element={<ProtectedRoute roles={[11]} />}>
						<Route element={<PublicLayout />}>
							<Route path="form-data" element={<FormDataPage />} />
						</Route>
					</Route>

					<Route element={<ProtectedRoute roles={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} />}>
						<Route element={<DefaultLayout />}>
							<Route path="default" element={<DefaultPage />} />
							<Route path="default/daftar-penilaian" element={<PublicPenilaian />} />
						</Route>
					</Route>

					<Route path="*" element={<ForbiddenPage />} />
				</Routes>
			</Suspense>
		</Router>
	);
};

export default AppRoutes;
