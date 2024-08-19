// import { SettingCfg } from '@/config';
import { api } from '@/lib';
import { TapiResponse, Tuser } from '@/types';

const baseURL = `http://localhost:5000/stg-server1/api/`;

export const loginUser = (email: string, password: string) =>
	api.post<TapiResponse<Tuser>>('/auth/login', { email, password }, { baseURL });
