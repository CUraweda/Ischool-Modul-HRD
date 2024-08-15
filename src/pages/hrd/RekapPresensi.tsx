import React, { useEffect, useState } from 'react';
import TimeEntryDialog from '@/components/TimeDialog';
import {
	getEmployeeAttendance,
	createEmployeeAttendance,
	updateEmployeeAttendance,
	deleteEmployeeAttendance,
} from '@/middlewares/api/hrd';
import { MdOutlineDelete } from 'react-icons/md';
import CreateAttendance from '../../components/ModalAttendance';
import { LuPencil } from 'react-icons/lu';

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

interface CreateAttendanceInput {
	worktime_id: number;
	employee_id: number;
	uid: string;
	description: string;
	status: string;
	is_outstation: boolean;
}

const PresensiPage: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [filterDate, setFilterDate] = useState<string>('');
	const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [datatoupdate, setDataToUpdate] = useState<any>(null);
	const [typemodal, setTypeModal] = useState<string>('');
	const fetchAttendanceData = async () => {
		try {
			const result = await getEmployeeAttendance(0, 10);
			console.log(result.data.data);
			setAttendanceData(result.data.data.result);
		} catch (error) {
			console.error('Error fetching attendance data:', error);
		}
	};
	const createAttendance = async (input: CreateAttendanceInput) => {
		try {
			const result = await createEmployeeAttendance(input);
			console.log(result);
			fetchAttendanceData();
		} catch (error) {
			console.error('Error creating attendance:', error);
		}
	};

	const updateAttendance = async (id: number, data: CreateAttendanceInput) => {
		try {
			await updateEmployeeAttendance(id, data);
			fetchAttendanceData();
		} catch (error) {
			console.error('Error updating attendance:', error);
		}
	};
	useEffect(() => {
		fetchAttendanceData();
	}, []);

	const [dialogTime, setDialogTime] = useState(false);

	const handleOpenDialogTime = () => setDialogTime(true);
	const handleCloseDialogTime = () => setDialogTime(false);

	const handleSaveTime = (jamMasuk: string, jamKeluar: string) => {
		console.log(`Jam Masuk: ${jamMasuk}, Jam Keluar: ${jamKeluar}`);
	};
	const handleCreate = (props: CreateAttendanceInput) => {
		if (typemodal === 'create') {
			createAttendance(props);
		} else {
			updateAttendance(datatoupdate.id, props);
		}
		setIsModalOpen(false);
	};

	const deleteData = async (id: number) => {
		try {
			await deleteEmployeeAttendance(id);
			fetchAttendanceData();
		} catch (error) {
			console.error('Error deleting attendance:', error);
		}
	};
	const handleOption = (type: string, data: any) => {
		setTypeModal(type);
		if (type === 'update') {
			setDataToUpdate(data);
			setIsModalOpen(true);
		} else if (type === 'create') {
			setDataToUpdate(null);
			setIsModalOpen(true);
		} else if (type === 'delete') {
			deleteData(data.id);
		}
	};
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
						<div className="pl-5">{attendanceData.length}</div>
					</button>

					<button
						className="text-md badge btn badge-md btn-xs my-5 h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm"
						onClick={() => handleOption('create', null)}
					>
						Create Attendance
					</button>
					<button
						className="text-md badge btn badge-md btn-xs my-5 h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm"
						onClick={handleOpenDialogTime}
					>
						Set Jam Masuk dan Keluar
					</button>
				</div>
				<div className="my-auto flex gap-4">
					<label className="text-md input input-xs input-bordered my-auto flex w-fit items-center gap-2 rounded-full">
						<input type="date" className="grow" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
					</label>
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
							<th>Action</th>
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
								<td>
									<div className="flex h-full items-center gap-2">
										<button
											className="btn btn-circle btn-outline btn-primary btn-sm h-full rounded-full"
											onClick={() => handleOption('update', item)}
										>
											<LuPencil className="text-xl" />
										</button>
										<button
											className="btn btn-circle btn-outline btn-primary btn-sm rounded-full"
											onClick={() => handleOption('delete', item)}
										>
											<MdOutlineDelete className="text-xl" />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{dialogTime && <TimeEntryDialog isOpen={dialogTime} onClose={handleCloseDialogTime} onSave={handleSaveTime} />}
			{isModalOpen && (
				<CreateAttendance
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onCreate={handleCreate}
					dataToUpdate={datatoupdate}
				/>
			)}
		</div>
	);
};

export default PresensiPage;
