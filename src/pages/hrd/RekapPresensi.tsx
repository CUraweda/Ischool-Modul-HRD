import React, { useEffect, useState } from 'react';
import TimeEntryDialog from '@/components/TimeDialog';
import { Attendance, Employee } from '@/middlewares/api/hrd';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { FaFileExport } from 'react-icons/fa6';
import { MdPeopleAlt } from 'react-icons/md';
import { GrStatusUnknown } from 'react-icons/gr';
interface Worktime {
	id: number;
	division_id: number;
	weekday_id: number;
	uid: string | null;
	type: string;
	start_time: string;
	end_time: string;
	createdAt: string;
	updatedAt: string;
}

interface Employee {
	id: number;
	user_id: number | null;
	employee_no: string | null;
	full_name: string;
	nik: string | null;
	gender: string;
	pob: string;
	dob: string;
	religion: string;
	marital_status: string;
	last_education: string;
	certificate_year: number | null;
	is_education: string;
	major: string | null;
	employee_status: string;
	work_start_date: string;
	occupation: string;
	is_teacher: string;
	duty: string | null;
	job_desc: string | null;
	grade: string | null;
	email: string | null;
	division_id: number | null;
	createdAt: string;
	updatedAt: string;
	division: {
		id: number;
		name: string;
		color: string;
	};
}

interface Attendance {
	id: number;
	worktime_id: number;
	employee_id: number;
	uid: string;
	description: string;
	status: string;
	is_outstation: boolean;
	createdAt: string;
	updatedAt: string;
	worktime: Worktime;
	employee: Employee;
}

const PresensiPage: React.FC = () => {
	const [filterType, setFilterType] = useState<any[]>([]);
	const [filterStatus, setFilterStatus] = useState<any[]>([]);
	const [filterDivision, setFilterDivision] = useState<string>('');
	const [filterDate, setFilterDate] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [totalRows, setTotalRows] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [dataEmployee, setDataEmployee] = useState<any[]>([]);
	const [selectedItem, setSelectedItem] = useState<any[]>([]);
	const listType = [
		{ id: 1, category: 'Type', value: 'Masuk' },
		{ id: 2, category: 'Type', value: 'Keluar' },
		{ id: 3, category: 'Status', value: 'Tepat Waktu' },
		{ id: 4, category: 'Status', value: 'Terlambat' },
		{ id: 5, category: 'Status', value: 'Diluar Jadwal' },
	];
	const [ListDivision, setListDivision] = useState<any[]>([]);
	const fetchAttendanceData = async () => {
		try {
			const result = await Attendance.getEmployeeAttendance(
				currentPage,
				limit,
				filterType,
				filterStatus,
				searchQuery,
				filterDivision,
				filterDate
			);
			setAttendanceData(result.data.data.result);
			setTotalRows(result.data.data.totalRows);
			setTotalPages(result.data.data.totalPage);
		} catch (error) {
			console.error('Error fetching attendance data:', error);
		}
	};
	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};
	const fetchAllDivision = async () => {
		try {
			const response = await Attendance.getAllDivision();
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
	const fetchAllEmployee = async () => {
		try {
			const response = await Employee.getAllEmployee(1000000000000, '');
			const { result } = response.data.data || {};
			// setDataEmployee(result);

			setDataEmployee(Array.isArray(result) ? result : []);
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
	// const filterData = attendanceData.filter((item) => (filterDate ? item.createdAt.split('T')[0] === filterDate : true));
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
	const handleCheckboxChange = (employeeName: string) => {
		setSelectedItem((prevSelected) =>
			prevSelected.includes(employeeName)
				? prevSelected.filter((name) => name !== employeeName)
				: [...prevSelected, employeeName]
		);
	};

	const filterData = attendanceData.filter((item: any) =>
		selectedItem.length > 0 ? selectedItem.includes(item.employee.full_name) : true
	);
	// const filterData = attendanceData.filter((item: any) =>
	// 	selectedItem ? item.employee.full_name === selectedItem : true
	// );
	// const filterData = attendanceData.filter((item) => (selectedItem ? item.full_name === selectedItem.employee.full_name : true));
	useEffect(() => {
		fetchAttendanceData();
		fetchAllEmployee();
		fetchAllDivision();
	}, []);

	useEffect(() => {
		fetchAttendanceData();
	}, [searchQuery, filterType, filterStatus, filterDivision, filterDate, currentPage, limit]);

	const [dialogTime, setDialogTime] = useState(false);

	const handleOpenDialogTime = () => setDialogTime(true);
	const handleCloseDialogTime = () => setDialogTime(false);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().split('T')[0]; // Returns date in yyyy-mm-dd format
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
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap Presensi Data');
		XLSX.writeFile(workbook, 'Rekap_Presensi_Data_Export.xlsx');
	};
	return (
		<div className="h-screen w-full p-2">
			<div className="w-full flex-wrap md:flex">
				<div className="breadcrumbs items-center text-center text-xl md:w-2/3">
					<ul className="my-auto h-full">
						<li className="font-bold">
							<a>Presensi</a>
						</li>
						<li>Rekap Presensi</li>
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

			<div className="w-full">
				<div className="flex w-full justify-between">
					<div className="m-2 flex flex-wrap-reverse gap-4">
						<button className="text-md badge btn badge-md btn-xs h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm">
							Semua
							<div className="pl-5">{totalRows}</div>
						</button>
						<button
							className="text-md badge btn badge-md btn-xs h-fit truncate rounded-badge bg-[#ffffffc2] drop-shadow-sm"
							onClick={handleOpenDialogTime}
						>
							Set Jam Masuk dan Keluar
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
								tabIndex={0}
								role="button"
								className="text-md btn badge-info badge-md btn-xs h-fit rounded-badge text-white drop-shadow-sm"
							>
								<MdPeopleAlt /> Karyawan
							</div>
							<ul tabIndex={0} className="menu dropdown-content z-[1] mt-2 w-52 rounded-box bg-base-100 p-2 shadow">
								<div className="checkbox-group">
									{dataEmployee.map((employee) => (
										<label key={employee.id} className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={selectedItem.includes(employee?.full_name)}
												onChange={() => handleCheckboxChange(employee?.full_name)}
											/>
											<span>{employee?.full_name || 'Unknown'}</span>
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
										{ListDivision.map((item, index) => (
											<label key={index} className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={filterDivision.includes(item.name)}
													onChange={() => setFilterDivision(item.name)}
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
					</div>
				</div>
			</div>

			<div className="card h-fit w-full overflow-x-auto bg-base-100 p-5 shadow-xl">
				<table className="table text-sm">
					<thead>
						<tr className="text-center">
							<th>No</th>
							<th>Divisi</th>
							<th>Nama</th>
							<th>Tanggal</th>
							<th>Pukul</th>
							<th>Keterangan</th>
							<th>Status</th>
							<th>Tipe</th>
						</tr>
					</thead>
					<tbody>
						{filterData.map((item, index) => (
							<tr className="hover" key={item.id}>
								<td>{index + 1}</td>
								<td>{item?.employee?.division?.name}</td>
								<td>{item?.employee?.full_name}</td>
								<td>{item?.createdAt.split('T')[0]}</td>
								<td>{item?.createdAt.split('T')[1].split('.')[0]}</td>
								<td className="w-5 truncate text-ellipsis">{item?.description}</td>
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
										{item?.status}
									</div>
								</td>
								<td>
									<div
										className={`text-md badge badge-md h-fit rounded-md px-3 drop-shadow-sm ${
											item?.worktime?.type === 'MASUK' || 'MASUK'
												? 'bg-[#8ef96ac2] text-[#3d6b2e]'
												: item.worktime.type === 'Keluar' || 'KELUAR'
													? 'bg-[#f96a6a] text-[#6b2e2e]'
													: ''
										}`}
									>
										{item?.worktime?.type.charAt(0).toUpperCase() + item?.worktime?.type.slice(1).toLowerCase()}
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
			{dialogTime && <TimeEntryDialog isOpen={dialogTime} onClose={handleCloseDialogTime} />}
		</div>
	);
};

export default PresensiPage;
