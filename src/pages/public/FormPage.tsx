import { Rekrutmen } from '@/middlewares/api';
import { useEffect, useState } from 'react';
import Modal, { openModal } from '@/components/ModalProps';

function formatRelativeDate(createdAt: string) {
	const createdDate = new Date(createdAt);
	const currentDate = new Date();

	const timeDifference = currentDate.getTime() - createdDate.getTime();

	const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

	if (daysDifference === 0) {
		return 'Hari ini';
	} else {
		return `${daysDifference} hari yang lalu`;
	}
}

function formatDateRange(startDate: any, endDate: any) {
	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

	const startDateObj = new Date(startDate);
	const endDateObj = new Date(endDate);

	// When startDate and endDate are in the same month and year
	if (startDateObj.getMonth() === endDateObj.getMonth() && startDateObj.getFullYear() === endDateObj.getFullYear()) {
		return `${startDateObj.getDate()} - ${endDateObj.toLocaleDateString('id-ID', options)}`;
	}

	// Otherwise, show the full date range
	const start = startDateObj.toLocaleDateString('id-ID', options);
	const end = endDateObj.toLocaleDateString('id-ID', options);

	return `${start} - ${end}`;
}

const handleDialog = () => {
	openModal('detailForm');
};

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
			<div className="flex flex-col gap-2">
				{dataJob.map((item, index) => (
					<div
						key={index}
						className="flex cursor-pointer flex-wrap items-center justify-between rounded-lg bg-white p-4 shadow"
						onClick={handleDialog}
					>
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

			<Modal id="detailForm">
				<div className="flex justify-between">
					<div>
						<div>
							<h3 className="font-bold">Spesifikasi</h3>
							<div className="mt-4">
								<span>Posisi:</span> Guru Bahasa Indonesia
							</div>
							<div>
								<span>Lokasi:</span> Sekolah Alam Depok
							</div>

							<div>
								<span>Status:</span> Pekerjaan Paruh Waktu
							</div>

							<div>
								<span>Periode Pendaftaran:</span> 25 Mei2023
							</div>
						</div>

						<div className="mt-5">
							<h3 className="font-bold">Tugas dan Tanggung Jawab</h3>
							<div className="mt-4">
								<span>Posisi:</span> Guru Bahasa Indonesia
							</div>
							<div>
								<span>Lokasi:</span> Sekolah Alam Depok
							</div>

							<div>
								<span>Status:</span> Pekerjaan Paruh Waktu
							</div>

							<div>
								<span>Periode Pendaftaran:</span> 25 Mei2023
							</div>
						</div>
					</div>

					<button className="btn btn-primary mt-4 text-white">Lamar Sekarang</button>
				</div>
			</Modal>
		</div>
	);
};

export default FormPage;
