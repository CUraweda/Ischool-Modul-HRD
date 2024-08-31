import { Karyawan } from '@/middlewares/api';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
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
		alamat: '',
		jenjangPendidikan: '',
		bidang: '',
		istriSuami: '',
		jumlahAnak: '',
		kelengkapanBerkas: '',
		posisi: '',
		status: '',
		jabatan: '',
		mulaiBekerja: '',
	});

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// Handle form submission
		closeModal('editProfilKaryawan');
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
				alamat: '', // Assuming there's no field for address in the API
				jenjangPendidikan: data.last_education || '',
				bidang: data.major || '',
				istriSuami: '', // Assuming there's no field for spouse in the API
				jumlahAnak: '', // Assuming there's no field for children in the API
				kelengkapanBerkas: '', // Assuming there's no field for documents in the API
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
							<p>
								<strong>Alamat:</strong> {formData.alamat || 'Tidak tersedia'}
							</p>
						</div>
						<div className="p-4">
							<h2 className="mb-2 text-lg font-semibold">Informasi Lainnya</h2>
							<p>
								<strong>Pendidikan:</strong> {fetch?.last_education} - {fetch?.major}
							</p>
							<p>
								<strong>Kelengkapan Berkas:</strong> {formData.kelengkapanBerkas || 'Tidak tersedia'}
							</p>
							<p>
								<strong>Istri/Suami, dan Anak:</strong> {formData.istriSuami || 'Tidak tersedia'},{' '}
								{formData.jumlahAnak || 'Tidak tersedia'}
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
					<button className="btn btn-accent">Lihat Detail Pelatihan</button>
					<button className="btn btn-secondary" onClick={handleDialog}>
						Edit Profil
					</button>
				</div>
			</div>

			<Modal id="editProfilKaryawan">
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
			</Modal>
		</div>
	);
};

export default DetailProfilKaryawanPage;
