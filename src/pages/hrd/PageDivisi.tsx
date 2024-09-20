import React, { useEffect, useState } from 'react';
import { Employee, EmployeeDivision } from '@/middlewares/api/hrd';
import { FaPencilAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { IoMdClose } from 'react-icons/io';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const PageDivisi: React.FC<{}> = () => {
	const [modalPopup, setModalPopup] = useState<boolean>(false);
	const [listDivisi, setListDivisi] = useState<any[]>([]);
	const [dataEmployee, setDataEmployee] = useState<any[]>([]);
	const [dataUpdate, setDataUpdate] = useState<any>(null);
	const [filterTable, setFilterTable] = useState({
		search: '',
		limit: 0,
		page: 0,
		totalPage: 0,
		totalRows: 0,
		status: '',
	});
	const validationSchema = Yup.object({
		division_id: Yup.number().required('Divisi tidak boleh kosong'),
	});
	const fetchAllEmployee = async () => {
		try {
			const response = await Employee.getAllEmployeePage(filterTable.limit, filterTable.search, filterTable.page);
			setDataEmployee(response.data.data.result);
			setFilterTable((prev) => ({
				...prev,
				limit: response.data.data.limit,
				page: response.data.data.page,
				totalRows: response.data.data.totalRows,
				totalPage: response.data.data.totalPage,
			}));
		} catch (error) {
			console.error(error);
		}
	};
	const fetchDataDivision = async () => {
		try {
			const response = await EmployeeDivision.getAllDivision();

			setListDivisi(response.data.data.result);
			console.log(listDivisi.find((item) => item.id === 56)?.name ?? '-');
		} catch (error) {
			console.error(error);
		}
	};
	const updateDivision = async (data: any) => {
		try {
			const res = await Employee.updateDivisi(data.employee_id, data.division_id);
			if (res.status === 200) {
				setModalPopup(!modalPopup);
				Swal.fire({
					icon: 'success',
					title: 'Berhasil',
					text: 'Data Karyawan berhasil dirubah',
				});
				fetchAllEmployee();
			}
			fetchDataDivision();
		} catch (error) {
			console.error(error);
		}
	};
	const handleupdate = (data: any) => {
		const payload = {
			division_id: data.division_id,
			employee_id: data.id,
		};
		if (payload) {
			setModalPopup(!modalPopup);
			setDataUpdate(payload);
		}
	};
	const handleSubmit = (values: any) => {
		updateDivision(values);
	};
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilterTable((prev) => ({ ...prev, search: e.target.value, page: 0 }));
	};
	useEffect(() => {
		fetchDataDivision();
	}, []);
	useEffect(() => {
		fetchAllEmployee();
	}, [filterTable.limit, filterTable.search, filterTable.page]);
	return (
		<div className="w-full flex-wrap md:flex">
			<div className="flex w-full justify-between">
				<div className="breadcrumbs items-center text-center text-xl md:w-2/3">
					<ul className="my-auto h-full">
						<li className="font-bold">
							<a>Divisi Karyawan</a>
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
			<div className="card my-5 h-fit w-full overflow-x-auto bg-base-100 p-5 shadow-md">
				<table className="table-compact table table-zebra h-full w-full">
					<thead>
						<tr>
							<th className="text-center">No</th>
							<th>Nama</th>
							<th>Posisi</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{dataEmployee.map((item, index) => (
							<tr key={index}>
								<td className="text-center">{index + 1 + filterTable.page * filterTable.limit}</td>
								<td>{item.full_name}</td>
								<td>{listDivisi?.find((div) => div.id === item.division_id)?.name ?? '-'}</td>
								<td className="text-center">
									<button className="btn btn-ghost" onClick={() => handleupdate(item)}>
										<FaPencilAlt />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="join m-5">
					<button
						className="btn join-item btn-sm"
						onClick={() => setFilterTable((prev) => ({ ...prev, page: prev.page - 1 }))}
						disabled={filterTable.page === 0} // Disable jika halaman pertama
					>
						Previous
					</button>

					<button
						className="btn join-item btn-sm"
						onClick={() => setFilterTable((prev) => ({ ...prev, page: prev.page + 1 }))}
						disabled={filterTable.page + 1 >= filterTable.totalPage} // Disable jika halaman terakhir
					>
						Next
					</button>

					<button className="btn join-item btn-sm">
						<div className="flex justify-between">
							<span>
								Page {filterTable.page + 1} of {filterTable.totalPage}
							</span>
						</div>
					</button>
					<button className="btn join-item btn-sm" onClick={() => setFilterTable((prev) => ({ ...prev, limit: 10 }))}>
						10
					</button>
					<button className="btn join-item btn-sm" onClick={() => setFilterTable((prev) => ({ ...prev, limit: 50 }))}>
						50
					</button>
					<button className="btn join-item btn-sm" onClick={() => setFilterTable((prev) => ({ ...prev, limit: 100 }))}>
						100
					</button>
					<button
						className="btn join-item btn-sm"
						onClick={() => setFilterTable((prev) => ({ ...prev, limit: 10000000000000000000 }))}
					>
						All
					</button>
				</div>
			</div>
			{modalPopup && (
				<dialog className="modal modal-open" onClick={() => setModalPopup(!modalPopup)}>
					<div className="modal-box" onClick={(e) => e.stopPropagation()}>
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-bold">Ubah Divisi</h3>
							<div className="cursor-pointer text-xl" onClick={() => setModalPopup(!modalPopup)}>
								<IoMdClose />
							</div>
						</div>
						<Formik
							initialValues={{
								employee_id: dataUpdate.employee_id,
								division_id: dataUpdate.division_id,
							}}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							<Form className="py-4">
								<div className="form-control mb-4">
									{/* <label htmlFor="employee_id" className="label">
										Divisi
									</label> */}
									<Field as="select" name="division_id" className="select select-bordered">
										<option value="">Pilih divisi</option>
										{listDivisi?.map((div) => (
											<option key={div.id} value={div.id} className={div.color ? 'color-[' + div.color + ']' : ''}>
												{div.name}
											</option>
										))}
									</Field>
									<ErrorMessage name="employee_id" component="div" className="text-sm text-red-500" />
								</div>
								<div className="modal-action">
									<button type="submit" className="btn btn-primary">
										Submit
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
export default PageDivisi;
