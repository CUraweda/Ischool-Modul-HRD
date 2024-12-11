import image from '../../assets/images/blueAbstractPattern.png';
// import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Probation } from '@/middlewares/api';
import Swal from 'sweetalert2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// interface ChartDataItem {
// 	name: string;
// 	raw_grade: number;
// 	graded: number;
// }

const DetailCardProbationPage = () => {
	const { id2 } = useParams<{ id2: string }>();
	const [fetch, setFetch] = useState<any | null>(null);
	const [table, setTable] = useState<any[]>([]);
	// const [chart, setChart] = useState<ChartDataItem[]>([]);
	const [internshipDetails, setInternshipDetails] = useState({
		startDate: '',
		endDate: '',
		duration: '',
		remainingTime: '',
	});

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const FetchData = async () => {
		try {
			const response = await Probation.DetailByUser(id2, access_token);
			setFetch(response.data.data);
			handleInternshipDetails(response.data.data.probation_start_date, response.data.data.probation_end_date);
			const responseTable = await Probation.DetailPresensi(id2, access_token);
			setTable(responseTable.data.data.result);
			// const responseChart = await Probation.DetailChart(id2, access_token);
			// setChart(responseChart.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleInternshipDetails = (startDate: string, endDate: string) => {
		let start = new Date(startDate);
		let end = new Date(endDate);

		// Jika startDate lebih besar dari endDate, tukar keduanya
		if (start > end) {
			[start, end] = [end, start]; // Tukar posisi start dan end
		}

		const now = new Date();
		const probationNotStarted = start > now;

		let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
		let remainingDays = end.getDate() - start.getDate();

		if (remainingDays < 0) {
			totalMonths -= 1;
			const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate(); // Jumlah hari di bulan sebelumnya
			remainingDays += previousMonth;
		}

		const remainingTimeInMillis = end.getTime() - now.getTime();
		const remainingDaysUntilEnd = Math.ceil(remainingTimeInMillis / (1000 * 60 * 60 * 24));

		// Mengubah format tanggal sesuai dengan format Indonesia (dd/MM/yyyy)
		const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

		setInternshipDetails({
			startDate: start.toLocaleDateString('id-ID', options),
			endDate: end.toLocaleDateString('id-ID', options),
			duration: totalMonths > 0 ? `${totalMonths} Bulan ${remainingDays} Hari` : `${remainingDays} Hari`,
			remainingTime: probationNotStarted
				? 'Probation belum dimulai'
				: remainingDaysUntilEnd > 0
					? `${remainingDaysUntilEnd} Hari`
					: 'Magang telah selesai',
		});
	};

	const handleProbation = (type: string, id: any) => {
		if (type === 'finish') {
			Finish(id);
		} else {
			Contract(id);
		}
	};

	const Finish = async (id: any) => {
		Swal.fire({
			title: 'Apakah Anda yakin?',
			text: 'Anda akan mengakhiri masa percobaan untuk applicant ini!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Ya, Akhiri!',
			cancelButtonText: 'Tidak',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await Probation.FinishProbation(null, id);
					Swal.fire({
						icon: 'success',
						title: 'Sukses',
						text: 'Applicant berhasil diakhiri',
					});
					FetchData();
				} catch (error: any) {
					console.error(error);
					const message = error.response.data.message;
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: message,
					});
				}
			}
		});
	};

	const Contract = async (id: any) => {
		Swal.fire({
			title: 'Apakah Anda yakin?',
			text: 'Anda akan mengontrak applicant ini!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Ya, Kontrak!',
			cancelButtonText: 'Tidak',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await Probation.ContracthProbation(null, id);
					Swal.fire({
						icon: 'success',
						title: 'Sukses',
						text: 'Applicant berhasil dikontrak',
					});
					FetchData();
				} catch (error: any) {
					console.error(error);
					const message = error.response.data.message;
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: message,
					});
				}
			}
		});
	};

	useEffect(() => {
		FetchData();
	}, []);

	// const labels = chart.map((item) => item.name);
	// const dataValues = chart.map((item) => item.graded);

	// const data = {
	// 	labels,
	// 	datasets: [
	// 		{
	// 			label: 'Performance',
	// 			data: dataValues,
	// 			backgroundColor: '#6366f1',
	// 			borderRadius: 10,
	// 		},
	// 	],
	// };

	// const options = {
	// 	scales: {
	// 		y: {
	// 			beginAtZero: true,
	// 		},
	// 	},
	// };

	return (
		<div className="min-h-screen">
			<div className="flex items-end justify-end">
				<div className="dropdown dropdown-end">
					<button className="btn btn-primary mb-4" disabled={fetch?.still_in_probation == false}>
						Akhir Masa Percobaan
					</button>
					<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
						<li>
							<a onClick={() => handleProbation('finish', fetch?.id)}>Akhiri</a>
						</li>
						<li>
							<a onClick={() => handleProbation('contractsss', fetch?.id)}>Kontrak</a>
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
						<h2 className="text-lg font-bold">{fetch?.full_name}</h2>
						<p className="text-sm text-gray-500">No. Telp: {fetch?.phone}</p>
						<p className="text-sm text-gray-500">Email: {fetch?.email}</p>
					</div>
				</div>

				<div className="rounded-lg bg-white p-6 shadow-lg">
					{/* Internship Details Card */}
					<h3 className="text-lg font-semibold">Internship Details</h3>
					<div className="mt-4">
						<p className="text-gray-700">
							Tgl Mulai: <span className="font-bold">{internshipDetails.startDate}</span>
						</p>
						<p className="text-gray-700">
							Tgl Berakhir: <span className="font-bold">{internshipDetails.endDate}</span>
						</p>
						<p className="text-gray-700">
							Durasi Magang: <span className="font-bold">{internshipDetails.duration}</span>
						</p>
						<p className="text-gray-700">
							Sisa Waktu Magang: <span className="font-bold">{internshipDetails.remainingTime}</span>
						</p>
					</div>
				</div>

				{/* Bottom Section: Two Cards (Table and Chart) */}
				<div className="col-span-2 rounded-lg bg-white p-6 shadow-lg">
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
								</tr>
							</thead>
							<tbody>
								{table.map((item, index) => (
									<tr key={index}>
										<td>{item.worktime.createdAt.split('T')[0]}</td>
										<td>{item.worktime.type}</td>
										<td>{item.worktime.start_time}</td>
										<td>{item.worktime.end_time}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* <div className="col-span-1 rounded-lg bg-white p-6 shadow-lg">
					<h3 className="text-lg font-semibold">Kinerja</h3>
					<Bar data={data} options={options} />
				</div> */}
			</div>
		</div>
	);
};

export default DetailCardProbationPage;
