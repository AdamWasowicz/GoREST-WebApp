import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Index, IndexRange, ListRowProps } from "react-virtualized";
import useWindowDimensions from "../../assets/hooks/useWindowDimensions";
import GoRESTClient from "../../assets/classes/GoRESTClient";
import { useDispatch } from "react-redux";
import { addUsers, setUserIsLoading, setUserIsMore, setUsersCurrentPage } from "../../redux/features/user-slice";
import { getUsersResponse } from "../../assets/classes/goRESTClient/types/response";
import UserItem from "./UserItem";


const useUsers = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
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
    const loadMoreUsers = async () => {
        if (isLoading == true)
            return;

        const client = new GoRESTClient();

        dispatch(setUserIsLoading(true));
        await client.getUsersReturnPromise(currentPage)
            .then(response => {
                handleUserDataRecived(response);
                dispatch(setUserIsLoading(false));
            })
            .catch(error => {
                setErrorMsg('Data fetching Error');
            })
    }

    //Render element for list
    const renderRow = (props: ListRowProps): JSX.Element => {
        return <UserItem 
            key={props.key}
            userData={users[props.index]}
            style={props.style}
        />

    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    //Load initial data
    useEffect(() => {
        if (users.length === 0)
            loadMoreUsers();
    }, [])


    return { 
        loadMoreUsers, users, isRowLoaded,
        height, width, renderRow,
        errorMsg, openModal, closeModal,
        isModalOpen,
    }
}

export default useUsers;