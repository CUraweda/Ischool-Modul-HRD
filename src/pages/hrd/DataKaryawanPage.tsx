import { useState, useEffect } from 'react';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { Karyawan } from '@/middlewares/api';

const DataKaryawanPage = () => {
	const [search, setSearch] = useState('');
	const [dataKaryawan, setDataKaryawan] = useState<any[]>([]);
	const handleDialog = () => {
		openModal('addKaryawan');
	};

	const fetchData = async () => {
		try {
			const response = await Karyawan.DataKaryawan(1, 20, search);
			setDataKaryawan(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [search]);
	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">Data Karyawan</h3>
				<label className="input input-sm input-bordered flex items-center gap-2">
					<input type="text" className="grow" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
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

			<div className="h-[1px] w-full bg-gray-300"></div>

			<div className="items-cente mt-6 flex justify-between">
				<div className="flex items-center gap-2">
					<button className="btn btn-outline btn-info btn-xs">
						Semua <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Dibuka <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Ditutup <span>25</span>
					</button>
				</div>

				<div className="flex items-center gap-2">
					<button className="btn btn-xs" onClick={handleDialog}>
						<span>+</span> Tambah
					</button>
					<select className="select select-bordered select-xs w-full max-w-xs">
						<option disabled selected>
							Filter
						</option>
						<option>Tiny Apple</option>
						<option>Tiny Orange</option>
						<option>Tiny Tomato</option>
					</select>
				</div>
			</div>

			<div className="q-mt card mt-5 w-full bg-base-100 shadow-xl">
				<div className="card-body">
					<div className="overflow-x-auto">
						<table className="table table-zebra w-full">
							<thead className="sticky top-0 z-10 bg-base-200">
								<tr>
									<th className="text-xs">No</th>
									<th className="text-xs">Nama</th>
									<th className="text-xs">Posisi</th>
									<th className="text-xs">Jabatan</th>
									<th className="text-xs">Status</th>
									<th className="text-xs">Action</th>
								</tr>
							</thead>
							<tbody>
								{dataKaryawan.map((item, index) => (
									<tr key={index}>
										<td className="px-4 py-2">{index + 1}</td>
										<td className="px-4 py-2">{item.full_name}</td>
										<td className="px-4 py-2">
											<span className="rounded-md bg-[#DBEAFF] p-2 text-xs font-semibold text-gray-500">Guru</span>
										</td>
										<td className="px-4 py-2">Guru SD 2 Azzaitun</td>
										<td className="px-4 py-2">{item.employee_status}</td>
										<td className="relative px-4 py-2">test</td>
									</tr>
								))}
								{/* <tr>
									<td className="px-4 py-2">1</td>
									<td className="px-4 py-2">Alya Putri Azzahra</td>
									<td className="px-4 py-2">
										<span className="rounded-md bg-[#DBEAFF] p-2 text-xs font-semibold text-gray-500">Guru</span>
									</td>
									<td className="px-4 py-2">Guru SD 2 Azzaitun</td>
									<td className="px-4 py-2">Tetap</td>
									<td className="relative px-4 py-2">test</td>
								</tr> */}
								{/* Additional rows can go here */}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<Modal id="addKaryawan">
				<div>
					<h2 className="mb-4 text-xl font-bold">Tambah Penerimaan Baru</h2>
					<form>
						<div className="mb-4 gap-4">
							<div>
								<label className="mb-1 block text-sm font-medium">Posisi</label>
								<select className="w-full rounded border border-gray-300 p-2" required>
									<option value="" disabled>
										-Pilih-
									</option>
									{/* Add role options here */}
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Nama Lengkap</label>
								<input type="text" className="w-full rounded border border-gray-300 p-2" required />
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Status</label>
								<select className="w-full rounded border border-gray-300 p-2" required>
									<option value="" disabled>
										-Pilih-
									</option>
									{/* Add division options here */}
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Jabatan</label>
								<input type="number" className="w-full rounded border border-gray-300 p-2" required />
							</div>
						</div>

						<div className="flex justify-end">
							<button type="submit" className="btn btn-primary">
								Tambah
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default DataKaryawanPage;
