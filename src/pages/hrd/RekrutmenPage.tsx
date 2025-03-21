import { useEffect, useState } from 'react';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { useNavigate } from 'react-router-dom';
import { Rekrutmen } from '@/middlewares/api';
import Swal from 'sweetalert2';

function formatDateRange(startDate: any, endDate: any) {
	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

	const start = new Date(startDate).toLocaleDateString('id-ID', options);
	const end = new Date(endDate).toLocaleDateString('id-ID', options);

	const startDateObj = new Date(startDate);
	const endDateObj = new Date(endDate);

	if (startDateObj.getMonth() === endDateObj.getMonth() && startDateObj.getFullYear() === endDateObj.getFullYear()) {
		return `${startDateObj.getDate()} - ${end}`;
	}

	return `${start} - ${end}`;
}

const RekrutmenPage = () => {
	const [dataRekrutmen, setDataRekrutmen] = useState<any[]>([]);
	const [dropdownDivision, setDropdownDivision] = useState<any[]>([]);
	const [search, setSearch] = useState('');
	const [divisionId, setDivisionId] = useState('');
	const navigate = useNavigate();
	const handleDialog = () => {
		openModal('addRekrutmen');
	};
	const [titleRekrutmen, setTitleRekrutmen] = useState('');
	const [role, setRole] = useState('');
	const [division, setDivision] = useState<number>(0);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	// const [maxApplicant, setMaxApplicant] = useState<number>();
	const [academic, setAcademic] = useState('');
	// const [note, setNote] = useState('');
	const [fulltime, setFulltime] = useState<boolean>(false);
	const [statusCards, setStatusCards] = useState([{ title: '', description: '' }]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [itemsPerPage] = useState(20);
	const [isActive, setIsActive] = useState('1');

	const addStatusCards = () => {
		setStatusCards([...statusCards, { title: '', description: '' }]);
	};

	const handleStatusChange = (index: number, field: string, value: string) => {
		const updatedCards = statusCards.map((card, i) => (i === index ? { ...card, [field]: value } : card));
		setStatusCards(updatedCards);
	};

	const fetchData = async () => {
		try {
			const response = await Rekrutmen.DataRekrutmen(
				currentPage - 1,
				itemsPerPage,
				search,
				divisionId,
				access_token,
				'',
				isActive
			);
			setDataRekrutmen(response.data.data.result);
			setTotalPages(response.data.data.totalPage);
			const responseDropdownDivison = await Rekrutmen.DropdownDivision(access_token);
			setDropdownDivision(responseDropdownDivison.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const PostRekrutmen = async () => {
		const statusData = statusCards.map((card) => ({
			title: card.title,
			description: card.description,
		}));

		const data = {
			title: titleRekrutmen,
			role: role,
			division_id: division,
			start_date: startDate,
			end_date: endDate,
			// max_applicant: maxApplicant,
			min_academic: academic,
			// notes: note,
			details: statusData,
			is_fulltime: fulltime,
		};
		try {
			await Rekrutmen.AddRekrutmen(data, access_token);
			fetchData();
			closeModal('addRekrutmen');
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Sukses Menambahkan data Rekrutmen',
			});
		} catch (error: any) {
			console.error(error);
			closeModal('addRekrutmen');
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const trigerClose = (id: number) => {
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
				CloseRekrutmen(id);
			}
		});
	};

	const CloseRekrutmen = async (id: any) => {
		try {
			await Rekrutmen.CloseRekrutment(id);
			fetchData();
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Penerimaan berhasil ditutup',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: message,
			});
		}
	};

	const divisionMap = dropdownDivision.reduce(
		(map, division) => {
			map[division.id] = division.name;
			return map;
		},
		{} as Record<number, string>
	);

	useEffect(() => {
		fetchData();
	}, [search, divisionId, isActive, currentPage]);

	const handleCardClick = (id: number, title: string, subtitle: string) => {
		navigate(`/hrd/rekrutmen/${id}`);
		localStorage.setItem('title', title);
		localStorage.setItem('subtitle', subtitle);
	};

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	return (
		<div className="h-screen">
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">Rekrutmen</h3>
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

			<div className="mt-6 flex flex-wrap items-center justify-between gap-2">
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
					<label className="label cursor-pointer">
						<input
							type="checkbox"
							defaultChecked
							className="checkbox"
							onChange={(e) => setIsActive(e.target.checked == true ? '1' : '')}
						/>
					</label>
					<button className="btn btn-xs" onClick={handleDialog}>
						<span>+</span> Tambah
					</button>
					<select
						className="select select-bordered select-xs w-full max-w-xs"
						onChange={(e) => setDivisionId(e.target.value)}
					>
						<option disabled selected>
							Filter
						</option>
						{dropdownDivision.map((item, index) => (
							<option value={item.id} key={index}>
								{item.name}
							</option>
						))}
					</select>
				</div>
			</div>
			{dataRekrutmen.map((item, index) => (
				<div className="card mt-5 w-full bg-base-100 shadow-xl" key={index}>
					<div className="card-body">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<div
								onClick={() => handleCardClick(item.id, item.title, divisionMap[item.division_id])}
								className="cursor-pointer"
							>
								<div className="text-sm font-bold">{item.title}</div>
								<p className="text-xs">Dibuat {item.createdAt.split('T')[0]}</p>
							</div>
							<div>
								<div className="text-xs">Divisi</div>
								<div className="badge badge-primary text-xs">{divisionMap[item.division_id]}</div>
							</div>
							<div className="flex items-center gap-2">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BFDCFE]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="#416AC0"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
										/>
									</svg>
								</div>

								<div>
									<div className="text-xs">Tanggal Penerimaan</div>
									<div className="text-xs font-bold">{formatDateRange(item.start_date, item.end_date)} </div>
								</div>
							</div>

							{/* <div>
								<div className="text-xs">Pendaftar</div>
								<div>
									<div className="avatar-group -space-x-3 rtl:space-x-reverse">
										<div className="avatar">
											<div className="w-6">
												<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
											</div>
										</div>
										<div className="avatar">
											<div className="w-6">
												<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
											</div>
										</div>
										<div className="avatar">
											<div className="w-6">
												<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
											</div>
										</div>
										<div className="avatar placeholder">
											<div className="w-6 bg-neutral text-xs text-neutral-content">
												<span>+99</span>
											</div>
										</div>
									</div>
								</div>
							</div> */}

							{/* <div className="flex items-center gap-2">
								<div
									className="radial-progress text-xs text-primary"
									style={
										{
											'--value': Math.floor((item.applicant_count / item.max_applicant) * 100),
											'--size': '3rem',
										} as React.CSSProperties
									}
									role="progressbar"
								>
									{Math.floor((item.applicant_count / item.max_applicant) * 100)}%
								</div>
								<div className="text-xs">
									<span className="font-bold">{item.applicant_count}</span>/{item.max_applicant} Pendaftar
								</div>
							</div> */}

							<div>
								<div className="text-xs">Status Penerimaan</div>
								<div className="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
									<div className="text-sm text-primary"> {item.is_open == true ? 'Dibuka' : 'Ditutup'}</div>
								</div>
							</div>

							<div className="dropdown dropdown-end">
								<div tabIndex={0} role="button" className="btn btn-outline btn-xs m-1 h-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="#6A6B6B"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
										/>
									</svg>
								</div>
								<ul tabIndex={0} className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
									<div className="px-4 py-2 text-center text-gray-500">
										Rubah Status
										<div className="mt-1 h-[1px] w-full bg-gray-300"></div>
									</div>
									<li>
										<div className="flex items-center p-2">
											<div className="rounded-full bg-yellow-500 p-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													className="h-2 w-2 rounded-full bg-white"
												>
													<circle cx="12" cy="12" r="10" />
												</svg>
											</div>
											<span className="ml-2 font-semibold" onClick={() => trigerClose(item.id)}>
												Tutup Penerimaan
											</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			))}

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
					<button className="btn join-item btn-sm">Page {currentPage}</button>
					<button
						className="btn join-item btn-sm"
						disabled={currentPage === totalPages}
						onClick={() => handlePageChange(currentPage + 1)}
					>
						»
					</button>
				</div>
			</div>

			<Modal id="addRekrutmen">
				<div className="p-6">
					<h2 className="mb-4 text-center text-2xl font-bold text-gray-800">Tambah Penerimaan Baru</h2>
					<div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Judul Rekrutmen</label>
							<input
								type="text"
								className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
								placeholder="Masukkan judul rekrutmen"
								onChange={(e) => setTitleRekrutmen(e.target.value)}
							/>
						</div>
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
							<select
								className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
								onChange={(e) => setRole(e.target.value)}
							>
								<option value="">-Pilih-</option>
								<option value="KARYAWAN">Karyawan</option>
								<option value="GURU">Guru</option>
							</select>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Divisi</label>
							<select
								className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
								value={division}
								onChange={(e) => setDivision(parseInt(e.target.value))}
							>
								<option value="0" disabled>
									-Pilih-
								</option>
								{dropdownDivision.map((item, index) => (
									<option value={item.id} key={index}>
										{item.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Tanggal Mulai</label>
							<input
								type="date"
								className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								required
							/>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Tanggal Akhir</label>
							<input
								type="date"
								className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								required
							/>
						</div>

						{/* <div>
							<label className="mb-1 block text-sm font-medium text-gray-700">Pendaftar yang Dibutuhkan</label>
							<input
								type="number"
								className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
								placeholder="Masukkan jumlah pendaftar"
								onChange={(e) => setMaxApplicant(parseInt(e.target.value))}
							/>
						</div> */}

						<div className="col-span-2">
							<label className="mb-1 block text-sm font-medium text-gray-700">Jenjang Pendidikan</label>
							<select
								className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
								value={academic}
								onChange={(e) => setAcademic(e.target.value)}
							>
								<option value="" disabled>
									-Pilih-
								</option>
								<option value="SMP">SMP</option>
								<option value="SMA/SMK">SMA/SMK</option>
								<option value="S1">S1</option>
								<option value="S2">S2</option>
								<option value="S3">S3</option>
							</select>
						</div>

						<div className="col-span-2 my-2 flex items-center gap-2">
							<div className="text-sm text-gray-700">Apakah Full Time?</div>
							<input type="checkbox" className="checkbox" onChange={(e) => setFulltime(e.target.checked)} />
						</div>

						{/* <div className="col-span-2">
							<label className="mb-1 block text-sm font-medium text-gray-700">Note</label>
							<textarea
								className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
								rows={4}
								placeholder="Masukkan catatan tambahan"
								onChange={(e) => setNote(e.target.value)}
							></textarea>
						</div> */}

						<div className="text-xl font-bold">Kelengkapan Rekrutmen</div>

						{statusCards.map((card, index) => (
							<div key={index} className="col-span-2">
								<div className="mb-4">
									<label className="mb-1 block text-sm font-medium text-gray-700">Kualifikasi</label>
									<input
										type="text"
										className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
										value={card.title}
										onChange={(e) => handleStatusChange(index, 'title', e.target.value)}
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi</label>
									<textarea
										className="w-full rounded-lg border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
										rows={4}
										value={card.description}
										onChange={(e) => handleStatusChange(index, 'description', e.target.value)}
									></textarea>
								</div>
							</div>
						))}

						<div className="col-span-2 flex justify-end">
							<button
								className="btn btn-primary btn-xs flex h-12 w-12 items-center justify-center rounded-full p-0"
								onClick={addStatusCards}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-3 w-3"
								>
									<line x1="12" y1="5" x2="12" y2="19" />
									<line x1="5" y1="12" x2="19" y2="12" />
								</svg>
							</button>
						</div>

						<div className="col-span-2 mt-4 flex justify-end">
							<button type="submit" className="btn btn-primary" onClick={PostRekrutmen}>
								Tambah
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default RekrutmenPage;
