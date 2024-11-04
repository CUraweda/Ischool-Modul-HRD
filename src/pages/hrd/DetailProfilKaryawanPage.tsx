import { Karyawan, Probation } from '@/middlewares/api';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const DetailProfilKaryawanPage = () => {
	const { id } = useParams<{ id: string }>();
	const [fetch, setFetch] = useState<any | null>(null);
	const [pelatihan, setPelatihan] = useState<any[]>([]);
	const [file, setFile] = useState<any[]>([]);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		full_name: '',
		email: '',
		phone: '',
		gender: '',
		dob: '',
		pob: '',
		marital_status: '',
		religion: '',
		major: '',
		occupation: '',
	});

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

	const dataFile = async () => {
		try {
			const response = await Probation.DetailProbation(id);
			setFile(response.data.data.employeeattachments);
		} catch (error) {
			console.error(error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleDialog = () => {
		openModal('fileAttachment');
	};

	const editDialog = () => {
		openModal('editModal');
	};

	// const downloadFile = (filePath: string, fileName: string) => {
	// 	const fileUrl = `${filePath.replace(/\\/g, '/')}`;
	// 	const link = document.createElement('a');
	// 	link.href = fileUrl;
	// 	link.download = fileName;
	// 	link.click();
	// };

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await Karyawan.ProfilKaryawan(id, access_token);
			const data = response.data.data;
			setFetch(data);
			setFormData({
				full_name: data.full_name || '',
				email: data.email || '',
				phone: data.phone || '',
				gender: data.gender || '',
				dob: data.dob ? data.dob.split('T')[0] : '',
				pob: data.pob || '',
				marital_status: data.marital_status || '',
				religion: data.religion || '',
				major: data.major || '',
				occupation: data.occupation || '',
			});
		} catch (error) {
			console.error(error);
		}
	};

	const EditKaryawan = async () => {
		const data = {
			full_name: formData.full_name,
			email: formData.email,
			phone: formData.phone,
			gender: formData.gender,
			dob: formData.dob,
			pob: formData.pob,
			marital_status: formData.marital_status,
			religion: formData.religion,
			major: formData.major,
			occupation: formData.occupation,
		};
		try {
			await Karyawan.EditKaryawan(data, id);
			fetchData();
			closeModal('editModal');
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Karyawan berhasil diubah',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const trigerDelete = () => {
		Swal.fire({
			title: 'Apakah kamu yakin?',
			text: 'kamu tidak dapat mengembalikan data ini!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, tutup!',
		}).then((result) => {
			if (result.isConfirmed) {
				DeleteKaryawan();
			}
		});
	};

	const DeleteKaryawan = async () => {
		try {
			await Karyawan.HapusKaryawan(id);
			fetchData();
			navigate('/hrd/data-karyawan');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (id) {
			fetchData();
			dataPelatihan();
			dataFile();
		}
	}, [id]);

	return (
		<div className="min-h-screen">
			<div className="rounded-lg bg-white p-6 shadow-lg">
				<div className="mb-6 flex items-center">
					<img src="https://via.placeholder.com/100" alt="Profile" className="h-24 w-24 rounded-full" />
					<div className="ml-4 flex w-full justify-between">
						<div>
							<h1 className="text-2xl font-bold">{fetch?.full_name}</h1>
							<p className="text-gray-600">{fetch?.email}</p>
							<p className="text-gray-600">{fetch?.phone}</p>
						</div>
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-circle btn-primary btn-sm">
								...
							</label>
							<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
								<li>
									<a onClick={editDialog}>Edit Profil</a>
								</li>
								<li>
									<a onClick={trigerDelete}>Hapus Karyawan</a>
								</li>
							</ul>
						</div>
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
										<div className="text-sm font-bold">
											{fetch?.gender != null ? (fetch?.gender == 'L' ? 'Laki-laki' : 'Perempuan') : 'Tidak Tersedia'}
										</div>
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
										<div className="text-sm font-bold">
											{fetch?.dob ? `${new Date().getFullYear() - new Date(fetch?.dob).getFullYear()} Tahun` : ''}
										</div>
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
								{fetch?.formpositions.map((item: any, index: any) => (
									<div key={index}>{item?.employeeposition?.name}</div>
								))}
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
				</div>
			</div>

			<Modal id="editModal">
				<h3 className="mb-4 text-lg font-bold">Edit Profil Karyawan</h3>
				<div className="form-control">
					<label className="label">Nama Lengkap</label>
					<input
						type="text"
						name="full_name"
						value={formData.full_name}
						onChange={handleInputChange}
						className="input input-bordered"
					/>

					<label className="label">Email</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						className="input input-bordered"
					/>

					<label className="label">Telepon</label>
					<input
						type="text"
						name="phone"
						value={formData.phone}
						onChange={handleInputChange}
						className="input input-bordered"
					/>

					<label className="label">Jenis Kelamin</label>
					<input
						type="text"
						name="gender"
						value={formData.gender}
						onChange={handleInputChange}
						className="input input-bordered"
					/>

					<label className="label">Tanggal Lahir</label>
					<input
						type="date"
						name="dob"
						value={formData.dob}
						onChange={handleInputChange}
						className="input input-bordered"
					/>

					<label className="label">Tempat Lahir</label>
					<input
						type="text"
						name="pob"
						value={formData.pob}
						onChange={handleInputChange}
						className="input input-bordered"
					/>

					<label className="label">Status Pernikahan</label>
					<input
						type="text"
						name="marital_status"
						value={formData.marital_status}
						onChange={handleInputChange}
						className="input input-bordered"
					/>

					<label className="label">Agama</label>
					<input
						type="text"
						name="religion"
						value={formData.religion}
						onChange={handleInputChange}
						className="input input-bordered"
					/>

					<label className="label">Jurusan</label>
					<input
						type="text"
						name="major"
						value={formData.major}
						onChange={handleInputChange}
						className="input input-bordered"
					/>

					<label className="label">Posisi</label>
					<input
						type="text"
						name="occupation"
						value={formData.occupation}
						onChange={handleInputChange}
						className="input input-bordered"
					/>
				</div>

				<div className="modal-action">
					<button className="btn btn-primary" onClick={EditKaryawan}>
						Simpan
					</button>
					<button className="btn" onClick={() => closeModal('editModal')}>
						Batal
					</button>
				</div>
			</Modal>

			<Modal id="fileAttachment">
				<div>
					<h3 className="mb-4 text-xl font-bold">Lihat Berkas Karyawan</h3>
					<ul className="list-none">
						{file.map((file) => (
							<li key={file.id} className="flex items-center justify-between border-b py-2">
								<div className="flex items-center space-x-4">
									<div className="icon rounded-md border-[0.11115rem] border-solid border-gray-500 p-10">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="h-14 w-14"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
											/>
										</svg>
									</div>
									<span className="text-lg font-semibold text-gray-500">{file.file_name}</span>
								</div>
								{/* <div className="flex items-center gap-4">
									<button
										className="btn btn-outline btn-xs rounded-full"
										onClick={() => downloadFile(file.file_path, file.file_name)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="h-5 w-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
											/>
										</svg>
									</button>
									<button className="btn btn-outline btn-xs rounded-full">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="h-6 w-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
											/>
											<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
										</svg>
									</button>
								</div> */}
							</li>
						))}
					</ul>
				</div>
			</Modal>

			<Modal id="detailPelatihan">
				<h3 className="text-lg font-bold">Pelatihan yang sudah dilakukan</h3>
				<div className="mt-4 space-y-4">
					{pelatihan.map((item, index) => (
						<div className="card bg-base-100 shadow-md" key={index}>
							<div className="card-body">
								<h2 className="card-title">{item.title}</h2>
								<p>Tujuan: {item.purpose}</p>
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
