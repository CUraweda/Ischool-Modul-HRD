import React, { useEffect, useState } from 'react';
import { getAllEmployee, getWorkTime } from '@/middlewares/api/hrd';
interface CreateAttendanceInput {
	worktime_id: number;
	employee_id: number;
	uid: string;
	description: string;
	status: string;
	is_outstation: boolean;
}

interface Props {
	isOpen: boolean;
	onCreate: (props: CreateAttendanceInput) => void;
	onClose: () => void;
	dataToUpdate?: CreateAttendanceInput;
}
interface EmployeeOption {
	id: number;
	full_name: string;
}

const CreateAttendance: React.FC<Props> = ({ isOpen, onClose, onCreate, dataToUpdate }) => {
	const [uid, setUid] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [status, setStatus] = useState<string>('');
	const [isOutstation, setIsOutstation] = useState<boolean>(false);
	const [optionEmployee, setOptionEmployee] = useState<EmployeeOption[]>([]);
	const [selectedValueEmployee, setSelectedValueEmployee] = useState<any>('');
	const [selectedValueWorkTime, setSelectedWorkTime] = useState<any>('');
	const [optionWorkTime, setOptionWorkTime] = useState<any[]>([]);
	useEffect(() => {
		if (dataToUpdate) {
			setSelectedWorkTime(dataToUpdate.worktime_id);
			setUid(dataToUpdate.uid);
			setDescription(dataToUpdate.description);
			setStatus(dataToUpdate.status);
			setIsOutstation(dataToUpdate.is_outstation);
			setSelectedValueEmployee(dataToUpdate.employee_id);
		}
	}, [dataToUpdate]);

	const handleSave = () => {
		const input: CreateAttendanceInput = {
			employee_id: parseInt(selectedValueEmployee),
			description: description,
			status: status,
			is_outstation: isOutstation,
			uid: uid,
			worktime_id: parseInt(selectedValueWorkTime),
		};
		onCreate(input);
		onClose();
	};
	useEffect(() => {}, [selectedValueWorkTime]);
	const getEmployee = async () => {
		try {
			const result = await getAllEmployee();
			setOptionEmployee(result.data.data.result);
		} catch (error) {
			console.error('Error creating attendance:', error);
		}
	};
	const getAllTime = async () => {
		try {
			const result = await getWorkTime();
			setOptionWorkTime(result.data.data.result);
		} catch (error) {
			console.error('Error creating attendance:', error);
		}
	};

	useEffect(() => {
		getEmployee();
		getAllTime();
	}, []);
	if (!isOpen) return null;

	return (
		<>
			<div className="fixed inset-0 z-30 bg-black bg-opacity-50"></div>
			<dialog open className="modal modal-open">
				<div className="modal-box">
					<h3 className="text-lg font-bold">{dataToUpdate ? 'Update Attendance' : 'Create Attendance'}</h3>
					<div className="my-4">
						<label className="block">
							UID
							<input
								type="text"
								value={uid}
								onChange={(e) => setUid(e.target.value)}
								className="input input-bordered mt-1 w-full"
							/>
						</label>
						<label className="block">
							Description
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="textarea textarea-bordered mt-1 w-full"
							/>
						</label>
						<label className="block">
							Status
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="select select-bordered mt-1 w-full"
							>
								<option disabled value="">
									-Pilih
								</option>
								<option value="Tepat Waktu">Tepat Waktu</option>
								<option value="Diluar Jadwal">Diluar Jadwal</option>
								<option value="Terlambat">Terlambat</option>
							</select>
						</label>
						<label className="mt-2 flex items-center gap-4">
							<input
								type="checkbox"
								checked={isOutstation}
								onChange={(e) => setIsOutstation(e.target.checked)}
								className="checkbox-primary checkbox"
							/>
							<div>Is Outstation</div>
						</label>
						<div>
							<label className="label">
								<span className="label-text">Nama Karyawan</span>
							</label>
							<select
								className="select select-bordered w-full"
								value={selectedValueEmployee}
								onChange={(e) => setSelectedValueEmployee(e.target.value)}
							>
								<option disabled value="">
									-Pilih
								</option>
								{optionEmployee.map((option) => (
									<option key={option.id} value={option.id}>
										{option.full_name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="label">
								<span className="label-text">Jam Kerja</span>
							</label>
							<select
								className="select select-bordered w-full"
								value={selectedValueWorkTime}
								onChange={(e) => setSelectedWorkTime(e.target.value)}
							>
								<option disabled value="">
									-Pilih
								</option>
								{optionWorkTime.map((option: any) => (
									<option key={option.id} value={option.id}>
										Hari {option.weekday.name} - Tipe{' '}
										{option.type.charAt(0).toUpperCase() + option.type.slice(1).toLowerCase()} - {option.start_time} s/d{' '}
										{option.end_time}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="modal-action">
						<button className="btn" onClick={handleSave}>
							Save
						</button>
						<button className="btn btn-ghost" onClick={onClose}>
							Cancel
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default CreateAttendance;
