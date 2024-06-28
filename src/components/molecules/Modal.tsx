import { cn } from '@/utils';
import { RiCloseLine } from '@remixicon/react';
import { ReactNode } from 'react';

const closeModal = (id: string) => {
	const modal = document.getElementById(id) as HTMLDialogElement;
	if (modal) modal.showModal();
};

const openModal = (id: string) => {
	const modal = document.getElementById(id) as HTMLDialogElement;
	if (modal) modal.close();
};

type Props = {
	id: string;
	children: ReactNode;
	className?: string;
	isLoading?: boolean;
	isForm?: boolean;
	onClose?: () => void;
	onCancel?: () => void;
	onPositive?: () => void;
	onNegative?: () => void;
	handleReset?: () => void;
	handleSubmit?: () => void;
};

const Modal = ({
	id,
	children,
	className,
	isLoading = false,
	isForm = false,
	onClose,
	onCancel,
	onPositive,
	onNegative,
	handleReset,
	handleSubmit,
}: Props) => {
	const handleClose = () => {
		closeModal(id);
		if (onClose) onClose();
	};

	return (
		<dialog id={id} className="modal">
			<div className={cn('modal-box', className)}>
				<button onClick={handleClose} className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
					<RiCloseLine size={16} />
				</button>

				{/* content  */}
				{isForm && handleSubmit ? (
					<>
						<form onSubmit={handleSubmit}>
							{children}
							<div className="modal-action">
								{handleReset ? (
									<button onClick={handleReset} type="reset" disabled={isLoading} className="btn min-w-16">
										Reset
									</button>
								) : null}
								<button type="submit" disabled={isLoading} className="btn btn-primary min-w-16">
									{isLoading && <span className="loading loading-dots loading-md mx-auto"></span>}
									Simpan
								</button>
							</div>
						</form>
					</>
				) : (
					<>
						{children}
						<div className="modal-action">
							{onCancel ? (
								<button
									onClick={() => {
										handleClose();
										if (onCancel) onCancel();
									}}
									disabled={isLoading}
									className="btn min-w-16"
								>
									Batal
								</button>
							) : null}
							{onNegative ? (
								<button
									onClick={() => {
										handleClose();
										if (onNegative) onNegative();
									}}
									disabled={isLoading}
									className="btn btn-outline btn-error min-w-16"
								>
									Tidak
								</button>
							) : null}
							{onPositive ? (
								<button
									onClick={() => {
										handleClose();
										if (onPositive) onPositive();
									}}
									disabled={isLoading}
									className="btn btn-primary min-w-16"
								>
									{isLoading && <span className="loading loading-dots loading-md mx-auto"></span>}
									Ya
								</button>
							) : null}
						</div>
					</>
				)}
			</div>
		</dialog>
	);
};

export { closeModal, openModal, Modal };
