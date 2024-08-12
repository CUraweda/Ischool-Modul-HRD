import { Bar } from 'react-chartjs-2';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
	labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
	datasets: [
		{
			label: 'Kinerja',
			data: [3, 3, 4, 5, 2],
			backgroundColor: 'rgba(54, 162, 235, 0.5)',
		},
	],
};

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Kinerja Mingguan',
		},
	},
};

const DetailProbationPage = () => {
	const handleDialog = () => {
		openModal('previewProbation');
	};

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<div>
					<h3 className="font-bold">Probation</h3>
					<div className="text-sm">Karyawan</div>
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
									<td className="text-center">Masa Percobaan</td>
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

			<Modal id="previewProbation">
				<div className="flex flex-col items-center">
					<img src="path_to_your_image.png" alt="Profile" className="mb-4 h-24 w-24 rounded-full" />
					<div className="text-center">
						<h2 className="text-xl font-bold">Alya Putri Azzahra</h2>
						<p>094587346724</p>
						<p>alyaputriazzahra52@gmail.com</p>
					</div>
					<div className="mt-4">
						<div className="flex w-full justify-between">
							<div>
								<p>
									<strong>Tgl Mulai:</strong> 23 Mei 2024
								</p>
								<p>
									<strong>Tgl Berakhir:</strong> 23 Juli 2024
								</p>
								<p>
									<strong>Durasi Magang:</strong> 3 Bulan
								</p>
								<p>
									<strong>Sisa Waktu Magang:</strong> 1 Bulan 15 Hari
								</p>
							</div>
						</div>
					</div>
					<div className="mt-4 w-full">
						<Bar data={data} options={options} />
					</div>
					<div className="mt-4 w-full">
						<table className="table w-full">
							<thead>
								<tr>
									<th>Tanggal</th>
									<th>Keterangan</th>
									<th>Jam Datang</th>
									<th>Jam Pulang</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>04/06/2024</td>
									<td>Hadir</td>
									<td>09:30</td>
									<td>16:30</td>
									<td>Tepat Waktu</td>
								</tr>
								<tr>
									<td>04/06/2024</td>
									<td>Hadir</td>
									<td>08:54</td>
									<td>17:00</td>
									<td>Tepat Waktu</td>
								</tr>
								<tr>
									<td>04/06/2024</td>
									<td>Izin</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
								<tr>
									<td>04/06/2024</td>
									<td>Hadir</td>
									<td>11:00</td>
									<td>17:00</td>
									<td>Terlambat</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DetailProbationPage;
