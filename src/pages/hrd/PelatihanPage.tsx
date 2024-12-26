import React, { useEffect, useState } from 'react';
import { Training } from '@/middlewares/api/hrd';
import { TbFaceId } from 'react-icons/tb';
import * as XLSX from 'xlsx';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FaFileExport } from 'react-icons/fa6';
import Modal, { openModal } from '@/components/ModalProps';
const PelatihanPage: React.FC<{}> = () => {
	const [filterType, setFilterType] = useState<string[]>([]);
	const [filterStatus, setFilterStatus] = useState<any>('');
	const [filterDate, setFilterDate] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [DataAttendance, setDataAttendance] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
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

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const getAllAttendance = async () => {
		try {
			const result = await Training.getAllTraining(currentPage, limit, filterStatus, filterType, searchQuery, '');
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
	const handleOpenDetailModal = (item: any) => {
		setSelectedItem(item);
		openModal('buktiPelatihan');
	};
	return (
		<div className="h-screen w-full p-2">
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
					{/* <button
						className="text-md badge btn badge-md btn-xs h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm"
						onClick={() => showModalHandle('add', null)}
					>
						Tambah Pelatihan
					</button> */}
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
				</div>
			</div>
			<div className="card h-fit w-full overflow-x-auto bg-base-100 p-5 shadow-xl">
				<table className="text-md table mb-8">
					<thead>
						<tr className="text-center font-bold">
							<th>No</th>
							<th>Nama</th>
							<th>Posisi</th>
							<th>Status</th>
							<th>Bukti Pelatihan</th>
							{/* <th>Detail</th> */}
						</tr>
					</thead>
					<tbody>
						{filterData.map((item, index) => (
							<tr className="hover" key={item.id}>
								<td>{index + 1}</td>
								<td>{item.employee?.full_name}</td>
								{/* <td className="text-center">
									<button className="btn btn-ghost" onClick={() => handleOpenDetailModal(item)}>
										<TbFaceId className="text-xl" />
									</button>
								</td> */}
								<td className="text-center">{item?.employee?.occupation}</td>
								<td className="text-center">{item.status}</td>
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
			<Modal id="buktiPelatihan">
				<div>
					<h2 className="text-lg font-semibold text-gray-700">Detail Pelatihan</h2>
					<div className="flex items-center justify-between border-b pb-3"></div>

					<div className="mt-4">
						{/* Gambar */}
						<div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-md bg-gray-100">
							<img
								src={
									selectedItem?.trainingattendances[0]?.img_path
										? `${import.meta.env.VITE_SERVER_HRD_FILE}${selectedItem?.trainingattendances[0]?.img_path}`
										: 'https://ideas.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png'
								}
								alt="Bukti Pelatihan"
								className="h-full w-full object-cover"
							/>
						</div>

						{/* Informasi lainnya */}
						<div className="mt-4 space-y-3">
							<div className="flex items-center justify-between">
								<span className="font-medium text-gray-600">Judul Pelatihan:</span>
								<p className="text-gray-800">{selectedItem?.title}</p>
							</div>
							<div className="flex items-center justify-between">
								<span className="font-medium text-gray-600">Tanggal Mulai:</span>
								<p className="text-gray-800">{selectedItem?.start_date.split('T')[0]}</p>
							</div>
							<div className="flex items-center justify-between">
								<span className="font-medium text-gray-600">Tanggal Berakhir:</span>
								<p className="text-gray-800">{selectedItem?.end_date.split('T')[0]}</p>
							</div>
							<div className="flex items-center justify-between">
								<span className="font-medium text-gray-600">Status:</span>
								<p className="text-gray-800">{selectedItem?.status}</p>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};
export default PelatihanPage;
