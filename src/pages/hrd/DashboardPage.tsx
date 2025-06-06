import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Legend,
	Tooltip,
} from 'chart.js';
import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { useState, useEffect } from 'react';
import { Dashboard } from '@/middlewares/api';
import CheckboxSelect from '../../components/SelectComponent';
import Swal from 'sweetalert2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Legend, Tooltip);

interface ChartDataItem {
	name: string;
	hadir: number;
	cuti: number;
	izin: number;
}

interface Karyawan {
	id: string;
	full_name: string;
}

interface PengumumanItem {
	id: any;
	plan_date: string;
	title: string;
	notes: string;
}

interface DataApplicant {
	today_counter: number;
	month_counter: number;
}

interface DataTraining {
	training_counter: number;
	suggestion_counter: number;
}

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		tooltip: {
			callbacks: {
				label: function (tooltipItem: any) {
					return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
				},
			},
		},
	},
	scales: {
		x: {
			grid: {
				display: false,
			},
		},
		y: {
			grid: {
				color: '#E5E7EB',
			},
			ticks: {
				beginAtZero: true,
				stepSize: 10,
			},
		},
	},
};

const DashboardPage = () => {
	const [kirimKepada, setKirimKepada] = useState<string>('');
	const [daftarKaryawan, setDaftarKaryawan] = useState<Karyawan[]>([]);
	const [selectedPenerima, setSelectedPenerima] = useState<string[]>([]);
	const [title, setTitle] = useState<string>('');
	const [planDate, setPlanDate] = useState<string>('');
	const [notes, setNotes] = useState<string>('');
	const [pengumuman, setPengumuman] = useState<PengumumanItem[]>([]);
	const [chart, setChart] = useState<ChartDataItem[]>([]);
	const [dataApplicant, setDataApplicant] = useState<DataApplicant>({
		today_counter: 0,
		month_counter: 0,
	});
	const [daftarApplicant, setDaftarApplicant] = useState<any[]>([]);
	const [dataTraining, setDataTraining] = useState<DataTraining>({
		training_counter: 0,
		suggestion_counter: 0,
	});
	const [daftarTraining, setDaftarTraining] = useState<any[]>([]);

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const handleDialog = () => {
		openModal('addPengumuman');
	};

	const GetTraining = async () => {
		try {
			const response = await Dashboard.DataTraining(access_token);
			setDataTraining(response.data.data);
			setDaftarTraining(response.data.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const GetApplicant = async () => {
		try {
			const response = await Dashboard.DataApplicant(access_token);
			setDataApplicant(response.data.data);
			setDaftarApplicant(response.data.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const GetPengumuman = async () => {
		try {
			const response = await Dashboard.DataPengumuman(access_token);
			setPengumuman(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const DataChart = async () => {
		try {
			const response = await Dashboard.DataChart(access_token);
			setChart(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const dropdownKaryawan = async () => {
		try {
			const response = await Dashboard.DataKaryawan(access_token);
			setDaftarKaryawan(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const CreatePengumuman = async () => {
		const localDate = new Date(planDate);
		const timezoneOffset = localDate.getTimezoneOffset() * 60000;
		const adjustedDate = new Date(localDate.getTime() - timezoneOffset);
		const data = {
			title: title,
			plan_date: adjustedDate.toISOString(),
			is_specific: kirimKepada === 'Semua' ? false : true,
			employee_ids: selectedPenerima,
			notes: notes,
		};

		try {
			await Dashboard.PostPengumuman(data);
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Sukses Menambahkan data Pengumuman',
			});
			GetPengumuman();
			closeModal('addPengumuman');
		} catch (error: any) {
			const apiErrorMessage = error.response?.data?.message;

			if (apiErrorMessage) {
				closeModal('addPengumuman');
				Swal.fire({
					icon: 'error',
					title: 'Gagal',
					text: apiErrorMessage,
				});
			} else {
				closeModal('addPengumuman');
				Swal.fire({
					icon: 'error',
					title: 'Gagal',
					text: 'Terjadi kesalahan, silakan coba lagi.',
				});
			}
		}
	};

	const trigerDelete = (id: number) => {
		Swal.fire({
			title: 'Apakah kamu yakin?',
			text: 'kamu tidak dapat mengembalikan data ini!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, tutup!',
		}).then((result) => {
			if (result.isConfirmed) {
				HapusPengumuman(id);
			}
		});
	};

	const HapusPengumuman = async (id: any) => {
		try {
			await Dashboard.DeletePengumuman(id);
			GetPengumuman();
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		dropdownKaryawan();
		GetPengumuman();
		DataChart();
		GetApplicant();
		GetTraining();
	}, [access_token]);

	const handleKirimKepadaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log('Kirim Kepada Changed:', e.target.value);
		setKirimKepada(e.target.value);
	};

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Dashboard</h1>
			</div>

			<div className="mb-8 flex w-full flex-wrap gap-6 lg:flex-nowrap">
				<div className="w-full rounded-lg bg-white p-6 shadow-md">
					<h2 className="text-xl font-semibold">Kehadiran</h2>
					{/* <div className="mb-4 flex justify-between">
						<div className="text-lg">
							<span className="font-bold text-blue-500">
								Hadir: {chart.reduce((total, item) => total + item.hadir, 0)}
							</span>
							|
							<span className="font-bold text-red-500">
								Hadir: {chart.reduce((total, item) => total + item.izin, 0)}
							</span>
							|
							<span className="font-bold text-yellow-500">
								Hadir: {chart.reduce((total, item) => total + item.cuti, 0)}
							</span>
						</div>
					</div> */}
					<Line
						data={{
							labels: chart.map((item) => item.name),
							datasets: [
								{
									label: 'Karyawan Hadir',
									data: chart.map((item) => item.hadir),
									borderColor: 'rgba(75, 123, 155, 1)',
									backgroundColor: 'rgba(75, 123, 155, 0.2)',
									tension: 0.4,
									pointRadius: 3,
									pointHoverRadius: 5,
								},
								{
									label: 'Izin',
									data: chart.map((item) => item.izin),
									borderColor: 'rgba(255, 111, 97, 1)',
									backgroundColor: 'rgba(255, 111, 97, 0.2)',
									tension: 0.4,
									pointRadius: 3,
									pointHoverRadius: 5,
								},
								{
									label: 'Cuti',
									data: chart.map((item) => item.cuti),
									borderColor: 'rgba(245, 192, 55, 1)',
									backgroundColor: 'rgba(245, 192, 55, 0.2)',
									tension: 0.4,
									pointRadius: 3,
									pointHoverRadius: 5,
								},
							],
						}}
						options={options}
					/>
				</div>

				<div className="w-full rounded-lg bg-white p-6 shadow-md">
					<div className="mb-4">
						<h2 className="text-xl font-semibold">Pengumuman</h2>
						<div className="h-52 overflow-auto">
							{pengumuman.map((item, index) => (
								<div className="flex items-center justify-between">
									<div className="mt-4 text-gray-700" key={index}>
										<p>
											{item.plan_date.split('T')[0]} - {item.plan_date.split('T')[1].split('.')[0].slice(0, -3)} -
											<span className="font-bold"> {item.title}</span>
										</p>
										<p>{item.notes}</p>
									</div>

									<button className="btn btn-circle btn-error btn-xs" onClick={() => trigerDelete(item.id)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="white"
											className="size-6"
										>
											<path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
										</svg>
									</button>
								</div>
							))}
						</div>
					</div>
					<button className="h-10 w-10 rounded-full bg-blue-500 text-white" onClick={handleDialog}>
						+
					</button>
				</div>
			</div>

			<div className="lg: flex flex-wrap justify-center gap-4 lg:flex-nowrap">
				<div className="mb-8 w-full rounded-lg bg-white p-4 shadow-md">
					<div className="flex items-center justify-between">
						<div className="w-full border-r border-gray-300 text-center">
							<div className="text-xl font-semibold">
								<div className="text-xl font-semibold">Pelamar Hari Ini</div>
							</div>
							<p className="mt-2 text-3xl font-bold text-black">{dataApplicant.today_counter}</p>
						</div>
						<div className="w-full text-center">
							<div className="text-xl font-semibold">Total Keseluruhan</div>
							<p className="mt-2 text-3xl font-bold text-black">{dataApplicant.month_counter}</p>
						</div>
					</div>

					<div className="mt-4 h-[10rem] overflow-auto rounded-lg bg-gray-100">
						<table className="min-w-full table-auto">
							<tbody>
								{daftarApplicant.map((applicant, index) => (
									<tr key={index} className="border-b bg-white hover:bg-gray-50">
										<td className="px-4 py-2">{applicant.full_name}</td>
										<td className="px-4 py-2">{applicant.createdAt.split('T')[0]}</td>
										<td className="px-4 py-2">{applicant.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="mb-8 w-full rounded-lg bg-white p-4 shadow-md">
					<div className="flex items-center justify-between">
						<div className="w-full border-r border-gray-300 text-center">
							<div className="text-xl font-semibold">
								<div className="text-xl font-semibold">Sedang Pelatihan</div>
							</div>
							<p className="mt-2 text-3xl font-bold text-black">{dataTraining.training_counter}</p>
						</div>
						<div className="w-full text-center">
							<div className="text-xl font-semibold">Pengajuan</div>
							<p className="mt-2 text-3xl font-bold text-black">{dataTraining.suggestion_counter}</p>
						</div>
					</div>

					<div className="mt-4 h-[10rem] overflow-auto rounded-lg bg-gray-100">
						<table className="min-w-full table-auto">
							<tbody>
								{daftarTraining.map((applicant, index) => (
									<tr key={index} className="border-b bg-white hover:bg-gray-50">
										<td className="px-4 py-2">{applicant.title}</td>
										<td className="px-4 py-2">{applicant.createdAt.split('T')[0]}</td>
										<td className="px-4 py-2">{applicant.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<Modal id="addPengumuman">
				<div className="text-xl font-bold">Buat Pengumuman Baru</div>
				<div className="modal-body p-4">
					<form onSubmit={CreatePengumuman}>
						<div className="form-control mb-4">
							<label htmlFor="judul" className="label">
								<span className="label-text font-semibold">Judul</span>
							</label>
							<input
								type="text"
								id="judul"
								placeholder="Masukkan judul pengumuman"
								className="input input-bordered w-full"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>

						<div className="form-control mb-4">
							<label htmlFor="tanggalJam" className="label">
								<span className="label-text font-semibold">Tanggal dan Jam</span>
							</label>
							<input
								type="datetime-local"
								id="tanggalJam"
								className="input input-bordered w-full"
								onChange={(e) => setPlanDate(e.target.value)}
							/>
						</div>

						<div className="form-control mb-4">
							<label htmlFor="kirimKepada" className="label">
								<span className="label-text font-semibold">Kirim Kepada</span>
							</label>
							<select
								id="kirimKepada"
								className="select select-bordered w-full"
								value={kirimKepada}
								onChange={handleKirimKepadaChange}
							>
								<option value="" disabled>
									Pilih penerima
								</option>
								<option value="Semua">Semua</option>
								<option value="Custom">Custom</option>
							</select>
						</div>

						{kirimKepada === 'Custom' && (
							<CheckboxSelect
								options={daftarKaryawan.map((karyawan) => ({
									id: karyawan.id,
									full_name: karyawan.full_name,
								}))}
								selectedOptions={selectedPenerima}
								onChange={setSelectedPenerima}
							/>
						)}

						<div className="form-control mb-4">
							<label htmlFor="pesan" className="label">
								<span className="label-text font-semibold">Pesan</span>
							</label>
							<textarea
								id="pesan"
								placeholder="Tulis pesan di sini"
								className="textarea textarea-bordered w-full"
								rows={3}
								onChange={(e) => setNotes(e.target.value)}
							></textarea>
						</div>

						<div className="modal-action">
							<button type="button" className="btn btn-primary" onClick={CreatePengumuman}>
								Simpan
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default DashboardPage;
