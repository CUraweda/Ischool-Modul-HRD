import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DetailPenggajianUserPage = () => {
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
		<div className="min-h-screen p-4">
			<div className="">
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
				<div className="mb-6 flex flex-col gap-5 lg:flex-row lg:gap-6">
					<div className="flex flex-col gap-4 lg:w-1/3">
						{/* User Data Card */}
						<div className="card bg-base-100 shadow-md">
							<div className="card-body">
								<h2 className="text-xl font-semibold">Syahril Hermawan</h2>
								<span className="text-gray-600">karyawan</span>
							</div>
						</div>

						{/* Filter Card */}
						<div className="card bg-base-100 shadow-md">
							<div className="card-body space-y-4">
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
					<div className="card bg-base-100 shadow-2xl transition-shadow duration-300 ease-in-out hover:shadow-xl">
						<div className="card-body flex flex-col lg:flex-row lg:items-center lg:justify-between">
							<div>
								<h3 className="text-2xl font-bold tracking-tight text-gray-800">Ringkasan Gaji</h3>
								<div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
									<div className="flex flex-col gap-2">
										<span className="flex items-center">
											<span className="mr-3 h-4 w-4 rounded-full bg-blue-600 shadow-md"></span>
											<span className="text-base font-medium text-gray-700">Total gaji pertahun</span>
										</span>
										<span className="text-xl font-extrabold text-gray-900">Rp 60.000.000</span>
									</div>
									<div className="flex flex-col gap-2">
										<span className="flex items-center">
											<span className="mr-3 h-4 w-4 rounded-full bg-yellow-500 shadow-md"></span>
											<span className="text-base font-medium text-gray-700">Total gaji bulan Desember</span>
										</span>
										<span className="text-xl font-extrabold text-gray-900">Rp 5.000.000</span>
									</div>
								</div>
							</div>
							<div className="h-40 w-full lg:w-40">
								<Doughnut data={data} options={options} />
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Row - Table */}
				<div className="card overflow-x-auto bg-base-100 shadow-md">
					<div className="card-body w-96">
						<table className="table-auto text-xs">
							<thead>
								<tr>
									<th colSpan={2} className="whitespace-nowrap p-2 text-center">
										Gaji Tetap
									</th>
									<th colSpan={3} className="whitespace-nowrap p-2 text-center">
										Gaji Tidak Tetap
									</th>
									<th className="whitespace-nowrap p-2 text-center">Pinjaman</th>
									<th colSpan={3} className="whitespace-nowrap p-2 text-center">
										Koperasi
									</th>
									<th rowSpan={2} className="whitespace-nowrap p-2 text-center">
										Total Jumlah
									</th>
								</tr>
								<tr>
									<th className="whitespace-nowrap p-2 text-center">Gaji Pokok</th>
									<th className="whitespace-nowrap p-2 text-center">THR</th>
									<th className="whitespace-nowrap p-2 text-center">Transportasi</th>
									<th className="whitespace-nowrap p-2 text-center">Tunj. Jabatan</th>
									<th className="whitespace-nowrap p-2 text-center">BPJS</th>
									<th className="whitespace-nowrap p-2 text-center">Makan Siang</th>
									<th className="whitespace-nowrap p-2 text-center">Simpanan Sukarela</th>
									<th className="whitespace-nowrap p-2 text-center">Simpanan Wajib</th>
									<th className="whitespace-nowrap p-2 text-center">Cicilan Belanja</th>
									<th className="p-2 text-center"></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="whitespace-nowrap p-2 text-center">Rp 5.000.000</td>
									<td className="whitespace-nowrap p-2 text-center">Rp 2.000.000</td>
									<td className="whitespace-nowrap p-2 text-center">Rp 1.000.000</td>
									<td className="whitespace-nowrap p-2 text-center">Rp 500.000</td>
									<td className="whitespace-nowrap p-2 text-center">Rp 300.000</td>
									<td className="whitespace-nowrap p-2 text-center">Rp 200.000</td>
									<td className="whitespace-nowrap p-2 text-center">Rp 100.000</td>
									<td className="whitespace-nowrap p-2 text-center">Rp 150.000</td>
									<td className="whitespace-nowrap p-2 text-center">Rp 250.000</td>
									<td className="whitespace-nowrap p-2 text-center">Rp 9.500.000</td>
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
