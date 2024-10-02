import React, { useEffect, useState } from 'react';
import { Attendance, Employee } from '@/middlewares/api/hrd';
import DetailCard from '@/components/DetailCard';
import { MdOutlineEventNote } from 'react-icons/md';
import Swal from 'sweetalert2';
import { MdPeopleAlt } from 'react-icons/md';
import { GrStatusUnknown } from 'react-icons/gr';
import { FaFileExport } from 'react-icons/fa6';
import * as XLSX from 'xlsx';
import { Formik, Field } from 'formik';
import { getSessionStorageItem } from '@/utils/storageUtils';
const pengajuanCutiPage: React.FC<{}> = () => {
	const [filterType, setFilterType] = useState<string[]>([]);
	const [filterStatus, setFilterStatus] = useState<string[]>([]);
	const [filterDivision, setFilterDivision] = useState<any>('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [filterDate, setFilterDate] = useState<string>('');
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [dataVacation, setDataVacation] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [totalRows, setTotalRows] = useState(1);
	const [limit, setLimit] = useState<number>(10);
	const [dataEmployee, setDataEmployee] = useState<any[]>([]);
	const [selectedItemEmployee, setSelectedItemEmployee] = useState<string[]>([]);
	const listType = [
		{ id: 1, category: 'Type', value: 'Cuti' },
		{ id: 2, category: 'Type', value: 'Izin' },
		{ id: 3, category: 'Status', value: 'Disetujui' },
		{ id: 4, category: 'Status', value: 'Menunggu' },
		{ id: 5, category: 'Status', value: 'Tidak Disetujui' },
	];
	let access_token = sessionStorage.getItem('access_token');
	const [ListDivision, setListDivision] = useState<any[]>([]);
	const [search_query, setSearch_query] = useState<string>('');
	const getAllVacation = async () => {
		// const combinedFilter = [...filterType, filterStatus]
		// 	.filter(Boolean) // This removes any empty strings or null values
		// 	.join(',');
		const response = await Attendance.getVacation(
			0,
			limit,
			searchQuery,
			filterType,
			filterStatus,
			filterDate,
			filterDivision,
			access_token
		);
		setDataVacation(response.data.data.result);
		setTotalPages(response.data.data.totalPage);
		setTotalRows(response.data.data.totalRows);
		console.log(response.data.data);
	};

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const filterData = dataVacation
		.filter((item) => (filterDate ? item.createdAt.split('T')[0] === filterDate : true))
		.filter((item: any) =>
			selectedItemEmployee.length > 0 ? selectedItemEmployee.includes(item.employee.full_name) : true
		);

	const getAllEmployee = async () => {
		try {
			const response = await Employee.getAllEmployee(100000, search_query, access_token);
			const { result } = response.data.data || {};
			// setDataEmployee(result);

			setDataEmployee(Array.isArray(result) ? result : []);
			if (response.data.code !== 200) {
				Swal.fire({
					title: 'Silahkan coba lagi',
					icon: 'error',
					text: 'Data yang dicari tidak ditemukan',
				});
			}
		} catch (err) {
			console.error(err);
		}
	};
	const fetchAllDivision = async () => {
		try {
			const response = await Attendance.getAllDivision(access_token);
			const { result } = response.data.data || {};
			setListDivision(Array.isArray(result) ? result : []);
			if (response.data.code !== 200) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			}
		} catch (err) {
			console.error(err);
		}
	};
	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(0);
	};

	useEffect(() => {
		getAllVacation();
		fetchAllDivision();
	}, []);

	useEffect(() => {
		getAllVacation();
	}, [searchQuery, limit, filterType, filterStatus, filterDate, filterDivision]);

	useEffect(() => {
		getAllEmployee();
	}, [search_query]);
	const handleDetailClose = () => {
		setSelectedItem(null);
	};

	const handleOpenDetailModal = (item: any) => {
		setSelectedItem(item);
	};

	const handleCheckDivision = (id: number) => {
		if (filterDivision === id) {
			// Uncheck
			setFilterDivision(null); // Atau nilai default
		} else {
			// Check
			setFilterDivision(id);
		}
	};
	const updateStatus = async (id: number, status: string) => {
		try {
			await Attendance.updateVacation(id, { status }, access_token);
			getAllVacation();
		} catch (error) {
			console.error('Error updating status:', error);
		}
	};
	const capitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	};

	const handleChangeStatus = (type: string, item: any) => {
		setIsDialogOpen(() => !isDialogOpen);
		Swal.fire({
			title: 'Apakah anda yakin?',
			text: 'Anda akan menyetujui pengajuan cuti ini',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, Setuju',
			cancelButtonText: 'Tidak Setuju',
		} as any).then((result) => {
			if (result.isConfirmed) {
				if (type === 'disetujui') {
					updateStatus(item.id, 'Disetujui');
				} else {
					updateStatus(item.id, 'Tidak Disetujui');
				}
			}
		});
	};
	const handleCheckType = (value: string, category: 'Type' | 'Status') => {
		if (category === 'Type') {
			setFilterType((prev) => {
				if (prev.includes(value)) {
					return prev.filter((item) => item !== value);
				} else {
					return [...prev, value];
				}
			});
		} else if (category === 'Status') {
			setFilterStatus((prev) => {
				if (prev.includes(value)) {
					return prev.filter((item) => item !== value);
				} else {
					return [...prev, value];
				}
			});
		}
	};
	const [showModal, setShowModal] = useState<boolean>(false);
	const showModalHandle = () => {
		setShowModal((showModal) => !showModal);
	};
	const handleCheckboxChange = (employeeName: string) => {
		setSelectedItemEmployee((prevSelected) =>
			prevSelected.includes(employeeName)
				? prevSelected.filter((name) => name !== employeeName)
				: [...prevSelected, employeeName]
		);
	};
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().split('T')[0];
	};
	const requestCuti = async (formData: any) => {
		try {
			const response = await Attendance.requestVacation(formData, access_token);
			Swal.fire({
				icon: 'success',
				title: 'Berhasil',
				text: 'Data berhasil ditambahkan',
			});
			getAllVacation();
			if (response.data.code !== 201) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			}
		} catch (err) {
			console.error(err);
		}
	};
	const exportToXLSX = () => {
		const formattedData = filterData.map((item, index) => ({
			no: index + 1,
			id: item.id,
			Nama: item.employee.full_name,
			Divisi: item.employee.division,
			uid: item.uid,
			Deskripsi: item.description,
			status: item.status,
			Pukul: item.createdAt.split('T')[1].split('.')[0],
			Tanggal: formatDate(item.createdAt),
		}));

		const worksheet = XLSX.utils.json_to_sheet(formattedData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap Pengajuan Cuti');
		XLSX.writeFile(workbook, 'Data_Pengajuan_Cuti.xlsx');
	};
	const [file, setFile] = useState<File | null>(null);
	const handleSubmit = (values: any) => {
		// const payload = { ...values, proposer_id: 1 };
		const formData = new FormData();

		// Menambahkan semua field ke dalam FormData
		formData.append('description', values.description);
		formData.append('start_date', values.start_date);
		formData.append('end_date', values.end_date);
		formData.append('proposer_id', '1');
		formData.append('type', 'CUTI');
		formData.append('status', 'Menunggu');
		formData.append('employee_id', JSON.stringify(values.employee_id));
		if (file) {
			formData.append('file', file);
		}

		if (formData) {
			requestCuti(formData);
		}
		console.log('Form data:', values);
		console.log('Form Data Object:', formData);
		setShowModal(false);
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};
	return (
		<div className="h-screen w-full p-2">
			{showModal && (
				<dialog className="modal modal-open" onClick={() => setShowModal(false)}>
					<div className="modal-box" onClick={(e) => e.stopPropagation()}>
						<button
							className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
							onClick={() => setShowModal(false)}
						>
							✕
						</button>
						<h3 className="text-lg font-bold">Buat Pengajuan</h3>
						<Formik
							initialValues={{
								employee_id: [] as number[],
								description: '',
								start_date: '',
								file: '',
								end_date: '',
							}}
							onSubmit={handleSubmit}
						>
							{({ values, setFieldValue, handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Pilih Karyawan</span>
										</label>
									</div>
									<div className="my-2 w-full">
										<input
											type="text"
											placeholder="Cari karyawan..."
											value={search_query}
											onChange={(e) => setSearch_query(e.target.value)}
											className="input input-bordered w-full"
										/>
										{search_query && (
											<div className="m-2 h-52 w-full overflow-y-scroll">
												<div className="checkbox-group">
													{dataEmployee.map((employee: any) => (
														<label key={employee.id} className="flex items-center space-x-2">
															<input
																type="checkbox"
																name="employee_id"
																id="employee_id"
																value={employee.id}
																checked={values.employee_id.includes(employee.id)}
																onChange={(e) => {
																	if (e.target.checked) {
																		setFieldValue('employee_id', [...values.employee_id, employee.id]);
																	} else {
																		setFieldValue(
																			'employee_id',
																			values.employee_id.filter((id: number) => id !== employee.id)
																		);
																	}
																}}
															/>
															<span>{employee.full_name}</span>
														</label>
													))}
												</div>
											</div>
										)}
									</div>
									{/* <div className="my-2 w-full">
										<select
											name="employee_id"
											value={values.employee_id}
											onChange={handleChange}
											className="select select-bordered w-full"
											multiple
										>
											{dataEmployee.map((employee: any) => (
												<option key={employee.id} value={employee.id}>
													{employee.full_name}
												</option>
											))}
										</select>
									</div> */}
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Upload File</span>
										</label>
										<input
											type="file"
											name="file"
											onChange={handleFileChange}
											className="file-input file-input-bordered w-full"
										/>
									</div>

									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Deskripsi</span>
										</label>
										<Field type="text" name="description" className="input input-bordered w-full" />
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Start Date</span>
										</label>
										<Field type="date" name="start_date" className="input input-bordered w-full" />
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">End Date</span>
										</label>
										<Field type="date" name="end_date" className="input input-bordered w-full" />
									</div>
									<div className="modal-action">
										<button type="submit" className="btn btn-primary">
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
							<a>Presensi</a>
						</li>
						<li>Pengajuan Cuti</li>
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
						// onChange={(e) => setSearchQuery(e.target.value)}
						onChange={handleSearchChange}
					/>
				</label>
			</div>

			<div className="my-5 flex-grow border-t border-gray-400 drop-shadow-sm"></div>
			<div className="flex w-full justify-between">
				<div className="m-2 flex flex-wrap-reverse gap-4">
					<button className="text-md badge btn badge-md btn-xs h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm">
						Semua
						<div className="pl-5">{totalRows}</div>
					</button>
					<button
						className="text-md badge btn badge-md btn-xs h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm"
						onClick={() => showModalHandle()}
					>
						Buat Pengajuan
					</button>
				</div>
				<div className="m-2 flex flex-wrap-reverse gap-4">
					<button
						className="text-md btn badge-success badge-md btn-xs h-fit rounded-badge text-white drop-shadow-sm"
						onClick={() => exportToXLSX()}
					>
						<FaFileExport />
						<div className="pl-1">{totalRows}</div>
						Export
					</button>
					<div className="dropdown shrink-0">
						<div
							onClick={() => getAllEmployee()}
							tabIndex={0}
							role="button"
							className="text-md btn badge-info badge-md btn-xs h-fit rounded-badge text-white drop-shadow-sm"
						>
							<MdPeopleAlt /> Karyawan
						</div>
						<ul tabIndex={0} className="menu dropdown-content z-[1] mt-2 w-52 rounded-box bg-base-100 p-2 shadow">
							<div className="h-96 overflow-y-scroll">
								<div className="checkbox-group">
									{dataEmployee.map((employee) => (
										<label key={employee.id} className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={selectedItemEmployee.includes(employee.full_name)}
												onChange={() => handleCheckboxChange(employee.full_name)}
											/>
											<span>{employee.full_name}</span>
										</label>
									))}
								</div>
							</div>
						</ul>
					</div>

					<div className="my-auto flex gap-4">
						<div className="dropdown">
							<div
								tabIndex={0}
								role="button"
								className="text-md btn badge-warning badge-md btn-xs flex h-fit truncate rounded-badge text-white drop-shadow-sm"
							>
								<GrStatusUnknown /> Tipe, Status dan Divisi
							</div>
							<ul tabIndex={0} className="menu dropdown-content z-[1] mt-2 w-52 rounded-box bg-base-100 p-2 shadow">
								<h4 className="mt-2">Tipe</h4>
								<div className="checkbox-group">
									{listType
										.filter((item) => item.category === 'Type')
										.map((item) => (
											<label key={item.id} className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={filterType.includes(item.value)}
													onChange={() => handleCheckType(item.value, 'Type')}
												/>
												<span>{item.value}</span>
											</label>
										))}
								</div>
								<h4 className="mt-2">Status</h4>
								<div className="checkbox-group">
									{listType
										.filter((item) => item.category === 'Status')
										.map((item) => (
											<label key={item.id} className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={filterStatus.includes(item.value)}
													onChange={() => handleCheckType(item.value, 'Status')}
												/>
												<span>{item.value}</span>
											</label>
										))}
								</div>
								<h4 className="mt-2">Divisi</h4>
								<div className="checkbox-group">
									{ListDivision.map((item) => (
										<label key={item.id} className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={filterDivision === item.id}
												onChange={() => handleCheckDivision(item.id)}
											/>
											<span>{item.name}</span>
										</label>
									))}
								</div>
							</ul>
						</div>
					</div>
					<input
						type="date"
						className="input input-xs input-bordered rounded-full outline-none"
						value={filterDate}
						onChange={(e) => setFilterDate(e.target.value)}
					/>
				</div>{' '}
			</div>
			<div className="card h-fit w-full overflow-x-auto bg-base-100 p-5 pb-28 shadow-xl">
				<table className="text-md table">
					<thead>
						<tr className="text-center font-bold">
							<th>No</th>
							<th>Nama</th>
							<th>Tanggal</th>
							<th>Deskripsi</th>
							<th>Tipe</th>
							<th>Status</th>
							<th>Catatan</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{filterData.map((item, index) => (
							<tr className="hover truncate" key={item.id}>
								<td>{index + 1 + currentPage * limit}</td>
								<td>{item.employee.full_name}</td>

								<td>{item.start_date.split('T')[0] + ' s/d' + item.end_date.split('T')[0]}</td>
								<td>{item.description}</td>
								<td>
									{/* <div
										className={`text-md badge badge-md h-fit rounded-md px-3 drop-shadow-sm ${
											// item.data.tipe === 'Izin'
											'bg-[#8ef96ac2] text-[#3d6b2e]'
											// : item.data.tipe === 'Cuti'
											// ? 'bg-[#f96a6a] text-[#6b2e2e]'
											// : ''
										}`}
									> */}
									{capitalizeFirstLetter(item.type)}
									{/* </div> */}
								</td>
								<td>
									{/* <div
										className={`text-md badge badge-md h-fit truncate rounded-md px-3 drop-shadow-sm ${
											item.status.toLowerCase() === 'disetujui'
												? 'bg-[#8ef96ac2] text-[#3d6b2e]'
												: item.status.toLowerCase() === 'tidak disetujui'
													? 'bg-[#f96a6a] text-[#6b2e2e]'
													: item.status.toLowerCase() === 'menunggu'
														? 'bg-[#f9f46a] text-[#6b2e2e]'
														: ''
										}`}
									>
										{item.status}
									</div> */}
									{item.status}
								</td>
								<td className="text-center">
									<button
										className="btn btn-square btn-ghost hover:bg-transparent"
										onClick={() => handleOpenDetailModal(item)}
									>
										<MdOutlineEventNote className="text-lg" />
									</button>
								</td>
								<td className="text-center">
									<div className="dropdown dropdown-end flex-none">
										<div className="dropdown dropdown-left">
											<button
												tabIndex={0}
												role="button"
												className="btn btn-square btn-ghost shadow-none outline-none hover:bg-transparent"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													className="inline-block h-4 w-4 stroke-current"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M12 5h.01M12 12h.01M12 19h.01M12 6a1 1 0 100-2 1 1 0 000 2zm0 7a1 1 0 100-2 1 1 0 000 2zm0 7a1 1 0 100-2 1 1 0 000 2z"
													></path>
												</svg>
											</button>
											<ul
												tabIndex={0}
												className="menu dropdown-content z-[1] w-52 items-start rounded-box bg-base-100 p-2 shadow"
											>
												<h3 className="mb-2 w-full border-b-2 border-slate-300 p-2 text-center">Edit Status</h3>
												<button
													className="btn btn-ghost flex w-full justify-between hover:bg-transparent"
													onClick={() => handleChangeStatus('disetujui', item)}
												>
													<div className="h-4 w-4 rounded-full border-2 border-green-400 bg-transparent"></div>
													<div>Setujui Permintaan</div>
												</button>
												<button
													className="btn btn-ghost flex w-full justify-between hover:bg-transparent"
													onClick={() => handleChangeStatus('tidak disetujui', item)}
												>
													<div className="h-4 w-4 rounded-full border-2 border-red-400 bg-transparent"></div>
													<div>Tidak Disetujui</div>
												</button>
											</ul>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="join m-5">
				<button
					className="btn join-item btn-sm"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 0}
				>
					Previous
				</button>
				<button className="btn join-item btn-sm">
					<div className="flex justify-between">
						<span>
							Page {currentPage + 1} of {totalPages}
						</span>
					</div>
				</button>
				<button className="btn join-item btn-sm" onClick={() => setLimit(10)}>
					10
				</button>
				<button className="btn join-item btn-sm" onClick={() => setLimit(50)}>
					50
				</button>
				<button className="btn join-item btn-sm" onClick={() => setLimit(100)}>
					100
				</button>
				<button className="btn join-item btn-sm" onClick={() => setLimit(0)}>
					All
				</button>
				<button
					className="btn join-item btn-sm"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage + 1 === totalPages}
				>
					Next
				</button>
			</div>

			{/* <div className="my-5 flex justify-center">
				<div className="join">
					{pageNumbers.map((number) => (
						<button
							key={number}
							onClick={() => handlePageChange(number)}
							className={`btn join-item btn-sm ${currentPage === number ? 'btn-active' : ''}`}
						>
							{number}
						</button>
					))}
				</div>
			</div> */}
			{selectedItem && <DetailCard dataProps={selectedItem} onClose={handleDetailClose} />}
		</div>
	);
};

export default pengajuanCutiPage;
