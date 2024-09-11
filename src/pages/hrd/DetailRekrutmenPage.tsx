import { Rekrutmen } from '@/middlewares/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal, { openModal, closeModal } from '@/components/ModalProps';

const DetailRekrutmenPage = () => {
	const [DataDetailRekrutmen, setDataDetailRekrutmen] = useState<any[]>([]);
	const { id } = useParams<{ id: string }>();
	const [search, setSearch] = useState('');
	const [planDate, setPlanDate] = useState('');
	const [portal, setPortal] = useState('');
	const [selectedId, setSelectedId] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchData = async () => {
		try {
			const response = await Rekrutmen.DataDetailRekrutmen(0, 20, search, id);
			setDataDetailRekrutmen(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleOpenPreviewCvDialog = (id: any) => {
		setSelectedId(id);
		setIsModalOpen(true);
	};

	const handleOpenAcceptedDialog = () => {
		openModal('dialogAccepted');
	};

	const handleAccepted = async () => {
		if (!selectedId) return;

		const data = {
			plan_date: planDate,
			portal: portal,
		};
		try {
			await Rekrutmen.LulusRekrutmen(data, selectedId);
			closeModal('dialogAccepted');
		} catch (error) {
			console.error(error);
		}
	};

	const handleRejected = async () => {
		if (!selectedId) return;

		try {
			await Rekrutmen.GagalRekrutmen(null, selectedId);
			setIsModalOpen(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (id) {
			fetchData();
		}
	}, [id, search]);

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
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-ghost badge-sm">{item.email}</span>
										</td>
										<td>{item.phone}</td>
										<td className="text-center">{item.status}</td>
										<th>
											<button className="btn btn-primary btn-sm" onClick={() => handleOpenPreviewCvDialog(item.id)}>
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

			{/* Preview CV Modal */}
			{isModalOpen && (
				<div
					className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
						isModalOpen ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<div
						className={`w-full max-w-3xl transform rounded bg-white p-6 shadow-xl transition-transform duration-300 ${
							isModalOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
						}`}
					>
						{/* Close Button */}
						<button
							className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
							onClick={() => setIsModalOpen(false)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>

						{/* Contoh Layout CV */}
						<div className="text-center">
							<h2 className="text-2xl font-bold">NUR CAHYANTO</h2>
							<p className="text-sm">
								Purwokerto, Indonesia • nurcahyanto804@gmail.com • 081548424561 • LinkedIn • Github
							</p>
						</div>

						<div className="mt-4">
							<h3 className="text-xl font-bold">SUMMARY</h3>

							<div className="my-1 h-[1px] w-full bg-black"></div>

							<p>
								As an experienced full-stack engineer with expertise in developing front-end and back-end applications
								using React.js, Node.js, and PostgreSQL, I am also an expert in integrating APIs, as well as designing
								efficient UI/UX with Figma. I am committed to providing an intuitive user interface and always looking
								for opportunities to keep up with the latest trends in web development.
							</p>
						</div>

						<div className="mt-4">
							<h3 className="text-xl font-bold">TECHNICAL SKILLS</h3>

							<div className="my-1 h-[1px] w-full bg-black"></div>

							<p>
								<strong>Languages:</strong> JavaScript, TypeScript, HTML, CSS, SASS <br />
								<strong>Technologies:</strong> React JS, Figma, Firebase, Tailwind, Bootstrap, Zustand, Node.js, Express
								JS, AWS EC2, S3 <br />
								<strong>Other:</strong> Algorithms, Data Structures, Advance Problem Solving
							</p>
						</div>

						<div className="mt-6 flex items-center justify-center gap-4">
							<button
								className="btn btn-error text-white"
								onClick={() => {
									setIsModalOpen(false);
									handleRejected();
								}}
							>
								Tolak
							</button>
							<button
								className="btn btn-success text-white"
								onClick={() => {
									setIsModalOpen(false);
									handleOpenAcceptedDialog();
								}}
							>
								Terima
							</button>
						</div>
					</div>
				</div>
			)}

			<Modal id="dialogAccepted">
				<div>
					<div className="form-control mb-4">
						<label htmlFor="judul" className="label">
							<span className="label-text font-semibold">Judul</span>
						</label>
						<input
							type="text"
							id="judul"
							placeholder="Masukkan judul pengumuman"
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

					<div className="flex items-center justify-end">
						<button className="btn btn-primary text-white" onClick={handleAccepted}>
							Kirim
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DetailRekrutmenPage;
