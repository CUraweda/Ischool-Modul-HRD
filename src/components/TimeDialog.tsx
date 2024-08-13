import React, { useState } from 'react';

interface TimeEntryDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (jamMasuk: string, jamKeluar: string) => void;
}

const TimeEntryDialog: React.FC<TimeEntryDialogProps> = ({ isOpen, onClose, onSave }) => {
	const [jamMasuk, setJamMasuk] = useState<string>('');
	const [jamKeluar, setJamKeluar] = useState<string>('');
	const [activeTab, setActiveTab] = useState<'masuk' | 'keluar'>('masuk');

	const handleSave = () => {
		onSave(jamMasuk, jamKeluar);
		onClose();
	};

	if (!isOpen) return null; // Prevent rendering when dialog is closed

	return (
		<>
			<div className="fixed inset-0 z-30 bg-black bg-opacity-50"></div>
			<dialog open className="modal modal-open">
				<div className="modal-box">
					<h3 className="text-lg font-bold">Set Jam Masuk dan Keluar</h3>
					<div className="tabs">
						<a
							className={`tab-bordered tab ${activeTab === 'masuk' ? 'tab-active' : ''}`}
							onClick={() => setActiveTab('masuk')}
						>
							Jam Masuk
						</a>
						<a
							className={`tab-bordered tab ${activeTab === 'keluar' ? 'tab-active' : ''}`}
							onClick={() => setActiveTab('keluar')}
						>
							Jam Keluar
						</a>
					</div>
					<div className="my-4">
						{activeTab === 'masuk' ? (
							<label className="block">
								Jam Masuk
								<input
									type="time"
									value={jamMasuk}
									onChange={(e) => setJamMasuk(e.target.value)}
									className="input input-bordered mt-1 w-full"
								/>
							</label>
						) : (
							<label className="block">
								Jam Keluar
								<input
									type="time"
									value={jamKeluar}
									onChange={(e) => setJamKeluar(e.target.value)}
									className="input input-bordered mt-1 w-full"
								/>
							</label>
						)}
					</div>
					<div className="modal-action">
						<button className="btn" onClick={handleSave}>
							Simpan
						</button>
						<button className="btn btn-ghost" onClick={onClose}>
							Batal
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default TimeEntryDialog;
