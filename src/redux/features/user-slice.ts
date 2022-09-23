import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserModel from '../../assets/classes/goRESTClient/types/user';


interface UserState {
    users: UserModel[],
    currentPage: number,
    isMore: boolean,
    isLoading: boolean,
}

const initialState: UserState = {
    users: [],
    currentPage: 1,
    isMore: true,
    isLoading: false,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserState(state: UserState) {
            state.users = initialState.users;
            state.currentPage = initialState.currentPage;
            state.isMore = initialState.isMore;
            state.isLoading = initialState.isLoading;
        },

        addUsers(state: UserState, action: PayloadAction<UserModel[]>) {
            state.users = [...state.users, ...action.payload]
        },

        setUsersCurrentPage(state: UserState, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },

        setUserIsMore(state: UserState, action: PayloadAction<boolean>) {
            state.isMore = action.payload;
        },

        setUserIsLoading(state: UserState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    }
});

export const {
    clearUserState, addUsers, setUsersCurrentPage, 
    setUserIsMore, setUserIsLoading
} = userSlice.actions;

export default userSlice.reducer;
