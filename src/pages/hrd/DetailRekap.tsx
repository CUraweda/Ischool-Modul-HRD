import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
const DetailRekapPage: React.FC = () => {
	const location = useLocation();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const employee = location.state?.employee;

	const jobDesks = [
		{ title: 'Laporan Keuangan', date: '02/06/2024' },
		{ title: 'Laporan Keuangan', date: '02/06/2024' },
		{ title: 'Laporan Keuangan', date: '02/06/2024' },
		{ title: 'Laporan Keuangan', date: '02/06/2024' },
		{ title: 'Laporan Keuangan', date: '02/06/2024' },
		{ title: 'Laporan Keuangan', date: '02/06/2024' },
	];
	const performanceData = {
		series: [70, 30], // Persentase kinerja dan sisa
		options: {
			chart: {
				type: 'donut' as const,
				width: '100%',
			},
			title: {
				text: 'Kinerja',
				align: 'center',
			},
			labels: ['Kinerja', 'Sisa'],
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: '100%',
						},
						legend: {
							position: 'bottom',
						},
					},
				},
			],
		} as ApexOptions,
	};

	return (
		<div className="p-5">
			<div className="w-full flex-wrap md:flex">
				<div className="breadcrumbs items-center text-center text-xl md:w-2/3">
					<ul className="my-auto h-full">
						<li className="font-bold">
							<a>Rekap Penilaian</a>
						</li>
						<li>
							<a>Detail</a>
						</li>
					</ul>
				</div>
				<label className="text-md input input-md input-bordered flex items-center gap-2 md:w-1/3">
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
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</label>
			</div>

			<div className="my-5 flex-grow border-t border-gray-400 drop-shadow-sm"></div>
			<div className="">
				<div className="flex flex-wrap">
					{/* Employee Details */}
					<div className="w-full p-4 md:w-2/3">
						<div className="card h-[245px] w-full overflow-x-auto bg-base-100 p-4 shadow-xl">
							{employee && (
								<div className="flex flex-col space-y-4">
									<div className="flex">
										<div className="avatar">
											<div className="w-52 rounded-xl">
												<img
													src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
													alt="Employee Avatar"
												/>
											</div>
										</div>
										<div className="flex flex-wrap">
											<div className="w-full p-4 md:w-1/2">
												<div className="grid grid-cols-1 gap-4">
													<div>
														<p className="text-lg font-semibold">Nama</p>
														<p>{employee.name}</p>
													</div>
													<div>
														<p className="text-lg font-semibold">Tgl mulai bekerja</p>
														<p>{employee.startDate}</p>
													</div>
													<div>
														<p className="text-lg font-semibold">Divisi</p>
														<p>{employee.division}</p>
													</div>
												</div>
											</div>
											<div className="w-full p-4 md:w-1/2">
												<div className="grid grid-cols-1 gap-4">
													<div>
														<p className="text-lg font-semibold">Status</p>
														<p>{employee.status}</p>
													</div>
													<div>
														<p className="text-lg font-semibold">Email</p>
														<p>{employee.email}</p>
													</div>
													<div>
														<p className="text-lg font-semibold">Sisa waktu Magang</p>
														<p>{employee.internshipDuration}</p>
													</div>
												</div>
											</div>
										</div>{' '}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Jobdesk List */}
					<div className="w-full p-4 md:w-1/3">
						<div className="card h-[245px] w-full overflow-x-auto overflow-y-auto bg-base-100 p-4 shadow-xl">
							<h2 className="mb-4 px-5 text-lg font-semibold">Jobdesk List</h2>
							{jobDesks.map((jobdesk, index) => (
								<div key={index} className="mb-4 flex items-center justify-between px-5">
									<div>
										<p className="font-semibold">{jobdesk.title}</p>
										<p className="text-sm text-gray-600">{jobdesk.date}</p>
									</div>
									<FaCheckCircle className="mr-2 text-green-500" />
								</div>
							))}
						</div>
					</div>

					{/* Performance Chart */}
					<div className="flex w-full">
						<div className="w-full p-4 md:w-[500px]">
							<div className="card h-[300px] w-full overflow-x-auto overflow-y-auto bg-base-100 p-4 shadow-xl">
								<ApexCharts
									options={performanceData.options}
									series={performanceData.series}
									type="donut"
									height={350}
								/>
								<p className="font-semibold text-green-500">Meningkat 5% dari sebelumnya</p>
							</div>
						</div>
						<div className="md:full w-full p-4">
							<div className="card h-[300px] w-full overflow-x-auto bg-base-100 p-4 shadow-xl"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailRekapPage;
