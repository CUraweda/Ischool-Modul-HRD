import { useState, useEffect } from 'react';
import { Karyawan } from '@/middlewares/api';
// import Modal, { openModal, closeModal } from '@/components/ModalProps';

const DaftarPenilaianPage = () => {
	const [fetch, setFetch] = useState<any[]>([]);

	const fetchData = async () => {
		try {
			const response = await Karyawan.DaftarPenilaian(0, 20);
			setFetch(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className="p-4">
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

			<div className="card bg-white p-4 shadow-md">
				<div className="overflow-x-auto">
					<table className="table table-zebra w-full">
						<thead>
							<tr>
								<th>
									<input type="checkbox" className="checkbox checkbox-sm" />
								</th>
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
									<td>
										<input type="checkbox" className="checkbox checkbox-sm" />
									</td>
									<td>{item.employee.full_name}</td>
									<td>{item.employee.email ? item.employee.email : '-'}</td>
									<td>{item.employee.occupation}</td>
									<td>{item.employee.grade}</td>
									<td>{item.employee.still_in_probation == false ? 'Tidak aktif' : 'Aktif'}</td>
									<td className="flex gap-2">
										<button className="btn btn-ghost btn-sm">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												className="h-4 w-4"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15.232 7.232a3 3 0 0 1 4.243 4.243l-8.485 8.485-4.242 1.414 1.414-4.243 8.485-8.485ZM16.5 8.5l-4.243 4.243"
												/>
											</svg>
										</button>
										<button className="btn btn-ghost btn-sm">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												className="h-4 w-4"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path strokeLinecap="round" strokeLinejoin="round" d="M19 13H5v-2h14v2Z" />
											</svg>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default DaftarPenilaianPage;
