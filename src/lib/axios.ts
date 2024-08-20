import { SettingCfg } from '@/config';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Storage } from './storage';
import { Keys } from '@/data';
import { TuserSession } from '@/types';
import { toast } from 'react-toastify';

const api: AxiosInstance = axios.create({
	baseURL: SettingCfg.servers.main,
});

const hrd: AxiosInstance = axios.create({
	baseURL: SettingCfg.servers.hrd,
});

api.interceptors.request.use(
	async (conf: InternalAxiosRequestConfig) => {
		const userData = Storage.get<TuserSession>('local', Keys.SESSION_DATA);

		if (userData) {
			conf.headers.Authorization = 'Bearer ' + userData.access_token;
		}

		return conf;
	},
	(error) => {
		Promise.reject(error);
	}
);

api.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const { response, code } = err;

		if (code && code == 'ERR_NETWORK') {
			toast.error('Gagal terhubung dengan server');
		}

		//   @-TODO add more toaster
		if (response) {
			// switch (response.status) {
			// }
		}
		throw err;
	}
);

hrd.interceptors.request.use(
	async (conf: InternalAxiosRequestConfig) => {
		const userData = Storage.get<TuserSession>('local', Keys.SESSION_DATA);

		if (userData) {
			conf.headers.Authorization = 'Bearer ' + userData.access_token;
		}

		return conf;
	},
	(error) => {
		Promise.reject(error);
	}
);

hrd.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const { response, code } = err;

		if (code && code == 'ERR_NETWORK') {
			toast.error('Gagal terhubung dengan server');
		}

		//   @-TODO add more toaster
		if (response) {
			// switch (response.status) {
			// }
		}
		throw err;
	}
);

export { api, hrd };
