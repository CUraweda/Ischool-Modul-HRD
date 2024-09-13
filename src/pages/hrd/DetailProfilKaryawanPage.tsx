import { Karyawan, Probation } from '@/middlewares/api';
import Modal, { openModal } from '../../components/ModalProps';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailProfilKaryawanPage = () => {
	const { id } = useParams<{ id: string }>();
	const [fetch, setFetch] = useState<any | null>(null);
	const [formData, setFormData] = useState({
		namaLengkap: '',
		email: '',
		telepon: '',
		nik: '',
		jenisKelamin: '',
		agama: '',
		tanggalLahir: '',
		umur: '',
		statusPernikahan: '',
		jenjangPendidikan: '',
		bidang: '',
		jumlahAnak: '',
		posisi: '',
		status: '',
		jabatan: '',
		mulaiBekerja: '',
	});
	const [pelatihan, setPelatihan] = useState<any[]>([]);

	const dialogPelatihan = () => {
		openModal('detailPelatihan');
	};

	const dataPelatihan = async () => {
		try {
			const response = await Probation.DetailProbation(id);
			setPelatihan(response.data.data.trainings);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDialog = () => {
		openModal('editProfilKaryawan');
	};

	const fetchData = async () => {
		try {
			const response = await Karyawan.ProfilKaryawan(id);
			const data = response.data.data;
			setFetch(data);

			// Fill formData with fetched data
			setFormData({
				namaLengkap: data.full_name || '',
				email: data.email || '',
				telepon: data.phone || '',
				nik: data.nik || '',
				jenisKelamin: data.gender === 'L' ? 'Laki-Laki' : 'Perempuan',
				agama: data.religion || '',
				tanggalLahir: data.dob ? data.dob.split('T')[0] : '',
				umur: data.dob ? `${new Date().getFullYear() - new Date(data.dob).getFullYear()} Tahun` : '',
				statusPernikahan: data.marital_status || '',
				jenjangPendidikan: data.last_education || '',
				bidang: data.major || '',
				jumlahAnak: '', // Assuming there's no field for children in the API
				posisi: data.occupation || '',
				status: data.employee_status || '',
				jabatan: data.duty || '',
				mulaiBekerja: data.work_start_date ? data.work_start_date.split('T')[0] : '',
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (id) {
			fetchData();
			dataPelatihan();
		}
	}, [id]);

	return (
		<div className="min-h-screen">
			<div className="rounded-lg bg-white p-6 shadow-lg">
				<div className="mb-6 flex items-center">
					<img src="https://via.placeholder.com/100" alt="Profile" className="h-24 w-24 rounded-full" />
					<div className="ml-4">
						<h1 className="text-2xl font-bold">{fetch?.full_name}</h1>
						<p className="text-gray-600">{fetch?.email}</p>
						<p className="text-gray-600">{fetch?.phone}</p>
					</div>
				</div>
				<div className="border-b border-t">
					<div className="grid grid-cols-2 gap-4 border-b">
						<div className="border-r p-4">
							<h2 className="mb-2 text-lg font-semibold">Informasi Pribadi</h2>
							<p>
								<strong>NIK:</strong> {fetch?.nik || 'Tidak tersedia'}
							</p>
							<p>
								<strong>Jenis Kelamin:</strong> {fetch?.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}
							</p>
							<p>
								<strong>Agama:</strong> {fetch?.religion}
							</p>
							<p>
								<strong>Tanggal Lahir:</strong>{' '}
								{fetch?.dob ? `${fetch.pob}, ${new Date(fetch.dob).toLocaleDateString('id-ID')}` : 'Tidak tersedia'}
							</p>
							<p>
								<strong>Umur:</strong> {formData.umur}
							</p>
							<p>
								<strong>Status Pernikahan:</strong> {fetch?.marital_status}
							</p>
						</div>
						<div className="p-4">
							<h2 className="mb-2 text-lg font-semibold">Informasi Lainnya</h2>
							<p>
								<strong>Pendidikan:</strong> {fetch?.last_education} - {fetch?.major}
							</p>
							<p>
								<strong>Kelengkapan Berkas:</strong>
							</p>
						</div>
					</div>
					<div className="grid grid-cols-4 gap-4">
						<div className="border-r p-4">
							<p>
								<strong>Posisi:</strong> {fetch?.occupation}
							</p>
						</div>
						<div className="border-r p-4">
							<p>
								<strong>Jabatan:</strong> {fetch?.duty}
							</p>
						</div>
						<div className="border-r p-4">
							<p>
								<strong>Bidang:</strong> {fetch?.major}
							</p>
						</div>
						<div className="p-4">
							<p>
								<strong>Mulai Bekerja:</strong>{' '}
								{fetch?.work_start_date
									? new Date(fetch.work_start_date).toLocaleDateString('id-ID')
									: 'Tidak tersedia'}
							</p>
						</div>
					</div>
				</div>
				<div className="mt-6 flex justify-between">
					<button className="btn btn-primary">{fetch?.is_teacher === 'G' ? 'Guru' : 'Staff'}</button>
					<button className="btn btn-secondary">{fetch?.employee_status}</button>
					<button
						className="btn btn-accent"
						onClick={() => {
							dialogPelatihan();
						}}
					>
						Lihat Detail Pelatihan
					</button>
					<button className="btn btn-secondary" onClick={handleDialog}>
						Edit Profil
					</button>
				</div>
			</div>

			<Modal id="detailPelatihan">
				<h3 className="text-lg font-bold">Pelatihan yang sudah dilakukan</h3>
				<div className="mt-4 space-y-4">
					{pelatihan.map((item, index) => (
						<div className="card bg-base-100 shadow-md" key={index}>
							<div className="card-body">
								<h2 className="card-title">{item.title}</h2>
								<p>Tujuan: {item.purpose}.</p>
								<p>
									Pengajuan oleh: <span className="font-bold">HRD</span>
								</p>
								<div className="mt-4 flex items-center justify-between text-gray-500">
									<div className="flex items-center space-x-2">
										<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5.121 11.293a8.004 8.004 0 0110.962 0M4 14l2 2 4-4m2 6a9 9 0 100-18 9 9 0 000 18zm-3-9v.01"
											/>
										</svg>
										<span>{item.location}</span>
									</div>
									<div className="flex items-center space-x-2">
										<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 7h4m-2-2v4m0 4v2a1 1 0 001 1h3m4 0h-2a1 1 0 01-1-1v-3m0 0H7a1 1 0 01-1-1V7a1 1 0 011-1h3m4 0h2a1 1 0 011 1v3m-4 0v4"
											/>
										</svg>
										<span>
											{item.start_date.split('T')[0]} - {item.end_date.split('T')[0]}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</Modal>
		</div>
	);
};

export default DetailProfilKaryawanPage;
