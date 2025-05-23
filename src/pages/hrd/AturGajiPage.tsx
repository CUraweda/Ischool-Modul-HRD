import { FaRegEdit } from 'react-icons/fa';
import { Salary, Bill, Penggajian, Dashboard } from '@/middlewares/api/hrd';
import { useEffect, useState } from 'react';
import { IoMdClose, IoIosTrash } from 'react-icons/io';
import Swal from 'sweetalert2';

const AturGajiPage = () => {
	const [dataSalary, setDataSalary] = useState<any[]>([]);
	const [modalSalary, setModalSalary] = useState<boolean>(false);
	const [modalBill, setModalBill] = useState<boolean>(false);
	const [ListEmployee, setListEmployee] = useState<any[]>([]);
	const [dataEmployee, setDataEmployee] = useState<any[]>([]);
	const [dataUpdateSalary, setUpdateDataSalary] = useState<any>(null);
	const [dataUpdateBill, setUpdateDataBill] = useState<any>(null);
	const [dataBill, setDataBill] = useState<any[]>([]);
	const [DataTypes, setTypes] = useState<any[]>([]);
	const [filterTable, setFilterTable] = useState({
		search: '',
		limit: 0,
		page: 0,
		totalPage: 0,
		totalRows: 0,
		status: '',
	});
	const [filterBill, setFilterBill] = useState({
		search: '',
		limit: 0,
		page: 0,
		totalPage: 0,
		totalRows: 0,
		status: '',
	});
	const [formData, setFormData] = useState({
		employee_id: dataUpdateSalary?.employee_id ?? 0,
		fixed_salary: dataUpdateSalary?.fixed_salary ?? 0,
		is_active: dataUpdateSalary?.is_active ?? true,
	});
	const [formDataBill, setFormDataBill] = useState({
		account_id: dataUpdateBill?.account_id ?? 0,
		type_id: dataUpdateBill?.type_id ?? 0,
		description: dataUpdateBill?.description ?? '',
		amount: dataUpdateBill?.amount ?? 0,
	});
	const formatCurrency = (value: number) => {
		return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
	};

	const parseCurrency = (value: string) => {
		return parseFloat(value.replace(/[^\d.-]/g, ''));
	};

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const getSalary = async () => {
		try {
			const res = await Salary.getAllSalary(filterTable.limit, filterTable.search, filterTable.page, access_token);
			setDataSalary(res.data.data.result);
			setFilterTable((prev) => ({
				...prev,
				totalRows: res.data.data.totalRows,
				totalPage: res.data.data.totalPage,
				limit: res.data.data.limit,
				page: res.data.data.page,
			}));
			console.log(res.data.data.result);
		} catch (err) {
			console.error(err);
		}
	};

	const deleteDataSalary = async (id: number) => {
		try {
			const res = await Salary.deleteSalary(id);
			if (res.status === 201) {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Data berhasil dihapus',
				});
				getSalary();
			}
		} catch (err) {
			console.error(err);
		}
	};
	const deleteDataBill = async (id: number) => {
		try {
			const res = await Bill.deleteBill(id);
			if (res.status === 200) {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Data berhasil dihapus',
				});
				getDataBill();
			}
		} catch (err) {
			console.error(err);
		}
	};
	const getDataBill = async () => {
		try {
			const res = await Bill.getAllBill(0, '', 0, '', access_token, 'y');
			setDataBill(res.data.data.result);
			setFilterBill((prev) => ({
				...prev,
				totalRows: res.data.data.totalRows,
				totalPage: res.data.data.totalPage,
				limit: res.data.data.limit,
				page: res.data.data.page,
			}));
			console.log('test', res);
		} catch (err) {
			console.error(err);
		}
	};
	const getTypes = async () => {
		try {
			const res = await Bill.getAllTypes(10000, 0);
			setTypes(res.data.data.result);
		} catch (err) {
			console.error(err);
		}
	};
	const getEmployee = async () => {
		try {
			const response = await Dashboard.DataKaryawan(access_token);
			setDataEmployee(response.data.data.result);
			const res = await Penggajian.getAllAccount(access_token, '', '', 100000, 0);
			console.log(res.data.data.result);
			setListEmployee(res.data.data.result);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getTypes();
		getEmployee();
	}, []);

	useEffect(() => {
		getSalary();
		getDataBill();
	}, [filterTable.limit, filterBill.limit]);

	const [formattedSalary, setFormattedSalary] = useState(formatCurrency(formData.fixed_salary));
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, type, value } = e.target as HTMLInputElement | HTMLSelectElement;

		if (type === 'checkbox') {
			const target = e.target as HTMLInputElement;
			setFormData((prev) => ({
				...prev,
				[name]: target.checked,
			}));
		} else if (name === 'fixed_salary') {
			const numberValue = parseCurrency(value);
			setFormattedSalary(formatCurrency(numberValue));
			setFormData((prev) => ({
				...prev,
				[name]: numberValue,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const createDataSalary = async (values: any) => {
		try {
			const res = await Salary.createSalary(values);
			if (res.status === 201) {
				resetDataSalary();
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Data berhasil ditambahkan',
				});
				getSalary();
			}
		} catch (err) {
			console.error(err);
		}
	};
	const updateDataSalary = async (values: any) => {
		try {
			const res = await Salary.updateSalary(values, dataUpdateSalary.id);
			console.log(res.data.data);
			if (res.status === 201) {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Data berhasil ditambahkan',
				});
				getSalary();
			}
		} catch (err) {
			console.error(err);
		}
	};
	const createDataBill = async (values: any) => {
		try {
			const res = await Bill.addBill(values);
			if (res.status === 201) {
				resetDataBill();
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Data berhasil ditambahkan',
				});
				getDataBill();
			}
		} catch (err) {
			console.error(err);
		}
	};
	const updateDataBill = async (values: any) => {
		try {
			const res = await Bill.updateBill(values, dataUpdateBill.id);
			console.log(res.data.data);
			if (res.status === 200) {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Data berhasil ditambahkan',
				});
				getDataBill();
			}
		} catch (err) {
			console.error(err);
		}
	};
	const [typeSalaryModal, setTypeSalaryModal] = useState('');
	const [typeBillModal, setTypeBillModal] = useState('');
	const handleSubmit = () => {
		if (typeSalaryModal === 'create') {
			createDataSalary(formData);
		} else {
			updateDataSalary(formData);
		}

		handleSalary();
	};

	const handleSubmitBill = () => {
		if (typeBillModal === 'create') {
			createDataBill(formDataBill);
		} else {
			updateDataBill(formDataBill);
		}
		setModalBill(false);
	};
	const handleSalary = () => {
		setModalSalary(!modalSalary);
	};
	useEffect(() => {
		if (dataUpdateSalary) {
			setFormData({
				employee_id: dataUpdateSalary.employee_id,
				fixed_salary: dataUpdateSalary.fixed_salary,
				is_active: dataUpdateSalary.is_active,
			});
		}
		if (dataUpdateBill) {
			setFormDataBill({
				account_id: dataUpdateBill?.account_id ?? 0,
				type_id: dataUpdateBill?.type_id ?? 0,
				description: dataUpdateBill?.description ?? '',
				amount: dataUpdateBill?.amount ?? 0,
			});
		}
	}, [dataUpdateSalary, dataUpdateBill]);

	const handleInputChangeBill = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;

		// Convert value to number if necessary
		let updatedValue: any = value;
		if (name === 'amount') {
			updatedValue = parseFloat(value) || 0;
		} else if (['account_id', 'type_id'].includes(name)) {
			updatedValue = parseInt(value, 10) || 0;
			console.log(updatedValue);
		}

		setFormDataBill((prevFormDataBill) => ({
			...prevFormDataBill,
			[name]: updatedValue,
		}));
	};
	useEffect(() => {
		if (dataUpdateSalary) {
			setFormDataBill({
				account_id: dataUpdateBill?.id ?? 0,
				type_id: dataUpdateBill?.type_id ?? 0,
				description: dataUpdateBill?.description ?? '',
				amount: dataUpdateBill?.amount ?? 0,
			});
		}
	}, [dataUpdateBill]);

	const resetDataBill = () => {
		setFormDataBill({
			account_id: 0,
			type_id: 0,
			description: '',
			amount: 0,
		});
	};

	const resetDataSalary = () => {
		setFormData({
			employee_id: 0,
			fixed_salary: 0,
			is_active: true,
		});
	};

	const getTypeNameById = (id: number) => {
		const type = DataTypes.find((t) => t.id === id);
		return type ? type.name : 'Unknown';
	};
	return (
		<div className="h-screen">
			<div className="mb-5 flex items-center justify-between">
				<h1 className="text-lg font-bold">Penggajian</h1>
			</div>
			{modalSalary && (
				<div className="modal modal-open">
					<div className="modal-box relative">
						<button
							className="absolute right-2 top-2"
							onClick={() => {
								setModalSalary(false);
							}}
						>
							<IoMdClose size={20} />
						</button>
						<h3 className="text-lg font-bold">
							{typeSalaryModal == 'edit' ? 'Edit Data Penggajian' : 'Tambah Data Penggajian'}
						</h3>
						<form onSubmit={handleSubmit}>
							<div className="mt-4">
								<label className="label">
									<span className="label-text">Employee</span>
								</label>
								<select
									name="employee_id"
									value={formData.employee_id}
									onChange={handleInputChange}
									className="select select-bordered w-full"
									required
								>
									<option value={0} disabled>
										Pilih Karyawan
									</option>
									{dataEmployee.map((employee, index) => (
										<option key={index} value={employee.id}>
											{employee.full_name}
										</option>
									))}
								</select>
							</div>
							<div className="mt-4">
								<label className="label">
									<span className="label-text">Gaji Tetap</span>
								</label>
								{formattedSalary}
								<input
									type="number"
									name="fixed_salary"
									value={formData.fixed_salary}
									onChange={handleInputChange}
									className="input input-bordered w-full"
									step="0.01"
									required
								/>
							</div>
							<div className="mt-4 flex items-center">
								<input
									type="checkbox"
									name="is_active"
									checked={formData.is_active}
									onChange={handleInputChange}
									className="checkbox-primary checkbox"
								/>
								<label className="ml-2">Active</label>
							</div>
							<div className="modal-action">
								<button type="submit" className="btn btn-primary">
									Simpan
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{modalBill && (
				<div className="modal modal-open">
					<div className="modal-box relative">
						<button
							className="absolute right-2 top-2"
							onClick={() => {
								setModalBill(false);
							}}
						>
							<IoMdClose size={20} />
						</button>
						<h3 className="text-lg font-bold">
							{typeBillModal == 'edit' ? 'Edit Data Penggajian' : 'Tambah Data Penggajian'}
						</h3>
						<form onSubmit={handleSubmitBill}>
							{/* Employee (account_id) Select */}
							{/* <div className="mt-4">
								<label className="label">
									<span className="label-text">Karyawan</span>
								</label>
								<select
									name="account_id"
									value={formDataBill.account_id}
									onChange={handleInputChangeBill}
									className="select select-bordered w-full"
								>
									<option value="">Pilih Karyawan</option>
									{dataAccount.map((item) => (
										<option key={item.id} value={item.id}>
											{item.employee.full_name}
										</option>
									))}
								</select>
							</div> */}

							{/* Type ID Select */}
							<div>
								<label className="label">
									<span className="label-text">Employee</span>
								</label>
								<select
									name="account_id"
									onChange={handleInputChangeBill}
									value={formDataBill.account_id}
									className="select select-bordered w-full"
									required
								>
									<option value={0} disabled>
										Pilih Karyawan
									</option>
									{ListEmployee.map((employee) => (
										<option key={employee.id} value={employee.id}>
											{employee.employee.full_name}
										</option>
									))}
								</select>
							</div>
							<div className="mt-4">
								<label className="label">
									<span className="label-text">Jenis</span>
								</label>
								<select
									name="type_id"
									value={formDataBill.type_id}
									onChange={handleInputChangeBill}
									className="select select-bordered w-full"
									required
								>
									<option value="">Pilih Tipe</option>
									{DataTypes.map((type) => (
										<option key={type.id} value={type.id}>
											{type.name}
										</option>
									))}
								</select>
							</div>

							{/* Description Input */}
							<div className="mt-4">
								<label className="label">
									<span className="label-text">Deskripsi</span>
								</label>
								<input
									type="text"
									name="description"
									value={formDataBill.description}
									onChange={handleInputChangeBill}
									className="input input-bordered w-full"
									placeholder="Deskripsi"
									required
								/>
							</div>

							{/* Amount Input */}
							<div className="mt-4">
								<label className="label">
									<span className="label-text">Jumlah</span>
								</label>
								<input
									type="tel"
									name="amount"
									value={formDataBill.amount}
									onChange={handleInputChangeBill}
									className="input input-bordered w-full"
									placeholder="Masukkan jumlah"
									required
								/>
							</div>

							{/* Submit Button */}
							<div className="modal-action">
								<button type="submit" className="btn btn-primary">
									Simpan
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			<div className="flex flex-col gap-2">
				<div className="card w-full bg-white text-primary-content">
					<div className="card-body">
						<div className="flex items-center justify-between">
							<h3 className="card-title font-bold text-black">Gaji Tetap</h3>
							<div className="flex items-center gap-3">
								<button
									className="btn btn-primary btn-xs"
									onClick={() => {
										handleSalary(), setTypeSalaryModal('create'), resetDataSalary();
									}}
								>
									Tambah
								</button>
							</div>
						</div>
						<div className="overflow-x-auto">
							<table className="table table-zebra-zebra text-black">
								{/* head */}
								<thead>
									<tr>
										<th>No</th>
										<th>Divisi</th>
										<th>Gaji Tetap</th>
										<th className="text-center">Status</th>
										<th className="text-center">Action</th>
									</tr>
								</thead>
								<tbody>
									{dataSalary.map((s, i) => (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{s.employee.full_name}</td>
											<td>{formatCurrency(s?.fixed_salary)}</td>
											<td className="text-center">
												<button className={`${s.is_active ? 'btn btn-primary' : 'btn btn-warning'} text-white`}>
													{s.is_active ? 'Aktif' : 'Tidak Aktif'}
												</button>
											</td>
											<td className="text-center">
												<button
													className="btn btn-ghost btn-neutral"
													onClick={() => {
														handleSalary();
														setTypeSalaryModal('edit');
														setUpdateDataSalary(s);
													}}
												>
													<FaRegEdit />
													Edit
												</button>
												<button
													className="btn btn-ghost btn-neutral"
													onClick={() => {
														deleteDataSalary(s.id);
													}}
												>
													<IoIosTrash />
													delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="join m-5">
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterTable((prev) => ({ ...prev, page: prev.page - 1 }))}
									disabled={filterTable.page === 0}
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
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterTable((prev) => ({ ...prev, limit: 10 }))}
								>
									10
								</button>
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterTable((prev) => ({ ...prev, limit: 50 }))}
								>
									50
								</button>
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterTable((prev) => ({ ...prev, limit: 100 }))}
								>
									100
								</button>
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterTable((prev) => ({ ...prev, limit: 0 }))}
								>
									All
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="card w-full bg-white text-primary-content">
					<div className="card-body">
						<div className="flex items-center justify-between">
							<h3 className="card-title font-bold text-black">Lainnya</h3>
							<div className="flex items-center gap-3">
								{/* <select className="select select-xs w-full max-w-[10rem] text-black">
									<option disabled>Pilih Divisi</option>
									<option>Svelte</option>
									<option>Vue</option>
									<option>React</option>
								</select> */}
								<button
									className="btn btn-primary btn-xs"
									onClick={() => {
										setModalBill(true), setTypeBillModal('create'), resetDataBill();
									}}
								>
									Tambah
								</button>
							</div>
						</div>
						<div className="overflow-x-auto">
							<table className="table table-zebra-zebra text-black">
								{/* head */}
								<thead>
									<tr>
										<th>No</th>
										<th>Nama</th>
										<th>Tipe</th>
										<th>Nominal</th>
										<th>Deskripsi</th>
										<th className="text-center">Action</th>
									</tr>
								</thead>
								<tbody>
									{dataBill.map((item, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{item.employeeaccount?.employee?.full_name}</td>
											<td>{getTypeNameById(item.type_id)}</td>
											<td>{formatCurrency(item.amount)}</td>
											<td>{item.description}</td>
											<td className="text-center">
												<button
													className="btn btn-ghost btn-neutral"
													onClick={() => {
														setModalBill(true), setTypeBillModal('edit'), setUpdateDataBill(item);
													}}
												>
													<FaRegEdit />
													Edit
												</button>
												<button
													className="btn btn-ghost btn-neutral"
													onClick={() => {
														deleteDataBill(item.id);
													}}
												>
													<IoIosTrash />
													delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="join m-5">
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterBill((prev) => ({ ...prev, page: prev.page - 1 }))}
									disabled={filterBill.page === 0} // Disable jika halaman pertama
								>
									Previous
								</button>

								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterBill((prev) => ({ ...prev, page: prev.page + 1 }))}
									disabled={filterBill.page + 1 >= filterBill.totalPage}
								>
									Next
								</button>

								<button className="btn join-item btn-sm">
									<div className="flex justify-between">
										<span>
											Page {filterBill.page + 1} of {filterBill.totalPage}
										</span>
									</div>
								</button>
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterBill((prev) => ({ ...prev, limit: 10 }))}
								>
									10
								</button>
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterBill((prev) => ({ ...prev, limit: 50 }))}
								>
									50
								</button>
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterBill((prev) => ({ ...prev, limit: 100 }))}
								>
									100
								</button>
								<button
									className="btn join-item btn-sm"
									onClick={() => setFilterBill((prev) => ({ ...prev, limit: 0 }))}
								>
									All
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AturGajiPage;
