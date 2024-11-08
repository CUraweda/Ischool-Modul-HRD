import React, { useEffect, useState } from 'react';
import { Training, Karyawan } from '@/middlewares/api/hrd';
import DetailCard from '@/components/DetailCard';
import Swal from 'sweetalert2';
import { TbFaceId } from 'react-icons/tb';
import * as XLSX from 'xlsx';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FaFileExport } from 'react-icons/fa6';
import { Formik, Field } from 'formik';
const PelatihanPage: React.FC<{}> = () => {
	const [filterType, setFilterType] = useState<string[]>([]);
	const [filterStatus, setFilterStatus] = useState<any>('');
	const [filterDate, setFilterDate] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [DataAttendance, setDataAttendance] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [selectedUpdate, setSelectedUpdate] = useState<any>(null);
	const [dropdownEmployee, setDropdownEmployee] = useState<any[]>([]);
	const [forCreate, setForCreate] = useState<boolean>(false);
	const [limit, setLimit] = useState<number>(10);
	const [totalRows, setTotalRows] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const listType = [
		{ id: 1, category: 'Type', value: 'Masuk' },
		{ id: 2, category: 'Type', value: 'Keluar' },
		{ id: 3, category: 'Status', value: 'Menunggu' },
		{ id: 4, category: 'Status', value: 'Sedang Berjalan' },
		{ id: 5, category: 'Status', value: 'Selesai' },
	];
	const [showModal, setShowModal] = useState<boolean>(false);

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
			if (filterStatus === value) {
				setFilterStatus('');
			} else {
				setFilterStatus(value);
			}
		}
	};

	const id = sessionStorage.getItem('role_id');

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const getAllAttendance = async () => {
		try {
			const result = await Training.getAllTraining(currentPage, limit, filterStatus, filterType, searchQuery, '');
			const response = await Karyawan.DataKaryawan(0, 10000, '', '', access_token);
			setDropdownEmployee(response.data.data.result);
			setDataAttendance(result.data.data.result);
			setTotalRows(result.data.data.totalRows);
			setTotalPages(result.data.data.totalPage);
		} catch (err) {
			console.error(err);
		}
	};
	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const filterData = DataAttendance.filter((item) => (filterDate ? item.createdAt.split('T')[0] === filterDate : true));

	useEffect(() => {
		getAllAttendance();
	}, []);

	useEffect(() => {
		getAllAttendance();
	}, [searchQuery, limit, filterType, filterStatus, filterDate]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(0);
	};
	const handleDetailClose = () => {
		setSelectedItem(null);
	};
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().split('T')[0];
	};
	const exportToXLSX = () => {
		const formattedData = filterData.map((item, index) => ({
			no: index + 1,
			Nama: item.employee.full_name,
			Divisi: item.employee.occupation,
			Deskripsi: item.purpose,
			status: item.status,
			Lokasi: item.location,
			Dari: formatDate(item.start_date),
			Sampai: formatDate(item.end_date),
		}));
		const worksheet = XLSX.utils.json_to_sheet(formattedData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap Data Pelatihan');
		XLSX.writeFile(workbook, 'Data_Pelatihan.xlsx');
	};
	const requestTraining = async (formData: any) => {
		try {
			const response = await Training.requestTraining(formData);
			if (response.data.code === 201) {
				Swal.fire({
					icon: 'success',
					title: 'Berhasil',
					text: 'Data berhasil ditambahkan',
				});
				getAllAttendance();
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Gagal',
					text: 'Data gagal ditambahkan',
				});
			}
		} catch (error) {
			console.error(error);
		}
	};
	const updateTraining = async (id: any, formData: any) => {
		try {
			const response = await Training.updateTraining(id, formData);
			if (response.data.code === 200) {
				Swal.fire({
					icon: 'success',
					title: 'Berhasil',
					text: 'Data berhasil ditambahkan',
				});
				getAllAttendance();
				setShowModal((showModal) => !showModal);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Gagal',
					text: 'Data gagal ditambahkan',
				});
			}
		} catch (error) {
			console.error(error);
		}
	};
	const handleSubmit = (values: any) => {
		if (forCreate) {
			requestTraining(values);
			setShowModal(false);
		} else {
			updateTraining(selectedUpdate?.id, values);
		}
	};
	const showModalHandle = (type: 'add' | 'edit', item?: any) => {
		setSelectedUpdate(item ?? null); // Set data pelatihan yang ingin diedit
		setShowModal((showModal) => !showModal);
		setForCreate(type === 'add');
	};
	const handleOpenDetailModal = (item: any) => {
		setSelectedItem(item);
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
						<h3 className="text-lg font-bold">{forCreate ? 'Buat Pengajuan' : 'Ubah Status'}</h3>
						<Formik
							initialValues={
								forCreate
									? {
											employee_id: '',
											proposer_id: parseInt(id ?? '0'),
											title: '',
											purpose: '',
											status: '',
											location: '',
											is_active: true,
											start_date: '',
											end_date: '',
										}
									: {
											employee_id: selectedUpdate?.employee_id || '',
											proposer_id: parseInt(id ?? '0'),
											title: selectedUpdate?.title || '',
											purpose: selectedUpdate?.purpose || '',
											status: selectedUpdate?.status || '',
											location: selectedUpdate?.location || '',
											is_active: selectedUpdate?.is_active || true,
											start_date: selectedUpdate?.start_date.split('T')[0],
											end_date: selectedUpdate?.end_date.split('T')[0],
										}
							}
							onSubmit={handleSubmit}
						>
							{({ handleSubmit, setFieldValue }) => (
								<form onSubmit={handleSubmit}>
									{/* Input Fields */}
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Pilih Karyawan</span>
										</label>
										<Field
											as="select"
											name="employee_id"
											className="input input-bordered w-full"
											onChange={(e: any) => setFieldValue('employee_id', parseInt(e.target.value))}
										>
											<option value={0}>Pilih Karyawan</option>
											{dropdownEmployee.map((item, index) => (
												<option value={item.id} key={index}>
													{item.full_name}
												</option>
											))}
										</Field>
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Nama Pelatihan</span>
										</label>
										<Field name="title" className="input input-bordered w-full" />
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Tujuan Pelatihan</span>
										</label>
										<Field name="purpose" className="input input-bordered w-full" />
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Status Pelatihan</span>
										</label>
										<Field as="select" name="status" className="input input-bordered w-full">
											<option value="" disabled>
												Pilih Status
											</option>
											<option value="Approved">Disetujui</option>
											<option value="Rejected">Ditolak</option>
										</Field>
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Tempat Pelatihan</span>
										</label>
										<Field name="location" className="input input-bordered w-full" />
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Mulai Pelatihan</span>
										</label>
										<Field type="date" name="start_date" className="input input-bordered w-full" />
									</div>
									<div className="my-2 w-full">
										<label className="label">
											<span className="label-text">Akhir Pelatihan</span>
										</label>
										<Field type="date" name="end_date" className="input input-bordered w-full" />
									</div>

									{/* Modal Actions */}
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
							<a>Daftar Pelatihan</a>
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
					<input type="text" className="grow" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
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
						onClick={() => showModalHandle('add', null)}
					>
						Tambah Pelatihan
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

					<div className="my-auto flex gap-4">
						<div className="dropdown">
							<div
								tabIndex={0}
								role="button"
								className="text-md btn badge-md btn-xs flex h-fit rounded-badge drop-shadow-sm"
							>
								Sortir <RiArrowDropDownLine className="text-xl" />
							</div>
							<ul tabIndex={0} className="menu dropdown-content z-[1] mt-2 w-52 rounded-box bg-base-100 p-2 shadow">
								<h4 className="mt-2">Status</h4>
								<div className="checkbox-group">
									{listType
										.filter((item) => item.category === 'Status')
										.map((item) => (
											<label key={item.id} className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={filterStatus === item.value}
													onChange={() => handleCheckType(item.value, 'Status')}
												/>
												<span>{item.value}</span>
											</label>
										))}
								</div>
							</ul>
						</div>
						<input
							type="date"
							className="badge input input-xs input-bordered btn-xs rounded-full outline-none"
							value={filterDate}
							onChange={(e) => setFilterDate(e.target.value)}
						/>
					</div>
				</div>{' '}
			</div>
			<div className="card h-fit w-full overflow-x-auto bg-base-100 p-5 shadow-xl">
				<table className="text-md table mb-8">
					<thead>
						<tr className="text-center font-bold">
							<th>No</th>
							<th>Nama</th>
							<th>Absen Pelatihan</th>
							<th>Posisi</th>
							<th>Status</th>
							<th>Detail</th>
						</tr>
					</thead>
					<tbody>
						{filterData.map((item, index) => (
							<tr className="hover" key={item.id}>
								<td>{index + 1}</td>
								<td>{item.employee?.full_name}</td>
								<td className="text-center">
									<button className="btn btn-ghost" onClick={() => handleOpenDetailModal(item)}>
										<TbFaceId className="text-xl" />
									</button>
								</td>
								<td className="text-center">{item?.employee?.occupation}</td>
								<td className="text-center">{item.status}</td>
								<td className="text-center">
									<div className="dropdown dropdown-end">
										<label tabIndex={0} className="btn btn-primary btn-sm">
											...
										</label>
										<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
											<li>
												<a onClick={() => showModalHandle('edit', item)}>Edit</a>
											</li>
										</ul>
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

			{selectedItem && <DetailCard dataProps={selectedItem} onClose={handleDetailClose} />}
		</div>
	);
};
export default PelatihanPage;
