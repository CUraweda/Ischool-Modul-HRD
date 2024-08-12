import { useState } from 'react';

const FormPage = () => {
	const jobs = [
		{
			title: 'Guru',
			department: 'Bahasa Indonesia',
			education: 'Minimal pendidikan S1',
			timePosted: '2 hari yang lalu',
			employmentType: 'Full time',
			location: 'Depok, Jawa Barat',
		},
		{
			title: 'Karyawan',
			department: 'Marketing',
			education: 'Minimal pendidikan S1',
			timePosted: '2 hari yang lalu',
			employmentType: 'Full time',
			location: 'Depok, Jawa Barat',
		},
		{
			title: 'Terapis',
			department: 'Anak',
			education: 'Minimal pendidikan S1',
			timePosted: '2 hari yang lalu',
			employmentType: 'Full time',
			location: 'Depok, Jawa Barat',
		},
	];

	return (
		<div>
			<h1 className="mb-4 text-lg font-bold text-gray-700">Lowongan Pekerjaan</h1>
			<div>
				<div className="space-y-4">
					{jobs.map((job, index) => (
						<div
							key={index}
							className="card flex flex-col items-start justify-between rounded-lg bg-white p-4 shadow md:flex-row md:items-center"
						>
							<div>
								<h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
								<p className="text-gray-600">{job.department}</p>
								<p className="text-sm text-gray-500">{job.education}</p>
								<p className="mt-2 text-xs text-gray-400">{job.timePosted}</p>
							</div>
							<div className="mt-4">
								<span className="mr-2 self-end text-sm text-gray-500">{job.employmentType}</span>
								<div className="flex items-center text-gray-500">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="mr-1 h-5 w-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21 10c0 7.19-7 12-9 12S3 17.19 3 10a9 9 0 1118 0z"
										/>
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h6" />
									</svg>
									<span>{job.location}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FormPage;
