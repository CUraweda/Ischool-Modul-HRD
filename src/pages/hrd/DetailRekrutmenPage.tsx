import { DownloadFile, Rekrutmen } from '@/middlewares/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal, { openModal, closeModal } from '@/components/ModalProps';
import Swal from 'sweetalert2';

const DetailRekrutmenPage = () => {
	const [DataDetailRekrutmen, setDataDetailRekrutmen] = useState<any[]>([]);
	const [dataCv, setDataCv] = useState<any>();
	const { id } = useParams<{ id: string }>();
	const [search, setSearch] = useState('');
	const [planDate, setPlanDate] = useState('');
	const [portal, setPortal] = useState('');
	const [typeRekrutmen, setTypeRekrutmen] = useState('Pendaftaran');
	const [selectedId, setSelectedId] = useState<any>(null);

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await Rekrutmen.DataDetailRekrutmen(
				0,
				20,
				search,
				id,
				access_token,
				false,
				false,
				typeRekrutmen
			);
			setDataDetailRekrutmen(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDetailCv = async (id: any) => {
		try {
			const response = await Rekrutmen.DataCv(id);
			setDataCv(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleOpenPreviewCvDialog = (id: any) => {
		setSelectedId(id);
		handleDetailCv(id);
		openModal('cvApplicant');
	};

	const handleOpenAcceptedDialog = (id: any) => {
		setSelectedId(id);
		openModal('dialogAccepted');
	};

	const AcceptedRekrutmen = async () => {
		if (!selectedId) return;
		try {
			await Rekrutmen.LulusRekrutmen(null, selectedId);
			fetchData();
			closeModal('dialogAccepted');
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Applicant berhasil diterima',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const RejectedRekrutmen = async () => {
		if (!selectedId) return;

		try {
			await Rekrutmen.GagalRekrutmen(null, selectedId);
			closeModal('cvApplicant');
			fetchData();
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Applicant berhasil ditolak',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const AcceptedPsikotes = async (id: any) => {
		try {
			await Rekrutmen.LulusPsikotes(null, id);
			fetchData();
			closeModal('dialogAccepted');
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Applicant berhasil diterima',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const RejectedPsikotes = async (id: any) => {
		try {
			await Rekrutmen.GagalPsikotes(null, id);
			closeModal('cvApplicant');
			fetchData();
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Applicant berhasil ditolak',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const AcceptedInterview = async () => {
		if (!selectedId) return;

		const data = {
			plan_date: planDate,
			portal: portal,
		};
		try {
			await Rekrutmen.LulusInterview(data, selectedId);
			fetchData();
			closeModal('dialogAccepted');
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Applicant berhasil diterima',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const RejectedInterview = async () => {
		if (!selectedId) return;

		try {
			await Rekrutmen.GagalInterview(null, selectedId);
			closeModal('dialogAccepted');
			fetchData();
			Swal.fire({
				icon: 'success',
				title: 'Sukses',
				text: 'Applicant berhasil ditolak',
			});
		} catch (error: any) {
			console.error(error);
			const message = error.response.data.message;
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: message,
			});
		}
	};

	const downloadFile = async (file_path: string, file_type: string) => {
		try {
			const response = await DownloadFile.Download(access_token, file_path);

			if (response.status === 200 && response.data) {
				const blob = new Blob([response.data], { type: file_type });
				const fileUrl = URL.createObjectURL(blob);

				const link: any = document.createElement('a');
				link.href = fileUrl;
				link.download = file_path.split('/').pop() || 'downloaded_file';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} else {
				console.error('File download failed or no data available');
			}
		} catch (error) {
			console.error('Error during file download:', error);
		}
	};

	useEffect(() => {
		if (id) {
			fetchData();
		}
	}, [id, search, typeRekrutmen]);

	const title = localStorage.getItem('title');
	const subtitle = localStorage.getItem('subtitle');

	return (
		<div>
			{/* Existing Content */}
			<div className="mb-3 flex items-center justify-between">
				<div>
					<h3 className="font-bold">{title}</h3>
					<div className="text-sm">{subtitle}</div>
				</div>
				<label className="input input-sm input-bordered flex items-center gap-2">
					<input type="text" className="grow" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="h-4 w-4 opacity-70"
					>
						<path
							fillRule="evenodd"
							d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</label>
			</div>

			<div className="h-[1px] w-full bg-gray-300"></div>

			<select className="select select-bordered select-xs mt-10" onChange={(e) => setTypeRekrutmen(e.target.value)}>
				<option value="Pendaftaran">Rekrutmen</option>
				<option value="Memasuki Test Psikotes">Psikotes</option>
				<option value="Menunggu Interview">Interview</option>
			</select>

			{/* <div className="mt-6 flex justify-between">
				<div className="flex items-center gap-2">
					<button className="btn btn-outline btn-info btn-xs">
						Semua <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Dibuka <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Ditutup <span>25</span>
					</button>
				</div>
				<div className="flex items-center gap-2">
					<select className="select select-bordered select-xs w-full max-w-xs">
						<option disabled selected>
							Filter
						</option>
						<option>Tiny Apple</option>
						<option>Tiny Orange</option>
						<option>Tiny Tomato</option>
					</select>
				</div>
			</div> */}

			<div className="card mt-5 w-full bg-base-100 shadow-xl">
				<div className="card-body">
					<div className="overflow-x-auto">
						<table className="table mb-16">
							<thead>
								<tr>
									<th className="text-sm text-black">Nama</th>
									<th className="text-sm text-black">Email</th>
									<th className="text-sm text-black">Tanggal</th>
									<th className="text-sm text-black">Status</th>
									<th className="text-sm text-black"></th>
								</tr>
							</thead>
							<tbody>
								{DataDetailRekrutmen.map((item, index) => (
									<tr key={index}>
										<td>
											<div className="flex items-center gap-3">
												<div className="avatar">
													<div className="mask mask-squircle h-12 w-12">
														<img
															src={
																item?.file_path
																	? `${import.meta.env.VITE_SERVER_HRD_FILE}${item.file_path}`
																	: 'https://api.dicebear.com/9.x/pixel-art/svg'
															}
															alt="Avatar Tailwind CSS Component"
														/>
													</div>
												</div>
												<div>
													<div className="font-bold">{item.full_name}</div>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-ghost badge-sm">{item.email}</span>
										</td>
										<td>{item.createdAt.split('T')[0]}</td>
										<td className="text-center">{item.status}</td>
										<th>
											{typeRekrutmen == 'Pendaftaran' ? (
												<button
													className="btn btn-primary btn-sm"
													onClick={() => handleOpenPreviewCvDialog(item.id)}
													disabled={item.is_passed_interview == true}
												>
													Buka
												</button>
											) : typeRekrutmen == 'Memasuki Test Psikotes' ? (
												<div className="dropdown dropdown-end">
													<label tabIndex={0} className="btn btn-primary btn-sm">
														...
													</label>
													<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
														<li>
															<a onClick={() => AcceptedPsikotes(item.id)}>Terima</a>
														</li>
														<li>
															<a onClick={() => RejectedPsikotes(item.id)}>Tolak</a>
														</li>
													</ul>
												</div>
											) : (
												<button
													className="btn btn-primary btn-sm"
													onClick={() => handleOpenAcceptedDialog(item.id)}
													disabled={item.is_passed_interview == true}
												>
													Buka
												</button>
											)}
										</th>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<Modal id="cvApplicant">
				<div className="p-6">
					<div className="text-center">
						<h2 className="text-4xl font-bold text-gray-800">{dataCv?.full_name}</h2>
						<p className="mt-2 text-sm text-gray-500">
							{dataCv?.address} • {dataCv?.email} • {dataCv?.phone}
						</p>
					</div>

					<div className="mt-6">
						<h3 className="text-2xl font-semibold text-gray-800">Deskripsi Diri</h3>
						<div className="my-2 h-[2px] w-full bg-gray-300"></div>
						<p className="leading-relaxed text-gray-700">{dataCv?.applicant_description}</p>
					</div>

					<div className="mt-6">
						<h3 className="text-2xl font-semibold text-gray-800">Visi</h3>
						<div className="my-2 h-[2px] w-full bg-gray-300"></div>
						<p className="leading-relaxed text-gray-700">{dataCv?.applicant_vision}</p>
					</div>

					<div className="mt-6">
						<h3 className="text-2xl font-semibold text-gray-800">Alasan Melamar</h3>
						<div className="my-2 h-[2px] w-full bg-gray-300"></div>
						<p className="leading-relaxed text-gray-700">{dataCv?.applicant_reason}</p>
					</div>

					<div className="mt-6">
						<h3 className="text-2xl font-semibold text-gray-800">Pertanyaan</h3>
						<div className="my-2 h-[2px] w-full bg-gray-300"></div>
						<p className="leading-relaxed text-gray-700">{dataCv?.applicant_question}</p>
					</div>

					<div className="mt-6">
						<h3 className="text-2xl font-semibold text-gray-800">Pendidikan</h3>
						<div className="my-2 h-[2px] w-full bg-gray-300"></div>
						<div className="leading-relaxed text-gray-700">
							{dataCv?.applicantacademics.map((item: any, index: any) => (
								<div key={index} className="mb-4 rounded-md bg-gray-50 p-2 shadow-sm">
									<div className="font-semibold">Pendidikan Terakhir:</div>
									<div>{item?.degree}</div>
									<div className="mt-2 font-semibold">Asal Pendidikan:</div>
									<div>{item?.city}</div>
								</div>
							))}
						</div>
					</div>

					<div className="mt-6">
						<h3 className="text-2xl font-semibold text-gray-800">Pendidikan Non Formal</h3>
						<div className="my-2 h-[2px] w-full bg-gray-300"></div>
						<div className="leading-relaxed text-gray-700">
							{dataCv?.applicantunformals.map((item: any, index: any) => (
								<div key={index} className="mb-2">
									{item?.description}
								</div>
							))}
						</div>
					</div>

					<div className="mt-6">
						<h3 className="text-2xl font-semibold text-gray-800">Keahlian</h3>
						<div className="my-2 h-[2px] w-full bg-gray-300"></div>
						<div className="leading-relaxed text-gray-700">
							{dataCv?.applicantskills.map((item: any, index: any) => (
								<div key={index} className="mb-2">
									{item?.description}
								</div>
							))}
						</div>
					</div>

					<div className="mt-6">
						<h3 className="text-2xl font-semibold text-gray-800">Pengalaman</h3>
						<div className="my-2 h-[2px] w-full bg-gray-300"></div>
						<div className="space-y-4 leading-relaxed text-gray-700">
							{dataCv?.applicantjobs.map((item: any, index: any) => (
								<div key={index} className="flex items-center gap-2">
									<div className="h-3 w-3 rounded-full bg-black"></div>
									<div>
										<div className="text-lg font-bold text-gray-900">{item.company}</div>
										<div className="text-md font-medium text-blue-700">{item.position}</div>
										<p className="mt-1 text-gray-600">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="mt-6">
						<h3 className="text-2xl font-semibold text-gray-800">Prestasi</h3>
						<div className="my-2 h-[2px] w-full bg-gray-300"></div>
						<div className="leading-relaxed text-gray-700">
							{dataCv?.applicantappreciations.map((item: any, index: any) => (
								<div key={index} className="mb-4 rounded-md bg-gray-50 p-2 shadow-sm">
									<div className="font-bold">{item?.description}</div>
									{item.appreciationattachments.map((attachment: any, idx: any) => (
										<div key={idx} className="mt-2 flex items-center justify-between">
											<div>{attachment.file_name}</div>
											<button
												className="text-blue-600 underline"
												onClick={() => downloadFile(attachment.file_path, attachment.file_type)}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="black"
													className="size-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
													/>
												</svg>
											</button>
										</div>
									))}
								</div>
							))}
						</div>
					</div>

					<div className="mt-6 flex items-center justify-center gap-4">
						<button
							className="btn btn-error text-white transition hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
							onClick={() => {
								closeModal('cvApplicant');
								RejectedRekrutmen();
							}}
						>
							Tolak
						</button>
						<button
							className="btn btn-success text-white transition hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
							onClick={() => {
								closeModal('cvApplicant');
								AcceptedRekrutmen();
							}}
						>
							Terima
						</button>
					</div>
				</div>
			</Modal>

			<Modal id="dialogAccepted">
				<div>
					<div className="form-control mb-4">
						<label htmlFor="judul" className="label">
							<span className="label-text font-semibold">Link/Tempat Meeting </span>
						</label>
						<input
							type="text"
							id="judul"
							placeholder="Masukkan Link atau Tempat Meeting"
							className="input input-bordered w-full"
							onChange={(e) => setPortal(e.target.value)}
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

					<div className="flex items-center justify-end gap-2">
						<button className="btn btn-primary text-white" onClick={() => RejectedInterview()}>
							Tolak
						</button>
						<button className="btn btn-primary text-white" onClick={() => AcceptedInterview()}>
							Kirim
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DetailRekrutmenPage;
