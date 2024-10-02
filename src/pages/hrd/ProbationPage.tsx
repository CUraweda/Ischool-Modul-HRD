import { useEffect, useState } from 'react';
import { Rekrutmen } from '@/middlewares/api';
import { useNavigate } from 'react-router-dom';

function formatStartDate(startDate: any, endDate: any) {
	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

	const startDateObj = new Date(startDate);
	const endDateObj = new Date(endDate);

	if (startDateObj.getMonth() === endDateObj.getMonth() && startDateObj.getFullYear() === endDateObj.getFullYear()) {
		return `${startDateObj.getDate()}`;
	}

	return startDateObj.toLocaleDateString('id-ID', options);
}

function formatEndDate(endDate: any) {
	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

	const endDateObj = new Date(endDate);

	return endDateObj.toLocaleDateString('id-ID', options);
}

const Probationpage = () => {
	const [dataProbation, setDataProbation] = useState<any[]>([]);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const fetchData = async () => {
		try {
			const response = await Rekrutmen.DataRekrutmen(0, 20, search, '', access_token);
			setDataProbation(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const CloseRekrutmen = async (id: any) => {
		try {
			await Rekrutmen.CloseRekrutment(id);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [search]);

	const handleCardClick = (page: string, id: number) => {
		if (page == 'seleksi') {
			navigate(`/hrd/employee/${id}`);
		} else {
			navigate(`/hrd/employee/interview/${id}`);
		}
	};

	return (
		<div className="h-screen">
			<div className="mb-3 flex items-center justify-between">
				<h3 className="font-bold">Probation</h3>
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

			<div className="mt-6 flex flex-wrap items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					{/* <button className="btn btn-outline btn-info btn-xs">
						Semua <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Dibuka <span>25</span>
					</button>
					<button className="btn btn-outline btn-info btn-xs">
						Ditutup <span>25</span>
					</button> */}
				</div>
			</div>
			{dataProbation.map((item, index) => (
				<div className="card mt-5 w-full bg-base-100 shadow-xl" key={index}>
					<div className="card-body">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<div onClick={() => handleCardClick('seleksi', item.id)} className="cursor-pointer">
								<h4 className="font-bold">{item.title}</h4>
								<p className="text-xs">Dibuat {item.createdAt.split('T')[0]}</p>
							</div>
							<div>
								<div className="text-xs">Job Title</div>
								<div className="badge badge-primary text-xs">{item?.division?.name}</div>
							</div>
							<div className="flex items-center gap-2">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BFDCFE]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="#416AC0"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
										/>
									</svg>
								</div>

								<div>
									<div className="text-xs">Tanggal Mulai</div>
									<div className="text-xs font-bold">{formatStartDate(item.start_date, item.end_date)}</div>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BFDCFE]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="#416AC0"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
										/>
									</svg>
								</div>

								<div>
									<div className="text-xs">Tanggal Berakhir</div>
									<div className="text-xs font-bold">{formatEndDate(item.end_date)}</div>
								</div>
							</div>

							<div>
								<div className="text-center text-xs">Status </div>
								<div className="flex items-center gap-2">
									<div className="text-sm font-bold">{item.is_open == true ? 'Dibuka' : 'Ditutup'}</div>
								</div>
							</div>

							<div className="dropdown dropdown-end">
								<div tabIndex={0} role="button" className="btn btn-outline btn-xs m-1 h-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="#6A6B6B"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
										/>
									</svg>
								</div>
								<ul tabIndex={0} className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
									<div className="px-4 py-2 text-center text-gray-500">
										Rubah Status
										<div className="mt-1 h-[1px] w-full bg-gray-300"></div>
									</div>
									<li>
										<div className="flex items-center p-[0.40rem]">
											<div className="rounded-full">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="h-5 w-5"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
													/>
												</svg>
											</div>
											<span className="ml-2 font-semibold" onClick={() => handleCardClick('interview', item.id)}>
												Daftar Interview
											</span>
										</div>
									</li>
									<li>
										<div className="flex items-center p-2">
											<div className="rounded-full bg-yellow-500 p-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													className="h-2 w-2 rounded-full bg-white"
												>
													<circle cx="12" cy="12" r="10" />
												</svg>
											</div>
											<span className="ml-2 font-semibold" onClick={() => CloseRekrutmen(item.id)}>
												Tutup Penerimaan
											</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Probationpage;
