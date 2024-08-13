import React, { useEffect, useState } from 'react';
import DetailCard from '@/components/DetailCard';
import ConfirmationDialog from '@/components/AlertConfirm';
import { TbFaceId } from 'react-icons/tb';

// Interface untuk data table
interface DinasLuarData {
	id: number;
	divisi: string;
	nama: string;
	tanggal: string;
	jam: string;
	tipe: string; // Tipe (misalnya, 'Izin', 'Cuti', dll.)
	status: string; // Status (misalnya, 'Disetujui', 'Tidak Disetujui', dll.)
	keterangan: string;
	buktiDinas: string;
}

// Contoh data
const contohData: DinasLuarData[] = [
	{
		id: 1,
		divisi: 'IT',
		nama: 'John Doe',
		tanggal: '2024-08-10',
		jam: '09:00',
		tipe: 'Cuti',
		status: 'Disetujui',
		keterangan: 'Cuti tahunan',
		buktiDinas: 'https://example.com/bukti-dinas.jpg',
	},
	{
		id: 2,
		divisi: 'HR',
		nama: 'Jane Smith',
		tanggal: '2024-08-12',
		jam: '10:00',
		tipe: 'Izin',
		status: 'Menunggu',
		keterangan: 'Izin sakit',
		buktiDinas: 'https://example.com/bukti-dinas2.jpg',
	},
];

const DinasLuarPage: React.FC<{}> = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [filterDate, setFilterDate] = useState<string>('');
	const [selectedItem, setSelectedItem] = useState<DinasLuarData | null>(null);

	const filteredData = contohData.filter(
		(item) =>
			(item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.tipe.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.keterangan.toLowerCase().includes(searchQuery.toLowerCase())) &&
			(filterDate === '' || item.tanggal === filterDate)
	);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 5;

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, filterDate]);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleDetailClose = () => {
		setSelectedItem(null);
	};

	const handleOpenDetailModal = (item: DinasLuarData) => {
		setSelectedItem(item);
	};

	// const handleOpenDialog = () => {
	// 	setIsDialogOpen(true);
	// };

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	const handleConfirm = () => {
		// Handle the confirm action here
		console.log('Confirmed');
		handleCloseDialog();
	};

	const handleCancel = () => {
		// Handle the cancel action here
		console.log('Cancelled');
		handleCloseDialog();
	};
	return (
		<div className="w-full p-2">
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
				<button className="text-md badge btn badge-md btn-xs my-5 h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm">
					Semua
					<div className="pl-5">{filteredData.length}</div>
				</button>
				<div className="my-auto flex gap-4">
					<label className="text-md input input-sm input-bordered my-auto flex w-fit items-center gap-2 rounded-full">
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
						{currentItems.map((item, index) => (
							<tr className="hover" key={item.id}>
								<td>{indexOfFirstItem + index + 1}</td>
								<td>{item.divisi}</td>
								<td>{item.nama}</td>
								<td>{item.tanggal}</td>
								<td>{item.jam}</td>
								<td>
									<div
										className={`text-md badge badge-md h-fit rounded-md px-3 drop-shadow-sm ${
											item.tipe === 'Izin'
												? 'bg-[#8ef96ac2] text-[#3d6b2e]'
												: item.tipe === 'Cuti'
													? 'bg-[#f96a6a] text-[#6b2e2e]'
													: ''
										}`}
									>
										{item.tipe}
									</div>
								</td>
								<td>{item.keterangan}</td>
								<td>
									<div
										className={`text-md badge badge-md h-fit rounded-md px-3 drop-shadow-sm ${
											item.status === 'Disetujui'
												? 'bg-[#8ef96ac2] text-[#3d6b2e]'
												: item.status === 'Tidak Disetujui'
													? 'bg-[#f96a6a] text-[#6b2e2e]'
													: item.status === 'Menunggu'
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

			<div className="my-5 flex justify-center">
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
			</div>

			{selectedItem && (
				<DetailCard
					id="detail-modal"
					onClose={handleDetailClose}
					title="Detail Catatan"
					nama={selectedItem.nama}
					image={''}
					deskripsi={selectedItem.keterangan}
					status={selectedItem.status}
					tanggal={selectedItem.tanggal}
				/>
			)}

			{isDialogOpen && (
				<ConfirmationDialog
					id="confirmation-dialog"
					title="Apakah Anda yakin?"
					message="Data yang Anda masukkan akan disimpan."
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}
		</div>
	);
};

export default DinasLuarPage;
