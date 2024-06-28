export type TbaseEntity = {
	id: number;
	created_at: string;
	updated_at: string;
	created_by?: string | null;
	updated_by?: string | null;
};

export type TapiResponse<T> = {
	data?: T | null;
	message?: string | null;
	status?: boolean | null;
	tokens?: any;
};
