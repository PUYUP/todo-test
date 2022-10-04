import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { activityApi } from '../features/activity/Api';

export const store = configureStore({
	reducer: {
		[activityApi.reducerPath]: activityApi.reducer,
	},
	middleware: (getDefaultMiddleware: any) => {
		return getDefaultMiddleware()
			.concat(
				activityApi.middleware,
			);
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)