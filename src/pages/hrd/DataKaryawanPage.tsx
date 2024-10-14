import { useState, useEffect } from 'react';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { Karyawan } from '@/middlewares/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
	const [email, setEmail] = useState('');

	// Additional states
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState('');
	const [dataKaryawan, setDataKaryawan] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const [itemsPerPage] = useState(20);
	const navigate = useNavigate();

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const handleDialog = () => {
		openModal('addKaryawan');
	};

	const fetchData = async () => {
		try {
			const response = await Karyawan.DataKaryawan(currentPage, itemsPerPage, search, status, access_token);
			setDataKaryawan(response.data.data.result);
			setTotalPages(response.data.data.totalPage - 1);
			setPage(response.data.data.page);
		} catch (error) {
			console.error(error);
		}
	};

	const trigerDelete = (id: number) => {
		Swal.fire({
			title: 'Apakah kamu yakin?',
			text: 'kamu tidak dapat mengembalikan data ini!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, tutup!',
		}).then((result) => {
			if (result.isConfirmed) {
				DeleteKaryawan(id);
			}
		});
	};

	const DeleteKaryawan = async (id: any) => {
		try {
			await Karyawan.HapusKaryawan(id);
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Karyawan berhasil dihapus',
			});
			fetchData();
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const handleCreateKaryawan = async (event: React.FormEvent) => {
		event.preventDefault();

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
			email: email,
		};

		try {
			await Karyawan.TambahKaryawan(data);
			fetchData();
			closeModal('addKaryawan');
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Karyawan berhasil ditambahkan',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	useEffect(() => {
		fetchData();
	}, [search, currentPage, status]);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		console.log(currentPage);
		console.log(totalPages);
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
					{/* <button className="btn btn-outline btn-info btn-xs">
						Semua <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Dibuka <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Ditutup <span>25</span>
					</button> */}
				</div>

				<div className="flex items-center gap-2">
					<button className="btn btn-xs" onClick={handleDialog}>
						<span>+</span> Tambah
					</button>
					<select
						className="select select-bordered select-xs w-full max-w-xs"
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="" selected>
							Filter
						</option>
						<option>Probation</option>
						<option>Kontrak</option>
						<option>Tetap</option>
					</select>
				</div>
			</div>

			<div className="q-mt card mt-5 w-full bg-base-100 shadow-xl">
				<div className="card-body overflow-auto">
					<table className="table table-zebra mb-14 h-full">
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
										<div className="rounded-md bg-[#DBEAFF] p-2 text-center text-xs font-semibold text-gray-500">
											{item.occupation}
										</div>
									</td>
									<td className="px-4 py-2">{item.major ? item.major : '-'}</td>
									<td className="px-4 py-2">{item.employee_status}</td>
									<td className="relative px-4 py-2">
										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="btn btn-primary btn-sm">
												...
											</label>
											<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
												<li>
													<a onClick={() => detailProfil(item.id)}>Edit Profil</a>
												</li>
												<li>
													<a onClick={() => trigerDelete(item.id)}>Hapus Karyawan</a>
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
				<div className="mx-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
					<h2 className="mb-6 text-center text-2xl font-bold text-gray-700">Tambah Penerimaan Baru</h2>
					<form onSubmit={handleCreateKaryawan}>
						<div className="space-y-6">
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Nama Lengkap</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
										placeholder="Masukkan nama lengkap"
										required
									/>
								</div>

								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Jenis Kelamin</label>
									<select
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
							</div>

							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Tempat Lahir</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={placeOfBirth}
										onChange={(e) => setPlaceOfBirth(e.target.value)}
										placeholder="Masukkan tempat lahir"
										required
									/>
								</div>

								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Tanggal Lahir</label>
									<input
										type="date"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={dateOfBirth}
										onChange={(e) => setDateOfBirth(e.target.value)}
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Agama</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={religion}
										onChange={(e) => setReligion(e.target.value)}
										placeholder="Masukkan agama"
										required
									/>
								</div>

								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Status Pernikahan</label>
									<select
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
							</div>

							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Pendidikan Terakhir</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={lastEducation}
										onChange={(e) => setLastEducation(e.target.value)}
										placeholder="Masukkan pendidikan terakhir"
										required
									/>
								</div>

								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Tahun Sertifikat</label>
									<input
										type="number"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={certificationYear}
										onChange={(e) => setCertificationYear(e.target.value)}
										placeholder="Masukkan tahun sertifikat"
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Apakah Pendidikan?</label>
									<select
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
									<label className="mb-1 block text-sm font-medium text-gray-600">Jurusan</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={major}
										onChange={(e) => setMajor(e.target.value)}
										placeholder="Masukkan jurusan"
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Status Karyawan</label>
									<select
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={employeeStatus}
										onChange={(e) => setEmployeeStatus(e.target.value)}
										required
									>
										<option value="" disabled>
											-Pilih-
										</option>
										<option value="Tetap">Tetap</option>
										<option value="Probation">Probation</option>
										<option value="Contract">Kontrak</option>
									</select>
								</div>

								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Tanggal Mulai</label>
									<input
										type="date"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Jabatan</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										onChange={(e) => setPosition(e.target.value)}
										placeholder="Masukkan jabatan"
										required
									/>
								</div>

								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Tugas</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										onChange={(e) => setTask(e.target.value)}
										placeholder="Masukkan Tugas"
										required
									/>
								</div>

								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Deskripsi Pekerjaan</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										onChange={(e) => setJobDescription(e.target.value)}
										placeholder="Masukkan deskripsi Pekerjaan"
										required
									/>
								</div>

								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Email</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Masukkan jabatan"
										required
									/>
								</div>

								<div>
									<label className="mb-1 block text-sm font-medium text-gray-600">Apakah Guru?</label>
									<select
										className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
							</div>
						</div>

						<div className="mt-6">
							<button
								type="submit"
								className="w-full rounded-lg bg-blue-500 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
							>
								Tambah Karyawan
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default DataKaryawanPage;
