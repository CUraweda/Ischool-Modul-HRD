import { useState, useEffect } from 'react';
import { Karyawan } from '@/middlewares/api';
import Modal, { openModal, closeModal } from '@/components/ModalProps';

const DaftarPenilaianPage = () => {
	const [fetch, setFetch] = useState<any[]>([]);
	const [dropdownKaryawan, setDropdownKaryawan] = useState<any[]>([]);

	const fetchData = async () => {
		try {
			const response = await Karyawan.DaftarPenilaian(0, 20);
			setFetch(response.data.data.result);
			const responseDropdownKaryawan = await Karyawan.DataKaryawan(0, 1000000, '', '');
			setDropdownKaryawan(responseDropdownKaryawan.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDialog = () => {
		openModal('addPenilaian');
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className="min-h-screen">
			<div className="mb-8 flex items-center justify-between">
				<h3 className="text-lg font-bold">Daftar Penilaian</h3>
				<label className="input input-sm input-bordered flex items-center gap-2">
					<input type="text" className="grow" placeholder="Cari" />
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
				<button className="btn btn-xs" onClick={handleDialog}>
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
									</td>{' '}
									<td>{item.employee.grade}</td>
									<td>{item.employee.still_in_probation == false ? 'Tidak aktif' : 'Aktif'}</td>
									<td className="flex gap-2">
										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="btn btn-primary btn-sm">
												...
											</label>
											<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
												<li>
													<a>Edit Data</a>
												</li>
												<li>
													<a>Edit Nilai</a>
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
				<div>
					<h2 className="mb-4 text-xl font-bold">Tambah Penerimaan Baru</h2>
					<div className="flex flex-col gap-2">
						<div>
							<label className="mb-1 text-sm font-medium">Judul Rekrutmen</label>
							<input
								type="text"
								className="w-full rounded border border-gray-300 p-2"
								placeholder="Masukkan judul rekrutmen"
							/>
						</div>
						<div>
							<label className="mb-1 text-sm font-medium">Role</label>
							<select className="w-full rounded border border-gray-300 p-2">
								<option value="">-Pilih-</option>
								{dropdownKaryawan.map((item, index) => (
									<option value={item.id} key={index}>
										{item.full_name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DaftarPenilaianPage;
