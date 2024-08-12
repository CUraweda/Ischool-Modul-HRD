import { getSessionStorageItem } from '@/utils/storageUtils';
import axios, { AxiosPromise } from 'axios';
const instance = axios.create({ baseURL: `http://localhost:5005/stg-server1/api/` });
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

export { Rekrutmen, Karyawan };
