import { userSlice } from '@/stores/user';
import { configureStore } from '@reduxjs/toolkit';

export const reduxStore = configureStore({
	reducer: {
		user: userSlice.reducer,
	},
});

export type Tstore = typeof reduxStore;
export type TstoreState = ReturnType<Tstore['getState']>;
export type TstoreDispatch = Tstore['dispatch'];
