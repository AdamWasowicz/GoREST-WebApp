import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Index, ListRowProps } from "react-virtualized";
import useWindowDimensions from "../../assets/hooks/useWindowDimensions";
import GoRESTClient from "../../assets/classes/GoRESTClient";
import { useDispatch } from "react-redux";
import { addPosts, setPostCurrentPage, setPostIsLoading, setPostIsMore } from "../../redux/features/post-slice";
import { getPostsWithCommentsResponse } from "../../assets/classes/GoRESTClient/types/response";
import PostItem from "./PostItem";

const usePosts = () => {

    const [errorMsg, setErrorMsg] = useState<string>('');
    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch();

    //Store
    const isLoading = useAppSelector(state => state.post.isLoading);
    const currentPage = useAppSelector(state => state.post.currentPage);
    const posts = useAppSelector(state => state.post.posts);


    //Update storage when you recive response
    const handlePostsResponseRecived = (response: getPostsWithCommentsResponse) => {
        dispatch(addPosts(response.data));
        dispatch(setPostCurrentPage(currentPage + 1));
        dispatch(setPostIsMore(response.meta.pagination.links != null ? true : false));
    }

    const isRowLoaded = (params: Index): boolean => {
        return !!posts[params.index];
    }

    const loadMorePosts = async () => {
        if (isLoading == true)
            return;
            
        const client = new GoRESTClient();

        dispatch(setPostIsLoading(true))
        client.getPostsWithCommentsReturnPromise(currentPage)
            .then(result => {
                handlePostsResponseRecived(result);
                dispatch(setPostIsLoading(false));
            })
            .catch(error => {
                setErrorMsg('Data fetching Error');
            });
    }

    const renderRow = (props: ListRowProps): JSX.Element => {
        return <PostItem
            key={props.key}
            data={posts[props.index]}
            style={props.style}
        />
    }


    useEffect(() => {
        if (posts.length === 0)
            loadMorePosts();
    }, [])

    return { 
        loadMorePosts, posts, isRowLoaded,
        height, width, renderRow,
        errorMsg
    }
}

export default usePosts;