import { ItemPenilaian } from '@/middlewares/api';
import { useState, useEffect } from 'react';
import Modal, { openModal } from '../../components/ModalProps';
import Swal from 'sweetalert2';

const ListPenilaian = () => {
	const [fetch, setfetch] = useState<any[]>([]);
	const [fetchDivision, setFetchDivision] = useState<any[]>([]);
	const [detailEvaluation, setDetailEvaluation] = useState<DetailEvaluation | null>(null);
	const [monthId, setMonthId] = useState<number | null>(null);
	const [divisionId, setDivisionId] = useState<number | null>(null);

	const monthNames = [
		{
			label: 'Januari',
			value: 1,
		},
		{
			label: 'Februari',
			value: 2,
		},
		{
			label: 'Maret',
			value: 3,
		},
		{
			label: 'April',
			value: 4,
		},
		{
			label: 'Mei',
			value: 5,
		},
		{
			label: 'Juni',
			value: 6,
		},
		{
			label: 'Juli',
			value: 7,
		},
		{
			label: 'Agustus',
			value: 8,
		},
		{
			label: 'September',
			value: 9,
		},
		{
			label: 'Oktober',
			value: 10,
		},
		{
			label: 'November',
			value: 11,
		},
		{
			label: 'Desember',
			value: 12,
		},
	];

	interface JobdeskUnit {
		id: number;
		name: string;
	}

	interface EmployeeJobdesk {
		id: number;
		name: string;
		description: string;
		status: string;
		personal_grade: number;
		partner_grade: number;
		assesor_grade: number;
		overall_grade: string;
		jobdeskunit: JobdeskUnit;
	}

	interface DetailEvaluation {
		employeejobdesks: EmployeeJobdesk[];
	}

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await ItemPenilaian.DataListPenilaian(0, 10, access_token, divisionId, monthId);
			setfetch(response.data.data.result);
			const responseDivision = await ItemPenilaian.DataDivision(access_token);
			setFetchDivision(responseDivision.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const Detail = async (id: any) => {
		try {
			const detail = await ItemPenilaian.DetailListPenilaiain(id, access_token);
			setDetailEvaluation(detail.data.data);
			openModal('listPenilaian');
		} catch (error) {
			console.error(error);
		}
	};
	const Delete = async (id: any) => {
		// Menampilkan SweetAlert konfirmasi
		Swal.fire({
			title: 'Apakah Anda yakin?',
			text: 'Item ini akan dihapus secara permanen!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Ya, Hapus!',
			cancelButtonText: 'Tidak',
		}).then(async (result) => {
			// Jika pengguna mengonfirmasi penghapusan
			if (result.isConfirmed) {
				try {
					await ItemPenilaian.DeleteEvaluation(id, access_token);
					Swal.fire({
						icon: 'success',
						title: 'Berhasil',
						text: 'Item berhasil dihapus.',
					});
					fetchData(); // Memuat ulang data setelah penghapusan
				} catch (error) {
					console.error(error);
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Gagal menghapus item.',
					});
				}
			}
		});
	};

	const Kalkulasi = async (id: any) => {
		// Menambahkan SweetAlert konfirmasi sebelum kalkulasi
		Swal.fire({
			title: 'Apakah Anda yakin?',
			text: 'Proses kalkulasi akan dimulai untuk item ini!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Ya, Kalkulasi!',
			cancelButtonText: 'Tidak',
		}).then(async (result) => {
			// Jika pengguna mengonfirmasi
			if (result.isConfirmed) {
				try {
					// Melakukan kalkulasi
					await ItemPenilaian.Kalkulasi({}, id, access_token);
					Swal.fire({
						icon: 'success',
						title: 'Sukses',
						text: 'Kalkulasi berhasil dilakukan!',
					});
					fetchData(); // Memanggil fungsi fetch data setelah kalkulasi berhasil
				} catch (error) {
					console.error(error);
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Terjadi kesalahan saat melakukan kalkulasi.',
					});
				}
			}
		});
	};

	const Generate = async () => {
		const data = {
			month_id: monthId,
			division_id: divisionId,
		};

		if (!monthId || !divisionId) {
			Swal.fire({
				icon: 'warning',
				title: 'Peringatan',
				text: 'Harap pilih bulan dan divisi terlebih dahulu!',
			});
			return;
		}

		const confirm = await Swal.fire({
			title: 'Konfirmasi',
			text: 'Apakah Anda yakin ingin melakukan generate untuk bulan ini?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Ya, Lanjutkan',
			cancelButtonText: 'Batal',
		});

		if (confirm.isConfirmed) {
			try {
				await ItemPenilaian.GenerateMonth(data, access_token);
				await fetchData();
				Swal.fire({
					icon: 'success',
					title: 'Berhasil',
					text: 'Generate data berhasil dilakukan!',
				});
			} catch (error) {
				console.error(error);
				Swal.fire({
					icon: 'error',
					title: 'Gagal',
					text: 'Terjadi kesalahan saat melakukan generate data!',
				});
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, [divisionId, monthId]);

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">List Penilaian</h3>
			</div>

			<div className="h-[1px] w-full bg-gray-300"></div>

			<div className="mt-6 flex items-center justify-between">
				<div className="flex items-center gap-2"></div>
			</div>

			<div className="flex justify-end gap-5">
				<select onChange={(e) => setMonthId(parseInt(e.target.value))} className="select select-bordered w-fit">
					<option value="">Pilih Bulan</option>
					{monthNames.map((item, index) => (
						<option key={index} value={item.value}>
							{item.label}
						</option>
					))}
				</select>

				<select onChange={(e) => setDivisionId(parseInt(e.target.value))} className="select select-bordered w-fit">
					<option value="">Pilih Divisi</option>
					{fetchDivision.map((item, index) => (
						<option key={index} value={item.id}>
							{item.name}
						</option>
					))}
				</select>
				<button className="btn btn-primary" onClick={Generate}>
					Generate Bulan Ini
				</button>
			</div>

			<div className="q-mt card mt-5 w-full bg-base-100 shadow-xl">
				<div className="card-body overflow-auto">
					<table className="table table-zebra mb-24 h-full w-full">
						<thead>
							<tr>
								<th className="text-xs">No</th>
								<th className="text-xs">Nama</th>
								<th className="text-xs">Divisi</th>
								<th className="text-xs">Tahun Ajaran</th>
								<th className="text-xs">Bulan Mulai</th>
								<th className="text-xs">Bulan Selesai</th>
								<th className="text-xs">Action</th>
							</tr>
						</thead>
						<tbody>
							{fetch.map((item, index) => (
								<tr key={item.id}>
									<td className="px-4 py-2">{index + 1}</td>
									<td className="px-4 py-2">{item?.employee?.full_name}</td>
									<td className="px-4 py-2">
										{fetchDivision?.find((div) => div.id === item.division_id)?.name ?? '-'}
									</td>
									<td className="px-4 py-2">{item?.academic_year}</td>
									<td className="px-4 py-2">
										{monthNames?.find((month) => month.value === item.month_start)?.label ?? '-'}
									</td>
									<td className="px-4 py-2">
										{monthNames?.find((month) => month.value === item.month_end)?.label ?? '-'}
									</td>
									<td className="relative px-4 py-2">
										<div className="dropdown dropdown-end">
											<label tabIndex={0} className="btn btn-primary btn-sm">
												...
											</label>
											<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
												<li>
													<a onClick={() => Detail(item.id)}>Detail Jobdesk</a>
												</li>
												<li>
													<a onClick={() => Kalkulasi(item.id)}>Kalkulasi</a>
												</li>
												<li>
													<a onClick={() => Delete(item.id)}>Delete</a>
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

			<Modal id="listPenilaian">
				{detailEvaluation && (
					<div className="p-6">
						<h3 className="mb-6 text-2xl font-bold text-gray-700">Detail Jobdesk</h3>
						<div className="space-y-6">
							{detailEvaluation.employeejobdesks.map((jobdesk) => (
								<div
									key={jobdesk.id}
									className="rounded-xl border border-gray-300 bg-white p-5 shadow-lg transition-shadow duration-200 hover:shadow-xl"
								>
									<div className="mb-3 flex items-center justify-between">
										<h4 className="text-lg font-semibold text-gray-800">{jobdesk.name || 'Jobdesk Name'}</h4>
										<span className={`badge ${jobdesk.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
											{jobdesk.status}
										</span>
									</div>
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										<div>
											<p className="text-sm text-gray-500">Description</p>
											<p className="text-gray-700">{jobdesk.description || '-'}</p>
										</div>
										<div>
											<p className="text-sm text-gray-500">Jobdesk Unit</p>
											<p className="text-gray-700">{jobdesk.jobdeskunit?.name || '-'}</p>
										</div>
										<div>
											<p className="text-sm text-gray-500">Personal Grade</p>
											<p className="text-gray-700">{jobdesk.personal_grade || '0'}</p>
										</div>
										<div>
											<p className="text-sm text-gray-500">Partner Grade</p>
											<p className="text-gray-700">{jobdesk.partner_grade || '0'}</p>
										</div>
										<div>
											<p className="text-sm text-gray-500">Assessor Grade</p>
											<p className="text-gray-700">{jobdesk.assesor_grade || '0'}</p>
										</div>
										<div>
											<p className="text-sm text-gray-500">Overall Grade</p>
											<p className="text-gray-700">{jobdesk.overall_grade || '-'}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default ListPenilaian;
