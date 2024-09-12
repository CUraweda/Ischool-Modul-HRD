import { getSessionStorageItem } from '@/utils/storageUtils';
import axios, { Axios, AxiosPromise } from 'axios';
// const instance = axios.create({ baseURL: `https://api-hrd.curaweda.com/stg-server1/api/` });
// const apics = axios.create({ baseURL: `https://prod.curaweda.com/stg-server1/api/` });
const instance = axios.create({ baseURL: `http://localhost:5005/stg-server1/api/` });
const apics = axios.create({ baseURL: `http://localhost:5000/stg-server1/api/` });
const token = getSessionStorageItem('access_token');

const Dashboard = {
	DataKaryawan: (): AxiosPromise<any> =>
		instance({
			method: 'GET',
			url: `employee?limit=10000`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DataPengumuman: (): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-announcement`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DataChart: (): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee-attendance/recap-week`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DataApplicant: (): AxiosPromise =>
		instance({
			method: `GET`,
			url: `applicant-form/rekap-dashboard`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DataTraining: (): AxiosPromise =>
		instance({
			method: `GET`,
			url: `training/recap-dashboard`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	PostPengumuman: (data: any): AxiosPromise<any> =>
		instance({
			method: `POST`,
			url: `employee-announcement/create`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};

const Rekrutmen = {
	DataRekrutmen: (page: any, limit: any, search: string, division: any): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `job-vacancy?page=${page}&limit=${limit}&search=${search}&only_open=1&division_id=${division}`,
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

	DataCv: (id: any): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `applicant-form/detail/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	CloseRekrutment: (id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `job-vacancy/close/${id}`,
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
	LulusRekrutmen: (data: any, id: number): AxiosPromise =>
		instance({
			method: `POST`,
			url: `applicant-form/first-evaluate/lulus/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	GagalRekrutmen: (data: null, id: number): AxiosPromise =>
		instance({
			method: `POST`,
			url: `applicant-form/first-evaluate/gagal/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};

const Probation = {
	DetailProbation: (id: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee/detail/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DetailByUser: (id: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `applicant-form/detail/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	AcceptedProbation: (data: any, id: any): AxiosPromise<any> =>
		instance({
			method: `POST`,
			url: `applicant-form/second-evaluate/lulus/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	RejectedProbation: (data: null, id: any): AxiosPromise<any> =>
		instance({
			method: `POST`,
			url: `applicant-form/second-evaluate/gagal/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	FinishProbation: (data: null, id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee/finish-probation/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	ContracthProbation: (data: null, id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee/contract/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};

const Karyawan = {
	DataKaryawan: (page: any, limit: any, search: string, status: string): AxiosPromise<any> =>
		instance({
			method: 'GET',
			url: `employee?page=${page}&limit=${limit}&search=${search}&status=${status}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	TambahKaryawan: (data: any): AxiosPromise<any> =>
		instance({
			method: `POST`,
			url: `employee/create`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	HapusKaryawan: (id: any): AxiosPromise<any> =>
		instance({
			method: `DELETE`,
			url: `employee/delete/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	ProfilKaryawan: (id: string | undefined): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee/detail/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DaftarPenilaian: (page: any, limit: any): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-jobdesk?page=${page}&limit=${limit}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DaftarAsessor: (page: any, limit: any): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-asessor?page=${page}&limit=${limit}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	AktifAsessor: (data: null, id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee-asessor/activate/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	NonaktifAsessor: (data: null, id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee-asessor/deactivate/${id}`,
			data,
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
				'Content-Type': 'multipart/form-data',
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
	getAllTraining: (page: number, limit: number, status: string, employee_id: any | null): AxiosPromise<any> =>
		instance.get(`training?page=${page}&limit=${limit}&status=${status}&employee_id=${employee_id}`, {
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
		apics.post(
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
export {
	Training,
	Rekrutmen,
	Probation,
	Karyawan,
	Form,
	Attendance,
	WorkTime,
	EmployeeDivision,
	CustomerCare,
	Dashboard,
	Employee,
};
