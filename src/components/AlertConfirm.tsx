import React from 'react';

interface ConfirmationDialogProps {
	id: string;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ id, title, message, onConfirm, onCancel }) => {
	return (
		<dialog id={id} className="modal">
			<form method="dialog" className="modal-box">
				<h3 className="text-lg font-bold">{title}</h3>
				<p className="py-4">{message}</p>
				<div className="modal-action">
					<button type="button" className="btn btn-primary" onClick={onConfirm}>
						Ok
					</button>
					<button type="button" className="btn btn-secondary" onClick={onCancel}>
						Batal
					</button>
				</div>
			</form>
		</dialog>
	);
};

export default ConfirmationDialog;
