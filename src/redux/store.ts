import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

//Reducers
import UserReducer from './features/user-slice';
import TodoReducer from './features/todo-slice';


enableMapSet();

//Store
export const store = configureStore({
    reducer: {
        user: UserReducer,
        todo: TodoReducer,
    }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;