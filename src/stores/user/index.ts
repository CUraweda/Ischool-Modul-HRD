import { Keys } from '@/data';
import { Storage } from '@/lib';
import { Tuser, TuserSession } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export type TuserState = {
	user: Tuser | null;
	session: TuserSession | null;
};

const initial: TuserState = {
	user: null,
	session: Storage.get<TuserSession>('local', Keys.SESSION_DATA),
};

export const userSlice = createSlice({
	name: 'user',
	initialState: initial,
	reducers: {
		setUser(state, { payload }: { payload: Tuser }) {
			state.user = payload;
		},
		setSession(state, { payload }: { payload: TuserSession }) {
			const data = Storage.set<TuserSession>('local', Keys.SESSION_DATA, payload);
			state.session = data;
		},
		clearUser(state) {
			Storage.delete('local', Keys.SESSION_DATA);
			state.user = null;
			state.session = null;
		},
	},
});

// actions
export const { setUser, setSession, clearUser } = userSlice.actions;
