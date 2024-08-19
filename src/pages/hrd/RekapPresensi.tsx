import React, { useEffect, useState } from 'react';
import TimeEntryDialog from '@/components/TimeDialog';
import { Attendance } from '@/middlewares/api/hrd';

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
	division: string | null;
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
	const [filterType, setFilterType] = useState<string>('');
	const [filterStatus, setFilterStatus] = useState<string>('');
	const [filterDivision, setFilterDivision] = useState<string>('');
	const [filterDate, setFilterDate] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [totalRows, setTotalRows] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const fetchAttendanceData = async () => {
		try {
			const result = await Attendance.getEmployeeAttendance(
				currentPage,
				limit,
				filterType,
				searchQuery,
				filterStatus,
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

	// const filterData = attendanceData.filter((item) => (filterDate ? item.createdAt.split('T')[0] === filterDate : true));

	useEffect(() => {
		fetchAttendanceData();
	}, []);

	useEffect(() => {
		fetchAttendanceData();
	}, [searchQuery, filterType, filterStatus, filterDivision, filterDate, currentPage, limit]);

	const [dialogTime, setDialogTime] = useState(false);

	const handleOpenDialogTime = () => setDialogTime(true);
	const handleCloseDialogTime = () => setDialogTime(false);

	return (
		<div className="w-full p-2">
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

			<div className="flex w-full justify-between">
				<div className="flex gap-4">
					<button className="text-md badge btn badge-md btn-xs my-5 h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm">
						Semua
						<div className="pl-5">{totalRows}</div>
					</button>
					<button
						className="text-md badge btn badge-md btn-xs my-5 h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm"
						onClick={handleOpenDialogTime}
					>
						Set Jam Masuk dan Keluar
					</button>
				</div>
				<div className="my-auto flex gap-4">
					<select
						className="select select-bordered select-xs"
						onChange={(e) => {
							const selectedValue = e.target.value;
							if (selectedValue == 'MASUK' || selectedValue == 'KELUAR') {
								setFilterType(e.target.value);
							} else {
								setFilterStatus(e.target.value);
							}
						}}
					>
						<option value="" disabled selected>
							Tipe dan Status yang dipilih
						</option>
						<optgroup label="Tipe">
							<option value="MASUK">Masuk</option>
							<option value="KELUAR">Keluar</option>
						</optgroup>
						<optgroup label="Status">
							<option value="Tepat Waktu">Tepat Waktu</option>
							<option value="Terlambat">Terlambat</option>
							<option value="Diluar Jadwal">Diluar Jadwal</option>
						</optgroup>
					</select>
					<select
						className="select select-bordered select-xs"
						value={filterDivision}
						onChange={(e) => setFilterDivision(e.target.value)}
					>
						<option value="HRD">HRD</option>
						<option value="GURU">Guru</option>
					</select>
					<input
						type="date"
						className="input input-xs input-bordered"
						value={filterDate}
						onChange={(e) => setFilterDate(e.target.value)}
					/>
				</div>
			</div>

			<div className="card h-fit w-full overflow-x-auto bg-base-100 p-5 shadow-xl">
				<table className="text-md table">
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
						{attendanceData.map((item, index) => (
							<tr className="hover" key={item.id}>
								<td>{index + 1}</td>
								<td>{item.employee.division}</td>
								<td>{item.employee.full_name}</td>
								<td>{item.createdAt.split('T')[0]}</td>
								<td>{item.createdAt.split('T')[1].split('.')[0]}</td>
								<td>{item.description}</td>
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
