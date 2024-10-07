import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useLocation } from 'react-router-dom';
import { Penggajian } from '@/middlewares/api/hrd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);
const DetailPenggajianUserPage = () => {
	const location = useLocation();
	const { id } = location.state;
	const [userDetail, setUserDetail] = useState<any>(null);

	const [DataBill, setDataBill] = useState<any[]>([]);

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const getDetail = async () => {
		try {
			const res = await Penggajian.getDetailAccount(id, access_token);
			setUserDetail(res.data.data.account);
			console.log(res.data.data.account);
			// getBill(userDetail.id);
			setDataBill(res.data.data.bills);
		} catch (error) {
			console.error(error);
		}
	};
	// const getBill = async (id: number) => {
	// 	try {
	// 		const res = await Bill.getAllBill(0, '', 0, id);
	// 		setDataBill(res.data.data.result);
	// 		console.log('test', res.data.data.result);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	const formatSalary = (salary: number) => {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(salary);
	};
	useEffect(() => {
		getDetail();
	}, [id]);

	const data = {
		labels: ['Total Gaji Pertahun', 'Total Gaji Bulan Desember'],
		datasets: [
			{
				data: [0, userDetail?.temp_total],
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
							<Link to="hrd/penggajian" className="text-xl font-semibold" replace>
								Penggajian
							</Link>
						</li>
						<li>
							<Link to="hrd/rekap-gaji" replace>
								Detail Penggajian
							</Link>
						</li>
					</ul>
				</div>

				{/* Top Row - User Data, Filter, and Salary Summary */}
				<div className="mb-6 flex flex-col gap-5 lg:flex-row lg:gap-6">
					<div className="flex flex-col gap-4 lg:w-1/2">
						{/* User Data Card */}
						<div className="card min-h-[230px] bg-base-100 shadow-md">
							<div className="card-body">
								<h2 className="text-xl font-semibold">{userDetail?.employee.full_name ?? '-'}</h2>
								<table className="my-2 text-gray-600">
									<tr>
										<td>Status</td>
										<td>: {userDetail?.employee.employee_status ?? '-'}</td>
									</tr>
									<tr>
										<td>Email</td>
										<td>: {userDetail?.employee.mail ? userDetail?.employee.mail ?? '-' : '-'}</td>
									</tr>
									<tr>
										<td>Tgl. Mulai Bekerja</td>
										<td>: {userDetail?.employee.work_start_date ?? '-'}</td>
									</tr>
									<tr>
										<td>Jenis Kelamin</td>
										<td>: {userDetail?.employee.gender ?? '-'}</td>
									</tr>
								</table>
							</div>
						</div>

						{/* Filter Card */}
						{/* <div className="card bg-base-100 shadow-md">
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
						</div> */}
					</div>

					{/* Salary Summary Card */}
					<div className="card w-full bg-base-100 shadow-2xl transition-shadow duration-300 ease-in-out hover:shadow-xl">
						<div className="card-body flex flex-col lg:flex-row lg:items-center lg:justify-between">
							<div>
								<h3 className="text-2xl font-bold tracking-tight text-gray-800">Ringkasan Gaji</h3>
								<div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
									{/* <div className="flex flex-col gap-2">
										<span className="flex items-center">
											<span className="mr-3 h-4 w-4 rounded-full bg-blue-600 shadow-md"></span>
											<span className="text-base font-medium text-gray-700">Total gaji pertahun</span>
										</span>
										<span className="text-xl font-extrabold text-gray-900">Rp 60.000.000</span>
									</div> */}
									<div className="flex flex-col gap-2">
										<span className="flex items-center">
											{/* <span className="mr-3 h-4 w-4 rounded-full bg-yellow-500 shadow-md"></span> */}
											<span className="text-base font-medium text-gray-700">Total gaji bulan ini</span>
										</span>
										<span className="text-xl font-extrabold text-gray-900">{formatSalary(userDetail?.temp_total)}</span>
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
					<div className="card-body w-full">
						<table className="table table-zebra w-full table-auto text-xs">
							<thead className="bg-slate-200 outline-2 outline-slate-300">
								<tr>
									<th rowSpan={2} className="whitespace-nowrap p-2 text-center">
										Gaji Tetap
									</th>
									{DataBill.map((item, index) => (
										<th key={index} rowSpan={item.datas.length} className="whitespace-nowrap p-2 text-center">
											{item.name}
										</th>
									))}
									<th rowSpan={2} className="whitespace-nowrap p-2 text-center">
										Total
									</th>
								</tr>
								<tr>
									{DataBill.map((item, index) => (
										<React.Fragment key={index}>
											<th className="whitespace-nowrap p-2 text-center">
												{item.datas.map((data: any) => (
													<div key={data.id}>{data.description}</div>
												))}
											</th>
										</React.Fragment>
									))}
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="whitespace-nowrap p-2 text-center">{formatSalary(userDetail?.fixed_salary)}</td>
									{DataBill.map((item, index) => (
										<React.Fragment key={index}>
											<td className="whitespace-nowrap p-2 text-center">
												{item.datas.map((data: any) => (
													<div key={data.id}>{formatSalary(data.amount)}</div>
												))}
											</td>
										</React.Fragment>
									))}
									<td className="whitespace-nowrap p-2 text-center">
										{formatSalary(userDetail?.fixed_salary + DataBill.reduce((sum, bill) => sum + bill.total, 0))}
									</td>
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
