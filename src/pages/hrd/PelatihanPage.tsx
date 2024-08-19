import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EmployeeData {
	id: number;
	name: string;
	email: string;
	position: string;
	overallScore: number;
	details: {
		startDate: string;
		division: string;
		status: string;
		email: string;
		remainingInternshipTime: string;
		image: string;
	};
}
const PelatihanPage: React.FC = () => {
	const Navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
	const employees: EmployeeData[] = [
		{
			id: 1,
			name: 'Alya Putri Azzahra',
			email: 'alyaputriazzahra52@gmail.com',
			position: 'Keuangan',
			overallScore: 90,
			details: {
				startDate: '23 Mei 2024',
				division: 'Keuangan',
				status: 'Pegawai tetap',
				email: 'alyaputriazzahra52@gmail.com',
				remainingInternshipTime: '1 Bulan 15 Hari',
				image: 'https://i.pravatar.cc/100?img=3',
			},
		},
	];
	const handleCheckboxChange = (id: number) => {
		setSelectedEmployees((prevSelected) =>
			prevSelected.includes(id) ? prevSelected.filter((employeeId) => employeeId !== id) : [...prevSelected, id]
		);
	};

	const handleDetailClick = (employee: EmployeeData) => {
		console.log('Navigating to details for:', employee);
		Navigate('/hrd/rekap-penilaian/detail', { state: { employee } });
	};

	return (
		<div className="w-full p-2">
			<div className="w-full flex-wrap md:flex">
				<div className="breadcrumbs items-center text-center text-xl md:w-2/3">
					<ul className="my-auto h-full">
						<li className="text-2xl font-bold">
							<a>Pelatihan</a>
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
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
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
							<tr className="text-center font-bold">
								<th>
									<input
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
									/>
								</th>
								<th>Nama</th>
								<th>Email</th>
								<th>Posisi</th>
								<th>Nilai Keseluruhan</th>
								<th>Detail</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((employee) => (
								<tr key={employee.id}>
									<td className="text-center">
										<input
											type="checkbox"
											className="checkbox"
											checked={selectedEmployees.includes(employee.id)}
											onChange={() => handleCheckboxChange(employee.id)}
										/>
									</td>
									<td>{employee.name}</td>
									<td>{employee.email}</td>
									<td>{employee.position}</td>
									<td className="text-center">{employee.overallScore}</td>
									<td className="text-center">
										<button className="btn btn-primary" onClick={() => handleDetailClick(employee)}>
											Buka
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* Detail section */}
				{/* {employees.map((employee) => (
					<div key={employee.id} className="mt-8">
						<div className="flex items-center">
							<img src={employee.details.image} alt={employee.name} className="h-20 w-20 rounded-full" />
							<div className="ml-4">
								<h3 className="text-xl font-bold">{employee.name}</h3>
								<p>Email: {employee.details.email}</p>
								<p>Posisi: {employee.position}</p>
								<p>Tanggal Mulai Bekerja: {employee.details.startDate}</p>
								<p>Divisi: {employee.details.division}</p>
								<p>Status: {employee.details.status}</p>
								<p>Sisa Waktu Magang: {employee.details.remainingInternshipTime}</p>
							</div>
						</div>
					</div>
				))} */}
			</div>
		</div>
	);
};
export default PelatihanPage;
