// import { SettingCfg } from '@/config';
import { api } from '@/lib';
import { TapiResponse, Tuser } from '@/types';

const baseURL = import.meta.env.VITE_SERVER_MAIN_URL;

export const loginUser = (email: string, password: string) =>
	api.post<TapiResponse<Tuser>>('/auth/login', { email, password }, { baseURL });

export const registerUser = (
	full_name: string,
	email: string,
	password: string,
	confirm_password: string,
	role_id: number
) => api.post<any>(`auth/register`, { full_name, email, password, confirm_password, role_id }, { baseURL });
