import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoWithUserNameModel} from '../../assets/classes/goRESTClient/types/todo';


interface TodoState {
    todos: TodoWithUserNameModel[]
    currentPage: number,
    isMore: boolean,
    isLoading: boolean,
}

const initialState: TodoState = {
    todos: [],
    currentPage: 1,
    isMore: true,
    isLoading: false,
}


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        clearTodoState(state: TodoState) {
            state.todos = initialState.todos;
            state.currentPage = initialState.currentPage;
            state.isMore = initialState.isMore;
            state.isLoading = initialState.isLoading;
        },

        addTodos(state: TodoState, action: PayloadAction<TodoWithUserNameModel[]>) {
            state.todos = [...state.todos, ...action.payload]
        },

        setTodoCurrentPage(state: TodoState, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },

        setTodoIsMore(state: TodoState, action: PayloadAction<boolean>) {
            state.isMore = action.payload;
        },

        setTodoIsLoading(state: TodoState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        }
    }
});

export const {
    clearTodoState, addTodos, setTodoCurrentPage,
    setTodoIsMore, setTodoIsLoading
} = todoSlice.actions;

export default todoSlice.reducer;