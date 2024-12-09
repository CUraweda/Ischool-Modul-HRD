import { useState, useEffect } from 'react';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { ItemPenilaian } from '@/middlewares/api';
import Swal from 'sweetalert2';

const DetailListItemPenilaian = () => {
	const [fetch, setFetch] = useState<any[]>([]);
	const [fetchGrade, setFetchGrade] = useState<any[]>([]);
	const [fetchJobdeskUnit, setFetchJobdeskUnit] = useState<any[]>([]);
	const [identfier, setIdentifier] = useState('');
	const [group, setGroup] = useState<number | null>(0);
	const [unitId, setUnitId] = useState<number | string>('');
	const [disable, setDisable] = useState<any>(false);
	const [editMode, setEditModa] = useState<boolean>(false);
	const [nameGrade, setNameGrade] = useState('');
	const [grade, setGrade] = useState('');
	const [indicator, setIndicator] = useState<number | null>(0);
	const [id, setId] = useState('');

	let access_token = sessionStorage.getItem('access_token');
	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await ItemPenilaian.DataJobdeskGradeGroup(0, 10000, access_token);
			setFetch(response.data.data.result);

			const responseGrade = await ItemPenilaian.DataJobdeskGrade(0, 10000, access_token);
			setFetchGrade(responseGrade.data.data.result);

			const responseUnit = await ItemPenilaian.DataJobdeskUnit(access_token);
			setFetchJobdeskUnit(responseUnit.data.data.result);
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Failed to fetch data', 'error');
		}
	};

	const createData = async () => {
		const data = {
			identifier: identfier,
			unit_id: unitId,
			disabled: disable,
		};
		try {
			await ItemPenilaian.CreateJobdeskGradeGroup(data, access_token);
			Swal.fire('Success', 'Data berhasil ditambahkan', 'success');
			fetchData();
			closeModal('addGroup');
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal menambahkan data', 'error');
		}
	};

	const openEditModal = (item: any) => {
		setId(item.id);
		setIdentifier(item.identifier);
		setUnitId(item.unit_id);
		setDisable(item.disable);
		setEditModa(true);
		openModal('addGroup');
	};

	const updateData = async () => {
		const data = {
			identifier: group,
			unit_id: unitId,
			disabled: disable,
		};
		try {
			await ItemPenilaian.UpdateJobdeskGradeGroup(data, id, access_token);
			Swal.fire('Success', 'Data berhasil diperbarui', 'success');
			fetchData();
			closeModal('addGroup');
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal memperbarui data', 'error');
		}
	};

	const deleteData = async (id: any) => {
		Swal.fire({
			title: 'Apakah Anda yakin?',
			text: 'Data yang dihapus tidak dapat dikembalikan!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, hapus!',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await ItemPenilaian.DeleteJobdeskGradeGroup(id, access_token);
					Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
					fetchData();
				} catch (error) {
					console.error(error);
					Swal.fire('Error', 'Gagal menghapus data', 'error');
				}
			}
		});
	};

	const createGrade = async () => {
		const data = {
			name: nameGrade,
			grade: grade,
			indicator: indicator,
			group_id: group,
		};
		try {
			await ItemPenilaian.CreateJobdeskGrade(data, access_token);
			Swal.fire('Success', 'Data berhasil ditambahkan', 'success');
			fetchData();
			closeModal('crudGradeModal');
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal menambahkan data', 'error');
		}
	};

	const openEditModalGrade = (item: any) => {
		setId(item.id);
		setNameGrade(item.name);
		setGrade(item.grade);
		setIndicator(item.indicator);
		setGroup(item.group_id);
		setEditModa(true);
		openModal('crudModal');
	};

	const updateGrade = async () => {
		const data = {
			name: nameGrade,
			grade: grade,
			indicator: indicator,
			group_id: group,
			group_uid: `${group}|${grade}`,
			indicator_uid: `${group}|${indicator}`,
		};
		try {
			await ItemPenilaian.UpdateJobdeskGrade(data, id, access_token);
			Swal.fire('Success', 'Data berhasil diubah', 'success');
			fetchData();
			closeModal('crudGradeModal');
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Gagal menambahkan data', 'error');
		}
	};

	const deleteGrade = async (id: string) => {
		closeModal('itemPenilaian');
		Swal.fire({
			title: 'Apakah Anda yakin?',
			text: 'Data yang dihapus tidak dapat dikembalikan!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, hapus!',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await ItemPenilaian.DeleteJobdeskGrade(id, access_token);
					Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
					fetchData();
				} catch (error) {
					console.error(error);
					Swal.fire('Error', 'Gagal menghapus data', 'error');
				}
			}
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDialogPenilaian = () => {
		openModal('itemPenilaian');
	};

	const handleDialogCrud = () => {
		openModal('crudModal');
		setNameGrade('');
		setGrade('');
		setIndicator(null);
		setGroup(0);
	};

	const handleDialog = () => {
		setGroup(0);
		setUnitId('');
		setDisable(false);
		setEditModa(false);
		openModal('addGroup');
	};

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">List Item Penilaian</h3>
			</div>

			<div className="h-[1px] w-full bg-gray-300"></div>

			<div className="mt-6 flex items-center justify-between">
				<button className="btn btn-xs" onClick={handleDialog}>
					<span>+</span> Tambah Nilai Group
				</button>
				<div className="flex items-center gap-2">
					<button className="btn btn-xs" onClick={handleDialogPenilaian}>
						<span>+</span> Tambah Nilai
					</button>
				</div>
			</div>

			<div className="q-mt card mt-5 w-full bg-base-100 shadow-xl">
				<div className="card-body overflow-auto">
					<table className="table table-zebra mb-14 h-full">
						<thead>
							<tr>
								<th className="text-xs">No</th>
								<th className="text-xs">Penilaian</th>
								<th className="text-xs">Unit</th>
								<th className="text-xs">Action</th>
							</tr>
						</thead>
						<tbody>
							{fetch.map((item, index) => (
								<tr key={item.id}>
									<td className="px-4 py-2">{index + 1}</td>
									<td className="px-4 py-2">{item?.identifier}</td>
									<td className="px-4 py-2">{item?.jobdeskunit?.name}</td>
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
													<a onClick={() => deleteData(item.id)}>Hapus </a>
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

			<Modal id="itemPenilaian">
				<div>
					<button className="btn btn-xs bg-blue-300 text-white" onClick={handleDialogCrud}>
						<span>+</span> Tambah Nilai
					</button>
					{fetchGrade.map((item, index) => (
						<div className="flex items-center justify-between p-4 shadow transition hover:shadow-md" key={index}>
							<div className="flex items-center gap-3">
								<div className="rounded-full bg-blue-100 p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										className="h-6 w-6 text-blue-500"
										viewBox="0 0 16 16"
									>
										<path d="M2 6h12v2H2z" />
										<path d="M2 10h9v2H2z" />
									</svg>
								</div>
								<div>
									<h4 className="text-sm font-semibold text-gray-800">{item?.grade}</h4>
									<span className="text-xs text-gray-500">{item?.indicator}</span>
								</div>
							</div>
							<div className="flex gap-2">
								<button className="btn btn-primary btn-xs" onClick={() => openEditModalGrade(item)}>
									Edit
								</button>
								<button className="btn btn-error btn-xs text-white" onClick={() => deleteGrade(item.id)}>
									Delete
								</button>
							</div>
						</div>
					))}

					<Modal id="crudModal">
						<div className="p-6">
							<h3 className="mb-4 text-center text-lg font-bold">{editMode ? 'Edit Penilaian' : 'Tambah Penilaian'}</h3>
							<form className="space-y-4">
								{/* Name Field */}
								<div>
									<label htmlFor="name" className="block text-sm font-medium">
										Name
									</label>
									<input
										type="text"
										id="name"
										className="input input-bordered w-full"
										placeholder="Enter evaluation name"
										value={nameGrade}
										onChange={(e) => setNameGrade(e.target.value)}
									/>
								</div>

								{/* Grade Field */}
								<div>
									<label htmlFor="grade" className="block text-sm font-medium">
										Grade
									</label>
									<select
										id="grade"
										className="select select-bordered w-full"
										value={grade}
										onChange={(e) => setGrade(e.target.value)}
									>
										<option value="">Select grade</option>
										<option value="A">A</option>
										<option value="B">B</option>
										<option value="C">C</option>
										<option value="D">D</option>
										<option value="E">E</option>
									</select>
								</div>

								{/* Indicator Field */}
								<div>
									<label htmlFor="indicator" className="block text-sm font-medium">
										Indicator
									</label>
									<input
										type="number"
										id="indicator"
										className="input input-bordered w-full"
										placeholder="Enter indicator value"
										value={Number(indicator)}
										onChange={(e) => setIndicator(Number(e.target.value))}
									/>
								</div>

								{/* Group ID Field */}
								<div>
									<label htmlFor="group_id" className="block text-sm font-medium">
										Group
									</label>
									<select
										id="group_id"
										className="select select-bordered w-full"
										value={group ?? 0}
										onChange={(e) => setGroup(parseInt(e.target.value))}
									>
										<option value="">Select group</option>
										{fetch.map((group) => (
											<option key={group.id} value={group.id}>
												{group.identifier}
											</option>
										))}
									</select>
								</div>
							</form>

							{/* Action Buttons */}
							<div className="mt-6 flex justify-end gap-3">
								<button type="button" className="btn btn-outline" onClick={() => closeModal('crudModal')}>
									Cancel
								</button>
								<button onClick={editMode ? updateGrade : createGrade} className="btn btn-primary">
									{editMode ? 'Update' : 'Create'}
								</button>
							</div>
						</div>
					</Modal>

					<div className="mt-8 flex justify-center">
						<button className="btn btn-outline btn-primary btn-sm" onClick={() => closeModal('itemPenilaian')}>
							Tutup
						</button>
					</div>
				</div>
			</Modal>

			<Modal id="addGroup">
				<div className="p-6">
					<h3 className="mb-4 text-center text-lg font-bold">
						{editMode ? 'Edit Group Penilaian' : 'Tambah Group Penilaian'}
					</h3>
					<div className="mb-4">
						<label htmlFor="identifier" className="block text-sm font-medium">
							Identifier
						</label>
						<input
							type="text"
							id="identifier"
							className="input input-bordered w-full"
							placeholder="Masukkan identifier"
							value={identfier}
							onChange={(e) => setIdentifier(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="unit_id" className="block text-sm font-medium">
							Unit ID
						</label>
						<select
							id="unit_id"
							className="select select-bordered mt-2 w-full"
							onChange={(e) => setUnitId(e.target.value)}
							value={unitId}
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
					<div className="mb-4 flex items-center">
						<input
							type="checkbox"
							id="disabled"
							className="checkbox-primary checkbox mr-2"
							onChange={(e) => setDisable(e.target.checked)}
							value={disable}
						/>
						<label htmlFor="disabled" className="text-sm font-medium">
							Disabled
						</label>
					</div>
					<div className="mt-6 flex justify-end gap-3">
						<button type="button" className="btn btn-outline" onClick={() => closeModal('addGroup')}>
							Batal
						</button>
						<button onClick={editMode ? updateData : createData} className="btn btn-primary">
							{editMode ? 'Update' : 'Create'}
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DetailListItemPenilaian;