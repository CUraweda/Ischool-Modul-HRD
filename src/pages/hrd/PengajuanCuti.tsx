import React, { useEffect, useState } from 'react';
import { getVacation, createVacation, updateVacation, deleteVacation } from '@/middlewares/api/hrd';
import DetailCard from '@/components/DetailCard';
import { MdOutlineEventNote } from 'react-icons/md';
import Swal from 'sweetalert2';
interface CutiData {
	id: number;
	data: {
		nama: string;
		tipe: string;
		tanggal: string;
		deskripsi: string;
		status: string;
		catatan: {
			image: any;
			hari: string;
			jam: string;
		};
	};
}

const TestCuti: CutiData[] = [
	{
		id: 1,
		data: {
			nama: 'Douglas Williams',
			tipe: 'Cuti Lainnya',
			tanggal: '2024-03-22',
			deskripsi: 'Executive walk standard store media experience civil.',
			status: 'Menunggu Persetujuan',
			catatan: {
				image: 'https://dummyimage.com/12x250',
				hari: 'Selasa',
				jam: '19:38:32',
			},
		},
	},
	{
		id: 2,
		data: {
			nama: 'Lori Quinn',
			tipe: 'Cuti Bersalin',
			tanggal: '2024-05-28',
			deskripsi: 'Action medical response culture fish.',
			status: 'Disetujui',
			catatan: {
				image: 'https://dummyimage.com/83x181',
				hari: 'Jumat',
				jam: '04:00:42',
			},
		},
	},
	{
		id: 3,
		data: {
			nama: 'Deborah Smith',
			tipe: 'Cuti Lainnya',
			tanggal: '2024-03-04',
			deskripsi: 'Other front alone mission occur purpose recent.',
			status: 'Menunggu Persetujuan',
			catatan: {
				image: 'https://dummyimage.com/83x181',
				hari: 'Jumat',
				jam: '10:47:41',
			},
		},
	},
];

const pengajuanCutiPage: React.FC<{}> = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [filterDate, setFilterDate] = useState<string>('');
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const filteredData = TestCuti.filter(
		(item) =>
			(item.data.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.data.tipe.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.data.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())) &&
			(filterDate === '' || item.data.tanggal === filterDate)
	);

	// const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 5;

	// useEffect(() => {
	// 	setCurrentPage(1);
	// }, [searchQuery, filterDate]);
	// const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
		pageNumbers.push(i);
	}
	const [dataVacation, setDataVacation] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [totalRows, setTotalRows] = useState(1);
	const [limit, setLimit] = useState<number>(10);

	const getAllVacation = async () => {
		const response = await getVacation(0, limit, searchQuery);
		setDataVacation(response.data.data.result);
		setTotalPages(response.data.data.totalPage);
		setTotalRows(response.data.data.totalRows);
		console.log(response.data.data);
	};
	const filterData = dataVacation.filter((item) => (filterDate ? item.createdAt.split('T')[0] === filterDate : true));

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(0);
	};

	useEffect(() => {
		getAllVacation();
	}, []);

	useEffect(() => {
		getAllVacation();
	}, [searchQuery, limit]);

	const handleDetailClose = () => {
		setSelectedItem(null);
	};

	const handleOpenDetailModal = (item: any) => {
		setSelectedItem(item);
	};

	const updateStatus = async (id: number, status: string) => {
		try {
			await updateVacation(id, { status });
			getAllVacation();
		} catch (error) {
			console.error('Error updating status:', error);
		}
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
	return (
		<div className="w-full p-2">
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
				<button className="text-md badge btn badge-md btn-xs my-5 h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm">
					Semua
					<div className="pl-5">{totalRows}</div>
				</button>
				<div className="my-auto flex gap-4">
					<label className="text-md input input-xs input-bordered my-auto flex w-fit items-center gap-2 rounded-full">
						<input
							type="date"
							className="grow"
							value={filterDate}
							onChange={(e) => setFilterDate(e.target.value)}
							placeholder="Search"
						/>
					</label>
				</div>
			</div>
			<div className="card h-fit w-full overflow-x-auto bg-base-100 p-5 pb-28 shadow-xl">
				<table className="text-md table">
					<thead>
						<tr className="text-center font-bold">
							<th>No</th>
							<th>Nama</th>
							<th>Tipe</th>
							<th>Tanggal</th>
							<th>Deskripsi</th>
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
								<td>
									<div
										className={`text-md badge badge-md h-fit rounded-md px-3 drop-shadow-sm ${
											// item.data.tipe === 'Izin'
											'bg-[#8ef96ac2] text-[#3d6b2e]'
											// : item.data.tipe === 'Cuti'
											// ? 'bg-[#f96a6a] text-[#6b2e2e]'
											// : ''
										}`}
									>
										{item.type}
									</div>
								</td>
								<td>{item.start_date.split('T')[0]}</td>
								<td>{item.description}</td>
								<td>
									<div
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
									</div>
								</td>
								<td className="text-center">
									<button className="btn btn-square btn-ghost" onClick={() => handleOpenDetailModal(item)}>
										<MdOutlineEventNote className="text-lg" />
									</button>
								</td>
								<td className="text-center">
									<div className="dropdown dropdown-end flex-none">
										<div className="dropdown dropdown-left">
											<button tabIndex={0} role="button" className="btn btn-square">
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
													className="btn btn-ghost flex w-full justify-between"
													onClick={() => handleChangeStatus('disetujui', item)}
												>
													<div className="h-4 w-4 rounded-full border-2 border-green-400 bg-transparent"></div>
													<div>Setujui Permintaan</div>
												</button>
												<button
													className="btn btn-ghost flex w-full justify-between"
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
