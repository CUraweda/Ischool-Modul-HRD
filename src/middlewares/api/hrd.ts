import { hrd } from '@/lib';

export const getEmployeeAttendance = (page: number, limit: number) =>
	hrd.get('employee-attendance', {
		params: { page, limit },
	});
export const createEmployeeAttendance = (data: any) => hrd.post('employee-attendance/create', data);
export const updateEmployeeAttendance = (id: number, data: any) => hrd.put(`employee-attendance/update/${id}`, data);
export const deleteEmployeeAttendance = (id: number) => hrd.delete(`employee-attendance/delete/${id}`);
export const getWorkTime = () => hrd.get('worktime');
export const createWorkTime = (data: any) => hrd.post('worktime/create', data);
export const updateWorkTime = (data: any, id: number) => hrd.put(`worktime/update/${id}`, data);
export const deleteWorkTime = (id: number) => hrd.delete(`worktime/delete/${id}`);
export const getAllEmployee = () => hrd.get('employee');
export const getAllDivision = () => hrd.get('division');
