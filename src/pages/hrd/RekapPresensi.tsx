import React, { useEffect, useState } from 'react';
import TimeEntryDialog from '@/components/TimeDialog';

interface RekapPresensiData {
	id: number;
	divisi: string;
	nama: string;
	tanggal: string;
	keterangan: string;
	pukul: string;
	status: string; // Status (misalnya, 'Disetujui', 'Tidak Disetujui', dll.)
	tipe: string;
}

const contohData: RekapPresensiData[] = [
	{
		id: 1,
		divisi: 'IT',
		nama: 'John Doe',
		tanggal: '2024-08-10',
		keterangan: 'Cuti tahunan',
		pukul: '09:00',
		status: 'Disetujui',
		tipe: 'Cuti',
	},
	{
		id: 2,
		divisi: 'HR',
		nama: 'Jane Smith',
		tanggal: '2024-08-12',
		keterangan: 'Izin sakit',
		pukul: '10:00',
		status: 'Menunggu',
		tipe: 'Izin',
	},
];
const PresensiPage: React.FC<{}> = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [filterDate, setFilterDate] = useState<string>('');

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

	const [dialogTime, setDialogTime] = useState(false);
	const handleOpenDialogTime = () => {
		setDialogTime(true);
	};
	const handleCloseDialogTime = () => {
		setDialogTime(false);
	};
	const handleSaveTime = (jamMasuk: string, jamKeluar: string) => {
		// Logika untuk menyimpan jam masuk dan keluar
		console.log(`Jam Masuk: ${jamMasuk}, Jam Keluar: ${jamKeluar}`);
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
						<div className="pl-5">{filteredData.length}</div>
					</button>{' '}
					<button
						className="text-md badge btn badge-md btn-xs my-5 h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm"
						onClick={handleOpenDialogTime}
					>
						Set Jam Masuk dan Keluar
					</button>
				</div>
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
						{currentItems.map((item, index) => (
							<tr className="hover" key={item.id}>
								<td>{indexOfFirstItem + index + 1}</td>
								<td>{item.divisi}</td>
								<td>{item.nama}</td>
								<td>{item.tanggal}</td>
								<td>{item.pukul}</td>
								<td>{item.keterangan}</td>
								<td>
									<div
										className={`text-md badge badge-md h-fit truncate rounded-md px-3 drop-shadow-sm ${
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
			{dialogTime && <TimeEntryDialog isOpen={dialogTime} onClose={handleCloseDialogTime} onSave={handleSaveTime} />}
		</div>
	);
};

export default PresensiPage;
