import { Dashboard, DinasLuar } from '@/middlewares/api';
import { useState, useEffect } from 'react';
import Modal, { openModal, closeModal } from '@/components/ModalProps';
import Swal from 'sweetalert2';

const DaftarDinasLuarPage = () => {
	const [fetch, setFetch] = useState<any[]>([]);
	const [dataEmployee, setDataEmployee] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [formData, setFormData] = useState({
		employee_id: '',
		start_date: '',
		end_date: '',
		is_active: false,
		description: '',
	});
	const [editingId, setEditingId] = useState<number | null>(null);
	const limit = 20;

	let access_token = sessionStorage.getItem('access_token');
	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async (page: number) => {
		try {
			const offset = (page - 1) * limit;
			const response = await DinasLuar.DataDinasLuar(access_token, offset, limit);
			const employeeResponse = await Dashboard.DataKaryawan(access_token);
			setDataEmployee(employeeResponse.data.data.result);
			setFetch(response.data.data.result);
			setTotalPages(Math.ceil(response.data.data.totalPage));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData(currentPage);
	}, [currentPage]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({
			...prevData,
			is_active: e.target.checked,
		}));
	};

	const CreateDinasLuar = async () => {
		try {
			await DinasLuar.CreateDinasLuar(formData);
			closeModal('outStationModal');
			setFormData({ employee_id: '', start_date: '', end_date: '', is_active: false, description: '' });
			fetchData(currentPage);
			Swal.fire('Success!', 'Data added successfully!', 'success');
		} catch (error) {
			console.error(error);
			Swal.fire('Error!', 'Failed to add data.', 'error');
		}
	};

	const UpdateDinasLuar = async (id: any) => {
		try {
			await DinasLuar.UpdateDinasLuar(formData, id);
			closeModal('outStationModal');
			setFormData({ employee_id: '', start_date: '', end_date: '', is_active: false, description: '' });
			fetchData(currentPage);
			Swal.fire('Success!', 'Data updated successfully!', 'success');
		} catch (error) {
			console.error(error);
			Swal.fire('Error!', 'Failed to update data.', 'error');
		}
	};

	const DeleteDinasLuar = async (id: any) => {
		const result = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		});

		if (result.isConfirmed) {
			try {
				await DinasLuar.DeleteDinasLuar(id);
				fetchData(currentPage);
				Swal.fire('Deleted!', 'Your data has been deleted.', 'success'); // SweetAlert success message
			} catch (error) {
				console.error(error);
				Swal.fire('Error!', 'Failed to delete data.', 'error'); // SweetAlert error message
			}
		}
	};

	const handleDialog = (item?: any) => {
		if (item) {
			setEditingId(item.id);
			setFormData({
				employee_id: item.employee_id,
				start_date: item.start_date.split('T')[0],
				end_date: item.end_date.split('T')[0],
				is_active: item.is_active,
				description: item.description,
			});
		} else {
			setEditingId(null);
			setFormData({ employee_id: '', start_date: '', end_date: '', is_active: false, description: '' });
		}
		openModal('outStationModal');
	};

	const handleSubmit = () => {
		if (editingId) {
			UpdateDinasLuar(editingId);
		} else {
			CreateDinasLuar();
		}
	};

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">Daftar Dinas Luar</h3>
			</div>

			<div className="mb-4 mt-5 flex items-end justify-end">
				<button className="btn btn-xs" onClick={() => handleDialog()}>
					<span>+</span> Tambah
				</button>
			</div>

			<div className="card w-full bg-base-100 shadow-xl">
				<div className="card-body overflow-x-auto">
					<table className="table mb-14 w-full">
						<thead>
							<tr>
								<th>No</th>
								<th>Nama Karyawan</th>
								<th>Dimulai</th>
								<th>Berakhir</th>
								<th>Deskripsi</th>
								<th>Status</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{fetch.length > 0 ? (
								fetch.map((item, index) => (
									<tr key={index}>
										<td>{(currentPage - 1) * limit + index + 1}</td>
										<td>{item?.employee?.full_name}</td>
										<td>{item?.start_date?.split('T')[0]}</td>
										<td>{item?.end_date?.split('T')[0]}</td>
										<td>{item?.description}</td>
										<td>{item?.is_active === true ? 'Aktif' : 'Tidak Aktif'}</td>
										<td className="relative px-4 py-2">
											<div className="dropdown dropdown-end">
												<label tabIndex={0} className="btn btn-primary btn-sm">
													...
												</label>
												<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow z-50">
													<li>
														<a onClick={() => handleDialog(item)}>Edit Data</a>
													</li>
													<li>
														<a onClick={() => DeleteDinasLuar(item.id)}>Hapus Data</a>
													</li>
												</ul>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={6} className="text-center">
										No data available
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Pagination */}
			<div className="mt-4 flex justify-center">
				<div className="join">
					<button
						className="btn join-item btn-sm"
						disabled={currentPage === 1 || totalPages === 1}
						onClick={() => handlePageChange(currentPage - 1)}
					>
						«
					</button>

					<span className="btn join-item btn-sm pointer-events-none">
						Halaman {currentPage} dari {totalPages}
					</span>

					<button
						className="btn join-item btn-sm"
						disabled={currentPage === totalPages || totalPages === 1}
						onClick={() => handlePageChange(currentPage + 1)}
					>
						»
					</button>
				</div>
			</div>

			<Modal id="outStationModal">
				<div className="space-y-6 p-8">
					<h2 className="text-xl font-semibold text-gray-800">
						{editingId ? 'Edit Data Dinas Luar' : 'Tambah Data Dinas Luar'}
					</h2>

					{/* Select for Karyawan */}
					<div className="space-y-2">
						<label className="label">
							<span className="label-text">Nama Karyawan</span>
						</label>
						<select
							name="employee_id"
							value={formData.employee_id}
							onChange={handleInputChange}
							className="select select-bordered w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						>
							<option value="">Pilih Karyawan</option>
							{dataEmployee.map((employee) => (
								<option key={employee.id} value={employee.id}>
									{employee.full_name}
								</option>
							))}
						</select>
					</div>

					{/* Start Date Input */}
					<div className="space-y-2">
						<label className="label">
							<span className="label-text">Dimulai</span>
						</label>
						<input
							type="date"
							name="start_date"
							value={formData.start_date}
							onChange={handleInputChange}
							className="input input-bordered w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					{/* End Date Input */}
					<div className="space-y-2">
						<label className="label">
							<span className="label-text">Berakhir</span>
						</label>
						<input
							type="date"
							name="end_date"
							value={formData.end_date}
							onChange={handleInputChange}
							className="input input-bordered w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					{/* Active Checkbox */}
					<div className="flex items-center space-x-3">
						<label className="label flex cursor-pointer items-center gap-2">
							<span className="label-text">Status Aktif</span>
							<input
								type="checkbox"
								className="toggle toggle-primary rounded-md focus:ring-indigo-500 focus:ring-opacity-50"
								checked={formData.is_active}
								onChange={handleToggleChange}
							/>
						</label>
					</div>

					{/* Description Input */}
					<div className="space-y-2">
						<label className="label">
							<span className="label-text">Deskripsi</span>
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							className="textarea textarea-bordered w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							rows={3}
						/>
					</div>

					<div className="flex justify-end">
						<button className="btn btn-primary" onClick={handleSubmit}>
							{editingId ? 'Update' : 'Simpan'}
						</button>
						<button className="btn btn-outline ml-2" onClick={() => closeModal('outStationModal')}>
							Batal
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DaftarDinasLuarPage;
