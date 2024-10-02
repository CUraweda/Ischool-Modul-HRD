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
	access_token = access_token ? access_token.replace(/"/g, '') : null;
	const getPicture = async () => {
		const response = await Attendance.downloadPicture(access_token, dataProps.file_path);
		const lowerCasePath = dataProps.file_path.toLowerCase();
		let mimeType = 'application/pdf';

		if (lowerCasePath.endsWith('.png')) {
			mimeType = 'image/png';
		} else if (lowerCasePath.endsWith('.jpg') || lowerCasePath.endsWith('.jpeg')) {
			mimeType = 'image/jpeg';
		} else {
			throw new Error('Unsupported file type');
		}

		const blob = new Blob([response.data], { type: mimeType });
		const blobUrl = window.URL.createObjectURL(blob);
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
								className="mx-auto h-[200px] bg-auto bg-center bg-no-repeat"
							/>
						</figure>
						<div className="text-md card-body">
							<h2 className="card-title font-semibold">
								{dataProps?.employee.full_name} {'   *' + dataProps?.status}
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
