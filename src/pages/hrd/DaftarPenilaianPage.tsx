import { useState, useEffect } from 'react';
import { Karyawan } from '@/middlewares/api';
import Modal, { openModal, closeModal } from '@/components/ModalProps';
import Swal from 'sweetalert2';
import CheckboxSelect from '@/components/SelectComponent';

const DaftarPenilaianPage = () => {
	const [fetch, setFetch] = useState<any[]>([]);
	const [dropdownKaryawan, setDropdownKaryawan] = useState<any[]>([]);
	const [selectedKaryawan, setSelectedKaryawan] = useState<string[]>([]);
	const [dropdownAsessor, setDropdownAsessor] = useState<any[]>([]);
	const [selectedAsessor, setSelectedAsessor] = useState<string[]>([]);
	const [typeAsessor, setTypeAsessor] = useState('');
	const [typeEmployee, setTypeEmployee] = useState('');
	const [judulKegiatan, setJudulKegiatan] = useState('');
	const [deskripsiKegiatan, setDeskripsiKegiatan] = useState('');
	const [priority, setPriority] = useState<Number | null>(1);
	const [tenggatWaktu, setTenggatWaktu] = useState('');
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
			const responseAsessor = await Karyawan.DaftarAsessor(0, 10000, '', access_token);
			setDropdownAsessor(responseAsessor.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const AddPenilaian = async () => {
		const data = {
			asessor_ids: selectedAsessor,
			employee_ids: selectedKaryawan,
			name: judulKegiatan,
			description: deskripsiKegiatan,
			due_date: tenggatWaktu,
			priority: priority,
			all_employee: typeEmployee == 'Semua' ? true : false,
			all_asessor: typeEmployee == 'Semua' ? true : false,
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
		setTenggatWaktu(item.due_date.split('T')[0]);
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
			closeModal('editGrade');
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});

			closeModal('editGrade');
		}
	};

	const resetForm = () => {
		setSelectedKaryawan([]);
		setJudulKegiatan('');
		setDeskripsiKegiatan('');
		setTenggatWaktu('');
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
				<div className="overflow-auto">
					<table className="table table-zebra mb-20 w-full">
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
									<td>{item.full_name}</td>
									<td>{item.email ? item.email : '-'}</td>
									<td className="px-4 py-2">
										<div className="rounded-md bg-[#DBEAFF] p-2 text-center text-xs font-semibold text-gray-500">
											{item.occupation}
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
									<td>
										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="btn btn-primary btn-sm">
												...
											</label>
											<ul tabIndex={0} className="menu dropdown-content z-50 w-52 rounded-box bg-base-100 shadow-xl">
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
							<label htmlFor="kirimKepada" className="label">
								<span className="label-text font-semibold">Kirim Kepada (Asessor)</span>
							</label>
							<select
								id="kirimKepada"
								className="select select-bordered w-full"
								onChange={(e) => setTypeAsessor(e.target.value)}
							>
								<option value="" disabled>
									Pilih penerima
								</option>
								<option value="Semua">Semua</option>
								<option value="Custom">Custom</option>
							</select>
						</div>
						{typeAsessor === 'Custom' && (
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Pilih Asessor</label>

								<CheckboxSelect
									options={dropdownAsessor.map((karyawan) => ({
										id: karyawan.id,
										full_name: karyawan.full_name,
									}))}
									selectedOptions={selectedAsessor}
									onChange={setSelectedAsessor}
								/>
							</div>
						)}

						<div>
							<label htmlFor="kirimKepada" className="label">
								<span className="label-text font-semibold">Kirim Kepada (Karyawan)</span>
							</label>
							<select
								id="kirimKepada"
								className="select select-bordered w-full"
								onChange={(e) => setTypeEmployee(e.target.value)}
							>
								<option value="" disabled>
									Pilih penerima
								</option>
								<option value="Semua">Semua</option>
								<option value="Custom">Custom</option>
							</select>
						</div>
						{typeEmployee === 'Custom' && (
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Pilih Karyawan</label>

								<CheckboxSelect
									options={dropdownKaryawan.map((karyawan) => ({
										id: karyawan.id,
										full_name: karyawan.full_name,
									}))}
									selectedOptions={selectedKaryawan}
									onChange={setSelectedKaryawan}
								/>
							</div>
						)}

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
							<label htmlFor="kirimKepada" className="label">
								<span className="label-text font-semibold">Prioritas</span>
							</label>
							<select
								id="prioritas"
								className="select select-bordered w-full"
								onChange={(e) => setPriority(parseInt(e.target.value))}
							>
								<option value={0} disabled>
									Pilih Prioritas
								</option>
								<option value={1}>Rendah</option>
								<option value={2}>Sedang</option>
								<option value={3}>Tinggi</option>
							</select>
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
