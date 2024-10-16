import { useState, useEffect } from 'react';
import { Karyawan } from '@/middlewares/api';
import Modal, { openModal, closeModal } from '@/components/ModalProps';
import Swal from 'sweetalert2';

const PublicPenilaian = () => {
	const [fetch, setFetch] = useState<any[]>([]);
	const [nilai, setNilai] = useState('');
	const [id, setId] = useState();
	const [search, setSearch] = useState('');

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await Karyawan.DaftarPenilaian(0, 20, search, access_token);
			setFetch(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
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

	const handleDialog = (item: any, id: any) => {
		openModal('editGrade');
		setId(id);
		setNilai(item.grade);
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
									<td>{item.is_finish ? 'Aktif' : 'Tidak aktif'}</td>
									<td className="flex gap-2">
										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="btn btn-primary btn-sm">
												...
											</label>
											<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
												<li>
													<a onClick={() => handleDialog(item, item.id)}>Edit Nilai</a>
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

export default PublicPenilaian;
