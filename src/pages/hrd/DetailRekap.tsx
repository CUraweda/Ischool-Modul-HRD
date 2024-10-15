import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FaCircleMinus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { EmployeeJobdesk, Karyawan } from '@/middlewares/api';
import { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';

const DetailRekapPage: React.FC = () => {
	const location = useLocation();
	const employee = location.state?.employee;
	const [Performance, setPerformance] = useState<any>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [jobdeskList, setJobdeskList] = useState<any[]>([]);
	const [doneJobdesk, setDoneJobdesk] = useState<any[]>([]);
	// const [ListEmployee, setListEmployee] = useState<any>(null);
	const getDifference = async () => {
		try {
			const res = await EmployeeJobdesk.getDifference(employee.employee_id);
			setPerformance(res.data.data);
			console.log(res.data.data);
		} catch (err) {
			console.error(err);
		}
	};

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const createJobdesk = async (values: any) => {
		try {
			const res = await EmployeeJobdesk.createJobdesk(values);
			console.log(res.data.data);
		} catch (err) {
			console.error(err);
		}
	};
	const getEmployee = async () => {
		try {
			// const res = await Employee.getAllEmployee(1000000000, '', access_token);
			const jobdesk = await Karyawan.JobdeskList(access_token, employee.employee_id, 0);
			setJobdeskList(jobdesk.data.data.result);
			const done = await Karyawan.JobdeskList(access_token, employee.employee_id, 1);
			setDoneJobdesk(done.data.data.result);
			// console.log(res.data.data.result);
			// setListEmployee(res.data.data.result);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		getDifference();
		getEmployee();
	}, []);
	const performanceData = {
		series: [Performance?.todayPerformance ?? 0, Performance?.yesterdayPerformance ?? 0],
		options: {
			chart: {
				type: 'donut' as const,
				width: '100%',
			},
			title: {
				text: 'Kinerja',
				align: 'center',
			},
			labels: ['Kinerja Hari Ini', 'Kinerja Kemarin'],
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
	const handleSubmit = (values: any) => {
		createJobdesk(values);
		setShowModal(false);
	};
	return (
		<div className="p-5">
			{showModal && (
				<dialog className="modal modal-open" onClick={() => setShowModal(false)}>
					<div className="modal-box" onClick={(e) => e.stopPropagation()}>
						<button
							className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
							onClick={() => setShowModal(false)}
						>
							✕
						</button>
						<h3 className="text-lg font-bold">Tambah Jobdesk</h3>
						<Formik
							initialValues={{
								employee_id: employee.employee_id,
								name: '',
								description: '',
								due_date: '',
								priority: 1,
								priority_label: 'High',
							}}
							onSubmit={handleSubmit}
						>
							{({ handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Nama Jobdesk</span>
										</label>
										<Field name="name" className="input input-bordered w-full" />
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Deskripsi Jobdesk</span>
										</label>
										<Field name="description" as="textarea" className="textarea textarea-bordered w-full" />
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Tanggal Tenggat</span>
										</label>
										<Field type="datetime-local" name="due_date" className="input input-bordered w-full" />
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Prioritas</span>
										</label>
										<Field as="select" name="priority" className="select select-bordered w-full">
											<option value="1">High</option>
											<option value="2">Medium</option>
											<option value="3">Low</option>
										</Field>
									</div>
									{/* <div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Nama Peserta</span>
										</label>
										<Field as="select" name="employee_id" className="select select-bordered w-full">
											<option value="" disabled>
												Pilih Peserta
											</option>
											{ListEmployee?.map((employee: any) => (
												<option key={employee.id} value={employee.id}>
													{employee?.full_name}
												</option>
											))}
										</Field>
									</div> */}
									<div className="modal-action">
										<button className="btn btn-primary" type="submit">
											Submit
										</button>
										<button type="button" className="btn" onClick={() => setShowModal(false)}>
											Cancel
										</button>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</dialog>
			)}

			<div className="w-full flex-wrap md:flex">
				<div className="breadcrumbs items-center text-center text-xl md:w-2/3">
					<ul className="my-auto h-full">
						<li className="font-bold">
							<Link to="/hrd/penilaian">Rekap Penilaian</Link>
						</li>
						<li>
							<a>Detail</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="my-5 flex-grow border-t border-gray-400 drop-shadow-sm"></div>
			<div className="">
				<button
					className="text-md badge btn badge-md btn-xs h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm"
					onClick={() => setShowModal((showModal) => !showModal)}
				>
					Tambah Jobdesk
				</button>
				<div className="my-3 w-full flex-wrap gap-2 md:flex md:flex-nowrap">
					{/* Employee Details */}
					<div className="my-2 w-full md:w-[70%]">
						<div className="card h-fit w-full overflow-x-auto bg-base-100 p-4 shadow-xl md:h-[255px]">
							{employee && (
								<div className="my-auto block gap-5 space-y-4 md:flex">
									<div className="flex w-full items-center justify-center md:w-1/3 xl:w-1/4">
										<div className="avatar mx-auto">
											<div className="m-auto h-40 w-40 rounded-full">
												<img
													src={
														employee?.employee?.user?.avatar
															? `https://api-hrd.curaweda.com/stg-server1/${employee?.employee?.user?.avatar}`
															: 'https://korpri.padang.go.id/assets/img/dewan_pengurus/no-pict.jpg'
													}
												/>
											</div>
										</div>
									</div>
									<div className="m-5 block md:flex md:flex-wrap">
										<div className="grid grid-flow-col grid-rows-3 gap-5 xl:grid-rows-2">
											<div>
												<p className="text-md font-semibold">Nama</p>
												<p>{employee?.employee?.full_name ?? '-'}</p>
											</div>
											<div>
												<p className="text-md font-semibold">Tgl mulai bekerja</p>
												<p>{employee?.employee?.work_start_date ?? '-'}</p>
											</div>
											<div>
												<p className="text-md font-semibold">Posisi</p>
												<p>{employee?.employee?.occupation ?? '-'}</p>
											</div>
											<div>
												<p className="text-md font-semibold">Status</p>
												<p>{employee?.employee?.employee_status ?? '-'}</p>
											</div>
											<div>
												<p className="text-md font-semibold">Email</p>
												<p>{employee?.employee?.email ?? '-'}</p>
											</div>
											<div>
												<p className="text-md font-semibold">Sisa waktu</p>
												<p>{employee?.internshipDuration ?? '-'}</p>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Jobdesk List */}
					<div className="my-2 w-full md:w-[30%]">
						<div className="card h-[255px] w-full overflow-x-auto overflow-y-auto bg-base-100 p-4 shadow-xl">
							<h2 className="mb-4 px-5 text-lg font-semibold">Jobdesk List</h2>
							<div className="mb-4 flex w-full flex-col justify-between gap-2 px-5">
								{jobdeskList.map((item, index) => (
									<div key={index}>
										<div className="flex items-center gap-1">
											<p className="flex items-center gap-2 font-semibold">{item.name ?? '-'}</p>
											{employee.is_finish == true ? (
												<FaCheckCircle
													className={`mx-auto w-fit text-xl text-green-500 ${item.is_finish ? 'visible' : 'hidden'}`}
												/>
											) : (
												<FaCircleMinus
													className={`w-fit text-xl text-red-500 ${!item.is_finish ? 'visible' : 'hidden'}`}
												/>
											)}
										</div>
										<p className="my-1 text-sm text-gray-600">{item.description ?? '-'}</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Performance Chart */}
				</div>
				<div className="my-3 w-full flex-wrap gap-2 md:flex md:flex-nowrap">
					<div className="my-2 w-full md:w-[30%]">
						<div className="card h-[300px] w-full overflow-x-auto overflow-y-auto bg-base-100 p-4 shadow-xl">
							{Performance?.differences !== 0 ? (
								<ApexCharts
									options={performanceData.options}
									series={performanceData.series}
									type="donut"
									height={350}
								/>
							) : (
								<div className="w-full text-center font-semibold">Kinerja</div>
							)}
							<p
								className={`font-semibold ${Performance?.status === 'turun' ? 'text-red-500' : Performance?.status === 'naik' ? 'text-green-500' : 'text-yellow-500'} text-green-500`}
							>
								{Performance?.differences
									? Performance?.status + Performance?.differences + `dari sebelumnya`
									: 'Tidak ada data kinerja hari ini'}
							</p>
						</div>
					</div>
					<div className="my-2 w-full md:w-[70%]">
						<div className="card h-[300px] w-full overflow-x-auto bg-base-100 p-4 shadow-xl">
							<table className="w-full table-auto border-collapse">
								<thead>
									<tr>
										<th className="border px-4 py-2 text-left">No</th>
										<th className="border px-4 py-2 text-left">Tanggal</th>
										<th className="border px-4 py-2 text-left">Posisi</th>
										<th className="border px-4 py-2 text-left">Email</th>
										<th className="border px-4 py-2 text-left">Hasil</th>
									</tr>
								</thead>
								<tbody>
									{doneJobdesk.map((item: any, index: any) => (
										<tr key={index}>
											<td className="border px-4 py-2">{index + 1}</td>
											<td className="border px-4 py-2">{item?.employee?.work_start_date}</td>
											<td className="border px-4 py-2">{item?.employee?.occupation}</td>
											<td className="border px-4 py-2">{item?.employee?.email}</td>
											<td className="border px-4 py-2">{item?.employee?.grade}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailRekapPage;
