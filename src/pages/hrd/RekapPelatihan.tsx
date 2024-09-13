import React, { useEffect, useState } from 'react';
import { TrainingSuggest, Employee } from '@/middlewares/api/hrd';
import { HiDotsVertical } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { getSessionStorageItem } from '@/utils/storageUtils';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const RekapPelatihan: React.FC<{}> = () => {
	const id = getSessionStorageItem('id');

	const [dataTraining, setDataTraining] = useState<any[]>([]);
	const [dataEmployee, setDataEmployee] = useState<any[]>([]);
	const [modalCreateUpdate, setmodalCreateUpdate] = useState<boolean>(false);
	const [filterTable, setFilterTable] = useState({
		search: '',
		limit: 0,
		page: 0,
		totalPages: 0,
		totalRows: 0,
		status: '',
	});
	const validationSchema = Yup.object({
		employee_id: Yup.number().required('Employee ID is required'),
		// proposer_id: Yup.number().required('Proposer ID is required'),
		title: Yup.string().required('Title is required'),
		purpose: Yup.string().required('Purpose is required'),
		// status: Yup.string().required('Status is required'),
		location: Yup.string().required('Location is required'),
		start_date: Yup.date().required('Start date is required'),
		end_date: Yup.date().required('End date is required'),
		is_active: Yup.boolean(),
	});
	const fetchDataTraining = async () => {
		try {
			const response = await TrainingSuggest.getAllTraining(filterTable.limit, filterTable.page);
			setFilterTable((prev) => ({
				...prev,
				limit: response.data.data.limit,
				page: response.data.data.page,
				totalRows: response.data.data.totalRows,
				totalPages: response.data.data.totalPages,
			}));
			setDataTraining(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};
	const fetchAllEmployee = async () => {
		try {
			const response = await Employee.getAllEmployee(0, '');
			setDataEmployee(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const updateTraining = async (id: number, data: any) => {
		try {
			const res = await TrainingSuggest.editTrainingSuggest(data, id);
			if (res.status === 201) {
				Swal.fire({
					icon: 'success',
					title: 'Berhasil',
					text: 'Data pelatihan berhasil diupdate',
				});
				fetchDataTraining();
			}
		} catch (error) {
			console.error(error);
		}
	};
	const createTraining = async (data: any) => {
		try {
			const res = await TrainingSuggest.createTrainingSuggest(data);
			if (res.status === 201) {
				Swal.fire({
					icon: 'success',
					title: 'Berhasil',
					text: 'Data pelatihan berhasil ditambahkan',
				});
			}
			fetchDataTraining();
		} catch (error) {
			console.error(error);
		}
	};
	const handleupdate = (data: any, is_active: boolean) => {
		const id = getSessionStorageItem('id');
		const payload = {
			employee_id: data.employee_id,
			approver_id: id,
			title: data.title || '',
			notes: data.notes || '',
			is_active: is_active,
		};
		updateTraining(data.id, payload);
	};
	const handleSubmit = (values: any) => {
		setmodalCreateUpdate(false);
		createTraining(values);
	};
	const handleModalCreate = () => {
		setmodalCreateUpdate(!modalCreateUpdate);
	};
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilterTable((prev) => ({ ...prev, search: e.target.value, page: 0 }));
	};
	useEffect(() => {
		fetchDataTraining();
		fetchAllEmployee();
	}, []);
	return (
		<div className="w-full flex-wrap md:flex">
			<div className="flex w-full justify-between">
				<div className="breadcrumbs items-center text-center text-xl md:w-2/3">
					<ul className="my-auto h-full">
						<li className="font-bold">
							<a>Rekap Pelatihan</a>
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
						value={filterTable.search}
						onChange={handleSearchChange}
					/>
				</label>
			</div>
			<div className="my-5 flex-grow border-t border-gray-400 drop-shadow-sm" />
			<div className="flex w-full justify-between">
				<button className="btn btn-primary btn-sm my-2 hover:bg-transparent" onClick={() => handleModalCreate()}>
					Tambah Pelatihan
				</button>
			</div>
			<div className="card h-fit w-full overflow-x-auto bg-base-100 p-5 pb-52 shadow-md">
				<table className="table-compact table table-zebra h-full w-full">
					<thead>
						<tr>
							<th>No</th>
							<th>Nama</th>
							<th>Judul Pelatihan</th>
							<th>Deskripsi</th>
							<th>Durasi Pelatihan</th>
							<th>Status</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{dataTraining.map((item, index) => (
							<tr key={index}>
								<td>{index + 1 + filterTable.page * filterTable.limit}</td>
								<td>{item?.employee?.name ?? '-'}</td>
								<td>{item.title}</td>
								<td>{item.notes}</td>
								<td>{item.start_date.split('T')[0] + ' - ' + item.end_date.split('T')[0]}</td>
								<td>{item.is_approved ? 'Approved' : 'Pending'}</td>
								<td>
									<div className="dropdown dropdown-end">
										<div tabIndex={0} role="button" className="hover:btn-transparent btn btn-ghost m-1">
											<HiDotsVertical />
										</div>
										<ul
											tabIndex={0}
											className="menu dropdown-content absolute z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
										>
											<li>
												<button
													className="btn btn-ghost btn-sm m-1 hover:bg-transparent"
													onClick={() => handleupdate(item, true)}
												>
													Setujui
												</button>
											</li>
											<li>
												<button
													className="btn btn-ghost btn-sm m-1 hover:bg-transparent"
													onClick={() => handleupdate(item, false)}
												>
													Tolak
												</button>
											</li>
										</ul>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{modalCreateUpdate && (
				<dialog className="modal modal-open" onClick={() => setmodalCreateUpdate(!modalCreateUpdate)}>
					<div className="modal-box" onClick={(e) => e.stopPropagation()}>
						<h3 className="text-lg font-bold">Hello!</h3>
						<Formik
							initialValues={{
								employee_id: '',
								proposer_id: id,
								title: '',
								purpose: '',
								status: 'pending',
								location: '',
								start_date: '',
								end_date: '',
								is_active: true,
							}}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							<Form className="py-4">
								<div className="form-control mb-4">
									<label htmlFor="employee_id" className="label">
										Employee
									</label>
									<Field as="select" name="employee_id" className="select select-bordered">
										<option value="">Select Employee</option>
										{dataEmployee.map((employee) => (
											<option key={employee.id} value={employee.id}>
												{employee.full_name + ' - ' + employee.occupation}
											</option>
										))}
									</Field>
									<ErrorMessage name="employee_id" component="div" className="text-sm text-red-500" />
								</div>

								{/* <div className="form-control mb-4">
										<label htmlFor="proposer_id" className="label">
											Proposer ID
										</label>
										<Field name="proposer_id" type="number" className="input input-bordered" />
										<ErrorMessage name="proposer_id" component="div" className="text-sm text-red-500" />
									</div> */}

								<div className="form-control mb-4">
									<label htmlFor="title" className="label">
										Judul
									</label>
									<Field name="title" type="text" className="input input-bordered" />
									<ErrorMessage name="title" component="div" className="text-sm text-red-500" />
								</div>

								<div className="form-control mb-4">
									<label htmlFor="purpose" className="label">
										Deskripsi
									</label>
									<Field name="purpose" as="textarea" className="textarea textarea-bordered" />
									<ErrorMessage name="purpose" component="div" className="text-sm text-red-500" />
								</div>

								{/* <div className="form-control mb-4">
										<label htmlFor="status" className="label">
											Status
										</label>
										<Field name="status" as="select" className="select select-bordered">
											<option value="Approved">Approved</option>
											<option value="Pending">Pending</option>
											<option value="Rejected">Rejected</option>
										</Field>
										<ErrorMessage name="status" component="div" className="text-sm text-red-500" />
									</div> */}

								<div className="form-control mb-4">
									<label htmlFor="location" className="label">
										Lokasi
									</label>
									<Field name="location" type="text" className="input input-bordered" />
									<ErrorMessage name="location" component="div" className="text-sm text-red-500" />
								</div>

								<div className="form-control mb-4">
									<label htmlFor="start_date" className="label">
										Tanggal Mulai
									</label>
									<Field name="start_date" type="date" className="input input-bordered" />
									<ErrorMessage name="start_date" component="div" className="text-sm text-red-500" />
								</div>

								<div className="form-control mb-4">
									<label htmlFor="end_date" className="label">
										Tanggal Selesai
									</label>
									<Field name="end_date" type="date" className="input input-bordered" />
									<ErrorMessage name="end_date" component="div" className="text-sm text-red-500" />
								</div>

								<div className="form-control mb-4">
									<label className="label cursor-pointer">
										<span className="label-text">Status</span>
										<Field type="checkbox" name="is_active" className="toggle toggle-primary" />
									</label>
								</div>

								<div className="modal-action">
									<button type="submit" className="btn btn-primary">
										Submit
									</button>
									<button type="button" className="btn" onClick={() => setmodalCreateUpdate(!modalCreateUpdate)}>
										Close
									</button>
								</div>
							</Form>
						</Formik>
					</div>
				</dialog>
			)}
		</div>
	);
};
export default RekapPelatihan;
