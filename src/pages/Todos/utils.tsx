import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Index, IndexRange, ListRowProps } from "react-virtualized";
import useWindowDimensions from "../../assets/hooks/useWindowDimensions";
import { useDispatch } from "react-redux";
import { addTodos, setTodoCurrentPage, setTodoIsLoading, setTodoIsMore } from "../../redux/features/todo-slice";
import GoRESTClient from "../../assets/classes/GoRESTClient";
import { getTodoWithUserNameResponse } from "../../assets/classes/goRESTClient/types/response";
import TodoItem from "./TodoItem";


const useTodos = () => {

    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch();

    //Store
    const isLoading = useAppSelector(state => state.todo.isLoading);
    const currentPage = useAppSelector(state => state.todo.currentPage);
    const todos = useAppSelector(state => state.todo.todos);


    const handleTodoDataRecived = (data: getTodoWithUserNameResponse) => {
        dispatch(addTodos(data.data));
        dispatch(setTodoCurrentPage(data.meta.pagination.page + 1));
        dispatch(setTodoIsMore(data.meta.pagination.links != null ? true : false))
    }

    const isRowLoaded = (params: Index): boolean => {
        return !!todos[params.index];
    }

    const loadMoreTodos = async () => {
        if (isLoading == true)
            return;

        const client = new GoRESTClient();

        dispatch(setTodoIsLoading(true))
        await client.getTodosWithUserName(currentPage)
            .then(response => {
                handleTodoDataRecived(response);
                dispatch(setTodoIsLoading(false));
            });
    }

    const renderRow = (props: ListRowProps): JSX.Element => {
        return <TodoItem
            key={props.key}
            data={todos[props.index]}
            style={props.style}
        />
    }

    
    useEffect(() => {
        if (todos.length === 0)
            loadMoreTodos();
    }, [])
    
    
    return {
        loadMoreTodos, todos, isRowLoaded,
        height, width, renderRow,
        isLoading
    }
}   

export default useTodos;