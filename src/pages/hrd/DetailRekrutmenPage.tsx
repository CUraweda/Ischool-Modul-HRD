import Modal, { openModal, closeModal } from '../../components/ModalProps';
import { Rekrutmen } from '@/middlewares/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailRekrutmenPage = () => {
	const handleDialog = () => {
		openModal('previewCv');
	};
	const [DataDetailRekrutmen, setDataDetailRekrutmen] = useState<any[]>([]);
	const { id } = useParams<{ id: string }>();
	const [search, setSearch] = useState('');
	const fetchData = async () => {
		try {
			const response = await Rekrutmen.DataDetailRekrutmen(0, 20, search, id);
			setDataDetailRekrutmen(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (id) {
			fetchData();
		}
	}, [id, search]);

	return (
		<div>
			<div className="mb-3 flex items-center justify-between">
				<div>
					<h3 className="font-bold">Karyawan</h3>
					<div className="text-sm">Keuangan</div>
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

			<div className="mt-6 flex justify-between">
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
			</div>

			<div className="card mt-10 w-full bg-base-100 shadow-xl">
				<div className="card-body">
					<div className="overflow-x-auto">
						<table className="table">
							<thead>
								<tr>
									<th>
										<label>
											<input type="checkbox" className="checkbox" />
										</label>
									</th>
									<th className="text-sm text-black">Nama</th>
									<th className="text-sm text-black">Email</th>
									<th className="text-sm text-black">Nomor Hp</th>
									<th className="text-sm text-black">Status</th>
									<th className="text-sm text-black"></th>
								</tr>
							</thead>
							<tbody>
								{DataDetailRekrutmen.map((item, index) => (
									<tr key={index}>
										<th>
											<label>
												<input type="checkbox" className="checkbox" />
											</label>
										</th>
										<td>
											<div className="flex items-center gap-3">
												<div className="avatar">
													<div className="mask mask-squircle h-12 w-12">
														<img
															src={
																item.user.avatar != null
																	? item.user.avatar
																	: 'https://api.dicebear.com/9.x/pixel-art/svg'
															}
															alt="Avatar Tailwind CSS Component"
														/>
													</div>
												</div>
												<div>
													<div className="font-bold">{item.full_name}</div>
													{/* <div className="text-sm opacity-50"></div> */}
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-ghost badge-sm">{item.email}</span>
										</td>
										<td>{item.phone}</td>
										<td className="text-center">{item.status}</td>
										<th>
											<button className="btn btn-primary btn-sm" onClick={handleDialog}>
												Buka
											</button>
										</th>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<Modal id="previewCv">
				<div>test</div>
			</Modal>
		</div>
	);
};

export default DetailRekrutmenPage;
