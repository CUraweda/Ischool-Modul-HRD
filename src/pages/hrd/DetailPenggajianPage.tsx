import { useState, useEffect } from 'react';
import { Penggajian, Bill, Salary } from '@/middlewares/api/hrd';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
const DetailPenggajianPage = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [dataPenggajian, setDataPenggajian] = useState<any[]>([]);
	const [detailPenggajian, setDetailPenggajian] = useState<any>(null);
	const [detailBills, setDetailBills] = useState<any[]>([]);
	const [DataBill, setDataBill] = useState<any>([]);
	const [idEmployee, setId] = useState();
	const [filterTable, setFilterTable] = useState({
		search: '',
		limit: 0,
		page: 0,
		totalPage: 0,
		totalRows: 0,
		status: '',
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});
	const monthNames = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember',
	];

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const Month = monthNames.map((name, index) => ({
		month_id: index + 1,
		desc: name,
	}));

	const fetchData = async () => {
		try {
			const res = await Penggajian.getAllAccount(
				access_token,
				filterTable.month,
				filterTable.year,
				filterTable.limit,
				filterTable.page
			);
			console.log('Response object:', res.data.data.result);
			setDataPenggajian(res.data.data.result);
			setFilterTable((prev) => ({
				...prev,
				totalRows: res.data.data.totalRows,
				totalPage: res.data.data.totalPage,
				limit: res.data.data.limit,
				page: res.data.data.page,
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	const getAllSalary = async () => {
		try {
			const res = await Salary.getAllSalary(100000, '', 0, access_token);
			console.log(res.data.data.result);
		} catch (err) {
			console.error(err);
		}
	};
	const createAccount = async () => {
		try {
			const res = await Penggajian.createAccount(access_token, {});
			console.log(res.statusText);

			fetchData();
			Swal.fire({
				icon: 'success',
				title: 'Success',
				text: 'Data berhasil ditambahkan',
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
	const getOne = async (id: any) => {
		try {
			const res = await Penggajian.getOneAccount(id, access_token);
			setDetailPenggajian(res.data.data.account);
			setDetailBills(res.data.data.bills);
			console.log('as', res.data.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const getBill = async (id: number) => {
		try {
			const res = await Bill.getAllBill(0, '', 0, id, access_token);
			setDataBill(res.data.data.result);
			console.log('test', res.data.data.result);
		} catch (err) {
			console.error(err);
		}
	};

	const formatSalary = (salary: number) => {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(salary);
	};

	useEffect(() => {
		getAllSalary();
		fetchData();
	}, [DataBill, filterTable.limit, filterTable.month, filterTable.year]);
	const handleModal = (id: any | null) => {
		getOne(id);
		getBill(id);
		setModalOpen(!isModalOpen);
		setId(id);
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

	const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilterTable((prev) => ({
			...prev,
			month: parseInt(e.target.value, 10),
		}));
	};
	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilterTable((prev) => ({
			...prev,
			year: parseInt(e.target.value, 10),
		}));
	};

	const currentDate = new Date().toLocaleDateString('id-ID', {
		year: 'numeric',
		month: 'long',
	});

	const KirimEmail = async () => {
		await Penggajian.KirimEmail(idEmployee, null, access_token);
		Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'Email berhasil dikirim',
		});
	};

	return (
		<div className="bg min-h-screen p-5">
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
						<div className="text-lg font-bold">
							{Month.find((item) => item.month_id === filterTable.month)?.desc} {filterTable.year}
						</div>
					</div>
					<div className="flex gap-5">
						<div className="">
							<select
								value={filterTable.month}
								onChange={handleMonthChange}
								className="select select-bordered w-full"
								required
							>
								<option value="" disabled>
									Pilih Bulan
								</option>
								{Month.map((item: any) => (
									<option key={item.month_id} value={item.month_id}>
										{item.desc}
									</option>
								))}
							</select>
						</div>
						<div>
							<select onChange={handleYearChange} value={filterTable.year} className="select select-bordered w-full">
								{[2022, 2023, 2024].map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
						<button className="btn btn-outline btn-primary" onClick={() => exportToXLSX()}>
							Export ke excel
						</button>
						<button onClick={createAccount} className="btn btn-outline btn-primary">
							Generate Bulan Ini
						</button>
					</div>
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
								<th>Fasilitas</th>
								<th>Gaji Lain</th>
								<th>Potongan Lain</th>
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
									<td>{formatSalary(item.facility)}</td>
									<td>{formatSalary(item.other_income)}</td>
									<td>{formatSalary(item.other_cut)}</td>
									<td>
										<div
											className={`${item.status !== 'Bayar' ? 'bg-yellow-300' : 'bg-green-300'} rounded-md p-[3px] text-center`}
										>
											{item.status ? item.status : 'Menunggu'}
										</div>
									</td>

									<td>
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
								<th>{filterTable.totalRows}</th>
							</tr>
							<tr>
								<th colSpan={6}>Total Jumlah</th>
								<th>
									{dataPenggajian
										.reduce((total, item) => total + (item.temp_total || 0), 0)
										.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
								</th>
							</tr>
						</tfoot>
					</table>
					<div className="join m-5">
						<button
							className="btn join-item btn-sm"
							onClick={() => setFilterTable((prev) => ({ ...prev, page: prev.page - 1 }))}
							disabled={filterTable.page === 0} // Disable jika halaman pertama
						>
							Previous
						</button>

						<button
							className="btn join-item btn-sm"
							onClick={() => setFilterTable((prev) => ({ ...prev, page: prev.page + 1 }))}
							disabled={filterTable.page + 1 >= filterTable.totalPage} // Disable jika halaman terakhir
						>
							Next
						</button>

						<button className="btn join-item btn-sm">
							<div className="flex justify-between">
								<span>
									Page {filterTable.page + 1} of {filterTable.totalPage}
								</span>
							</div>
						</button>
						<button className="btn join-item btn-sm" onClick={() => setFilterTable((prev) => ({ ...prev, limit: 10 }))}>
							10
						</button>
						<button className="btn join-item btn-sm" onClick={() => setFilterTable((prev) => ({ ...prev, limit: 50 }))}>
							50
						</button>
						<button
							className="btn join-item btn-sm"
							onClick={() => setFilterTable((prev) => ({ ...prev, limit: 100 }))}
						>
							100
						</button>
						<button className="btn join-item btn-sm" onClick={() => setFilterTable((prev) => ({ ...prev, limit: 0 }))}>
							All
						</button>
					</div>
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
								<div className="flex gap-2">
									<strong>Nama:</strong>
									{detailPenggajian?.employee?.full_name}
								</div>
								<div className="flex gap-2">
									<strong>Jabatan:</strong>
									{detailPenggajian?.employee.occupation}
								</div>
								<div className="flex gap-2">
									<strong>Tanggal:</strong>
									<div>{currentDate}</div>
								</div>
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
										</div>
										{detailBills
											.filter((item: any) => item.subtraction === false)
											.map((item: any, index: number) => (
												<div key={index}>
													<p className="font-semibold">{item.name}</p>
													<div className="space-y-1 border-l-4 border-blue-500 pl-2">
														<p className="flex justify-between">
															<span>{item.datas[0].description}</span>
															<span>{formatSalary(item.total)}</span>
														</p>
													</div>
												</div>
											))}
									</div>
								</div>
							</div>

							{/* Potongan */}
							<div>
								<h3 className="border-b pb-2 text-lg font-semibold">POTONGAN</h3>
								<div className="mt-3 space-y-2">
									<div>
										{detailBills
											.filter((item: any) => item.subtraction === true)
											.map((item: any, index: number) => (
												<div key={index}>
													<p className="font-semibold">{item.name}</p>
													<div className="space-y-1 border-l-4 border-red-500 pl-2">
														<p className="flex justify-between">
															<span>{item.datas[0].description}</span>
															<span>{formatSalary(item.total)}</span>
														</p>
													</div>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="mt-6 flex justify-between border-t pt-3">
							<h3 className="text-lg font-semibold">Total Pendapatan</h3>
							<p className="text-right font-semibold">
								{formatSalary(
									(detailPenggajian?.fixed_salary || 0) +
										detailBills
											.filter((item: any) => item.subtraction === false)
											.reduce((acc: number, item: any) => acc + item.total, 0)
								)}
							</p>
						</div>

						<div className="mt-6 flex justify-between border-t pt-3">
							<h3 className="text-lg font-semibold">Total Potongan</h3>
							<p className="text-right font-semibold">
								{formatSalary(
									detailBills
										.filter((item: any) => item.subtraction === true)
										.reduce((acc: number, item: any) => acc + item.total, 0)
								)}
							</p>
						</div>

						{/* Gaji Bersih */}
						<div className="mt-6 flex justify-between border-t pt-3">
							<h3 className="text-lg font-semibold">Gaji Bersih</h3>
							<p className="text-right font-semibold">
								{formatSalary(
									(detailPenggajian?.fixed_salary || 0) +
										detailBills
											.filter((item: any) => item.subtraction === false)
											.reduce((acc: number, item: any) => acc + item.total, 0) -
										detailBills
											.filter((item: any) => item.subtraction === true)
											.reduce((acc: number, item: any) => acc + item.total, 0)
								)}
							</p>
						</div>
					</div>

					<div className="modal-action">
						<label htmlFor="detailPenggajianModal" className="btn btn-primary" onClick={() => KirimEmail()}>
							Kirim
						</label>
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
