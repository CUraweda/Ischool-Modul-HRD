import React, { useEffect, useState } from 'react';
import { Employee, EmployeeDivision } from '@/middlewares/api/hrd';
import { FaPencilAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { IoMdClose } from 'react-icons/io';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as XLSX from 'xlsx';

const PageDivisi: React.FC<{}> = () => {
	const [modalPopup, setModalPopup] = useState<boolean>(false);
	const [listDivisi, setListDivisi] = useState<any[]>([]);
	const [divisi, setDivisi] = useState<Number>(0);
	const [dataEmployee, setDataEmployee] = useState<any[]>([]);
	const [dataEmployeeExcel, setDataEmployeeExcel] = useState<any[]>([]);
	const [dataUpdate, setDataUpdate] = useState<any>(null);
	const [page, setPage] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [filterTable, setFilterTable] = useState({
		search: '',
		totalPage: 0,
		totalRows: 0,
		status: '',
	});

	const validationSchema = Yup.object({
		division_id: Yup.number().required('Divisi tidak boleh kosong'),
	});

	let access_token = sessionStorage.getItem('access_token');
	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchAllEmployee = async () => {
		try {
			const response = await Employee.getAllEmployeePage(limit, filterTable.search, page, access_token, divisi);
			const responseExcel = await Employee.getAllEmployeePage(100000, '', 0, access_token, divisi);
			setDataEmployee(response.data.data.result);
			setDataEmployeeExcel(responseExcel.data.data.result);
			setFilterTable((prev) => ({
				...prev,
				totalRows: response.data.data.totalRows,
				totalPage: response.data.data.totalPage,
			}));
			const dropdownResponse = await Employee.getAllEmployeePage(10000, '', 0, access_token, divisi);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchDataDivision = async () => {
		try {
			const response = await EmployeeDivision.getAllDivision(access_token);
			setListDivisi(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const updateDivision = async (data: any) => {
		try {
			const res = await Employee.updateDivisi(data.employee_id, data.division_id);
			if (res.status === 200) {
				setModalPopup(false);
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
			setModalPopup(true);
			setDataUpdate(payload);
		}
	};

	const handleSubmit = (values: any) => {
		updateDivision(values);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilterTable((prev) => ({ ...prev, search: e.target.value }));
	};

	const exportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(
			dataEmployeeExcel.map((item, index) => ({
				No: index + 1 + page * limit,
				Nama: item.full_name,
				Posisi: listDivisi?.find((div) => div.id === item.division_id)?.name ?? '-',
			}))
		);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Employee Data');
		XLSX.writeFile(workbook, 'Data Employee.xlsx');
	};

	useEffect(() => {
		fetchDataDivision();
	}, []);

	useEffect(() => {
		fetchAllEmployee();
	}, [limit, filterTable.search, page, divisi]);

	return (
		<div className="w-full flex-wrap md:flex">
			{/* Header and Search */}
			<div className="mb-3 flex w-full items-center justify-between">
				<h3 className="font-bold">Divisi</h3>
				<label className="input input-sm input-bordered flex items-center gap-2">
					<input
						type="text"
						className="grow"
						placeholder="Search"
						value={filterTable.search}
						onChange={handleSearchChange}
					/>
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
				</label>
			</div>

			<div className="h-[1px] w-full bg-gray-300"></div>

			<div className="mt-6 flex w-full items-center justify-end gap-2">
				<button onClick={exportToExcel} className="btn btn-primary btn-sm ml-4">
					Export to Excel
				</button>
				<div className="flex items-center gap-2">
					<select
						className="select select-bordered select-xs w-full max-w-xs"
						onChange={(e) => setDivisi(parseInt(e.target.value))}
					>
						<option value={0} selected>
							Filter
						</option>
						{listDivisi.map((item, index) => (
							<option value={item.id} key={index}>
								{item.name}
							</option>
						))}
					</select>
				</div>
			</div>

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
								<td className="text-center">{index + 1 + page * limit}</td>
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

				{/* Pagination Controls */}
				<div className="my-5 flex items-center justify-center">
					<button
						className="btn btn-sm mr-2"
						onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
						disabled={page === 0}
					>
						Previous
					</button>
					<span>
						Page {page + 1} of {filterTable.totalPage}
					</span>
					<button
						className="btn btn-sm ml-2"
						onClick={() => setPage((prev) => Math.min(prev + 1, filterTable.totalPage - 1))}
						disabled={page + 1 >= filterTable.totalPage}
					>
						Next
					</button>
					<div className="ml-5">
						<button onClick={() => setLimit(10)} className="btn btn-sm">
							10
						</button>
						<button onClick={() => setLimit(50)} className="btn btn-sm">
							50
						</button>
						<button onClick={() => setLimit(100)} className="btn btn-sm">
							100
						</button>
						<button onClick={() => setLimit(10000)} className="btn btn-sm">
							All
						</button>
					</div>
				</div>
			</div>

			{/* Modal for Updating Division */}
			{modalPopup && (
				<dialog className="modal modal-open" onClick={() => setModalPopup(false)}>
					<div className="modal-box" onClick={(e) => e.stopPropagation()}>
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-bold">Ubah Divisi</h3>
							<div className="cursor-pointer text-xl" onClick={() => setModalPopup(false)}>
								<IoMdClose />
							</div>
						</div>
						<Formik
							initialValues={{ employee_id: dataUpdate.employee_id, division_id: dataUpdate.division_id }}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
							enableReinitialize
						>
							<Form>
								<div className="form-control mt-4 w-full">
									<label className="label font-semibold">Divisi</label>
									<Field as="select" name="division_id" className="select select-bordered select-sm w-full">
										<option value="">Pilih Divisi</option>
										{listDivisi.map((item, index) => (
											<option key={index} value={item.id}>
												{item.name}
											</option>
										))}
									</Field>
									<ErrorMessage name="division_id" component="div" className="mt-1 text-xs text-red-500" />
								</div>
								<div className="modal-action">
									<button type="submit" className="btn btn-primary btn-sm">
										Simpan
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
