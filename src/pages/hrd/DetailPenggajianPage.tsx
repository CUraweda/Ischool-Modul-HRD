import React, { useState, useEffect } from 'react';
import { Penggajian, Bill, Salary, Employee } from '@/middlewares/api/hrd';
import * as XLSX from 'xlsx';
// import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoMdClose } from 'react-icons/io';
const DetailPenggajianPage: React.FC<{}> = () => {
	// const Navigate = useNavigate();
	const [isModalOpen, setModalOpen] = useState(false);
	const [modalAdd, setModalAdd] = useState(false);
	const [dataPenggajian, setDataPenggajian] = useState<any[]>([]);
	const [detailPenggajian, setDetailPenggajian] = useState<any>(null);
	const [dataSalary, setSalary] = useState<any>(null);
	const [DataTypes, setTypes] = useState<any>({});
	const [DataBill, setDataBill] = useState<any>([]);
	const [ListEmployee, setListEmployee] = useState<any>(null);
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

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 51 }, (_, index) => currentYear + index);

	const [formData, setFormData] = useState({
		salary_id: 0,
		employee_id: 0,
		month_id: 1,
		year: currentYear,
		uid: '',
		is_paid: true,
		temp_total: 0,
		fixed_salary: 0,
		variable_salary: 0,
		loan: 0,
		cooperative: 0,
	});
	const resetForm = () => {
		setFormData({
			salary_id: 0,
			employee_id: 0,
			month_id: 0,
			year: 0,
			uid: '',
			is_paid: true,
			temp_total: 0,
			fixed_salary: 0,
			variable_salary: 0,
			loan: 0,
			cooperative: 0,
		});
	};
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
			setSalary(res.data.data.result);
			console.log(res.data.data.result);
		} catch (err) {
			console.error(err);
		}
	};
	const createAccount = async (data: any) => {
		try {
			const res = await Penggajian.createAccount(access_token, data);
			setSalary(res.data.data.result);
			if (res.status === 201) {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Data berhasil ditambahkan',
				});
				fetchData();
				resetForm();
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Terjadi kesalahan saat ditambahkan.',
				});
			}
		} catch (err) {
			console.error(err);
		}
	};
	const getOne = async (id: any) => {
		try {
			const res = await Penggajian.getOneAccount(id, access_token);
			setDetailPenggajian(res.data.data);
			console.log('as', res.data.data);
			getEmployee(res.data.data.employee_id);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	const getEmployee = async (id: any) => {
		try {
			const res = await Employee.getOneEmployee(id, access_token);
			setListEmployee(res.data.data);
		} catch (err) {
			console.error(err);
		}
	};
	// Update handleInputChange to handle salary_id selection
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, type, value } = e.target as HTMLInputElement | HTMLSelectElement;

		// Convert value to number if it is numeric
		let updatedValue: any = value;
		if (type === 'checkbox') {
			const target = e.target as HTMLInputElement;
			updatedValue = target.checked;
		} else if (['salary_id', 'employee_id', 'month_id', 'year'].includes(name)) {
			updatedValue = parseInt(value, 10) || 0;
		} else if (['temp_total', 'fixed_salary', 'variable_salary', 'loan', 'cooperative'].includes(name)) {
			updatedValue = parseFloat(value) || 0;
		}

		setFormData((prevFormData) => {
			const newFormData = {
				...prevFormData,
				[name]: updatedValue,
			};

			// Handle specific logic for salary_id change
			if (name === 'salary_id') {
				const selectedSalary = dataSalary.find((s: any) => s.id === updatedValue);
				if (selectedSalary) {
					newFormData.fixed_salary = selectedSalary.fixed_salary;
					newFormData.employee_id = selectedSalary.employee.id;
					newFormData.temp_total = selectedSalary.fixed_salary;
					const year = prevFormData.year;
					const month = prevFormData.month_id;
					const firstName = selectedSalary.employee.full_name.split(' ')[0];
					const uid = `UID${year}${firstName.substring(0, 3).toUpperCase() + selectedSalary.employee.id + month}`;
					newFormData.uid = uid;
				}
			}
			// Recalculate temp_total when relevant fields change
			if (['fixed_salary', 'variable_salary', 'loan', 'cooperative'].includes(name)) {
				const { fixed_salary, variable_salary, loan, cooperative } = newFormData;
				newFormData.temp_total = (fixed_salary || 0) + (variable_salary || 0) - (loan || 0) - (cooperative || 0);
			}

			return newFormData;
		});
	};
	// const deleteAccount = async (id: any) => {
	// 	try {
	// 		const res = await Penggajian.deleteAccount(token, id);
	// 		if (res.status === 200) {
	// 			Swal.fire({
	// 				icon: 'success',
	// 				title: 'Success',
	// 				text: 'Data berhasil dihapus',
	// 			});
	// 			fetchData();
	// 		} else {
	// 			// Handle other status codes if needed
	// 			Swal.fire({
	// 				icon: 'error',
	// 				title: 'Oops...',
	// 				text: 'Terjadi kesalahan saat menghapus data.',
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// const getTypes = async (id: any) => {
	// 	if (DataTypes[id]) return;

	// 	try {
	// 		const res = await Bill.getOneTypes(id);
	// 		setTypes((prevTypes: any) => ({
	// 			...prevTypes,
	// 			[id]: res.data.data.result.name,
	// 		}));
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };
	const getTypes = async () => {
		const typesMap: any = {};

		// Ambil semua type_id dari DataBill dan lakukan fetch sekali
		const promises = DataBill.map(async (item: any) => {
			try {
				if (!typesMap[item.type_id]) {
					const res = await Bill.getOneTypes(item.type_id, access_token); // API call
					typesMap[item.type_id] = res.data.data.name;
				}
			} catch (err) {
				console.error(err);
			}
		});

		await Promise.all(promises);
		setTypes(typesMap);
		console.log('test', typesMap);
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
	const filteredData = DataBill.filter((item: any) => item.type_id === 3 || item.type_id === 4);
	const remainingData = DataBill.filter((item: any) => item.type_id !== 3 && item.type_id !== 4);
	const formatSalary = (salary: number) => {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(salary);
	};
	useEffect(() => {
		getAllSalary();
	}, []);

	useEffect(() => {
		getTypes();
		fetchData();
	}, [DataBill, filterTable.limit, filterTable.month, filterTable.year]);
	const handleModal = (id: any | null) => {
		getOne(id);
		getBill(id);
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
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createAccount(formData);
		console.log('Submitted Data: ', formData);
		// Logic untuk mengirim data
		setModalAdd(false); // Tutup modal setelah submit
	};
	// const handleEdit = (id: any) => {
	// 	Navigate(`/hrd/rekap-gaji/${id}`, { state: { id } });
	// };
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

	return (
		<div className="bg min-h-screen p-5">
			{/* Modal */}
			{modalAdd && (
				<div className="modal modal-open">
					<div className="modal-box relative">
						<button
							className="absolute right-2 top-2"
							onClick={() => {
								setModalAdd(false), resetForm();
							}}
						>
							<IoMdClose size={20} />
						</button>
						<h3 className="text-lg font-bold">Tambah Gaji</h3>
						<form onSubmit={handleSubmit}>
							<div className="mt-4">
								<label className="label">
									<span className="label-text">Salary Karyawan</span>
								</label>
								<select
									name="salary_id"
									value={formData.salary_id}
									onChange={handleInputChange}
									className="select select-bordered w-full"
									required
								>
									<option value="">Pilih Karyawan</option>

									{dataSalary?.map((salary: any) => (
										<option key={salary.id} value={salary.id}>
											{formatSalary(salary.fixed_salary)} - {salary.employee.full_name}
										</option>
									))}
								</select>
							</div>
							<div className="mt-4">
								<label className="label">
									<span className="label-text">Bulan</span>
								</label>
								<select name="month_id" onChange={handleInputChange} className="select select-bordered w-full" required>
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

							<div className="mt-4">
								<label className="label">
									<span className="label-text">Tahun</span>
								</label>
								<select name="year" onChange={handleInputChange} className="select select-bordered w-full" required>
									<option value="" disabled>
										Pilih Tahun
									</option>
									{years.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
							</div>

							{/* <div className="mt-4">
								<label className="label text-gray-700">Status</label>
								<select
									className="select select-bordered w-full"
									name="status"
									value={formData.status}
									onChange={handleInputChange}
									required
								>
									<option value="" disabled>
										Pilih status
									</option>
									<option value="Sudah Dibayar">Sudah Dibayar</option>
									<option value="Belum Dibayar">Belum Dibayar</option>
								</select>
							</div> */}

							{/* <div className="mt-4">
								<label className="label">
									<span className="label-text">Sudah Dibayar</span>
								</label>
								<input
									type="checkbox"
									name="is_paid"
									checked={formData.is_paid}
									onChange={handleInputChange}
									className="checkbox"
								/>
							</div> */}

							<div className="modal-action">
								<button type="submit" className="btn btn-primary">
									Simpan
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

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
						<button onClick={() => setModalAdd(true)} className="btn btn-outline btn-primary">
							Tambah
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
										<div
											className={`${item.status !== 'sudah' ? 'bg-yellow-300' : 'bg-green-300'} rounded-md p-[3px] text-center`}
										>
											{item.status}
										</div>
									</td>
									{/* <div className="cursor-pointer font-semibold text-blue-400" onClick={() => deleteAccount(item.id)}>
											<IoIosTrash />
											Delete
										</div>
										<div className="cursor-pointer font-semibold text-blue-400" onClick={() => handleEdit(item.id)}>
											Edit
										</div> 
										*/}
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
									{' '}
									{dataPenggajian
										.reduce((total, item) => total + (item.fixed_salary || 0), 0)
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
									{ListEmployee?.full_name}
								</div>
								<div className="flex gap-2">
									<strong>Jabatan:</strong>
									{ListEmployee?.occupation}
								</div>
							</div>
							<div className="text-right">
								<p>{/* <strong> {detailPenggajian?.employee.dob.split('T')[0]}</strong> */}</p>
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
									</div>
									{/* Kolom pertama untuk id 3 dan 4 */}
									<div>
										{filteredData.map((item: any, index: number) => (
											<div key={index}>
												<p className="font-semibold">{DataTypes[item.type_id]}</p>
												<div className="space-y-1 border-l-4 border-blue-500 pl-2">
													<p className="flex justify-between">
														<span>{item.description}</span>
														<span>{formatSalary(item.amount)}</span>
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
									{/* <div className="space-y-1 border-l-4 border-red-500 pl-2"> */}
									<div>
										{remainingData.map((item: any, index: number) => (
											<div key={index}>
												<p className="font-semibold">{DataTypes[item.type_id]}</p>
												<div className="space-y-1 border-l-4 border-red-500 pl-2">
													<p className="flex justify-between">
														<span>{item.description}</span>
														<span>{formatSalary(item.amount)}</span>
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Total */}
						<div className="mt-6 flex justify-between border-t pt-3">
							<h3 className="text-lg font-semibold">TOTAL</h3>
							<p className="text-right font-semibold">{}</p>
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
