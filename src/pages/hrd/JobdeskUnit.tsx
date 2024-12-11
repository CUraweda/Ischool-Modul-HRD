import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Modal, { openModal, closeModal } from '@/components/ModalProps';
import { ItemPenilaian } from '@/middlewares/api';

const JobdeskUnit = () => {
	const [units, setUnits] = useState<any[]>([]);
	const [divisions, setDivisions] = useState<any[]>([]);
	const [formData, setFormData] = useState({
		id: null,
		name: '',
		division_id: '',
		disabled: false,
		isEditing: false,
	});

	let access_token = sessionStorage.getItem('access_token');
	access_token = access_token ? access_token.replace(/"/g, '') : null;

	useEffect(() => {
		fetchUnits();
	}, []);

	const fetchUnits = async () => {
		try {
			const response = await ItemPenilaian.DataUnit(0, 10000, access_token);
			setUnits(response.data.data.result);
			const responseDivison = await ItemPenilaian.DataDivision(access_token);
			setDivisions(responseDivison.data.data.result);
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal memuat data unit.', 'error');
		}
	};

	const handleSaveUnit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const payload = {
				name: formData.name,
				division_id: parseInt(formData.division_id, 10),
				disabled: formData.disabled,
			};

			if (formData.isEditing) {
				await ItemPenilaian.UpdateUnit(formData.id, payload, access_token);
				Swal.fire('Berhasil', 'Unit berhasil diperbarui.', 'success');
			} else {
				await ItemPenilaian.CreateUnit(payload, access_token);
				Swal.fire('Berhasil', 'Unit berhasil dibuat.', 'success');
			}

			fetchUnits();
			closeModal('addJobdesk');
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal menyimpan unit.', 'error');
		}
	};

	const handleDeleteUnit = async (id: any) => {
		try {
			await ItemPenilaian.DeleteUnit(id, access_token);
			Swal.fire('Berhasil', 'Unit berhasil dihapus.', 'success');
			fetchUnits();
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal menghapus unit.', 'error');
		}
	};

	const openAddJobdeskModal = () => {
		setFormData({
			id: null,
			name: '',
			division_id: '',
			disabled: false,
			isEditing: false,
		});
		openModal('addJobdesk');
	};

	const openEditJobdeskModal = (unit: any) => {
		setFormData({
			id: unit.id,
			name: unit.name,
			division_id: unit.division_id?.toString(),
			disabled: unit.disabled,
			isEditing: true,
		});
		openModal('addJobdesk');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">Jobdesk Unit</h3>
			</div>

			<div className="h-[1px] w-full bg-gray-300"></div>

			<div className="mt-6 flex justify-end">
				<button className="btn btn-primary" onClick={openAddJobdeskModal}>
					Tambah
				</button>
			</div>

			<div className="q-mt card mt-5 w-full bg-base-100 shadow-xl">
				<div className="card-body overflow-auto">
					<table className="table table-zebra w-full">
						<thead>
							<tr>
								<th>No</th>
								<th>Nama</th>
								<th>Divisi</th>
								<th>Status</th>
								<th className="flex items-center justify-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{units.map((unit, index) => (
								<tr key={unit.id}>
									<td>{index + 1}</td>
									<td>{unit.name}</td>
									<td>{unit.division?.name}</td>
									<td>{unit.disabled ? 'Aktif' : 'Tidak Aktif'}</td>
									<td className="flex items-center justify-center gap-5">
										<button onClick={() => openEditJobdeskModal(unit)} className="btn btn-success btn-sm">
											Edit
										</button>
										<button onClick={() => handleDeleteUnit(unit.id)} className="btn btn-error btn-sm">
											Hapus
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal */}
			<Modal id="addJobdesk">
				<div className="p-6">
					<h2 className="mb-4 text-lg font-bold">{formData.isEditing ? 'Edit Jobdesk Unit' : 'Tambah Jobdesk Unit'}</h2>
					<form onSubmit={handleSaveUnit}>
						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Nama Jobdesk</span>
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="input input-bordered w-full"
								required
							/>
						</div>
						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Divisi</span>
							</label>
							<select
								name="division_id"
								value={formData.division_id}
								onChange={handleChange}
								className="select select-bordered w-full"
								required
							>
								<option value="" disabled>
									Pilih Divisi
								</option>
								{divisions.map((division) => (
									<option key={division.id} value={division.id}>
										{division.name}
									</option>
								))}
							</select>
						</div>
						<div className="form-control mb-4">
							<label className="flex items-center">
								<input
									type="checkbox"
									name="disabled"
									checked={formData.disabled}
									onChange={handleChange}
									className="checkbox-primary checkbox"
								/>
								<span className="ml-2">Aktifkan Jobdesk</span>
							</label>
						</div>
						<div className="flex justify-end gap-4">
							<button type="button" onClick={() => closeModal('addJobdesk')} className="btn btn-outline">
								Batal
							</button>
							<button type="submit" className="btn btn-primary">
								Simpan
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default JobdeskUnit;
