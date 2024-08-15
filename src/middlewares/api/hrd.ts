import { hrd, api } from '@/lib';

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

export const CustomerCare = {
	getUserChats: (token: string | null, id: string | null) =>
		api.get(`user-chat/show-by-user/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	createUserChats: (token: string | null, data: any) =>
		api.post(`customer-care/create`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	getDataChat: (token: string | null, limit: number) =>
		api.get(`user`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				limit: limit,
			},
		}),

	getMessages: (token: string | null, id: string | null, idUser: number | string) =>
		api.get(`user-chat/show-conversation`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				userid: id,
				withid: idUser,
			},
		}),

	sendMessage: (token: string | null, currentReceiverId: number | string, inputMessage: any, id: string | null) =>
		api.post(
			`/message/create`,
			{
				user_id: id,
				with_id: currentReceiverId,
				message: inputMessage,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		),
};
