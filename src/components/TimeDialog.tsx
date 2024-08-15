import React, { useEffect, useState } from 'react';
import { createWorkTime, getWorkTime, updateWorkTime, getAllDivision, deleteWorkTime } from '@/middlewares/api/hrd';

import { LuPencil } from 'react-icons/lu';
import { MdOutlineDelete } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
interface TimeEntryDialogProps {
	isOpen: boolean;
	onClose: () => void;
}
interface dialog {
	onClose: () => void;
	onSaveData: () => void;
	jamKeluar: string;
	jamMasuk: string;
	setJamKeluar: (value: string) => void;
	setJamMasuk: (value: string) => void;
	selectedValue: string;
	selectedValueDay: string;
	selectedValueType: string;
	handleChangeDay: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	handleChangeType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const DialogAdd: React.FC<dialog> = ({
	onClose,
	jamKeluar,
	jamMasuk,
	setJamMasuk,
	setJamKeluar,
	handleChange,
	selectedValue,
	selectedValueType,
	handleChangeType,
	handleChangeDay,
	selectedValueDay,
	onSaveData,
}) => {
	const [optionDivision, setOptionDivision] = useState<any[]>([]);
	const getDataDivision = async () => {
		const response = await getAllDivision();
		setOptionDivision(response.data.data.result);
	};
	const handleSave = () => {
		onSaveData();
		onClose();
	};
	useEffect(() => {
		getDataDivision();
	}, []);
	const optionsDay = [
		{ id: 1, name: 'Senin' },
		{ id: 2, name: 'Selasa' },
		{ id: 3, name: 'Rabu' },
		{ id: 4, name: 'Kamis' },
		{ id: 5, name: 'Jumat' },
		{ id: 6, name: 'Sabtu' },
		{ id: 7, name: 'Minggu' },
	];
	const optionsType = ['MASUK', 'KELUAR'];
	return (
		<div>
			<div className="fixed inset-0 z-50 bg-black bg-opacity-50"></div>
			<dialog open className="modal modal-open">
				<div className="modal-box z-40 w-11/12 max-w-5xl">
					<header className="flex items-center justify-between">
						<h3 className="text-lg font-bold">Add Time Entry</h3>
						<div>
							<button className="btn btn-circle" onClick={() => onClose()}>
								<IoMdClose className="text-2xl" />
							</button>
						</div>
					</header>
					<div>
						<label className="label">
							<span className="label-text">Tipe</span>
						</label>
						<select className="select select-bordered w-full" value={selectedValueType} onChange={handleChangeType}>
							<option disabled value="">
								-Pilih
							</option>
							{optionsType.map((option, index) => (
								<option key={index} value={option.toUpperCase()}>
									{option}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="label">
							<span className="label-text">Divisi</span>
						</label>
						<select className="select select-bordered w-full" value={selectedValue} onChange={handleChange}>
							<option disabled value="">
								-Pilih
							</option>
							{optionDivision.map((option, index) => (
								<option key={index} value={option.id}>
									{option.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex w-full gap-4">
						<section className="w-full">
							<label className="label">
								<span className="label-text">Mulai dari</span>
							</label>
							<div>
								<input
									type="time"
									value={jamMasuk}
									onChange={(e) => setJamMasuk(e.target.value)}
									className="input input-bordered mt-1 w-full"
								/>
							</div>
						</section>
						<section className="w-full">
							<label className="label">
								<span className="label-text">Sampai dengan</span>
							</label>
							<div>
								<input
									type="time"
									value={jamKeluar}
									onChange={(e) => setJamKeluar(e.target.value)}
									className="input input-bordered mt-1 w-full"
								/>
							</div>
						</section>
					</div>
					<div>
						<label className="label">
							<span className="label-text">Hari</span>
						</label>
						<select className="select select-bordered w-full" value={selectedValueDay} onChange={handleChangeDay}>
							<option disabled value="">
								-Pilih
							</option>
							{optionsDay.map((option, index) => (
								<option key={index} value={option.id}>
									{option.name}
								</option>
							))}
						</select>
					</div>
					<div className="join join-vertical mt-5 sm:join-horizontal">
						<button className={`btn btn-outline btn-error join-item btn-sm px-5`} onClick={() => onClose()}>
							Batal
						</button>
						<button className={`btn btn-primary join-item btn-sm px-5`} onClick={() => handleSave()}>
							Simpan
						</button>
					</div>
				</div>
			</dialog>
		</div>
	);
};
const TimeEntryDialog: React.FC<TimeEntryDialogProps> = ({ isOpen, onClose }) => {
	// const [jamMasuk, setJamMasuk] = useState<string>('');
	const [jamKeluar, setJamKeluar] = useState<string>('');
	const [activeTab, setActiveTab] = useState<'masuk' | 'keluar'>('masuk');
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<string>('');
	const [jamMasuk, setJamMasuk] = useState<string>('');
	const [selectedValueDay, setSelectedValueDay] = useState<string>('');
	const [selectedValueType, setSelectedValueType] = useState<string>('');
	const [dataWorkTime, setDataWorkTime] = useState<any[]>([]);

	const [id, setId] = useState<number>(0);
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedValue(value);
	};
	const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedValueType(value);
	};
	const handleChangeDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedValueDay(value);
	};
	const onSaveData = () => {
		const Data = {
			division_id: selectedValue,
			type: selectedValueType,
			start_time: jamMasuk,
			end_time: jamKeluar,
			weekday_id: selectedValueDay,
		};
		if (id !== 0) {
			changeWorkTime(Data, id);
		} else {
			addWorkTime(Data);
		}
	};
	// const handleSave = () => {
	// 	onSave(jamMasuk, jamKeluar);
	// 	onClose();
	// };
	const handleDialog = () => {
		setShowDialog((showDialog) => !showDialog);
	};
	const getAllWorkTime = async () => {
		const result = await getWorkTime();
		setDataWorkTime(result.data.data.result);
	};
	const addWorkTime = async (data: any) => {
		await createWorkTime(data);
		getAllWorkTime();
		setId(0);
	};
	const changeWorkTime = async (data: any, id: number) => {
		await updateWorkTime(data, id);
		getAllWorkTime();
		setId(0);
	};
	const removeWorkTime = async (id: number) => {
		await deleteWorkTime(id);
		getAllWorkTime();
		setId(0);
	};

	useEffect(() => {
		getAllWorkTime();
	}, []);
	const filteredWorkTime = dataWorkTime.filter((option) =>
		activeTab ? option.type.toLowerCase() === activeTab : true
	);

	const handleEdit: any = (type: string, data: any) => {
		setId(data.id);
		if (type === 'edit') {
			setShowDialog((showDialog) => !showDialog);
			setSelectedValue(data.division_id);
			setSelectedValueDay(data.weekday_id);
			setJamMasuk(data.start_time);
			setJamKeluar(data.end_time);
		} else {
			removeWorkTime(data.id);
		}
	};
	if (!isOpen) return null; // Prevent rendering when dialog is closed

	return (
		<>
			<div className="fixed inset-0 z-30 bg-black bg-opacity-50"></div>
			<dialog open className="modal modal-open">
				{showDialog && (
					<DialogAdd
						onClose={handleDialog}
						jamKeluar={jamKeluar}
						setJamKeluar={setJamKeluar}
						jamMasuk={jamMasuk}
						setJamMasuk={setJamMasuk}
						handleChange={handleChange}
						selectedValue={selectedValue}
						handleChangeDay={handleChangeDay}
						selectedValueDay={selectedValueDay}
						handleChangeType={handleChangeType}
						selectedValueType={selectedValueType}
						onSaveData={onSaveData}
					/>
				)}
				<div className="modal-box w-11/12 max-w-5xl">
					<header className="flex items-center justify-between pb-8">
						<h3 className="text-lg font-bold">Jam Kerja Karyawan</h3>
						<div>
							<button className="btn btn-circle btn-ghost">
								<IoMdClose className="text-2xl" onClick={() => onClose()} />
							</button>
						</div>
					</header>
					<div className="tabs flex justify-between">
						<div className="join join-vertical sm:join-horizontal">
							<button
								className={`px-8 ${activeTab === 'masuk' ? 'btn-outline btn-primary' : 'btn-outline'} btn join-item btn-sm`}
								onClick={() => setActiveTab('masuk')}
							>
								Masuk
							</button>
							<button
								className={`px-8 ${activeTab === 'keluar' ? 'btn-outline btn-primary' : 'btn-outline'} btn join-item btn-sm`}
								onClick={() => setActiveTab('keluar')}
							>
								Keluar
							</button>
						</div>
						<button className={`btn btn-primary join-item btn-sm px-5`} onClick={() => handleDialog()}>
							Tambah
						</button>
					</div>
					<div className="my-4 text-slate-500">
						<label className="block">
							{filteredWorkTime.map((option) => (
								<div className="card w-full rounded-sm p-5" key={option.id}>
									<div className="card-body rounded-xl shadow-lg">
										<div className="flex justify-between">
											<div className="text-xl">
												{option.weekday.name} - {option.division.name}
											</div>
											<div className="block">
												<section className="text-3xl">
													{option.start_time.slice(0, 5)} - {option.end_time.slice(0, 5)}
												</section>
												<section>{option.type.charAt(0).toUpperCase() + option.type.slice(1).toLowerCase()}</section>
											</div>
											<div className="flex items-end gap-5 self-center">
												<button
													className="btn btn-circle btn-outline btn-primary btn-md rounded-full"
													onClick={() => handleEdit('edit', option)}
												>
													<LuPencil className="text-2xl" />
												</button>
												<button
													className="btn btn-circle btn-outline btn-primary btn-md rounded-full"
													onClick={() => handleEdit('delete', option)}
												>
													<MdOutlineDelete className="text-2xl" />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</label>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default TimeEntryDialog;
