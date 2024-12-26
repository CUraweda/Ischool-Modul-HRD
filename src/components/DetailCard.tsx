import React, { useEffect, useState } from 'react';

interface DetailDialogProps {
	dataProps: any;
	onClose: () => void;
}

const DetailCard: React.FC<DetailDialogProps> = ({ dataProps, onClose }) => {
	const [date, setDate] = useState('');
	const [hour, setHour] = useState('');
	const [imageSrc, setImageSrc] = useState('');

	useEffect(() => {
		if (dataProps.start_date) {
			setDate(dataProps.start_date.split('T')[0]);
			setHour(dataProps.start_date.split('T')[1].split('.')[0].slice(0, -3));
		} else if (dataProps.createdAt) {
			setDate(dataProps.createdAt.split('T')[0]);
			setHour(dataProps.createdAt.split('T')[1].split('.')[0].slice(0, -3));
		}

		if (dataProps.file_path) {
			const fetchImage = async () => {
				try {
					const response = await fetch(`${import.meta.env.VITE_SERVER_HRD_FILE}${dataProps.file_path}`);
					const blob = await response.blob();
					const blobUrl = URL.createObjectURL(blob);
					setImageSrc(blobUrl);
				} catch (error) {
					console.error('Error fetching image:', error);
					setImageSrc('https://ideas.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png');
				}
			};

			fetchImage();
		} else {
			setImageSrc('https://ideas.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png');
		}
	}, [dataProps]);

	return (
		<>
			<div className="fixed inset-0 z-30 bg-black bg-opacity-50"></div>
			<dialog open className="modal modal-open">
				<div className="modal-box w-[90%] overflow-y-auto md:w-[900px]">
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
							<img src={imageSrc} alt="Detail Image" className="h-[200px] w-full object-cover" />
						</figure>
						<div className="text-md card-body">
							<h2 className="card-title font-semibold">
								{dataProps?.employee.full_name} {'*' + dataProps?.status}
							</h2>
							<div className="my-2 grid grid-cols-2">
								<div className="w-1/2">
									<p className="font-semibold">Tanggal</p>
									<p>{date}</p>
								</div>
								<div className="w-1/2">
									<p className="font-semibold">Hari/ Jam</p>
									<p>{hour}</p>
								</div>
							</div>
							<ul className="my-2">
								<li className="font-semibold">Deskripsi</li>
								<li>{dataProps?.description}</li>
							</ul>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default DetailCard;
