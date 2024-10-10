import { useState, useEffect } from 'react';
import { Karyawan } from '@/middlewares/api';
import Modal, { openModal, closeModal } from '@/components/ModalProps';
import Swal from 'sweetalert2';

const DaftarPenilaianPage = () => {
	const [fetch, setFetch] = useState<any[]>([]);
	const [dropdownKaryawan, setDropdownKaryawan] = useState<any[]>([]);
	const [selectedKaryawan, setSelectedKaryawan] = useState('');
	const [judulKegiatan, setJudulKegiatan] = useState('');
	const [deskripsiKegiatan, setDeskripsiKegiatan] = useState('');
	const [tenggatWaktu, setTenggatWaktu] = useState('');
	const [prioritas, setPrioritas] = useState('');
	const [nilai, setNilai] = useState('');
	const [editMode, setEditMode] = useState(false);
	const [editId, setEditId] = useState<number | null>(null);
	const [id, setId] = useState();
	const [search, setSearch] = useState('');

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await Karyawan.DaftarPenilaian(0, 20, search, access_token);
			setFetch(response.data.data.result);
			const responseDropdownKaryawan = await Karyawan.DataKaryawan(0, 1000000, '', '', access_token);
			setDropdownKaryawan(responseDropdownKaryawan.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const AddPenilaian = async () => {
		const data = {
			employee_id: selectedKaryawan,
			name: judulKegiatan,
			description: deskripsiKegiatan,
			due_date: tenggatWaktu,
			priority: 1,
			priority_label: prioritas,
			grade: nilai,
		};

		try {
			if (editMode && editId !== null) {
				await Karyawan.EditPenilaian(data, editId);
			} else {
				await Karyawan.AddPenilaian(data);
			}
			fetchData();
			closeModal('addPenilaian');
			resetForm();
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Penilaian berhasil ditambah',
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

	const handleEdit = (item: any) => {
		setSelectedKaryawan(item.employee.id);
		setJudulKegiatan(item.name);
		setDeskripsiKegiatan(item.description);
		setTenggatWaktu(item.due_date);
		setPrioritas(item.priority_label);
		setNilai(item.grade);
		setEditMode(true);
		setEditId(item.id);
		openModal('addPenilaian');
	};

	const editNilai = async () => {
		const data = {
			grade: nilai,
		};
		try {
			await Karyawan.EditNilai(data, id);
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Penilaian berhasil diubah',
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

	const resetForm = () => {
		setSelectedKaryawan('');
		setJudulKegiatan('');
		setDeskripsiKegiatan('');
		setTenggatWaktu('');
		setPrioritas('');
		setNilai('');
		setEditMode(false);
		setEditId(null);
	};

	const handleDialog = (type: string, item: any, id: any) => {
		resetForm();
		if (type == 'data') {
			openModal('addPenilaian');
		} else {
			openModal('editGrade');
			setId(id);
			setNilai(item.grade);
		}
	};

	useEffect(() => {
		fetchData();
	}, [search]);

	return (
		<div className="min-h-screen">
			<div className="mb-8 flex items-center justify-between">
				<h3 className="text-lg font-bold">Daftar Penilaian</h3>
				<label className="input input-sm input-bordered flex items-center gap-2">
					<input type="text" className="grow" placeholder="Cari" onChange={(e) => setSearch(e.target.value)} />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="h-4 w-4 opacity-70"
					>
						<path
							fillRule="evenodd"
							d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</label>
			</div>

			<div className="mb-4 flex items-end justify-end">
				<button className="btn btn-xs" onClick={() => handleDialog('data', '', '')}>
					<span>+</span> Tambah
				</button>
			</div>

			<div className="card bg-white p-4 shadow-md">
				<div>
					<table className="table table-zebra w-full">
						<thead>
							<tr>
								<th>Nama</th>
								<th>Email</th>
								<th>Posisi</th>
								<th>Nilai</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{fetch.map((item, index) => (
								<tr key={index}>
									<td>{item.employee.full_name}</td>
									<td>{item.employee.email ? item.employee.email : '-'}</td>
									<td className="px-4 py-2">
										<div className="rounded-md bg-[#DBEAFF] p-2 text-center text-xs font-semibold text-gray-500">
											{item.employee.occupation}
										</div>
									</td>
									<td>{item.grade}</td>
									<td>
										{item.is_finish == false
											? 'Belum Dikerjakan'
											: item.is_graded == false
												? 'Belum Dinilai'
												: 'Selesai Dikerjakan'}
									</td>
									<td className="flex gap-2">
										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="btn btn-primary btn-sm">
												...
											</label>
											<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
												<li>
													<a onClick={() => handleEdit(item)}>Edit Data</a>
												</li>
												<li>
													<a onClick={() => handleDialog('nilai', item, item.id)}>Edit Nilai</a>
												</li>
											</ul>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<Modal id="addPenilaian">
				<div className="p-6">
					<h2 className="mb-4 text-xl font-bold text-gray-800">{editMode ? 'Edit Penilaian' : 'Tambah Penilaian'}</h2>
					<div className="flex flex-col gap-4">
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Pilih Karyawan</label>
							<select
								className="select select-bordered w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
								value={selectedKaryawan}
								onChange={(e) => setSelectedKaryawan(e.target.value)}
							>
								<option value="">-Pilih-</option>
								{dropdownKaryawan.map((item, index) => (
									<option value={item.id} key={index}>
										{item.full_name}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Judul Kegiatan</label>
							<input
								type="text"
								className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
								placeholder="Masukkan judul kegiatan"
								value={judulKegiatan}
								onChange={(e) => setJudulKegiatan(e.target.value)}
							/>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi Kegiatan</label>
							<textarea
								className="textarea textarea-bordered w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
								placeholder="Masukkan deskripsi kegiatan"
								value={deskripsiKegiatan}
								onChange={(e) => setDeskripsiKegiatan(e.target.value)}
							/>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Tenggat Waktu</label>
							<input
								type="date"
								className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
								placeholder="Pilih tenggat waktu"
								value={tenggatWaktu}
								onChange={(e) => setTenggatWaktu(e.target.value)}
							/>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Prioritas</label>
							<select
								className="select select-bordered w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
								value={prioritas}
								onChange={(e) => setPrioritas(e.target.value)}
							>
								<option value="">-Pilih-</option>
								<option value="Tinggi">Tinggi</option>
								<option value="Sedang">Sedang</option>
								<option value="Rendah">Rendah</option>
							</select>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Nilai</label>
							<input
								type="text"
								className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
								placeholder="Masukkan nilai"
								value={nilai}
								onChange={(e) => setNilai(e.target.value)}
							/>
						</div>
					</div>

					<div className="mt-6 flex justify-end gap-2">
						<button className="btn" onClick={() => closeModal('addPenilaian')}>
							Tutup
						</button>
						<button className="btn btn-primary" onClick={AddPenilaian}>
							{editMode ? 'Simpan Perubahan' : 'Tambah'}
						</button>
					</div>
				</div>
			</Modal>

			<Modal id="editGrade">
				<div className="p-6">
					<h2 className="mb-4 text-xl font-bold text-gray-800">Edit Nilai</h2>
					<div className="flex flex-col gap-4">
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Nilai</label>
							<input
								type="text"
								className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
								placeholder="Masukkan nilai"
								value={nilai}
								onChange={(e) => setNilai(e.target.value)}
							/>
						</div>
					</div>

					<div className="mt-6 flex justify-end gap-2">
						<button className="btn" onClick={() => closeModal('addPenilaian')}>
							Tutup
						</button>
						<button className="btn btn-primary" onClick={editNilai}>
							Simpan Perubahan
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DaftarPenilaianPage;
