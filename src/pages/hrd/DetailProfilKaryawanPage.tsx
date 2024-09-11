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
		openModal('fileAttachment');
	};

	const fetchData = async () => {
		try {
			const response = await Karyawan.ProfilKaryawan(id);
			const data = response.data.data;
			setFetch(data);
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
				jumlahAnak: '',
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
							<div className="flex items-center gap-3">
								<h2 className="text-md font-bold">Informasi Pribadi</h2>
								<div className="text-sm font-bold text-gray-500">NIK - {fetch?.nik || 'Tidak tersedia'}</div>
							</div>
							<div className="mt-2 flex flex-wrap justify-between">
								<div className="flex flex-col gap-1">
									<div className="flex flex-col gap-[0.3rem]">
										<div className="text-sm font-bold text-gray-500">Jenis Kelamin</div>
										<div className="text-sm font-bold">{fetch?.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}</div>
									</div>
									<div className="flex flex-col gap-[0.3rem]">
										<div className="text-sm font-bold text-gray-500">Agama</div>
										<div className="text-sm font-bold">{fetch?.religion}</div>
									</div>
									<div className="flex flex-col gap-[0.3rem]">
										<div className="text-sm font-bold text-gray-500">Tanggal Lahir</div>
										<div className="text-sm font-bold">
											{fetch?.dob
												? `${fetch.pob}, ${new Date(fetch.dob).toLocaleDateString('id-ID')}`
												: 'Tidak tersedia'}
										</div>
									</div>
								</div>

								<div className="flex flex-col gap-1">
									<div className="flex flex-col gap-[0.3rem]">
										<div className="text-sm font-bold text-gray-500">Umur</div>{' '}
										<div className="text-sm font-bold">{formData.umur}</div>
									</div>
									<div className="flex flex-col gap-[0.3rem]">
										<div className="text-sm font-bold text-gray-500">Status Pernikahan</div>
										<div className="text-sm font-bold">{fetch?.marital_status}</div>
									</div>
								</div>
							</div>
						</div>
						<div className="p-4">
							<h2 className="text-md font-bold">Informasi Lainnya</h2>
							<div className="mt-2 flex flex-col gap-1">
								<div className="flex flex-col gap-[0.3rem]">
									<div className="text-sm font-bold text-gray-500">Pendidikan</div>
									<div className="text-sm font-bold">
										{fetch?.last_education} - {fetch?.major}
									</div>
								</div>
								<div className="flex flex-col gap-[0.3rem]">
									<div className="text-sm font-bold text-gray-500">Kelengkapan Berkas</div>
									<a className="link text-sm font-bold text-blue-600" onClick={handleDialog}>
										Lihat Berkas
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-4 gap-4">
						<div className="border-r p-4">
							<div>
								<div className="text-sm font-bold text-gray-500">Posisi</div>
								<div className="text-sm font-bold">{fetch?.occupation}</div>
							</div>
						</div>
						<div className="border-r p-4">
							<div>
								<div className="text-sm font-bold text-gray-500">Jabatan</div>
								{fetch?.formpositions.map((item: any) => <div>{item?.employeeposition?.name}</div>)}
							</div>
						</div>
						<div className="border-r p-4">
							<div>
								<div className="text-sm font-bold text-gray-500">Bidang</div>
							</div>
						</div>
						<div className="p-4">
							<div>
								<div className="text-sm font-bold text-gray-500">Mulai Bekerja</div>
								<div className="text-sm font-bold">
									{fetch?.work_start_date
										? new Date(fetch.work_start_date).toLocaleDateString('id-ID')
										: 'Tidak tersedia'}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 flex justify-between">
					<div className="flex items-center gap-2">
						<button className="btn btn-primary w-full">{fetch?.is_teacher === 'G' ? 'Guru' : 'Staff'}</button>
						<button className="btn btn-primary w-full">{fetch?.employee_status}</button>
					</div>
					<button
						className="btn btn-ghost text-primary"
						onClick={() => {
							dialogPelatihan();
						}}
					>
						Lihat Detail Pelatihan
					</button>
					{/* <button className="btn btn-secondary" onClick={handleDialog}>
						Edit Profil
					</button> */}
				</div>
			</div>

			<Modal id="fileAttachment">
				<div>test</div>
			</Modal>

			{/* <Modal id="editProfilKaryawan">
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label>Nama Lengkap</label>
							<input
								type="text"
								name="namaLengkap"
								value={formData.namaLengkap}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Alamat</label>
							<input
								type="text"
								name="alamat"
								value={formData.alamat}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Jenjang Pendidikan</label>
							<input
								type="text"
								name="jenjangPendidikan"
								value={formData.jenjangPendidikan}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Telepon</label>
							<input
								type="text"
								name="telepon"
								value={formData.telepon}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Bidang</label>
							<input
								type="text"
								name="bidang"
								value={formData.bidang}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>NIK</label>
							<input
								type="text"
								name="nik"
								value={formData.nik}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Posisi</label>
							<input
								type="text"
								name="posisi"
								value={formData.posisi}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Jenis Kelamin</label>
							<select
								name="jenisKelamin"
								value={formData.jenisKelamin}
								onChange={handleInputChange}
								className="select select-bordered w-full"
							>
								<option value="Laki-Laki">Laki-Laki</option>
								<option value="Perempuan">Perempuan</option>
							</select>
						</div>
						<div>
							<label>Status</label>
							<input
								type="text"
								name="status"
								value={formData.status}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Agama</label>
							<input
								type="text"
								name="agama"
								value={formData.agama}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Jabatan</label>
							<input
								type="text"
								name="jabatan"
								value={formData.jabatan}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Tanggal Lahir</label>
							<input
								type="date"
								name="tanggalLahir"
								value={formData.tanggalLahir}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Mulai Bekerja</label>
							<input
								type="date"
								name="mulaiBekerja"
								value={formData.mulaiBekerja}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Status Pernikahan</label>
							<input
								type="text"
								name="statusPernikahan"
								value={formData.statusPernikahan}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
					</div>
					<div className="modal-action">
						<button type="submit" className="btn btn-primary">
							Simpan
						</button>
					</div>
				</form>
			</Modal> */}

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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-6"
										>
											<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
											/>
										</svg>

										<span>{item.location}</span>
									</div>
									<div className="flex items-center space-x-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
