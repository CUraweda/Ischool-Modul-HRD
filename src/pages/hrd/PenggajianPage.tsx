import { useEffect, useState } from 'react';
// import { Bar, Doughnut } from 'react-chartjs-2';
import { Penggajian, Attendance } from '@/middlewares/api/hrd';
import { getSessionStorageItem } from '@/utils/storageUtils';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// import { useNavigate } from 'react-router-dom';

const PenggajianPage = () => {
	// const Navigate = useNavigate();
	const token = getSessionStorageItem('access_token');
	const [selectedOption, setSelectedOption] = useState<'Kehadiran' | 'Lainnya' | 'Penggajian'>('Penggajian');
	const [rekapMonth, setRekapMonth] = useState({
		Total: '',
		Bulan: '',
	});
	const [rekapYear, setRekapYear] = useState<any[]>([]);
	const [dataPenggajian, setDataPenggajian] = useState<any[]>([]);
	const [attendanceData, setAttendanceData] = useState<any[]>([]);
	// const [filter, setFilter] = useState({
	// 	search: '',
	// 	month: '',
	// 	year: '',
	// });
	const getRecapMonth = async () => {
		try {
			const res = await Penggajian.getMonthAccount(token);
			const currentDate = new Date();
			const thisMonth = currentDate.toLocaleString('id-ID', { month: 'long' });
			console.log(res.data.data.total);
			const formattedTotal = new Intl.NumberFormat('id-ID', {
				style: 'currency',
				currency: 'IDR',
			}).format(res.data.data.total);
			setRekapMonth((prev) => ({ ...prev, Total: formattedTotal, Bulan: thisMonth }));
		} catch (error) {
			console.error(error);
		}
	};
	const getRecapYear = async () => {
		try {
			const res = await Penggajian.getYearAccount(token);
			const totals = res.data.data.map((item: { total: number }) => item.total);

			setRekapYear(totals);
		} catch (error) {
			console.error(error);
		}
	};
	const getAllAttendance = async () => {
		try {
			const result = await Attendance.getAllEmployeeMonth('');
			setAttendanceData(result.data.data);
		} catch (error) {
			console.error('Error fetching attendance data:', error);
		}
	};
	const getAllAcc = async () => {
		try {
			const res = await Penggajian.getAllAccount(token, 'Y');
			console.log(res.data.data.result);
			setDataPenggajian(res.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getRecapMonth();
		getRecapYear();
		getAllAcc();
		getAllAttendance();
	}, []);

	// useEffect(() => {
	// 	getAllAttendance();
	// }, [filter]);
	const formatNumber = (data: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
		}).format(data);
	};

	const barChartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
		datasets: [
			{
				label: 'Rincian Biaya Penggajian',
				data: rekapYear,
				backgroundColor: '#6366f1',
				borderRadius: 10,
			},
		],
	};

	// const donutChartData = {
	// 	labels: ['Total Jam Kerja', 'Total Jam Istirahat'],
	// 	datasets: [
	// 		{
	// 			data: [320, 120],
	// 			backgroundColor: ['#3b82f6', '#f59e0b'],
	// 			hoverBackgroundColor: ['#1e40af', '#d97706'],
	// 		},
	// 	],
	// };

	const barOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
		animation: {
			duration: 1000,
			loop: false,
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		cutout: '87%',
	};

	// const donutOptions = {
	// 	responsive: false,
	// 	plugins: {
	// 		legend: {
	// 			display: false,
	// 		},
	// 	},
	// 	cutout: '87%',
	// };

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
						<p className="text-3xl font-bold">{rekapMonth.Total}</p>
						<p>Bulan Ini ({rekapMonth.Bulan})</p>
					</div>
				</div>
				<div className="card rounded-lg bg-white p-2 shadow-lg">
					<h2 className="text-lg font-semibold text-gray-800">Ringkasan Jam Kerja</h2>
					<div className="mt-4 block items-center justify-between md:flex">
						{/* <div className="flex flex-wrap items-center justify-center gap-5">
							<div>
								<p className="font-semibold text-blue-600">Total Jam Kerja</p>
								<p className="text-2xl font-bold text-gray-900">320.00Jam</p>
							</div>
							<div>
								<p className="font-semibold text-yellow-600">Total Jam Istirahat</p>
								<p className="text-2xl font-bold text-gray-900">120.00Jam</p>
							</div>
						</div>
						<div className="m-5" style={{ height: 'fit-content' }}>
							<Doughnut data={donutChartData} options={donutOptions} className="m-auto h-full w-full" />
						</div> */}
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="card rounded-lg bg-white p-6 shadow-lg">
					<h2 className="text-lg font-semibold text-gray-800">Rincian Biaya Penggajian</h2>
					<div className="mt-4" style={{ height: '300px' }}>
						<Bar data={barChartData} options={barOptions} className="w-full" />
					</div>
				</div>

				<div className="card rounded-lg bg-white p-6 shadow-lg">
					<h2 className="text-lg font-semibold text-gray-800">Penggajian Terbaru</h2>
					<div className="flex items-center gap-2">
						<ul className="menu menu-md h-full w-fit rounded-box">
							<li>
								<a
									className={selectedOption === 'Penggajian' ? 'active' : ''}
									onClick={() => setSelectedOption('Penggajian')}
								>
									Panggajian
								</a>
							</li>
							<li>
								<a
									className={selectedOption === 'Kehadiran' ? 'active' : ''}
									onClick={() => setSelectedOption('Kehadiran')}
								>
									Kehadiran
								</a>
							</li>
							<li>
								<Link to="/hrd/rekap-gaji">Lainnya</Link>
								{/* <a
									className={selectedOption === 'Lainnya' ? 'active' : ''}
									onClick={() => setSelectedOption('Lainnya')}
								>
									Lainnya
								</a> */}
							</li>
						</ul>
						{selectedOption === 'Penggajian' && (
							<div className="w-full overflow-x-auto">
								<table className="table table-zebra w-full">
									<thead>
										<tr>
											<th>Nama</th>
											<th>Gaji</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										{dataPenggajian.map((item) => (
											<tr key={item.id}>
												<td>{item.employee.full_name}</td>
												<td>{formatNumber(item.employeesalary.fixed_salary)}</td>
												<td>
													<button className="badge badge-primary btn-sm font-semibold">{item.status}</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
						{selectedOption === 'Kehadiran' && (
							<div className="w-full overflow-x-auto">
								{/* <label className="text-md input input-md input-bordered m-2 flex w-1/2 items-center gap-2">
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
									<input
										type="text"
										className="grow"
										placeholder="Search"
										value={filter.search}
										onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
									/>
								</label> */}
								<div className="h-[250px]">
									<table className="table table-zebra w-full overflow-y-scroll">
										<thead>
											<tr>
												<th>Nama</th>
												<th>Kehadiran</th>
												<th>Cuti</th>
											</tr>
										</thead>
										<tbody>
											{attendanceData.map((item) => (
												<tr key={item.id}>
													<td>{item?.full_name}</td>
													<td>{item?.attendance}</td>
													<td>{item.vacation}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}
						{selectedOption === 'Lainnya' && (
							<div className="w-full overflow-x-auto">
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
