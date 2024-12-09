import { ItemPenilaian } from '@/middlewares/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import Swal from 'sweetalert2';

const ListItemPenilaian = () => {
	const navigate = useNavigate();
	const [fetch, setfetch] = useState<any[]>([]);
	const [fetchEmployee, setFetchEmployee] = useState<any[]>([]);
	const [fetchAsessor, setFetchAsessor] = useState<any[]>([]);
	const [fetchEvaluation, setFetchEvaluation] = useState<any[]>([]);
	const [fetchEvaluationItems, setFetchEvaluationItems] = useState<any[]>([]);
	const [fetchDivision, setFetchDivision] = useState<any[]>([]);
	const [fetchJobdeskGroup, setFetchJobdeskGroup] = useState<any[]>([]);
	const [fetchJobdeskUnit, setFetchJobdeskUnit] = useState<any[]>([]);

	const [employeeId, setEmployeeId] = useState<number | string>('');
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [partnerIds, setPartnerIds] = useState<number | string>('');
	const [assessorIds, setAssessorIds] = useState<number | string>('');
	const [status, setStatus] = useState<string>('');
	const [gradingId, setGradingId] = useState<number | string>('');
	const [unitId, setUnitId] = useState<number | string>('');
	const [evaluationId, setEvaluationId] = useState<number | string>('');
	const [evaluationItemsId, setEvaluationItemsId] = useState<number | string>('');
	const [divisionId, setDivisionId] = useState<number | string>('');
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await ItemPenilaian.DataItemPenilaian(0, 10, access_token);
			setfetch(response.data.data.result);
			const responseKaryawan = await ItemPenilaian.DataKaryawan(access_token);
			setFetchEmployee(responseKaryawan.data.data.result);
			const responseAsessor = await ItemPenilaian.DataAsessor(access_token);
			setFetchAsessor(responseAsessor.data.data.result);
			const responseEvaluation = await ItemPenilaian.DataEvaluation(access_token);
			setFetchEvaluation(responseEvaluation.data.data.result);
			const responseEvaluationItems = await ItemPenilaian.DataItemEvaluation(access_token);
			setFetchEvaluationItems(responseEvaluationItems.data.data.result);
			const responseDivision = await ItemPenilaian.DataDivision(access_token);
			setFetchDivision(responseDivision.data.data.result);
			const responseJobdeskGroup = await ItemPenilaian.DataJobdeskGradeGroupDropdown(access_token);
			setFetchJobdeskGroup(responseJobdeskGroup.data.data.result);
			const responseUnit = await ItemPenilaian.DataJobdeskUnit(access_token);
			setFetchJobdeskUnit(responseUnit.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const CreateJobdesk = async () => {
		const data = {
			employee_id: parseInt(employeeId as string, 10),
			name: name,
			description: description,
			partner_ids: `|${partnerIds}|`,
			asessor_ids: `|${assessorIds}|`,
			status: status,
			uid: `${evaluationId}|${evaluationItemsId}`,
			grading_id: parseInt(gradingId as string, 10),
			unit_id: parseInt(unitId as string, 10),
			evaluation_id: parseInt(evaluationId as string, 10),
			evaluation_items_id: parseInt(evaluationItemsId as string, 10),
			division_id: parseInt(divisionId as string, 10),
		};

		try {
			await ItemPenilaian.CreateJobdesk(data);
			fetchData();
			Swal.fire({
				title: 'Berhasil!',
				text: 'Jobdesk berhasil dibuat.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			closeModal('addPenilaian');
		} catch (error) {
			console.error(error);
			Swal.fire({
				title: 'Gagal!',
				text: 'Terjadi kesalahan saat membuat jobdesk.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		}
	};

	const EditJobdesk = async (id: number) => {
		const data = {
			employee_id: parseInt(employeeId as string, 10),
			name: name,
			description: description,
			partner_ids: `|${partnerIds}|`,
			asessor_ids: `|${assessorIds}|`,
			status: status,
			uid: `${evaluationId}|${evaluationItemsId}`,
			grading_id: parseInt(gradingId as string, 10),
			unit_id: parseInt(unitId as string, 10),
			evaluation_id: parseInt(evaluationId as string, 10),
			evaluation_items_id: parseInt(evaluationItemsId as string, 10),
			division_id: parseInt(divisionId as string, 10),
		};

		try {
			await ItemPenilaian.EditJobdesk(data, id); // Update the API function to handle PUT
			Swal.fire('Updated!', 'The item has been updated.', 'success');
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	const DeleteJobdesk = async (id: number) => {
		try {
			await ItemPenilaian.DeleteJobdesk(id);
			Swal.fire('Deleted!', 'The item has been deleted.', 'success');
			fetchData();
		} catch (error) {
			console.error(error);
			Swal.fire('Error!', 'Failed to delete the item.', 'error');
		}
	};

	const openEditModal = (item: any) => {
		setEmployeeId(item.employee_id);
		setName(item.name);
		setDescription(item.description);
		setPartnerIds(item.partner_ids);
		setAssessorIds(item.asessor_ids);
		setStatus(item.status);
		setGradingId(item.grading_id);
		setUnitId(item.unit_id);
		setEvaluationId(item.evaluation_id);
		setEvaluationItemsId(item.evaluation_items_id);
		setDivisionId(item.division_id);
		setIsEditMode(true);
		openModal('addPenilaian');
	};

	const handleDialog = () => {
		openModal('addPenilaian');
		setEmployeeId('');
		setName('');
		setDescription('');
		setPartnerIds('');
		setAssessorIds('');
		setStatus('');
		setGradingId('');
		setUnitId('');
		setEvaluationId('');
		setEvaluationItemsId('');
		setDivisionId('');
		setIsEditMode(false);
	};

	const detailPenilaian = () => {
		navigate('/hrd/detail-penilaian');
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">List Item Penilaian</h3>
			</div>

			<div className="h-[1px] w-full bg-gray-300"></div>

			<div className="mt-6 flex items-center justify-between">
				<div className="flex items-center gap-2"></div>

				<div className="flex items-center gap-2">
					<button className="btn btn-xs" onClick={handleDialog}>
						<span>+</span> Tambah
					</button>
					<button className="btn btn-xs" onClick={detailPenilaian}>
						Detail Penilaian
					</button>
				</div>
			</div>

			<div className="q-mt card mt-5 w-full bg-base-100 shadow-xl">
				<div className="card-body overflow-auto">
					<table className="table table-zebra mb-24 h-full w-full">
						<thead>
							<tr>
								<th className="text-xs">No</th>
								<th className="text-xs">Identifier</th>
								<th className="text-xs">Deskripsi</th>
								<th className="text-xs">Unit</th>
								<th className="text-xs">Action</th>
							</tr>
						</thead>
						<tbody>
							{fetch.map((item, index) => (
								<tr key={item.id}>
									<td className="px-4 py-2">{index + 1}</td>
									<td className="px-4 py-2">{item?.name}</td>
									<td className="px-4 py-2">{item?.description}</td>
									<td className="px-4 py-2">{item?.jobdeskunit?.name ? item?.jobdeskunit?.name : '-'}</td>
									<td className="relative px-4 py-2">
										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="btn btn-primary btn-sm">
												...
											</label>
											<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
												<li>
													<a onClick={() => openEditModal(item)}>Edit</a>
												</li>
												<li>
													<a onClick={() => DeleteJobdesk(item.id)}>Hapus</a>
												</li>
											</ul>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<Modal id="addPenilaian">
				<div className="space-y-6 p-6">
					<h3 className="text-2xl font-bold text-gray-800">
						{isEditMode ? 'Edit Item Penilaian' : 'Tambah Item Penilaian'}
					</h3>

					{/* Employee */}
					<div>
						<label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">
							Karyawan
						</label>
						<select
							id="employee_id"
							className="select select-bordered mt-2 w-full"
							value={employeeId} // Pastikan employeeId sudah terisi dengan data saat edit
							onChange={(e) => setEmployeeId(e.target.value)}
						>
							<option value="" disabled selected>
								Pilih Karyawan
							</option>
							{fetchEmployee.map((item, index) => (
								<option value={item.id} key={index}>
									{item.full_name}
								</option>
							))}
						</select>
					</div>

					{/* Name */}
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Nama
						</label>
						<input
							type="text"
							id="name"
							className="input input-bordered mt-2 w-full"
							placeholder="Masukkan nama"
							value={name} // Pastikan name sudah terisi dengan data saat edit
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					{/* Description */}
					<div>
						<label htmlFor="description" className="block text-sm font-medium text-gray-700">
							Deskripsi
						</label>
						<textarea
							id="description"
							className="textarea textarea-bordered mt-2 w-full"
							placeholder="Masukkan deskripsi"
							rows={3}
							value={description} // Pastikan description sudah terisi dengan data saat edit
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>

					{/* Partner */}
					<div>
						<label htmlFor="partner_ids" className="block text-sm font-medium text-gray-700">
							Partner
						</label>
						<select
							id="partner_ids"
							className="select select-bordered mt-2 w-full"
							value={partnerIds} // Pastikan partnerIds sudah terisi dengan data saat edit
							onChange={(e) => setPartnerIds(e.target.value)}
						>
							<option value="" disabled selected>
								Pilih Partner
							</option>
							{fetchEmployee.map((item, index) => (
								<option value={item.id} key={index}>
									{item.full_name}
								</option>
							))}
						</select>
					</div>

					{/* Assessor */}
					<div>
						<label htmlFor="asessor_ids" className="block text-sm font-medium text-gray-700">
							Assessor
						</label>
						<select
							id="asessor_ids"
							className="select select-bordered mt-2 w-full"
							value={assessorIds} // Pastikan assessorIds sudah terisi dengan data saat edit
							onChange={(e) => setAssessorIds(e.target.value)}
						>
							<option value="" disabled selected>
								Pilih Assessor
							</option>
							{fetchAsessor.map((item, index) => (
								<option value={item.id} key={index}>
									{item.full_name}
								</option>
							))}
						</select>
					</div>

					{/* Status */}
					<div>
						<label htmlFor="status" className="block text-sm font-medium text-gray-700">
							Status
						</label>
						<select
							id="status"
							className="select select-bordered mt-2 w-full"
							value={status} // Pastikan status sudah terisi dengan data saat edit
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="" disabled selected>
								Pilih Status
							</option>
							<option value="In Progress">In Progress</option>
							<option value="Completed">Completed</option>
						</select>
					</div>

					{/* Grading */}
					<div>
						<label htmlFor="grading_id" className="block text-sm font-medium text-gray-700">
							Group Grade
						</label>
						<select
							id="grading_id"
							className="select select-bordered mt-2 w-full"
							value={gradingId} // Pastikan gradingId sudah terisi dengan data saat edit
							onChange={(e) => setGradingId(e.target.value)}
						>
							<option value="" disabled selected>
								Pilih Group
							</option>
							{fetchJobdeskGroup.map((item, index) => (
								<option value={item.id} key={index}>
									{item.identifier}
								</option>
							))}
						</select>
					</div>

					{/* Unit */}
					<div>
						<label htmlFor="unit_id" className="block text-sm font-medium text-gray-700">
							Unit
						</label>
						<select
							id="unit_id"
							className="select select-bordered mt-2 w-full"
							value={unitId} // Pastikan unitId sudah terisi dengan data saat edit
							onChange={(e) => setUnitId(e.target.value)}
						>
							<option value="" disabled selected>
								Pilih Unit
							</option>
							{fetchJobdeskUnit.map((item, index) => (
								<option value={item.id} key={index}>
									{item.name}
								</option>
							))}
						</select>
					</div>

					{/* Evaluation */}
					<div>
						<label htmlFor="evaluation_id" className="block text-sm font-medium text-gray-700">
							Evaluasi
						</label>
						<select
							id="evaluation_id"
							className="select select-bordered mt-2 w-full"
							value={evaluationId} // Pastikan evaluationId sudah terisi dengan data saat edit
							onChange={(e) => setEvaluationId(e.target.value)}
						>
							<option value="" disabled selected>
								Pilih Evaluasi
							</option>
							{fetchEvaluation.map((item, index) => (
								<option value={item.id} key={index}>
									{item.employee.full_name}
								</option>
							))}
						</select>
					</div>

					{/* Evaluation Items */}
					<div>
						<label htmlFor="evaluation_items_id" className="block text-sm font-medium text-gray-700">
							Item Evaluasi
						</label>
						<select
							id="evaluation_items_id"
							className="select select-bordered mt-2 w-full"
							value={evaluationItemsId} // Pastikan evaluationItemsId sudah terisi dengan data saat edit
							onChange={(e) => setEvaluationItemsId(e.target.value)}
						>
							<option value="" disabled selected>
								Pilih Item Evaluasi
							</option>
							{fetchEvaluationItems.map((item, index) => (
								<option value={item.id} key={index}>
									{item.name}
								</option>
							))}
						</select>
					</div>

					{/* Division */}
					<div>
						<label htmlFor="division_id" className="block text-sm font-medium text-gray-700">
							Division
						</label>
						<select
							id="division_id"
							className="select select-bordered mt-2 w-full"
							value={divisionId} // Pastikan divisionId sudah terisi dengan data saat edit
							onChange={(e) => setDivisionId(e.target.value)}
						>
							<option value="" disabled selected>
								Pilih Divisi
							</option>
							{fetchDivision.map((item, index) => (
								<option value={item.id} key={index}>
									{item.name}
								</option>
							))}
						</select>
					</div>

					{/* Buttons */}
					<div className="flex justify-end space-x-3 pt-5">
						<button type="button" className="btn btn-outline" onClick={() => closeModal('addPenilaian')}>
							Batal
						</button>
						<button onClick={isEditMode ? () => EditJobdesk(fetch[0]?.id) : CreateJobdesk} className="btn btn-primary">
							{isEditMode ? 'Update' : 'Create'}
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ListItemPenilaian;
