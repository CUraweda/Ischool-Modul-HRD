import { Rekrutmen } from '@/middlewares/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

	if (startDateObj.getMonth() === endDateObj.getMonth() && startDateObj.getFullYear() === endDateObj.getFullYear()) {
		return `${startDateObj.getDate()} - ${endDateObj.toLocaleDateString('id-ID', options)}`;
	}

	const start = startDateObj.toLocaleDateString('id-ID', options);
	const end = endDateObj.toLocaleDateString('id-ID', options);

	return `${start} - ${end}`;
}

const FormPage = () => {
	const [dataJob, setDataJob] = useState<any[]>([]);
	const navigate = useNavigate();
	const [id, setId] = useState('');
	const [dataDetail, setDataDetail] = useState<any[]>([]);

	const handleDialog = (id: any, data: any) => {
		openModal('detailForm');
		setId(id);
		setDataDetail(
			data.map((detail: any) => ({
				title: detail.title,
				descriptions: detail.description.split('\n'),
			}))
		);
	};

	const fetchData = async () => {
		try {
			const response = await Rekrutmen.DataRekrutmen(0, 20, '', '', '');
			setDataJob(response.data.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	const handleNavigate = () => {
		navigate('/form-data');
		sessionStorage.setItem('vacancy_id', id);
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
						onClick={() => handleDialog(item.id, item.vacancydetails)}
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
							{dataDetail.map((item, index) => (
								<div key={index}>
									<div>
										<h3 className="mt-4 font-bold">{item.title}</h3>
										{item.descriptions.map((detail: any, detailIndex: any) => (
											<div className="mt-4" key={detailIndex}>
												{detail}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					<button className="btn btn-primary mt-4 text-white" onClick={() => handleNavigate()}>
						Lamar Sekarang
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default FormPage;
