import React from "react";
import usePosts from "./utils";
import './style.scss';
import InfiniteList from "../../components/InfiniteList";
import Loading from "../../components/Loading";


const Posts: React.FC = () => {

    const { 
        loadMorePosts, posts, isRowLoaded,
        height, width, renderRow,
        isLoading
    } = usePosts();

    return (
        <div className='Post'>
            <div className="ContentContainer">
                {
                    posts.length != 0 && isLoading == false
                    ? <InfiniteList
                        isRowLoaded={isRowLoaded}
                        loadMoreRowsCallback={loadMorePosts}
                        height={height / 1.2}
                        width={width}
                        rowCount={posts.length}
                        rowHeight={275}
                        renderRowCallback={renderRow}
                    />
                    : <Loading/>
                }
            </div>
        </div>
    )
}

export default Posts;