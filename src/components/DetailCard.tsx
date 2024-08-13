import React from 'react';

interface DetailDialogProps {
	id: string;
	nama: string;
	status: string;
	image: any;
	title: string;
	tanggal: string;
	deskripsi: string;
	onClose: () => void;
}

const DetailCard: React.FC<DetailDialogProps> = ({ id, nama, status, tanggal, deskripsi, onClose, title, image }) => {
	return (
		<>
			<div className="fixed inset-0 z-30 bg-black bg-opacity-50"></div>
			<dialog id={id} className="modal modal-open">
				<div className="modal-box max-w-[450px] overflow-y-auto">
					<form method="dialog">
						<div className="flex items-center justify-between align-middle font-bold">
							<h1 className="text-xl">{title}</h1>
							<button type="button" className="btn btn-circle btn-ghost btn-sm" onClick={onClose}>
								✕
							</button>
						</div>
					</form>
					<div className="mt-5">
						<figure className="rounded-xl">
							<img
								src={image || `https://ideas.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png`}
								alt="Detail Image"
								className="h-[200px] w-full object-cover"
							/>
						</figure>
						<div className="text-md card-body">
							<h2 className="card-title font-semibold">
								{nama} {'*' + status}
							</h2>
							<div className="my-2 grid grid-cols-2">
								<div className="w-1/2">
									<p className="font-semibold">Tanggal</p>
									<p>{tanggal}</p>
								</div>
								<div className="w-1/2">
									<p className="font-semibold">Hari/ Jam</p>
									<p>{tanggal}</p>
								</div>
							</div>
							<ul className="my-2">
								<li className="font-semibold">Deskripsi</li>
								<li>{deskripsi}</li>
							</ul>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default DetailCard;
