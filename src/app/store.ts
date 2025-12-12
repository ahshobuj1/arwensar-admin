// src/app/store.ts
import {configureStore} from '@reduxjs/toolkit';
import {authApi} from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import {userApi} from '@/features/users/userApi';
import {coursesApi} from '@/features/courses/coursesApi';
import {modulesApi} from '@/features/modules/modulesApi';
import {transactionsApi} from '@/features/transactions/transactionsApi';
import {certificateApi} from '@/features/certificate/certificateApi';
import {contentApi} from '@/features/content/contentApi'; // ✨ Import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [modulesApi.reducerPath]: modulesApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [certificateApi.reducerPath]: certificateApi.reducer, // ✨ Add reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat([
      authApi.middleware,
      userApi.middleware,
      coursesApi.middleware,
      modulesApi.middleware,
      contentApi.middleware,
      transactionsApi.middleware,
      certificateApi.middleware, // ✨ Add middleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
