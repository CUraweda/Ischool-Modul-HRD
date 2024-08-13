import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const PenggajianPage: React.FC = () => {
	// State untuk menyimpan pilihan yang dipilih
	const [selectedOption, setSelectedOption] = useState<'Kehadiran' | 'Lainnya'>('Kehadiran');

	// Dummy data for the bar chart
	const barChartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
		datasets: [
			{
				label: 'Rincian Biaya Penggajian',
				data: [200000, 300000, 500000, 1000000, 900000, 700000, 800000, 600000, 400000],
				backgroundColor: '#6366f1',
				borderRadius: 10,
			},
		],
	};

	// Dummy data for the donut chart
	const donutChartData = {
		labels: ['Total Jam Kerja', 'Total Jam Istirahat'],
		datasets: [
			{
				data: [320, 120],
				backgroundColor: ['#3b82f6', '#f59e0b'], // Tailwind's blue-500 and yellow-500 colors
				hoverBackgroundColor: ['#1e40af', '#d97706'], // Tailwind's blue-900 and yellow-700 colors
			},
		],
	};

	const barOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	const donutOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
		cutout: '87%', // This will make the donut chart look more like in the design
	};

	return (
		<div className="p-8">
			<h1 className="mb-4 text-xl font-bold">Penggajian</h1>

			{/* Top Section */}
			<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="card flex flex-col justify-between rounded-lg bg-blue-500 p-2 text-white shadow-lg">
					<div>
						<h2 className="text-lg">Total Penggajian</h2>
					</div>
					<div>
						<p className="text-3xl font-bold">Rp 452.050.000</p>
						<p>Bulan Ini (April 2024)</p>
					</div>
				</div>
				<div className="card rounded-lg bg-white p-2 shadow-lg">
					<h2 className="text-lg font-semibold text-gray-800">Ringkasan Jam Kerja</h2>
					<div className="mt-4 flex items-center justify-between">
						<div className="flex items-center gap-5">
							<div>
								<p className="font-semibold text-blue-600">Total Jam Kerja</p>
								<p className="text-2xl font-bold text-gray-900">320.00Jam</p>
							</div>
							<div>
								<p className="font-semibold text-yellow-600">Total Jam Istirahat</p>
								<p className="text-2xl font-bold text-gray-900">120.00Jam</p>
							</div>
						</div>
						<div className="w-28">
							<Doughnut data={donutChartData} options={donutOptions} />
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="card rounded-lg bg-white p-6 shadow-lg">
					<h2 className="text-lg font-semibold text-gray-800">Rincian Biaya Penggajian</h2>
					<div className="mt-4">
						<Bar data={barChartData} options={barOptions} />
					</div>
				</div>

				<div className="card rounded-lg bg-white p-6 shadow-lg">
					<h2 className="text-lg font-semibold text-gray-800">Penggajian Terbaru</h2>
					<div className="flex items-center gap-2">
						<ul className="menu menu-md w-fit rounded-box bg-base-200">
							<li>
								<a
									className={selectedOption === 'Kehadiran' ? 'active' : ''}
									onClick={() => setSelectedOption('Kehadiran')}
								>
									Kehadiran
								</a>
							</li>
							<li>
								<a
									className={selectedOption === 'Lainnya' ? 'active' : ''}
									onClick={() => setSelectedOption('Lainnya')}
								>
									Lainnya
								</a>
							</li>
						</ul>
						{selectedOption === 'Kehadiran' && (
							<div className="overflow-x-auto">
								<table className="table table-zebra w-full">
									<thead>
										<tr>
											<th>Nama</th>
											<th>Gaji</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										{/* Repeat this row for each record */}
										<tr>
											<td>Syahril Hermawan</td>
											<td>Rp 5.000.000</td>
											<td>
												<button className="btn btn-success btn-sm">bayar</button>
											</td>
										</tr>
										{/* Repeat until end */}
									</tbody>
								</table>
							</div>
						)}
						{selectedOption === 'Lainnya' && (
							<div className="overflow-x-auto">
								<table className="table table-zebra w-full">
									<thead>
										<tr>
											<th>Nama</th>
											<th>Pinjaman</th>
											<th>Koperasi</th>
										</tr>
									</thead>
									<tbody>
										{/* Repeat this row for each record */}
										<tr>
											<td>Syahril Hermawan</td>
											<td>Rp 5.000.000</td>
											<td>93109283 </td>
										</tr>
										{/* Repeat until end */}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PenggajianPage;
