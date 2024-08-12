import { getSessionStorageItem } from '@/utils/storageUtils';
import axios, { AxiosPromise } from 'axios';
const instance = axios.create({ baseURL: `http://localhost:5005/stg-server1/api/` });
const token = getSessionStorageItem('access_token');

const Rekrutmen = {
	DataRekrutmen: (page: any, limit: any): AxiosPromise<any> =>
		instance({
			method: `GET`,
			url: `job-vacancy?page=${page}&limit=${limit}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};

export { Rekrutmen };
