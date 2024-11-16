import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Jobdesk } from '@/middlewares/api';
const RekapPenilaianPage = () => {
	const Navigate = useNavigate();
	const [employees, setEmployees] = useState<any[]>([]);
	const [filter, setFilter] = useState({
		limit: 10,
		page: 0,
		totalPage: 0,
		totalRows: 0,
		search: '',
		id: '',
	});

	let access_token = sessionStorage.getItem('access_token');

	access_token = access_token ? access_token.replace(/"/g, '') : null;

	const getAllDataJob = async () => {
		try {
			const response = await Jobdesk.getAllJobdesk(filter.limit, filter.search, filter.page, access_token);
			setEmployees(response.data.data.result);
			setFilter((prev) => ({
				...prev,
				totalRows: response.data.data.totalRows,
				totalPages: response.data.data.totalPages,
				limit: response.data.data.limit,
			}));
		} catch (error) {
			console.error(error);
		}
	};
	// const handleCheckboxChange = (id: number) => {
	// 	setSelectedEmployees((prevSelected) =>
	// 		prevSelected.includes(id) ? prevSelected.filter((employeeId) => employeeId !== id) : [...prevSelected, id]
	// 	);
	// };

	const handleDetailClick = (employee: any) => {
		console.log('Navigating to details for:', employee);
		Navigate('/hrd/rekap-penilaian/detail', { state: { employee } });
	};

	useEffect(() => {
		getAllDataJob();
	}, [filter.limit, filter.search, filter.id]);
	return (
		<div className="w-full p-2">
			<div className="w-full flex-wrap md:flex">
				<div className="breadcrumbs items-center text-center text-xl md:w-2/3">
					<ul className="my-auto h-full">
						<li className="text-2xl font-bold">
							<a>Rekap Penilaian</a>
						</li>
					</ul>
				</div>
				<label className="text-md input input-md input-bordered flex items-center gap-2 md:w-1/3">
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
					<input
						type="text"
						className="grow"
						placeholder="Search"
						value={filter.search}
						onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value, page: 0 }))}
					/>
				</label>
			</div>

			<div className="my-5 flex-grow border-t border-gray-400 drop-shadow-sm"></div>
			<div className="flex w-full justify-between">
				<button className="text-md badge btn badge-md btn-xs my-5 h-fit rounded-badge bg-[#ffffffc2] drop-shadow-sm">
					Semua
					<div className="pl-5">{employees.length}</div>
				</button>
				<div className="my-auto flex gap-4"></div>
			</div>
			<div className="">
				<div className="card h-fit w-full overflow-x-auto bg-base-100 p-5 shadow-xl">
					<table className="text-md table">
						<thead>
							<tr className="font-bold">
								<th className="text-center">
									{/* <input
										type="checkbox"
										className="checkbox"
										onChange={(e) => {
											if (e.target.checked) {
												setSelectedEmployees(employees.map((employee) => employee.id));
											} else {
												setSelectedEmployees([]);
											}
										}}
										checked={selectedEmployees.length === employees.length}
									/> */}
									No
								</th>
								<th>Nama</th>
								<th>Email</th>
								<th>Posisi</th>
								<th className="text-center">Nilai Keseluruhan</th>
								<th className="text-center">Detail</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((employee, index) => (
								<tr key={index}>
									<td className="text-center">
										{/* <input
											type="checkbox"
											className="checkbox"
											checked={selectedEmployees.includes(employee.id)}
											onChange={() => handleCheckboxChange(employee.id)}
										/> */}
										{index + 1}
									</td>
									<td>{employee?.full_name}</td>
									<td>{employee.email ?? '-'}</td>
									<td>{employee.occupation ?? '-'}</td>
									<td className="text-center">{employee.grade}</td>
									<td className="text-center">
										<button className="btn btn-primary" onClick={() => handleDetailClick(employee)}>
											Buka
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="join m-5">
						<button
							className="btn join-item btn-sm"
							onClick={() => setFilter((prev) => ({ ...prev, page: prev.page - 1 }))}
							disabled={filter.page === 0} // Disable jika halaman pertama
						>
							Previous
						</button>

						<button
							className="btn join-item btn-sm"
							onClick={() => setFilter((prev) => ({ ...prev, page: prev.page + 1 }))}
							disabled={filter.page + 1 >= filter.totalPage} // Disable jika halaman terakhir
						>
							Next
						</button>

						<button className="btn join-item btn-sm">
							<div className="flex justify-between">
								<span>
									Page {filter.page + 1} of {filter.totalPage}
								</span>
							</div>
						</button>
						<button className="btn join-item btn-sm" onClick={() => setFilter((prev) => ({ ...prev, limit: 10 }))}>
							10
						</button>
						<button className="btn join-item btn-sm" onClick={() => setFilter((prev) => ({ ...prev, limit: 50 }))}>
							50
						</button>
						<button className="btn join-item btn-sm" onClick={() => setFilter((prev) => ({ ...prev, limit: 100 }))}>
							100
						</button>
						<button className="btn join-item btn-sm" onClick={() => setFilter((prev) => ({ ...prev, limit: 0 }))}>
							All
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default RekapPenilaianPage;
