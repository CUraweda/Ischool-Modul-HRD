import React, { useState } from 'react';

interface CreateAttendanceInput {
	worktime_id: number;
	employee_id: number;
	uid: string;
	description: string;
	status: string;
	is_outstation: boolean;
}

interface CreateAttendanceProps {
	isOpen: boolean;
	onClose: () => void;
	onCreate: (input: CreateAttendanceInput) => void;
}

const CreateAttendance: React.FC<CreateAttendanceProps> = ({ isOpen, onClose, onCreate }) => {
	const [formInput, setFormInput] = useState<CreateAttendanceInput>({
		worktime_id: 1,
		employee_id: 59,
		uid: '',
		description: '',
		status: 'Tepat Waktu',
		is_outstation: false,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormInput({
			...formInput,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onCreate(formInput);
		onClose(); // Close modal after submission
	};

	return (
		<>
			{isOpen && (
				<>
					<div className="fixed inset-0 z-30 bg-black bg-opacity-50"></div>
					<dialog open className="modal modal-open">
						<div className="modal-box max-w-[450px] overflow-y-auto">
							<form method="dialog" onSubmit={handleSubmit}>
								<div className="flex items-center justify-between font-bold">
									<h1 className="text-xl">Create Attendance</h1>
									<button type="button" className="btn btn-circle btn-ghost btn-sm" onClick={onClose}>
										✕
									</button>
								</div>
								<div className="mt-5">
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700">UID</label>
										<input
											type="text"
											name="uid"
											value={formInput.uid}
											onChange={handleInputChange}
											className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>

									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700">Description</label>
										<textarea
											name="description"
											value={formInput.description}
											onChange={handleInputChange}
											className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>

									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700">Status</label>
										<select
											name="status"
											value={formInput.status}
											onChange={handleInputChange}
											className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										>
											<option value="Tepat Waktu">Tepat Waktu</option>
											<option value="Diluar Jadwal">Diluar Jadwal</option>
											<option value="Terlambat">Terlambat</option>
										</select>
									</div>

									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700">Is Outstation</label>
										<input
											type="checkbox"
											name="is_outstation"
											checked={formInput.is_outstation}
											onChange={handleInputChange}
											className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
										/>
									</div>

									<div className="flex justify-end">
										<button
											type="submit"
											className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											Create Attendance
										</button>
									</div>
								</div>
							</form>
						</div>
					</dialog>
				</>
			)}
		</>
	);
};

export default CreateAttendance;
