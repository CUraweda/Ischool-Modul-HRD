import { getSessionStorageItem } from '@/utils/storageUtils';
import axios, { AxiosPromise } from 'axios';
const instance = axios.create({ baseURL: `http://localhost:5005/stg-server1/api/` });
const apics = axios.create({ baseURL: `http://localhost:5000/stg-server1/api/` });
const token = getSessionStorageItem('access_token');

const Rekrutmen = {
	DataRekrutmen: (page: any, limit: any, search: string): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `job-vacancy?page=${page}&limit=${limit}&search=${search}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	DataDetailRekrutmen: (page: any, limit: any, search: string, id: string | undefined): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `applicant-form/by-vacancy/${id}?page=${page}&limit=${limit}&search=${search}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	DropdownDivision: (): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `division?limit=100`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	AddRekrutmen: (data: any): AxiosPromise<any> =>
		instance({
			method: 'POST',
			url: `job-vacancy/create-detail`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};

const Karyawan = {
	DataKaryawan: (page: any, limit: any, search: string): AxiosPromise<any> =>
		instance({
			method: 'GET',
			url: `employee?page=${page}&limit=${limit}&search=${search}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};

const Form = {
	PostDataPelamar: (data: any): AxiosPromise<any> =>
		instance({
			method: 'POST',
			url: `applicant-form/send`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
const Attendance = {
	getEmployeeAttendance: (
		page: number,
		limit: number,
		type: string[],
		status: string[],
		search: string,
		division: any,
		date: string
	): AxiosPromise<any> => {
		const typeParam = type.length ? type.join(',') : '';
		const statusParam = status.length ? status.join(',') : '';

		return instance.get(`employee-attendance`, {
			params: { search, type: typeParam, status: statusParam, division_id: division, date, page, limit },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	getAllDivision: (): AxiosPromise<any> => {
		return instance.get(`division`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	getVacation: (
		page: number,
		limit: number,
		search: string,
		type: string[],
		status: string[],
		date: string,
		divisi: any
	): AxiosPromise<any> => {
		const typeParam = type.length ? type.join(',') : '';
		const statusParam = status.length ? status.join(',') : '';

		return instance.get('employee-vacation', {
			params: { search, page, limit, type: typeParam, status: statusParam, date, division_id: divisi },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	createVacation: (data: any): AxiosPromise<any> =>
		instance.post('employee-vacation/create', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	updateVacation: (id: number, data: any): AxiosPromise<any> =>
		instance.put(`employee-vacation/update/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	deleteVacation: (id: number): AxiosPromise<any> =>
		instance.delete(`employee-vacation/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	requestVacation: (data: any): AxiosPromise<any> =>
		instance.post(`employee-vacation/request`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
const Training = {
	getAllTraining: (
		page: number,
		limit: number,
		status: any,
		type: string[],
		search_query: string,
		employee_id: any | null
	): AxiosPromise<any> => {
		const typeParam = type.length ? type.join(',') : '';

		return instance.get(
			`training?page=${page}&limit=${limit}&status=${status}&employee_id=${employee_id}&search_query=${search_query}&type=${typeParam}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	},
	requestTraining: (data: any): AxiosPromise<any> =>
		instance.post('training/create', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	updateTraining: (id: number, data: any): AxiosPromise<any> =>
		instance.put(`training/update/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
const WorkTime = {
	getWorkTime: (): AxiosPromise<any> =>
		instance.get('worktime', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	createWorkTime: (data: any): AxiosPromise<any> =>
		instance.post('worktime/create', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	updateWorkTime: (id: number, data: any): AxiosPromise<any> =>
		instance.put(`worktime/update/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	deleteWorkTime: (id: number): AxiosPromise<any> =>
		instance.delete(`worktime/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};

const Employee = {
	getAllEmployee: (limit: number, search_query: any): AxiosPromise<any> =>
		instance.get('employee', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				limit: limit,
				search_query: search_query,
			},
		}),
};
const EmployeeJobdesk = {
	getAllJobdesk: (limit: number, search_query: any, page: number): AxiosPromise<any> =>
		instance.get('employee-jobdesk', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				limit: limit,
				search_query: search_query,
				page: page,
			},
		}),
	getDifference: (id: number): AxiosPromise<any> =>
		instance.get(`employee-jobdesk/difference-day/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
		createJobdesk: (data: any): AxiosPromise<any> =>
		instance.post('employee-jobdesk/create', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
const EmployeeDivision = {
	getAllEmployee: (): AxiosPromise<any> =>
		instance.get('employee', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	getAllDivision: (): AxiosPromise<any> =>
		instance.get('division', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};

const CustomerCare = {
	getUserChats: (token: string | null, id: string | null) =>
		apics.get(`user-chat/show-by-user/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	createUserChats: (token: string | null, data: any) =>
		apics.post(`customer-care/create`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	getDataChat: (token: string | null, limit: number) =>
		apics.get(`user`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				limit: limit,
			},
		}),

	getMessages: (token: string | null, id: string | null, idUser: number | string) =>
		apics.get(`user-chat/show-conversation`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				userid: id,
				withid: idUser,
			},
		}),

	sendMessage: (token: string | null, currentReceiverId: number | string, inputMessage: any, id: string | null) =>
		instance.post(
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

const Penggajian = {
	getAllAccount: (token: string, month: string): AxiosPromise<any> =>
		instance.get(`/employee-account?page=0&limit=20&this_month=${month}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getMonthAccount: (token: string): AxiosPromise<any> =>
		instance.get('/employee-account/total-month', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getYearAccount: (token: string): AxiosPromise<any> =>
		instance.get('/employee-account/recap-year', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getOneAccount: (id: number, token: string): AxiosPromise<any> =>
		instance.get(`/employee-account/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getDetailAccount: (id: number, token: string): AxiosPromise<any> =>
		instance.get(`/employee-account/detail/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
export {
	Training,
	Rekrutmen,
	Karyawan,
	Form,
	Attendance,
	WorkTime,
	EmployeeDivision,
	CustomerCare,
	Employee,
	EmployeeJobdesk,
	Penggajian,
};
