import { useState, useEffect } from 'react';
import Modal, { openModal, closeModal } from '../../components/ModalProps'; // Assuming closeModal exists
import { Karyawan } from '@/middlewares/api';
import { useNavigate } from 'react-router-dom';

const DataKaryawanPage = () => {
	// State variables for modal inputs
	const [fullName, setFullName] = useState('');
	const [gender, setGender] = useState('');
	const [placeOfBirth, setPlaceOfBirth] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [religion, setReligion] = useState('');
	const [maritalStatus, setMaritalStatus] = useState('');
	const [lastEducation, setLastEducation] = useState('');
	const [certificationYear, setCertificationYear] = useState('');
	const [isEducated, setIsEducated] = useState('');
	const [major, setMajor] = useState('');
	const [employeeStatus, setEmployeeStatus] = useState('');
	const [startDate, setStartDate] = useState('');
	const [position, setPosition] = useState('');
	const [isTeacher, setIsTeacher] = useState('');
	const [task, setTask] = useState('');
	const [jobDescription, setJobDescription] = useState('');
	const [grade, setGrade] = useState('');
	const [email, setEmail] = useState('');

	// Additional states
	const [search, setSearch] = useState('');
	const [dataKaryawan, setDataKaryawan] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const [itemsPerPage] = useState(20);
	const navigate = useNavigate();

	const handleDialog = () => {
		openModal('addKaryawan');
	};

	const fetchData = async () => {
		try {
			const response = await Karyawan.DataKaryawan(currentPage, itemsPerPage, search);
			setDataKaryawan(response.data.data.result);
			setTotalPages(response.data.data.totalPages);
			setPage(response.data.data.page);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCreateKaryawan = async (event: React.FormEvent) => {
		event.preventDefault();

		// Creating the data object from state variables
		const data = {
			full_name: fullName,
			gender: gender,
			pob: placeOfBirth,
			dob: dateOfBirth,
			religion: religion,
			marital_status: maritalStatus,
			last_education: lastEducation,
			certificate_year: certificationYear,
			is_education: isEducated,
			major: major,
			employee_status: employeeStatus,
			work_start_date: startDate,
			occupation: position,
			is_teacher: isTeacher,
			duty: task,
			job_desc: jobDescription,
			grade: grade,
			email: email,
		};

		try {
			await Karyawan.TambahKaryawan(data);
			fetchData();
			closeModal('addKaryawan'); // Close the modal after successful creation
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [search, currentPage]);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleAction = (action: string, itemId: number) => {
		console.log(`${action} item with id ${itemId}`);
	};

	const detailProfil = (id: number) => {
		navigate(`/hrd/data-karyawan/${id}`);
	};

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">Data Karyawan</h3>
				<label className="input input-sm input-bordered flex items-center gap-2">
					<input type="text" className="grow" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
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

			<div className="mt-6 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<button className="btn btn-outline btn-info btn-xs">
						Semua <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Dibuka <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Ditutup <span>25</span>
					</button>
				</div>

				<div className="flex items-center gap-2">
					<button className="btn btn-xs" onClick={handleDialog}>
						<span>+</span> Tambah
					</button>
					<select className="select select-bordered select-xs w-full max-w-xs">
						<option disabled selected>
							Filter
						</option>
						<option>Tiny Apple</option>
						<option>Tiny Orange</option>
						<option>Tiny Tomato</option>
					</select>
				</div>
			</div>

			<div className="q-mt card mt-5 w-full bg-base-100 shadow-xl">
				<div className="card-body">
					<table className="table table-zebra">
						<thead>
							<tr>
								<th className="text-xs">No</th>
								<th className="text-xs">Nama</th>
								<th className="flex">Posisi</th>
								<th className="text-xs">Jabatan</th>
								<th className="text-xs">Status</th>
								<th className="text-xs">Action</th>
							</tr>
						</thead>
						<tbody>
							{dataKaryawan.map((item, index) => (
								<tr key={index}>
									<td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
									<td className="px-4 py-2">{item.full_name}</td>
									<td className="px-4 py-2">
										<span className="rounded-md bg-[#DBEAFF] p-2 text-xs font-semibold text-gray-500">
											{item.occupation}
										</span>
									</td>
									<td className="px-4 py-2">{item.major ? item.major : '-'}</td>
									<td className="px-4 py-2">{item.employee_status}</td>
									<td className="relative px-4 py-2">
										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="btn btn-ghost btn-xs">
												...
											</label>
											<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
												<li>
													<a onClick={() => detailProfil(item.id)}>Edit Profil</a>
												</li>
												<li>
													<a onClick={() => handleAction('Delete', item.id)}>Hapus Karyawan</a>
												</li>
											</ul>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Pagination */}
			<div className="mt-5 flex items-center justify-center">
				<div className="join">
					<button
						className="btn join-item btn-sm"
						disabled={currentPage === 1}
						onClick={() => handlePageChange(currentPage - 1)}
					>
						«
					</button>
					<button className="btn join-item btn-sm">Page {page}</button>
					<button
						className="btn join-item btn-sm"
						disabled={currentPage === totalPages}
						onClick={() => handlePageChange(currentPage + 1)}
					>
						»
					</button>
				</div>
			</div>

			<Modal id="addKaryawan">
				<div>
					<h2 className="mb-4 text-xl font-bold">Tambah Penerimaan Baru</h2>
					<form onSubmit={handleCreateKaryawan}>
						<div className="mb-4 gap-4">
							<div>
								<label className="mb-1 block text-sm font-medium">Nama Lengkap</label>
								<input
									type="text"
									className="w-full rounded border border-gray-300 p-2"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Jenis Kelamin</label>
								<select
									className="w-full rounded border border-gray-300 p-2"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									required
								>
									<option value="" disabled>
										-Pilih-
									</option>
									<option value="Male">Pria</option>
									<option value="Female">Wanita</option>
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Tempat Lahir</label>
								<input
									type="text"
									className="w-full rounded border border-gray-300 p-2"
									value={placeOfBirth}
									onChange={(e) => setPlaceOfBirth(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Tanggal Lahir</label>
								<input
									type="date"
									className="w-full rounded border border-gray-300 p-2"
									value={dateOfBirth}
									onChange={(e) => setDateOfBirth(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Agama</label>
								<input
									type="text"
									className="w-full rounded border border-gray-300 p-2"
									value={religion}
									onChange={(e) => setReligion(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Status Pernikahan</label>
								<select
									className="w-full rounded border border-gray-300 p-2"
									value={maritalStatus}
									onChange={(e) => setMaritalStatus(e.target.value)}
									required
								>
									<option value="" disabled>
										-Pilih-
									</option>
									<option value="Single">Lajang</option>
									<option value="Married">Menikah</option>
									<option value="Divorced">Cerai</option>
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Pendidikan Terakhir</label>
								<input
									type="text"
									className="w-full rounded border border-gray-300 p-2"
									value={lastEducation}
									onChange={(e) => setLastEducation(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Tahun Sertifikat</label>
								<input
									type="number"
									className="w-full rounded border border-gray-300 p-2"
									value={certificationYear}
									onChange={(e) => setCertificationYear(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Apakah Pendidikan?</label>
								<select
									className="w-full rounded border border-gray-300 p-2"
									value={isEducated}
									onChange={(e) => setIsEducated(e.target.value)}
									required
								>
									<option value="" disabled>
										-Pilih-
									</option>
									<option value="Yes">Ya</option>
									<option value="No">Tidak</option>
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Jurusan</label>
								<input
									type="text"
									className="w-full rounded border border-gray-300 p-2"
									value={major}
									onChange={(e) => setMajor(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Status Karyawan</label>
								<select
									className="w-full rounded border border-gray-300 p-2"
									value={employeeStatus}
									onChange={(e) => setEmployeeStatus(e.target.value)}
									required
								>
									<option value="" disabled>
										-Pilih-
									</option>
									<option value="Full-time">Full-time</option>
									<option value="Part-time">Part-time</option>
									<option value="Contract">Kontrak</option>
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Tanggal Mulai</label>
								<input
									type="date"
									className="w-full rounded border border-gray-300 p-2"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Jabatan</label>
								<input
									type="text"
									className="w-full rounded border border-gray-300 p-2"
									value={position}
									onChange={(e) => setPosition(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Apakah Guru?</label>
								<select
									className="w-full rounded border border-gray-300 p-2"
									value={isTeacher}
									onChange={(e) => setIsTeacher(e.target.value)}
									required
								>
									<option value="" disabled>
										-Pilih-
									</option>
									<option value="Yes">Ya</option>
									<option value="No">Tidak</option>
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Tugas</label>
								<input
									type="text"
									className="w-full rounded border border-gray-300 p-2"
									value={task}
									onChange={(e) => setTask(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Deskripsi Pekerjaan</label>
								<input
									type="text"
									className="w-full rounded border border-gray-300 p-2"
									value={jobDescription}
									onChange={(e) => setJobDescription(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Grade</label>
								<input
									type="text"
									className="w-full rounded border border-gray-300 p-2"
									value={grade}
									onChange={(e) => setGrade(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium">Email</label>
								<input
									type="email"
									className="w-full rounded border border-gray-300 p-2"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<div className="mt-4">
								<button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
									Simpan
								</button>
							</div>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default DataKaryawanPage;
