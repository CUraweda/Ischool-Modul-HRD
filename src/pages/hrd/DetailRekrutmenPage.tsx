import React from 'react';
import Modal, { openModal, closeModal } from '../../components/ModalProps';

const DetailRekrutmenPage = () => {
	const handleDialog = () => {
		openModal('previewCv');
	};

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<div>
					<h3 className="font-bold">Karyawan</h3>
					<div className="text-sm">Keuangan</div>
				</div>
				<label className="input input-sm input-bordered flex items-center gap-2">
					<input type="text" className="grow" placeholder="Search" />
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

			<div className="mt-6 flex justify-between">
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

			<div className="card mt-10 w-full bg-base-100 shadow-xl">
				<div className="card-body">
					<div className="overflow-x-auto">
						<table className="table">
							<thead>
								<tr>
									<th>
										<label>
											<input type="checkbox" className="checkbox" />
										</label>
									</th>
									<th className="text-sm text-black">Nama</th>
									<th className="text-sm text-black">Email</th>
									<th className="text-sm text-black">Tanggal</th>
									<th className="text-sm text-black">Status</th>
									<th className="text-sm text-black"></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>
										<label>
											<input type="checkbox" className="checkbox" />
										</label>
									</th>
									<td>
										<div className="flex items-center gap-3">
											<div className="avatar">
												<div className="mask mask-squircle h-12 w-12">
													<img
														src="https://img.daisyui.com/images/profile/demo/2@94.webp"
														alt="Avatar Tailwind CSS Component"
													/>
												</div>
											</div>
											<div>
												<div className="font-bold">Razan Mfs</div>
												<div className="text-sm opacity-50">Pengalaman lebih dari 3 Tahun</div>
											</div>
										</div>
									</td>
									<td>
										<span className="badge badge-ghost badge-sm">razanmfs507@gmail.com</span>
									</td>
									<td>25/03/2004</td>
									<td className="text-center">-</td>
									<th>
										<button className="btn btn-primary btn-sm" onClick={handleDialog}>
											Buka
										</button>
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<Modal id="previewCv">
				<div>test</div>
			</Modal>
		</div>
	);
};

export default DetailRekrutmenPage;
