import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostCompleteModel } from '../../assets/classes/GoRESTClient/types/post';


interface PostState {
    posts: PostCompleteModel[],
    currentPage: number,
    isMore: boolean,
    isLoading: boolean,
}

const initialState: PostState = {
    posts: [],
    currentPage: 1,
    isMore: true,
    isLoading: false,
}


const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        clearPostState(state: PostState) {
            state.posts = initialState.posts;
            state.currentPage = initialState.currentPage;
            state.isMore = initialState.isMore;
            state.isLoading = initialState.isLoading;
        },

        addPosts(state: PostState, action: PayloadAction<PostCompleteModel[]>) {
            state.posts = [...state.posts, ...action.payload];
        },

        setPostCurrentPage(state: PostState, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },

        setPostIsMore(state: PostState, action: PayloadAction<boolean>) {
            state.isMore = action.payload;
        },

        setPostIsLoading(state: PostState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    }
});

export const {
    clearPostState, addPosts, setPostCurrentPage,
    setPostIsMore, setPostIsLoading
} = postSlice.actions;

export default postSlice.reducer;