import React, { useEffect, useState } from 'react';
import { Attendance } from '@/middlewares/api/hrd';

interface DetailDialogProps {
	dataProps: any;
	onClose: () => void;
}

const DetailCard: React.FC<DetailDialogProps> = ({ dataProps, onClose }) => {
	const [date, setDate] = useState('');
	const [hour, setHour] = useState('');
	const [fileImage, setFileImage] = useState<any>();
	let access_token = sessionStorage.getItem('access_token');
	const getPicture = async () => {
		const response = await Attendance.downloadPicture(access_token, dataProps.file_path);

		const contentType = response.headers['content-type'];
		const typePath = dataProps.file_path.split('.');
		const fileExtension = typePath[typePath.length - 1];
		const blob = new Blob([response.data], {
			type: fileExtension === 'pdf' ? 'application/pdf' : contentType,
		});
		// const blob = new Blob([response.data], { type: "application/pdf" }); //
		const blobUrl = window.URL.createObjectURL(blob);
		// const fileUrl = URL.createObjectURL(blob);
		setFileImage(blobUrl);
	};
	useEffect(() => {
		getPicture();
		if (dataProps.start_date) {
			setDate(dataProps.start_date.split('T')[0] + ' s/d ' + dataProps.end_date.split('T')[0]);
			setHour(
				dataProps.start_date.split('T')[1].substring(0, 5) + ' s/d ' + dataProps.end_date.split('T')[1].substring(0, 5)
			);
		}
	}, [dataProps]);

	return (
		<>
			<div className="fixed inset-0 z-30 bg-black bg-opacity-50"></div>
			<dialog open className="modal modal-open">
				<div className="modal-box w-[1000px] overflow-y-auto">
					<form method="dialog">
						<div className="flex items-center justify-between align-middle font-bold">
							<h1 className="text-xl">{dataProps?.title}</h1>
							<button type="button" className="btn btn-circle btn-ghost btn-sm" onClick={onClose}>
								✕
							</button>
						</div>
					</form>
					<div className="mt-5">
						<figure className="rounded-xl">
							<img
								src={fileImage || `https://ideas.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png`}
								alt="Detail Image"
								className="h-[200px] w-full object-cover"
							/>
						</figure>
						<div className="text-md card-body">
							<h2 className="card-title font-semibold">
								{dataProps?.employee.full_name} {'*' + dataProps?.status}
							</h2>
							<div className="grid w-full grid-cols-2">
								<div className="mr-1">
									<p className="font-semibold">Tanggal</p>
									<p>{date}</p>
								</div>
								<div className="ml-5">
									<p className="font-semibold">Hari/ Jam</p>
									<p>{hour}</p>
								</div>
								<div className="mr-1">
									<ul>
										<li className="font-semibold">Deskripsi</li>
										<li>{dataProps?.description}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default DetailCard;
