import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Probation, Rekrutmen } from '@/middlewares/api';
import Swal from 'sweetalert2';
const DaftarInterviewPage = () => {
	const [search, setSearch] = useState('');
	const { id } = useParams<{ id: string }>();
	const [fetch, setFetch] = useState<any[]>([]);
	const [id2, setId2] = useState<number | null>();
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [imageError, setImageError] = useState(false);

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await Rekrutmen.DataDetailRekrutmen(0, 20, search, id, access_token, false, true, '');
			setFetch(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const AcceptedProbation = async () => {
		const data = {
			probation_start_date: startDate,
			probation_end_date: endDate,
		};
		try {
			await Probation.AcceptedProbation(data, id2);
			closeModal('handleInterview');
			fetchData();
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

	const RejectedProbation = async (id: any) => {
		try {
			await Probation.RejectedProbation(null, id);
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

	const handleDialog = (type: string, id: any) => {
		if (type == 'terima') {
			openModal('handleInterview');
			setId2(id);
		} else {
			RejectedProbation(id);
		}
	};

	// const handleNavigation = (id2: number) => {
	// 	navigate(`/hrd/employee/${id}/${id2}`);
	// };

	const handleImageError = () => {
		setImageError(true); // Menandakan gambar gagal dimuat
	};

	useEffect(() => {
		if (id) {
			fetchData();
		}
	}, [id, search]);

	return (
		<div className="min-h-screen">
			<div className="mb-3 flex items-center justify-between">
				<div>
					<h3 className="font-bold">Probation</h3>
					<div className="text-sm">Karyawan</div>
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

			<div className="card mt-10 w-full bg-base-100 shadow-xl">
				<div className="card-body">
					<div>
						<table className="table">
							<thead>
								<tr>
									<th className="text-sm text-black">Nama</th>
									<th className="text-sm text-black">Email</th>
									<th className="text-sm text-black">Status</th>
									<th className="text-sm text-black">Action</th>
								</tr>
							</thead>
							<tbody>
								{fetch.map((item, index) => (
									<tr key={index}>
										<td>
											<div className="flex items-center gap-3">
												<div className="avatar">
													<div className="mask mask-squircle h-12 w-12">
														<img
															src={
																imageError || !item?.file_path
																	? 'https://api.dicebear.com/9.x/pixel-art/svg' // Gambar default Dicebear
																	: `${import.meta.env.VITE_SERVER_HRD_FILE}${item.file_path}`
															}
															alt="User"
															onError={handleImageError}
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
										<td>{item.status}</td>
										<td className="relative px-4 py-2">
											<div className="dropdown dropdown-end">
												<button className="btn btn-primary btn-sm" disabled={item.is_passed == true}>
													...
												</button>
												<ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
													<li>
														<a onClick={() => handleDialog('terima', item.id)}>Terima</a>
													</li>
													<li>
														<a onClick={() => handleDialog('tolak', item.id)}>Tolak</a>
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
			</div>
			<Modal id="handleInterview">
				<div>
					<div className="form-control mb-4">
						<label htmlFor="judul" className="label">
							<span className="label-text font-semibold">Tanggal Mulai</span>
						</label>
						<input
							type="datetime-local"
							id="tanggalJam"
							className="input input-bordered w-full"
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</div>

					<div className="form-control mb-4">
						<label htmlFor="tanggalJam" className="label">
							<span className="label-text font-semibold">Tanggal Berakhir</span>
						</label>
						<input
							type="datetime-local"
							id="tanggalJam"
							className="input input-bordered w-full"
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</div>

					<div className="flex items-center justify-end">
						<button className="btn btn-primary text-white" onClick={AcceptedProbation}>
							Kirim
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DaftarInterviewPage;
