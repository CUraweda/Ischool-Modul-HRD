import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { useState } from 'react';

const DetailProfilKaryawanPage = () => {
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

	return (
		<div className="min-h-screen bg-base-200 p-6">
			<div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
				<div className="mb-6 flex items-center">
					<img src="https://via.placeholder.com/100" alt="Profile" className="h-24 w-24 rounded-full" />
					<div className="ml-4">
						<h1 className="text-2xl font-bold">Ade Saeful Uyun, S.Th.I</h1>
						<p className="text-gray-600">EmailSaya123@gmail.com</p>
						<p className="text-gray-600">+62 71864713741</p>
					</div>
				</div>
				<div className="border-b border-t">
					<div className="grid grid-cols-2 gap-4 border-b">
						<div className="border-r p-4">
							<h2 className="mb-2 text-lg font-semibold">Informasi Pribadi</h2>
							<p>
								<strong>NIK:</strong> 3211267214872467186461
							</p>
							<p>
								<strong>Jenis Kelamin:</strong> Laki Laki
							</p>
							<p>
								<strong>Agama:</strong> Islam
							</p>
							<p>
								<strong>Tanggal Lahir:</strong> Tangerang, 26 - 11 - 1978
							</p>
							<p>
								<strong>Umur:</strong> 46 Tahun
							</p>
							<p>
								<strong>Status Pernikahan:</strong> Sudah Menikah
							</p>
							<p>
								<strong>Alamat:</strong> Jalan Depok Indah no.123 RT/ RW 002/004
							</p>
						</div>
						<div className="p-4">
							<h2 className="mb-2 text-lg font-semibold">Informasi Lainnya</h2>
							<p>
								<strong>Pendidikan:</strong> S1 - Tafsir Hadist
							</p>
							<p>
								<strong>Kelengkapan Berkas:</strong> Lengkap{' '}
								<a href="#" className="text-blue-500">
									Lihat Berkas
								</a>
							</p>
							<p>
								<strong>Istri/Suami, dan Anak:</strong> Putri Aisha, 3 anak
							</p>
						</div>
					</div>
					<div className="grid grid-cols-4 gap-4">
						<div className="border-r p-4">
							<p>
								<strong>Posisi:</strong> Guru SD
							</p>
						</div>
						<div className="border-r p-4">
							<p>
								<strong>Jabatan:</strong> Guru SD 2 Azzaitun
							</p>
						</div>
						<div className="border-r p-4">
							<p>
								<strong>Bidang:</strong> Tafsir Hadist
							</p>
						</div>
						<div className="p-4">
							<p>
								<strong>Mulai Bekerja:</strong> 03 Mei 2010
							</p>
						</div>
					</div>
				</div>
				<div className="mt-6 flex justify-between">
					<button className="btn btn-primary">Guru</button>
					<button className="btn btn-secondary">Tetap</button>
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
							<label>Istri/suami</label>
							<input
								type="text"
								name="istriSuami"
								value={formData.istriSuami}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Jenis Kelamin</label>
							<input
								type="text"
								name="jenisKelamin"
								value={formData.jenisKelamin}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div>
							<label>Jumlah Anak</label>
							<input
								type="text"
								name="jumlahAnak"
								value={formData.jumlahAnak}
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
							<label>Kelengkapan Berkas</label>
							<input
								type="text"
								name="kelengkapanBerkas"
								value={formData.kelengkapanBerkas}
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
							<label>Umur</label>
							<input
								type="text"
								name="umur"
								value={formData.umur}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
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
							<label>Status Pernikahan</label>
							<input
								type="text"
								name="statusPernikahan"
								value={formData.statusPernikahan}
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
							<label>Mulai Bekerja</label>
							<input
								type="date"
								name="mulaiBekerja"
								value={formData.mulaiBekerja}
								onChange={handleInputChange}
								className="input input-bordered w-full"
							/>
						</div>
					</div>
					<div className="mt-4">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default DetailProfilKaryawanPage;
