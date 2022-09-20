import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

//Reducers


enableMapSet();

//Store
export const store = configureStore({
    reducer: {
    }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;