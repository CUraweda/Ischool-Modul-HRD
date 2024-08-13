import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import image from '../../assets/images/blueAbstractPattern.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
	labels: ['senin', 'selasa', 'rabu', 'kamis', 'jumat'],
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
			display: false,
		},
	},
	scales: {
		x: {
			title: {
				display: false,
			},
		},
		y: {
			title: {
				display: false,
			},
		},
	},
};

const DetailCardProbationPage = () => {
	return (
		<div className="min-h-screen bg-blue-100 p-4">
			<div className="mb-3 flex items-center justify-between">
				<div>
					<h3 className="font-bold">Rekrutmen</h3>
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

			<div className="flex justify-end">
				<button className="btn btn-primary">Akhiri Masa Percobaan</button>
			</div>

			<div className="card w-full bg-base-100 p-6 shadow-xl">
				<div className="">
					<div className="flex items-center justify-between">
						<img src={image} alt="Profile" className="mb-4 h-40 w-40 rounded-md" />
						<div className="">
							<label>Nama</label>
							<h2 className="text-xl font-bold">Alya Putri Azzahra</h2>
							<p>094587346724</p>
							<p>alyaputriazzahra52@gmail.com</p>
						</div>

						<div className=" ">
							<div className="nmb-4">
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
					</div>

					<div className="flex items-center gap-2">
						<div className="w-[60rem]">
							<h3 className="mb-2 font-bold">Kinerja</h3>
							<Bar data={data} options={options} />
						</div>
						<div className="mt-4">
							<h3 className="mb-2 font-bold">Kehadiran</h3>
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
				</div>
			</div>
		</div>
	);
};

export default DetailCardProbationPage;
