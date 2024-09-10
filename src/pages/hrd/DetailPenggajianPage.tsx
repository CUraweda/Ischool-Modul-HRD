import React, { useState, useEffect } from 'react';
import { Penggajian } from '@/middlewares/api/hrd';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
import { getSessionStorageItem } from '@/utils/storageUtils';
const DetailPenggajianPage: React.FC<{}> = () => {
	const Navigate = useNavigate();
	const token = getSessionStorageItem('access_token');
	const [isModalOpen, setModalOpen] = useState(false);
	const [dataPenggajian, setDataPenggajian] = useState<any[]>([]);
	const [detailPenggajian, setDetailPenggajian] = useState<any>(null);
	const [filter, setFilter] = useState({
		totalRows: 0,
		totalPages: 0,
		search: '',
		limit: 0,
	});

	const fetchData = async () => {
		try {
			const res = await Penggajian.getAllAccount(token, '');
			console.log('Response object:', res.data.data.result);
			setDataPenggajian(res.data.data.result);
			setFilter((prev) => ({ ...prev, totalPages: res.data.data.totalPages, totalRows: res.data.data.totalRows }));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	const getOne = async (id: any) => {
		try {
			const res = await Penggajian.getOneAccount(id, token);
			setDetailPenggajian(res.data.data.account);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	const formatSalary = (salary: number) => {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(salary);
	};
	useEffect(() => {
		fetchData();
	}, []);
	const handleEdit = (id: any) => {
		Navigate(`/hrd/rekap-penggajian/${id}`, {state: {id: id}});
	};

	const handleModal = (id: any | null) => {
		getOne(id);
		setModalOpen(!isModalOpen);
	};
	const exportToXLSX = () => {
		const formattedData = dataPenggajian.map((item, index) => ({
			no: index + 1,
			Nama: item.employee.full_name,
			Divisi: item.employee.division,
			status: item.status,
			gaji_tetap: item.fixed_salary,
			gaji_tidak_tetap: item.fixed_salary,
			Pinjaman: item.loan,
			Koperasi: item.cooperative,
		}));

		const worksheet = XLSX.utils.json_to_sheet(formattedData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap Penggajian');
		XLSX.writeFile(workbook, 'Data_Penggajian.xlsx');
	};
	return (
		<div className="bg min-h-screen p-5">
			{/* Header */}
			<div className="mb-3 text-xl font-bold">Penggajian</div>
			<div className="breadcrumbs mb-5 text-sm">
				<ul>
					<li>Penggajian</li>
					<li>Detail Penggajian</li>
				</ul>
			</div>

			{/* Card for Date and Export Button */}
			<div className="rounded-lg bg-white p-5 shadow-lg">
				<div className="mb-5 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="border-1 rounded-full border-solid border-gray-950 p-3 text-neutral-content">
							<span className="material-icons">
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
							</span>
						</div>
						<div className="text-lg font-bold">Juni 2024</div>
					</div>
					<button className="btn btn-outline btn-primary" onClick={() => exportToXLSX()}>
						Export ke excel
					</button>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="table table-zebra w-full">
						<thead>
							<tr>
								<th>Nama</th>
								<th>Gaji Tetap</th>
								<th>Gaji Tidak Tetap</th>
								<th>Pinjaman</th>
								<th>Koperasi</th>
								<th>Status</th>
								<th>Detail</th>
							</tr>
						</thead>
						<tbody>
							{dataPenggajian.map((item) => (
								<tr key={item.id}>
									<td>{item.employee.full_name}</td>
									<td>{formatSalary(item.fixed_salary)}</td>
									<td>{formatSalary(item.variable_salary)}</td>
									<td>{formatSalary(item.loan)}</td>
									<td>{formatSalary(item.cooperative)}</td>
									<td>
										<span className={`badge ${item.status !== 'sudah' ? 'badge-warning' : 'badge-success'}`}>
											{item.status}
										</span>
									</td>
									<td>
										<div className="cursor-pointer font-semibold text-blue-400" onClick={() => handleEdit(item.id)}>
											Edit
										</div>
										<div className="cursor-pointer font-semibold text-blue-400" onClick={() => handleModal(item.id)}>
											Lihat Detail
										</div>
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<th colSpan={6}>Total Karyawan</th>
								<th>{filter.totalRows}</th>
							</tr>
							<tr>
								<th colSpan={6}>Total Jumlah</th>
								<th>
									{' '}
									{dataPenggajian
										.reduce((total, item) => total + (item.fixed_salary || 0), 0)
										.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
								</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>

			<input
				type="checkbox"
				id="detailPenggajianModal"
				className="modal-toggle"
				checked={isModalOpen}
				onChange={() => setModalOpen(!isModalOpen)}
			/>
			<div className="modal">
				<div className="modal-box w-11/12 max-w-6xl">
					<div className="space-y-6">
						{/* Employee Info */}
						<div className="flex justify-between border-b pb-3">
							<div>
								<p>
									<strong>Nama:</strong>
									{detailPenggajian?.employee.full_name}
								</p>
								<p>
									<strong>Jabatan:</strong>
									{detailPenggajian?.employee.occupation}
								</p>
							</div>
							<div className="text-right">
								<p>
									<strong> {detailPenggajian?.employee.dob.split('T')[0]}</strong>
								</p>
							</div>
						</div>

						{/* Salary Details */}
						<div className="grid grid-cols-2 gap-10">
							{/* Pendapatan */}
							<div>
								<h3 className="border-b pb-2 text-lg font-semibold">PENDAPATAN</h3>
								<div className="mt-3 space-y-2">
									<div>
										<p className="font-semibold">Gaji Tetap</p>
										<div className="space-y-1 border-l-4 border-blue-500 pl-2">
											<p className="flex justify-between">
												<span>Gaji Pokok</span>
												<span>{formatSalary(detailPenggajian?.fixed_salary)}</span>
											</p>
											<p className="flex justify-between">
												<span>Tunjangan Hari Raya</span>
												<span>{formatSalary(detailPenggajian?.fixed_salary)}</span>
											</p>
										</div>
									</div>
									<div>
										<p className="font-semibold">Gaji Tidak Tetap</p>
										<div className="space-y-1 border-l-4 border-blue-500 pl-2">
											<p className="flex justify-between">
												<span>Tunjangan Transportasi</span>
												<span>{formatSalary(detailPenggajian?.fixed_salary)}</span>
											</p>
											<p className="flex justify-between">
												<span>Tunjangan Jabatan</span>
												<span>-</span>
											</p>
										</div>
									</div>
									<div>
										<p className="font-semibold">Fasilitas</p>
										<div className="space-y-1 border-l-4 border-blue-500 pl-2">
											<p className="flex justify-between">
												<span>Makan Siang</span>
												<span>Rp 250.000</span>
											</p>
											<p className="flex justify-between">
												<span>BPJS</span>
												<span>Rp 750.000</span>
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Potongan */}
							<div>
								<h3 className="border-b pb-2 text-lg font-semibold">POTONGAN</h3>
								<div className="mt-3 space-y-2">
									<div>
										<p className="font-semibold">Pinjaman</p>
										<div className="space-y-1 border-l-4 border-red-500 pl-2">
											<p className="flex justify-between">
												<span>Pinjaman</span>
												<span className="text-red-500">{formatSalary(detailPenggajian?.loan)}</span>
											</p>
										</div>
									</div>
									<div>
										<p className="font-semibold">Koperasi</p>
										<div className="space-y-1 border-l-4 border-red-500 pl-2">
											<p className="flex justify-between">
												<span>Simpanan Sukarela</span>
												<span className="text-red-500">{formatSalary(detailPenggajian?.cooperative)}</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Total */}
						<div className="mt-6 flex justify-between border-t pt-3">
							<h3 className="text-lg font-semibold">TOTAL</h3>
							<p className="text-right font-semibold">Rp 1.750.000</p>
						</div>
					</div>
					<div className="modal-action">
						<label htmlFor="detailPenggajianModal" className="btn" onChange={() => setModalOpen(!isModalOpen)}>
							Tutup
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailPenggajianPage;
