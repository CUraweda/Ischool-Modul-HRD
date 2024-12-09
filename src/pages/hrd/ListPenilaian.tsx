import { ItemPenilaian } from '@/middlewares/api';
import { useState, useEffect } from 'react';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import Swal from 'sweetalert2';

const ListPenilaian = () => {
	const [fetch, setfetch] = useState<any[]>([]);
	const [fetchDivision, setFetchDivision] = useState<any[]>([]);
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

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await ItemPenilaian.DataListPenilaian(0, 10, access_token);
			setfetch(response.data.data.result);
			const responseDivision = await ItemPenilaian.DataDivision(access_token);
			setFetchDivision(responseDivision.data.data.result);
		} catch (error) {
			console.error(error);
		}
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
	}, []);

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
					<table className="table table-zebra h-full w-full">
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
									</td>{' '}
									<td className="relative px-4 py-2">
										<label className="btn btn-primary btn-sm">...</label>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ListPenilaian;
