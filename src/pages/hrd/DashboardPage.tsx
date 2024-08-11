import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Legend,
	Tooltip,
} from 'chart.js';
import Modal, { openModal } from '../../components/ModalProps';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Legend, Tooltip);

const data = {
	labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
	datasets: [
		{
			label: 'Karyawan Hadir',
			data: [30, 0, 40, 50, 60],
			borderColor: 'rgba(75, 123, 155, 1)',
			backgroundColor: 'rgba(75, 123, 155, 0.2)',
			tension: 0.4,
			pointRadius: 3,
			pointHoverRadius: 5,
		},
		{
			label: 'Karyawan Tidak Hadir',
			data: [5, 7, 10, 8, 5], // Example data
			borderColor: 'rgba(255, 111, 97, 1)',
			backgroundColor: 'rgba(255, 111, 97, 0.2)',
			tension: 0.4,
			pointRadius: 3,
			pointHoverRadius: 5,
		},
		{
			label: 'Cuti',
			data: [3, 2, 4, 1, 2], // Example data
			borderColor: 'rgba(245, 192, 55, 1)',
			backgroundColor: 'rgba(245, 192, 55, 0.2)',
			tension: 0.4,
			pointRadius: 3,
			pointHoverRadius: 5,
		},
	],
};

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		tooltip: {
			callbacks: {
				label: function (tooltipItem: any) {
					return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
				},
			},
		},
	},
	scales: {
		x: {
			grid: {
				display: false,
			},
		},
		y: {
			grid: {
				color: '#E5E7EB',
			},
			ticks: {
				beginAtZero: true,
				stepSize: 10,
			},
		},
	},
};

const DashboardPage = () => {
	const hadir = 30;
	const tidakHadir = 5;
	const cuti = 3;

	const handleDialog = () => {
		openModal('addPengumuman');
	};

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Dashboard</h1>
			</div>

			<div className="mb-8 flex w-full flex-wrap gap-6 lg:flex-nowrap">
				<div className="w-full rounded-lg bg-white p-6 shadow-md">
					<div className="mb-4 flex justify-between">
						{/* <div className="text-xl font-semibold">Karyawan Hadir & Tidak Hadir</div> */}
						<div className="text-lg">
							<span className="font-bold text-blue-500">Hadir: {hadir}</span> |
							<span className="font-bold text-red-500"> Tidak Hadir: {tidakHadir}</span> |
							<span className="font-bold text-yellow-500"> Cuti: {cuti}</span>
						</div>
					</div>
					<Line data={data} options={options} />
				</div>

				<div className="w-full rounded-lg bg-white p-6 shadow-md">
					<div className="mb-4">
						<h2 className="text-xl font-semibold">Pengumuman</h2>
						<div className="mt-4 text-gray-700">
							<p>13 Juni 2023 - 08:30 - Meeting besar seluruh karyawan</p>
							<p>Rapat dengan orang tua</p>
						</div>
					</div>
					<button className="h-10 w-10 rounded-full bg-blue-500 text-white" onClick={handleDialog}>
						+
					</button>
				</div>
			</div>

			<div className="mb-8 flex gap-2">
				<div className="w-full rounded-lg bg-white p-4 shadow-md">
					<div className="text-xl font-semibold">Pelamar Hari Ini</div>
					<p className="mt-2 text-3xl font-bold text-blue-500">10</p>
				</div>

				<div className="w-full rounded-lg bg-white p-4 shadow-md">
					<div className="text-xl font-semibold">Total Keseluruhan</div>
					<p className="mt-2 text-3xl font-bold text-green-500">25</p>
				</div>
			</div>

			<Modal id="addPengumuman">
				<div>test</div>
			</Modal>
		</div>
	);
};

export default DashboardPage;
