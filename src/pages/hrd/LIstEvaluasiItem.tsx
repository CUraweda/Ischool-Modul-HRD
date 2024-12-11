import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Modal, { openModal, closeModal } from '@/components/ModalProps';
import { ItemPenilaian } from '@/middlewares/api';

const ListEvaluasiItem = () => {
	const [evaluationItem, setEvaluationItem] = useState<any[]>([]);
	const [divisions, setDivisions] = useState<any[]>([]);
	const [jobdeskUnit, setJobdeskUnit] = useState<any[]>([]);
	const [groupGrade, setGroupGrade] = useState<any[]>([]);
	const [divisionId, setDivisionId] = useState('');
	const [formData, setFormData] = useState({
		id: null,
		division_id: '',
		name: '',
		description: '',
		unit_id: '',
		grading_id: '',
		isEditing: false,
	});

	let access_token = sessionStorage.getItem('access_token');
	access_token = access_token ? access_token.replace(/"/g, '') : null;

	useEffect(() => {
		fetchUnits();
	}, [divisionId]);

	const fetchUnits = async () => {
		try {
			const response = await ItemPenilaian.DataEvaluationItem(access_token, 0, 10000, divisionId);
			setEvaluationItem(response.data.data.result);
			const responseDivison = await ItemPenilaian.DataDivision(access_token);
			setDivisions(responseDivison.data.data.result);
			const responseUnit = await ItemPenilaian.DataJobdeskUnit(access_token);
			setJobdeskUnit(responseUnit.data.data.result);
			const responseGroup = await ItemPenilaian.DataJobdeskGradeGroupDropdown(access_token);
			setGroupGrade(responseGroup.data.data.result);
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal memuat data unit.', 'error');
		}
	};

	const handleSaveUnit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const payload = {
				division_id: parseInt(formData.division_id, 10),
				name: formData.name,
				description: formData.description,
				unit_id: parseInt(formData.unit_id),
				grading_id: parseInt(formData.grading_id),
			};

			if (formData.isEditing) {
				await ItemPenilaian.UpdateeEvaluationitem(formData.id, payload, access_token);
				Swal.fire('Berhasil', 'Item berhasil diperbarui.', 'success');
			} else {
				await ItemPenilaian.CreateEvaluationitem(payload, access_token);
				Swal.fire('Berhasil', 'Item berhasil dibuat.', 'success');
			}

			fetchUnits();
			closeModal('addJobdesk');
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal menyimpan Item.', 'error');
		}
	};

	const handleDeleteUnit = async (id: any) => {
		try {
			await ItemPenilaian.DeleteEvaluationitem(id, access_token);
			Swal.fire('Berhasil', 'Item berhasil dihapus.', 'success');
			fetchUnits();
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal menghapus Item.', 'error');
		}
	};

	const openAddJobdeskModal = () => {
		setFormData({
			id: null,
			name: '',
			description: '',
			division_id: '',
			unit_id: '',
			grading_id: '',
			isEditing: false,
		});
		openModal('addJobdesk');
	};

	const openEditJobdeskModal = (unit: any) => {
		setFormData({
			id: unit.id,
			name: unit.name,
			description: unit.description,
			division_id: unit.division_id?.toString(),
			unit_id: unit.unit_id,
			grading_id: unit.grading_id,
			isEditing: true,
		});
		openModal('addJobdesk');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">Evaluation Item</h3>
			</div>

			<div className="h-[1px] w-full bg-gray-300"></div>

			<div className="mt-6 flex items-center justify-between">
				<select className="select select-bordered select-xs" onChange={(e) => setDivisionId(e.target.value)}>
					<option value="" selected>
						Filter
					</option>
					{divisions.map((item, index) => (
						<option value={item.id} key={index}>
							{item.name}
						</option>
					))}
				</select>

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
								<th>Deskripsi</th>
								<th>Divisi</th>
								<th>Unit</th>
								<th className="flex items-center justify-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{evaluationItem.map((unit, index) => (
								<tr key={unit.id}>
									<td>{index + 1}</td>
									<td>{unit.name}</td>
									<td>{unit?.description}</td>
									<td>{unit?.division?.name}</td>
									<td>{unit?.jobdeskunit?.name}</td>
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
					<h2 className="mb-4 text-lg font-bold">{formData.isEditing ? 'Edit Jobdesk' : 'Tambah Jobdesk'}</h2>
					<form onSubmit={handleSaveUnit}>
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
							<label className="label">
								<span className="label-text">Nama Item Evaluasi</span>
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
								<span className="label-text">Deskripsi</span>
							</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
								className="textarea textarea-bordered w-full"
								required
							/>
						</div>

						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Unit</span>
							</label>
							<select
								name="unit_id"
								value={formData.unit_id}
								onChange={handleChange}
								className="select select-bordered w-full"
								required
							>
								<option value="" disabled>
									Pilih Unit
								</option>
								{jobdeskUnit.map((division) => (
									<option key={division.id} value={division.id}>
										{division.name}
									</option>
								))}
							</select>
						</div>

						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Group Nilai</span>
							</label>
							<select
								name="grading_id"
								value={formData.grading_id}
								onChange={handleChange}
								className="select select-bordered w-full"
								required
							>
								<option value="" disabled>
									Pilih Group
								</option>
								{groupGrade.map((division) => (
									<option key={division.id} value={division.id}>
										{division.identifier}
									</option>
								))}
							</select>
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

export default ListEvaluasiItem;
