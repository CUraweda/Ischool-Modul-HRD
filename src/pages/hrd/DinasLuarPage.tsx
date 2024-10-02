import React, { useEffect, useState } from 'react';
import { Attendance, Employee } from '@/middlewares/api/hrd';
import DetailCard from '@/components/DetailCard';
import Swal from 'sweetalert2';
import { TbFaceId } from 'react-icons/tb';
import { MdPeopleAlt } from 'react-icons/md';
import * as XLSX from 'xlsx';
import { GrStatusUnknown } from 'react-icons/gr';
import { FaFileExport } from 'react-icons/fa6';

const DinasLuarPage: React.FC<{}> = () => {
	const [filterType, setFilterType] = useState<string[]>([]);
	const [filterStatus, setFilterStatus] = useState<string[]>([]);
	const [filterDivision, setFilterDivision] = useState<any>('');
	const [filterDate, setFilterDate] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [DataAttendance, setDataAttendance] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [dataEmployee, setDataEmployee] = useState<any[]>([]);
	const [search_query] = useState<string>('');
	const [ListDivision, setListDivision] = useState<any[]>([]);
	const [limit, setLimit] = useState<number>(10);
	const [totalRows, setTotalRows] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const listType = [
		{ id: 1, category: 'Type', value: 'Masuk' },
		{ id: 2, category: 'Type', value: 'Keluar' },
		{ id: 3, category: 'Status', value: 'Tepat Waktu' },
		{ id: 4, category: 'Status', value: 'Terlambat' },
	];
	const [selectedItemEmployee, setSelectedItemEmployee] = useState<string[]>([]);

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

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

	const getAllAttendance = async () => {
		try {
			const result = await Attendance.getEmployeeAttendance(
				currentPage,
				limit,
				filterType,
				filterStatus,
				searchQuery,
				filterDivision,
				filterDate,
				access_token
			);
			setDataAttendance(result.data.data.result);
			setTotalRows(result.data.data.totalRows);
			setTotalPages(result.data.data.totalPage);
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

	const filterData = DataAttendance.filter((item) => (filterDate ? item.createdAt.split('T')[0] === filterDate : true));

	useEffect(() => {
		getAllAttendance();
		fetchAllDivision();
	}, []);

	useEffect(() => {
		getAllAttendance();
	}, [searchQuery, limit, filterType, filterStatus, filterDivision, filterDate]);

	const handleCheckDivision = (id: number) => {
		if (filterDivision === id) {
			// Uncheck
			setFilterDivision(null); // Atau nilai default
		} else {
			// Check
			setFilterDivision(id);
		}
	};
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
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap Data Dinas Luar');
		XLSX.writeFile(workbook, 'Data_Dinas_Luar.xlsx');
	};
	const handleCheckboxChange = (employeeName: string) => {
		setSelectedItemEmployee((prevSelected) =>
			prevSelected.includes(employeeName)
				? prevSelected.filter((name) => name !== employeeName)
				: [...prevSelected, employeeName]
		);
	};
	const handleOpenDetailModal = (item: any) => {
		setSelectedItem(item);
	};
	return (
		<div className="h-screen w-full p-2">
			<div className="w-full flex-wrap md:flex">
				<div className="breadcrumbs items-center text-center text-xl md:w-2/3">
					<ul className="my-auto h-full">
						<li className="font-bold">
							<a>Presensi</a>
						</li>
						<li>Dinas Luar</li>
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
						<ul
							tabIndex={0}
							className="menu dropdown-content z-[1] mt-2 h-96 w-52 overflow-y-scroll rounded-box bg-base-100 p-2 shadow"
						>
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
			<div className="card h-fit w-full overflow-x-auto bg-base-100 p-5 shadow-xl">
				<table className="text-md table">
					<thead>
						<tr className="text-center font-bold">
							<th>No</th>
							<th>Divisi</th>
							<th>Nama</th>
							<th>Tanggal</th>
							<th>Jam</th>
							<th>Tipe</th>
							<th>Status</th>
							<th>Keterangan</th>
							<th>Bukti Dinas</th>
						</tr>
					</thead>
					<tbody>
						{filterData.map((item, index) => (
							<tr className="hover" key={item.id}>
								<td>{index + 1}</td>
								<td>{item?.employee?.division?.name}</td>
								<td>{item.employee.full_name}</td>
								<td>{item.createdAt.split('T')[0]}</td>
								<td>{item.createdAt.split('T')[1].split('.')[0]}</td>
								<td>
									<div
										className={`text-md badge badge-md h-fit rounded-md px-3 drop-shadow-sm ${
											item.worktime.type === 'MASUK' || 'MASUK'
												? 'bg-[#8ef96ac2] text-[#3d6b2e]'
												: item.worktime.type === 'Keluar' || 'KELUAR'
													? 'bg-[#f96a6a] text-[#6b2e2e]'
													: ''
										}`}
									>
										{item.worktime.type.charAt(0).toUpperCase() + item.worktime.type.slice(1).toLowerCase()}
									</div>
								</td>
								<td>{item.status}</td>
								<td>
									<div
										className={`text-md badge badge-md h-fit truncate rounded-md px-3 drop-shadow-sm ${
											item.status === 'Tepat Waktu'
												? 'bg-[#8ef96ac2] text-[#3d6b2e]'
												: item.status === 'Diluar Jadwal'
													? 'bg-[#f96a6a] text-[#6b2e2e]'
													: item.status === 'Terlambat'
														? 'bg-[#f9f46a] text-[#6b2e2e]'
														: ''
										}`}
									>
										{item.status}
									</div>
								</td>
								<td className="text-center">
									<button className="btn btn-ghost" onClick={() => handleOpenDetailModal(item)}>
										<TbFaceId className="text-xl" />
									</button>
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
export default DinasLuarPage;
