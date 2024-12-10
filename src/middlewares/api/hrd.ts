import { getSessionStorageItem } from '@/utils/storageUtils';
import axios, { AxiosPromise } from 'axios';

const instance = axios.create({ baseURL: import.meta.env.VITE_SERVER_HRD_URL });
const apics = axios.create({ baseURL: import.meta.env.VITE_SERVER_MAIN_URL });

const token = getSessionStorageItem('access_token');

const Verif = {
	PostVerify: (data: any, id: any): AxiosPromise<any> =>
		apics({
			method: 'POST',
			data,
			url: `auth/verify-email/${id}`,
		}),
};

const Dashboard = {
	DataKaryawan: (access_token: string | null): AxiosPromise<any> =>
		instance({
			method: 'GET',
			url: `employee?limit=10000&sort_name=1`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataPengumuman: (access_token: string | null): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-announcement`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataChart: (access_token: string | null): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee-attendance/recap-week`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataApplicant: (access_token: string | null): AxiosPromise =>
		instance({
			method: `GET`,
			url: `applicant-form/rekap-dashboard`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataTraining: (access_token: string | null): AxiosPromise =>
		instance({
			method: `GET`,
			url: `training/recap-dashboard`,
			headers: {
				Authorization: `Bearer ${access_token}`,
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

	DeletePengumuman: (id: any): AxiosPromise<any> =>
		instance({
			method: `DELETE`,
			url: `employee-announcement/delete/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
const TrainingSuggest = {
	getAllTraining: (page: any, limit: any, search: string): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `training-suggestion?page=${page}&limit=${limit}&search=${search}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	editTrainingSuggest: (data: any, id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `training-suggestion/update/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	approveEditTrainingSuggest: (data: any, id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `training-suggestion/approve/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	createTrainingSuggest: (data: any): AxiosPromise<any> =>
		instance({
			method: `POST`,
			url: `training-suggestion/create`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
const Rekrutmen = {
	DataRekrutmen: (
		page: any,
		limit: any,
		search: string,
		division: any,
		access_token: string | null,
		user_id: any,
		is_active: string
	): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url:
				`job-vacancy?page=${page}&limit=${limit}&search=${search}&division_id=${division}` +
				(user_id ? `&user_id=${user_id}` : '') +
				(is_active ? `&only_open=${is_active}` : ''),
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),

	DataDetailRekrutmen: (
		page: any,
		limit: any,
		search: string,
		id: string | undefined,
		access_token: string | null,
		isPassed: any,
		isInterview: any,
		tipe_rekrutmen: string
	): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url:
				`applicant-form/by-vacancy/${id}?page=${page}&limit=${limit}&status=${tipe_rekrutmen}&search=${search}` +
				(isPassed ? '&is_passed=1' : '') +
				(isInterview ? '&is_passed_interview=1' : ''),
			headers: {
				Authorization: `Bearer ${access_token}`,
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

	DropdownDivision: (access_token: string | null): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `division?limit=100`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),

	AddRekrutmen: (data: any, access_token: string | null): AxiosPromise<any> =>
		instance({
			method: 'POST',
			url: `job-vacancy/create-detail`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	LulusRekrutmen: (data: null, id: number): AxiosPromise =>
		instance({
			method: `POST`,
			url: `applicant-form/selection-evaluate/lulus/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	GagalRekrutmen: (data: null, id: number): AxiosPromise =>
		instance({
			method: `POST`,
			url: `applicant-form/selection-evaluate/gagal/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	LulusPsikotes: (data: null, id: number): AxiosPromise =>
		instance({
			method: `POST`,
			url: `applicant-form/psychology-evaluate/lulus/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	GagalPsikotes: (data: null, id: number): AxiosPromise =>
		instance({
			method: `POST`,
			url: `applicant-form/psychology-evaluate/gagal/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	LulusInterview: (data: any, id: number): AxiosPromise =>
		instance({
			method: `POST`,
			url: `applicant-form/first-evaluate/lulus/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	GagalInterview: (data: null, id: number): AxiosPromise =>
		instance({
			method: `POST`,
			url: `applicant-form/first-evaluate/Gagal/${id}`,
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
	DetailByUser: (id: any, access_token: string | null): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee/detail/${id}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DetailPresensi: (id: any, access_token: string | null): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-attendance?page=0&limit=1000&employee_id=${id}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DetailChart: (id: any, access_token: string | null): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee-jobdesk/recap-week-employee/${id}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
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
	DataKaryawan: (
		page: any,
		limit: any,
		search: string,
		status: string,
		access_token: string | null
	): AxiosPromise<any> =>
		instance({
			method: 'GET',
			url: `employee?page=${page}&limit=${limit}&search=${search}&status=${status}&sort_name=1`,
			headers: {
				Authorization: `Bearer ${access_token}`,
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
	EditKaryawan: (data: any, id: any): AxiosPromise =>
		instance({
			method: `PUT`,
			url: `employee/update/${id}`,
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
	ProfilKaryawan: (id: string | undefined, access_token: string | null): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee/detail/${id}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DaftarPenilaian: (page: any, limit: any, search: string, access_token: string | null): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-jobdesk?page=${page}&limit=${limit}&search=${search}&sort_name=1`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	AddPenilaian: (data: any): AxiosPromise<any> =>
		instance({
			method: `POST`,
			url: `employee-jobdesk/create-bulk`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	EditPenilaian: (data: any, id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee-jobdesk/update/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	EditNilai: (data: any, id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee-jobdesk/grade/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DaftarAsessor: (page: any, limit: any, search: string, access_token: string | null): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-asessor?page=${page}&limit=${limit}&search=${search}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
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
	JobdeskList: (access_token: string | null, id: any, is_graded: any): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-jobdesk?page=0&limit=2000&employee_id=${id}&is_graded=${is_graded}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
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
		date: string,
		tipeDate: string,
		access_token: string | null
	): AxiosPromise<any> => {
		const typeParam = type.length ? type.join(',') : '';
		const statusParam = status.length ? status.join(',') : '';

		return instance.get(`employee-attendance`, {
			params: {
				search,
				type: typeParam,
				status: statusParam,
				division_id: division,
				date,
				page,
				limit,
				iteration: tipeDate,
			},
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
	},
	deleteAttendance: (id: number): AxiosPromise<any> =>
		instance.delete(`employee-attendance/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getAllEmployeeMonth: (search: string, access_token: string | null): AxiosPromise<any> => {
		return instance.get(`employee-attendance/recap-month-employee`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			params: {
				search_query: search,
			},
		});
	},
	getAllDivision: (access_token: string | null): AxiosPromise<any> => {
		return instance.get(`division`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
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
		divisi: any,
		access_token: string | null
	): AxiosPromise<any> => {
		const typeParam = type.length ? type.join(',') : '';
		const statusParam = status.length ? status.join(',') : '';

		return instance.get('employee-vacation', {
			params: { search, page, limit, type: typeParam, status: statusParam, date, division_id: divisi },
			headers: {
				Authorization: `Bearer ${access_token}`,
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

	acceptVacation: (id: number, data: null): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee-vacation/change-status/accept/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),

	rejectVacation: (id: number, data: null): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee-vacation/change-status/reject/${id}`,
			data,
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
		instance.post(`employee-vacation/create`, data, {
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
	getOneEmployee: (id: any, access_token: string | null): AxiosPromise<any> =>
		instance.get(`employee/show/${id}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	getAllEmployee: (limit: number, search_query: any, access_token: string | null): AxiosPromise<any> =>
		instance.get('employee', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			params: {
				limit: limit,
				search: search_query,
				sort_name: 1,
			},
		}),
	getAllEmployeePage: (
		limit: number,
		search_query: any,
		page: any,
		access_token: string | null,
		divisi: any
	): AxiosPromise<any> =>
		instance.get('employee', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			params: {
				limit: limit,
				search: search_query,
				page: page,
				...(divisi && { division_id: divisi }),
			},
		}),
	getAllEmployeePageExcel: (
		limit: number,
		search_query: any,
		page: any,
		access_token: string | null,
		divisi: any
	): AxiosPromise<any> =>
		instance.get('employee', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			params: {
				limit: limit,
				search: search_query,
				page: page,
				sort_name: 1,
				...(divisi && { division_id: divisi }),
			},
		}),

	updateDivisi: (id: number, data: any): AxiosPromise<any> =>
		instance.put(
			`employee/update/${id}`,
			{
				division_id: data,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		),
};
const Salary = {
	getAllSalary: (limit: number, search_query: any, page: number, access_token: string | null): AxiosPromise<any> =>
		instance.get('employee-salary', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			params: {
				limit: limit,
				search_query: search_query,
				page: page,
			},
		}),
	createSalary: (data: any): AxiosPromise<any> =>
		instance.post('employee-salary/create-safe', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	updateSalary: (data: any, id: number): AxiosPromise<any> =>
		instance.put(`employee-salary/update/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	deleteSalary: (id: number): AxiosPromise<any> =>
		instance.delete(`employee-salary/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
const Bill = {
	getAllBill: (
		limit: number,
		search_query: any,
		page: number,
		account_id: any,
		access_token: string | null
	): AxiosPromise<any> =>
		instance.get('employee-bill', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			params: {
				limit: limit,
				search_query: search_query,
				page: page,
				account_id: account_id,
			},
		}),
	getOneBill: (id: number): AxiosPromise<any> =>
		instance.get(`employee-bill/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	updateBill: (data: any, id: number): AxiosPromise<any> =>
		instance.put(`employee-bill/update/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	createBill: (data: any): AxiosPromise<any> =>
		instance.post('employee-bill/create', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	addBill: (data: any): AxiosPromise<any> =>
		instance.post('employee-bill/add-bill', data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getAllTypes: (limit: number, page: number): AxiosPromise<any> =>
		instance.get(`bill-type`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				limit: limit,
				page: page,
			},
		}),
	deleteBill: (id: number): AxiosPromise<any> =>
		instance.delete(`employee-bill/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getOneTypes: (id: number, access_token: string | null): AxiosPromise<any> =>
		instance.get(`bill-type/${id}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	createTypeAll: (data: any): AxiosPromise<any> =>
		instance.post('employee-bill/create', data, {
			headers: {
				Authorization: `Bearer ${token}`,
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
			params: {
				sort_name: 1,
			},
		}),

	getAllDivision: (access_token: string | null): AxiosPromise<any> =>
		instance.get('division', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
};
const Jobdesk = {
	getAllJobdesk: (limit: number, search_query: any, page: number, access_token: string | null): AxiosPromise<any> =>
		instance.get(`employee?sort_name=1`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			params: {
				limit: limit,
				search_query: search_query,
				page: page,
			},
		}),

	createJobdesk: (data: any): AxiosPromise<any> =>
		instance.post('employee-jobdesk?page=0&limit=20&employee_id=1', data, {
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

const Penggajian = {
	getAllAccount: (access_token: string | null, month: any, year: any, limit: number, page: number): AxiosPromise<any> =>
		instance.get(`/employee-account?page=${page}&limit=${limit}&month=${month}&year=${year}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	getMonthAccount: (access_token: string | null): AxiosPromise<any> =>
		instance.get('/employee-account/total-month', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	getYearAccount: (access_token: string | null): AxiosPromise<any> =>
		instance.get('/employee-account/recap-year', {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	getOneAccount: (id: number, access_token: string | null): AxiosPromise<any> =>
		instance.get(`/employee-account/detail/${id}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	getDetailAccount: (id: number, access_token: string | null): AxiosPromise<any> =>
		instance.get(`/employee-account/detail/${id}`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	createAccount: (token: string | null, data: any): AxiosPromise<any> =>
		instance.post(`/employee-account/create-monthly`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	deleteAccount: (token: string, id: number): AxiosPromise<any> =>
		instance.delete(`/employee-account/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	getTotalMonth: (token: string): AxiosPromise<any> =>
		instance.get('/employee-account/total-month?month=5&year=2024', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	KirimEmail: (id: any, data: any, access_token: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee-account/paid/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
};

const DinasLuar = {
	DataDinasLuar: (access_token: string | null, page: any, limit: any): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-outstation?page=${page}&limit=${limit}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),

	CreateDinasLuar: (data: any): AxiosPromise<any> =>
		instance({
			method: `POST`,
			url: `employee-outstation/create`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	UpdateDinasLuar: (data: any, id: any): AxiosPromise<any> =>
		instance({
			method: `PUT`,
			url: `employee-outstation/update/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DeleteDinasLuar: (id: any): AxiosPromise<any> =>
		instance({
			method: `DELETE`,
			url: `employee-outstation/delete/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};

const Default = {
	GetFileEmployee: (id: any): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `employee-attachment/by-employee/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	UploadFile: (data: any, access_token: string | null): AxiosPromise<any> =>
		instance({
			method: `POST`,
			url: `employee-attachment/create`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
};

const DownloadFile = {
	Download: (access_token: string | null, file_path: string): AxiosPromise =>
		instance({
			method: 'GET',
			url: `download?filepath=${file_path}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			responseType: 'blob',
		}),

	DownloadSade: (access_token: string | null, file_path: string): AxiosPromise =>
		apics({
			method: `GET`,
			url: `student-task/download?filepath=${file_path}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			responseType: 'blob',
		}),
};

const ItemPenilaian = {
	DataItemPenilaian: (page: any, limit: any, access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee-jobdesk?page=${page}&limit=${limit}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataJobdeskGradeGroup: (page: any, limit: any, access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `jobdesk-group-grade?page=${page}&limit=${limit}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	CreateJobdeskGradeGroup: (data: any, access_token: any): AxiosPromise =>
		instance({
			method: `POST`,
			url: `jobdesk-group-grade/create`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	UpdateJobdeskGradeGroup: (data: any, id: any, access_token: any): AxiosPromise =>
		instance({
			method: `PUT`,
			url: `jobdesk-group-grade/update/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DeleteJobdeskGradeGroup: (id: any, access_token: any): AxiosPromise =>
		instance({
			method: `DELETE`,
			url: `jobdesk-group-grade/delete/${id}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataJobdeskGrade: (page: any, limit: any, access_token: any, id: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `jobdesk-grade?page=${page}&limit=${limit}&group_id=${id}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	CreateJobdeskGrade: (data: any, access_token: any): AxiosPromise =>
		instance({
			method: `POST`,
			url: `jobdesk-grade/add`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	UpdateJobdeskGrade: (data: any, id: any, access_token: any): AxiosPromise =>
		instance({
			method: `PUT`,
			url: `jobdesk-grade/update/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DeleteJobdeskGrade: (id: any, access_token: any): AxiosPromise =>
		instance({
			method: `DELETE`,
			url: `jobdesk-grade/delete/${id}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataKaryawan: (access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee?limit=100000`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataAsessor: (access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee-asessor?limit=10000`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataEvaluation: (access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee-evaluation?limit=10000`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataItemEvaluation: (access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `evaluation-item?limit=10000`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataDivision: (access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `division?limit=10000`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataJobdeskGradeGroupDropdown: (access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `jobdesk-group-grade?limit=10000`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataJobdeskUnit: (access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `jobdesk-unit?limit=10000`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	CreateJobdesk: (data: any): AxiosPromise =>
		instance({
			method: `POST`,
			url: `employee-jobdesk/create`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	EditJobdesk: (data: any, id: any): AxiosPromise =>
		instance({
			method: `PUT`,
			url: `employee-jobdesk/update/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DeleteJobdesk: (id: any): AxiosPromise =>
		instance({
			method: `DELETE`,
			url: `employee-jobdesk/delete/${id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	DataListPenilaian: (page: any, limit: any, access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee-evaluation?page=${page}&limit=${limit}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DetailListPenilaiain: (id: any, access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `employee-evaluation/detail/${id}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	GenerateMonth: (data: any, access_token: any): AxiosPromise =>
		instance({
			method: `POST`,
			url: `employee-evaluation/generate-month`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	Kalkulasi: (data: any, id: any, access_token: any): AxiosPromise =>
		instance({
			method: `POST`,
			url: `employee-evaluation/calculate/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DataUnit: (page: any, limit: any, access_token: any): AxiosPromise =>
		instance({
			method: `GET`,
			url: `jobdesk-unit?page=${page}&limit=${limit}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	CreateUnit: (data: any, access_token: any): AxiosPromise =>
		instance({
			method: `POST`,
			url: `jobdesk-unit/create`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	UpdateUnit: (id: any, data: any, access_token: any): AxiosPromise =>
		instance({
			method: `PUT`,
			url: `jobdesk-unit/update/${id}`,
			data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
	DeleteUnit: (id: any, access_token: any): AxiosPromise =>
		instance({
			method: `DELETE`,
			url: `jobdesk-unit/delete/${id}`,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}),
};

export {
	Bill,
	Salary,
	Dashboard,
	Rekrutmen,
	Probation,
	Training,
	Karyawan,
	Form,
	Attendance,
	WorkTime,
	EmployeeDivision,
	CustomerCare,
	Employee,
	EmployeeJobdesk,
	TrainingSuggest,
	Penggajian,
	Default,
	Jobdesk,
	Verif,
	DinasLuar,
	DownloadFile,
	ItemPenilaian,
};
