import { configureStore } from '@reduxjs/toolkit';

//Reducers
import UserReducer from './features/user-slice';
import TodoReducer from './features/todo-slice';
import PostReducer from './features/post-slice';
import AuthReducer from './features/auth-slice';

//Store
export const store = configureStore({
    reducer: {
        user: UserReducer,
        todo: TodoReducer,
        post: PostReducer,
        auth: AuthReducer,
    }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;