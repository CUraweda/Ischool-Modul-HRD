import image from '../../assets/images/blueAbstractPattern.png';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Probation } from '@/middlewares/api';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DetailCardProbationPage = () => {
	// const { id } = useParams<{ id: string }>();
	const { id2 } = useParams<{ id2: string }>();
	const [fetch, setFetch] = useState<any | null>([]);

	const FetchData = async () => {
		try {
			const response = await Probation.DetailByUser(id2);
			setFetch(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleProbation = (type: string, id: any) => {
		if (type == 'finish') {
			Finish(id);
		} else {
			Contract(id);
		}
	};

	const Finish = async (id: any) => {
		try {
			await Probation.FinishProbation(null, id);
		} catch (error) {
			console.error(error);
		}
	};

	const Contract = async (id: any) => {
		try {
			await Probation.ContracthProbation(null, id);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		FetchData();
	}, []);

	const data = {
		labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
		datasets: [
			{
				label: 'Performance',
				data: [80, 70, 75, 90, 60],
				backgroundColor: 'rgba(54, 162, 235, 0.6)',
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
			<div className="flex items-end justify-end">
				<div className="dropdown dropdown-end">
					<button className="btn btn-primary mb-4">Akhir Masa Percobaan</button>
					<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
						<li>
							<a onClick={() => handleProbation('finish', fetch.employee_id)}>Akhiri</a>
						</li>
						<li>
							<a onClick={() => handleProbation('contractsss', fetch.employee_id)}>Kontrak</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Top Section: Two Cards */}
				<div className="rounded-lg bg-white p-6 shadow-lg">
					{/* Profile Card */}
					<div className="flex flex-col items-center">
						<img src={image} alt="Profile" className="mb-4 h-36 w-36 rounded-lg object-cover" />
						<h2 className="text-lg font-bold">{fetch.full_name}</h2>
						<p className="text-sm text-gray-500">No. Telp: {fetch.phone}</p>
						<p className="text-sm text-gray-500">Email: {fetch.email}</p>
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
