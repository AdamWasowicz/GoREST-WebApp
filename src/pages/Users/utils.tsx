import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Index, IndexRange, ListRowProps } from "react-virtualized";
import useWindowDimensions from "../../assets/hooks/useWindowDimensions";
import GoRESTClient from "../../assets/classes/GoRESTClient";
import { useDispatch } from "react-redux";
import { addUsers, setUserIsLoading, setUserIsMore, setUsersCurrentPage } from "../../redux/features/user-slice";
import { getUsersResponse } from "../../assets/classes/goRESTClient/types/response";
import UserItem from "./UserItem";


const useUsers = () => {

    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch();

    //Store
    const isLoading = useAppSelector(state => state.user.isLoading);
    const currentPage = useAppSelector(state => state.user.currentPage);
    const users = useAppSelector(state => state.user.users);


    //Update storage when recive response
    const handleUserDataRecived = (data: getUsersResponse) => {   
        dispatch(addUsers(data.data));
        dispatch(setUsersCurrentPage(currentPage + 1));
        dispatch(setUserIsMore(data.meta.pagination.links != null ? true : false))
    }

    const isRowLoaded = (params: Index): boolean => {
        return !!users[params.index];
    }

    //Use when you need load more users from API
    const loadMoreUsers = async (params: IndexRange) => {
        if (isLoading == true)
            return;

        const client = new GoRESTClient(
            () => dispatch(setUserIsLoading(true)),
            () => dispatch(setUserIsLoading(false))
        );

        await client.getUsersReturnPromise(currentPage)
            .then(response => {
                handleUserDataRecived(response);
            });
    }

    const loadInitialData = () => {
        const client = new GoRESTClient(
            () => dispatch(setUserIsLoading(true)),
            () => dispatch(setUserIsLoading(false))
        );

        client.getUsersReturnPromise(currentPage)
            .then(result => {
                handleUserDataRecived(result);
            });
    }

    //Render element for list
    const renderRow = (props: ListRowProps): JSX.Element => {
        return <UserItem 
            key={props.key}
            userData={users[props.index]}
            style={props.style}
        />

    }

    //Load initial data
    useEffect(() => {
        if (users.length === 0)
            loadInitialData();
    }, [])


    return { 
        loadMoreUsers, users, isRowLoaded,
        height, width, renderRow,
    }
}

export default useUsers;