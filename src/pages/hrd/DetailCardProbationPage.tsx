import image from '../../assets/images/blueAbstractPattern.png';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
// import { useParams } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DetailCardProbationPage = () => {
	// const { id } = useParams<{ id: string }>();
	// const { id2 } = useParams<{ id2: string }>();

	// Data for the chart
	const data = {
		labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
		datasets: [
			{
				label: 'Performance',
				data: [80, 70, 75, 90, 60], // Performance data for each day
				backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div className="min-h-screen">
			<div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Top Section: Two Cards */}
				<div className="rounded-lg bg-white p-6 shadow-lg">
					{/* Profile Card */}
					<div className="flex flex-col items-center">
						<img src={image} alt="Profile" className="mb-4 h-36 w-36 rounded-lg object-cover" />
						<h2 className="text-lg font-bold">Alya Putri Azzahra</h2>
						<p className="text-sm text-gray-500">No. Telp: 094587346724</p>
						<p className="text-sm text-gray-500">Email: alyaputriazzahra52@gmail.com</p>
					</div>
				</div>

				<div className="rounded-lg bg-white p-6 shadow-lg">
					{/* Internship Details Card */}
					<h3 className="text-lg font-semibold">Internship Details</h3>
					<div className="mt-4">
						<p className="text-gray-700">
							Tgl Mulai: <span className="font-bold">23 Mei 2024</span>
						</p>
						<p className="text-gray-700">
							Tgl Berakhir: <span className="font-bold">23 Juli 2024</span>
						</p>
						<p className="text-gray-700">
							Durasi Magang: <span className="font-bold">3 Bulan</span>
						</p>
						<p className="text-gray-700">
							Sisa Waktu Magang: <span className="font-bold">1 Bulan 15 Hari</span>
						</p>
					</div>
				</div>

				{/* Bottom Section: Two Cards (Table and Chart) */}
				<div className="col-span-1 rounded-lg bg-white p-6 shadow-lg">
					{/* Attendance Table */}
					<h3 className="text-lg font-semibold">Kehadiran</h3>
					<div className="mt-4 overflow-x-auto">
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
									<td>09.30</td>
									<td>16.30</td>
									<td className="text-green-500">Tepat Waktu</td>
								</tr>
								<tr>
									<td>05/06/2024</td>
									<td>Hadir</td>
									<td>08.54</td>
									<td>17.00</td>
									<td className="text-green-500">Tepat Waktu</td>
								</tr>
								<tr>
									<td>06/06/2024</td>
									<td>Izin</td>
									<td>-</td>
									<td>-</td>
									<td className="text-yellow-500">Izin</td>
								</tr>
								<tr>
									<td>07/06/2024</td>
									<td>Hadir</td>
									<td>11.00</td>
									<td>17.00</td>
									<td className="text-red-500">Terlambat</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="col-span-1 rounded-lg bg-white p-6 shadow-lg">
					{/* Performance Graph */}
					<h3 className="text-lg font-semibold">Kinerja</h3>
					<Bar data={data} options={options} />
				</div>
			</div>
		</div>
	);
};

export default DetailCardProbationPage;
