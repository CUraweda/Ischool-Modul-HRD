import { TbaseEntity } from './common';

export type TuserSession = {
	full_name?: string | null;
	role_id?: number | null;
	access_token?: string | null;
	employee_id: any | null;
};

export type Tuser = TbaseEntity & {
	uuid?: string | null;
	role_id?: number | null;
	full_name?: string | null;
	email?: string | null;
	status?: number | null;
	email_verified?: number | null;
	address?: string | null;
	phone_number?: string | null;
	avatar?: string | null;
	employee: {
		id: any;
	};
};
