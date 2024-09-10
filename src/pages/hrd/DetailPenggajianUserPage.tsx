import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useLocation } from 'react-router-dom';
import { Penggajian } from '@/middlewares/api/hrd';
import { useEffect, useState } from 'react';
import { getSessionStorageItem } from '@/utils/storageUtils';
ChartJS.register(ArcElement, Tooltip, Legend);
const DetailPenggajianUserPage = () => {
	const location = useLocation();
	const token = getSessionStorageItem('access_token');
	const { id } = location.state;
	const [userDetail, setUserDetail] = useState<any>(null);
	const getDetail = async () => {
		try {
			const res = await Penggajian.getDetailAccount(id, token);
			setUserDetail(res.data.data);
			console.log(userDetail);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getDetail();
	}, []);
	const data = {
		labels: ['Total Gaji Pertahun', 'Total Gaji Bulan Desember'],
		datasets: [
			{
				data: [60000000, 5000000],
				backgroundColor: ['#60a5fa', '#fbbf24'],
				hoverBackgroundColor: ['#3b82f6', '#f59e0b'],
				borderWidth: 0,
			},
		],
	};

	const options = {
		cutout: '80%',
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return (
		<div className="min-h-screen">
			<div className="mx-auto max-w-6xl">
				{/* Breadcrumb */}
				<div className="breadcrumbs mb-6 text-sm">
					<ul>
						<li>
							<a href="#" className="text-xl font-semibold">
								Penggajian
							</a>
						</li>
						<li>
							<a href="#">Detail Penggajian</a>
						</li>
						<li>Syahril Hermawan</li>
					</ul>
				</div>

				{/* Top Row - User Data, Filter, and Salary Summary */}
				<div className="mb-6 flex gap-5">
					<div className="flex flex-col gap-2">
						{/* User Data Card */}
						<div className="rounded-lg bg-white p-6 shadow-md">
							<h2 className="mb-2 text-xl font-semibold">Syahril Hermawan</h2>
							<span className="text-gray-600">karyawan</span>
						</div>

						{/* Filter Card */}
						<div className="rounded-lg bg-white p-6 shadow-md">
							<div className="space-y-4">
								<select className="select select-bordered w-full">
									<option disabled selected>
										Pilih tahun
									</option>
									<option>2023</option>
									<option>2024</option>
								</select>
								<select className="select select-bordered w-full">
									<option disabled selected>
										Pilih bulan
									</option>
									<option>Januari</option>
									<option>Februari</option>
									<option>Maret</option>
								</select>
							</div>
						</div>
					</div>

					{/* Salary Summary Card */}
					<div className="flex w-full rounded-lg bg-white p-8 shadow-2xl transition-shadow duration-300 ease-in-out hover:shadow-xl">
						<div className="flex flex-grow flex-col gap-9">
							<h3 className="mb-6 text-2xl font-bold tracking-tight text-gray-800">Ringkasan Gaji</h3>
							<div className="flex items-center gap-9">
								<div className="flex flex-col gap-2">
									<span className="flex items-center">
										<span className="mr-3 h-4 w-4 rounded-full bg-blue-600 shadow-md"></span>
										<span className="text-base font-medium text-gray-700">Total gaji pertahun</span>
									</span>
									<span className="text-3xl font-extrabold text-gray-900">Rp 60.000.000</span>
								</div>
								<div className="flex flex-col gap-2">
									<span className="flex items-center">
										<span className="mr-3 h-4 w-4 rounded-full bg-yellow-500 shadow-md"></span>
										<span className="text-base font-medium text-gray-700">Total gaji bulan Desember</span>
									</span>
									<span className="text-3xl font-extrabold text-gray-900">Rp 5.000.000</span>
								</div>
							</div>
						</div>
						<div className="h-40 w-40">
							<Doughnut data={data} options={options} />
						</div>
					</div>
				</div>

				{/* Filter Buttons */}
				<div className="mb-6 flex gap-4">
					<button className="btn btn-primary">2024</button>
					<button className="btn btn-primary">September</button>
				</div>

				{/* Bottom Row - Table */}
				<div className="rounded-lg bg-white p-6 shadow-md">
					<div className="overflow-x-auto">
						<table className="table table-zebra w-full">
							<thead>
								<tr>
									<th colSpan={2} className="text-center">
										Gaji Tetap
									</th>
									<th colSpan={3} className="text-center">
										Gaji Tidak Tetap
									</th>
									<th>Pinjaman</th>
									<th colSpan={3} className="text-center">
										Koperasi
									</th>
									<th rowSpan={2}>Total Jumlah</th>
								</tr>
								<tr>
									<th>Gaji Pokok</th>
									<th>THR</th>
									<th>Transportasi</th>
									<th>Tunj. Jabatan</th>
									<th>BPJS</th>
									<th>Makan Siang</th>
									<th>Simpanan Sukarela</th>
									<th>Simpanan Wajib</th>
									<th>Cicilan Belanja</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Rp 5.000.000</td>
									<td>Rp 2.000.000</td>
									<td>Rp 1.000.000</td>
									<td>Rp 500.000</td>
									<td>Rp 300.000</td>
									<td>Rp 200.000</td>
									<td>Rp 100.000</td>
									<td>Rp 150.000</td>
									<td>Rp 250.000</td>
									<td>Rp 9.500.000</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailPenggajianUserPage;
