import { Rekrutmen } from '@/middlewares/api';
import { useEffect, useState } from 'react';

function formatRelativeDate(createdAt: string) {
	const createdDate = new Date(createdAt);
	const currentDate = new Date();

	// Hitung selisih waktu dalam milidetik
	const timeDifference = currentDate.getTime() - createdDate.getTime();

	// Konversi selisih waktu menjadi hari
	const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

	if (daysDifference === 0) {
		return 'Hari ini';
	} else if (daysDifference === 1) {
		return '1 hari yang lalu';
	} else {
		return `${daysDifference} hari yang lalu`;
	}
}

function formatDateRange(startDate: any, endDate: any) {
	const options = { day: 'numeric', month: 'long', year: 'numeric' };

	const start = new Date(startDate).toLocaleDateString('id-ID', options);
	const end = new Date(endDate).toLocaleDateString('id-ID', options);

	// Jika bulan dan tahun sama, hanya tampilkan tanggal akhir berbeda
	const startDateObj = new Date(startDate);
	const endDateObj = new Date(endDate);

	if (startDateObj.getMonth() === endDateObj.getMonth() && startDateObj.getFullYear() === endDateObj.getFullYear()) {
		return `${startDateObj.getDate()} - ${end}`;
	}

	return `${start} - ${end}`;
}

const FormPage = () => {
	const [dataJob, setDataJob] = useState<any[]>([]);

	const fetchData = async () => {
		try {
			const response = await Rekrutmen.DataRekrutmen(0, 20, '');
			setDataJob(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<h1 className="mb-4 text-lg font-bold text-gray-700">Lowongan Pekerjaan</h1>
			<div>
				{dataJob.map((item, index) => (
					<div key={index} className="flex flex-wrap items-center justify-between rounded-lg bg-white p-4 shadow">
						<div>
							<h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
							<p className="text-gray-600">{item.sub_title}</p>
							<p className="text-sm text-gray-500">{item.min_academic}</p>
							<p className="mt-2 text-xs text-gray-400">Dibuat {formatRelativeDate(item.createdAt)}</p>
						</div>
						<div className="text-right">
							<span className="font-bold text-gray-500">{item.is_fulltime == true ? 'Full Time' : 'Part Time'}</span>
							<div className="text-gray-500">{item.location}</div>
							<div className="mt-8 text-xs text-gray-400">
								Periode Pendaftaran {formatDateRange(item.start_date, item.end_date)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FormPage;
