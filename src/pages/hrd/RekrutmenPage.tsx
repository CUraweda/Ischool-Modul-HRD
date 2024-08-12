import { useEffect, useState } from 'react';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { Rekrutmen } from '@/middlewares/api';

const RekrutmenPage = () => {
	const [datarekrutmen, setDataRekrutmen] = useState<any[]>([]);
	const handleDialog = () => {
		openModal('addRekrutmen');
	};

	const fetchData = async () => {
		try {
			const response = await Rekrutmen.DataRekrutmen(1, 20);
			setDataRekrutmen(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">Rekrutmen</h3>
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

			<div className="card mt-10 w-full bg-base-100 shadow-xl">
				<div className="card-body">
					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-bold">Karyawan</h4>
							<p className="text-xs">Dibuat 25 Mei 2023</p>
						</div>
						<div>
							<div className="text-xs">Divisi</div>
							<div className="badge badge-primary text-xs">Keuangan</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BFDCFE]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="#416AC0"
									className="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
									/>
								</svg>
							</div>

							<div>
								<div className="text-xs">Tanggal Penerimaan</div>
								<div className="text-xs font-bold">25 - 30 Mei 2023</div>
							</div>
						</div>

						<div>
							<div className="text-xs">Pendaftar</div>
							<div>
								<div className="avatar-group -space-x-3 rtl:space-x-reverse">
									<div className="avatar">
										<div className="w-6">
											<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
										</div>
									</div>
									<div className="avatar">
										<div className="w-6">
											<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
										</div>
									</div>
									<div className="avatar">
										<div className="w-6">
											<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
										</div>
									</div>
									<div className="avatar placeholder">
										<div className="w-6 bg-neutral text-xs text-neutral-content">
											<span>+99</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<div
								className="radial-progress text-xs text-primary"
								style={{ '--value': '70', '--size': '3rem' }}
								role="progressbar"
							>
								70%
							</div>
							<div className="text-xs">
								<span className="font-bold">5</span>/10 Pendaftar
							</div>
						</div>

						<div>
							<div className="text-xs">Status Penerimaan</div>
							<div className="flex items-center gap-2">
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
										d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								<div className="text-sm text-primary"> Dibuka</div>
							</div>
						</div>

						<div className="dropdown dropdown-end">
							<div tabIndex={0} role="button" className="btn btn-outline btn-xs m-1 h-10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="#6A6B6B"
									className="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
									/>
								</svg>
							</div>
							<ul tabIndex={0} className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
								<div className="px-4 py-2 text-center text-gray-500">
									Rubah Status
									<div className="mt-1 h-[1px] w-full bg-gray-300"></div>
								</div>
								<li>
									<div className="flex items-center p-2">
										<div className="rounded-full bg-yellow-500 p-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={2}
												className="h-2 w-2 rounded-full bg-white"
											>
												<circle cx="12" cy="12" r="10" />
											</svg>
										</div>
										<span className="ml-2 font-semibold">Tutup Penerimaan</span>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<Modal id="addRekrutmen">
				<div>
					<h2 className="mb-4 text-xl font-bold">Tambah Penerimaan Baru</h2>
					<form>
						<div className="mb-4 grid grid-cols-2 gap-4">
							<div>
								<label className="mb-1 block text-sm font-medium">Role</label>
								<select className="w-full rounded border border-gray-300 p-2" required>
									<option value="" disabled>
										-Pilih-
									</option>
									{/* Add role options here */}
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Divisi</label>
								<select className="w-full rounded border border-gray-300 p-2" required>
									<option value="" disabled>
										-Pilih-
									</option>
									{/* Add division options here */}
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Periode Pendaftaran</label>
								<input type="text" className="w-full rounded border border-gray-300 p-2" required />
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Pendaftar yang Dibutuhkan</label>
								<input type="number" className="w-full rounded border border-gray-300 p-2" required />
							</div>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium">Jenjang Pendidikan</label>
							<select className="w-full rounded border border-gray-300 p-2" required>
								<option value="" disabled>
									-Pilih-
								</option>
								{/* Add education level options here */}
							</select>
						</div>

						<div className="mt-2">
							<label className="mb-1 block text-sm font-medium">Note</label>
							<textarea className="w-full rounded border border-gray-300 p-2" rows="4"></textarea>
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

export default RekrutmenPage;
