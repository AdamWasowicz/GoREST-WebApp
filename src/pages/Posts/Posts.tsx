import React from "react";
import usePosts from "./utils";
import './style.scss';
import InfiniteList from "../../components/InfiniteList";
import Loading from "../../components/Loading";
import DataFetchError from "../../components/DataFetchError";


const Posts: React.FC = () => {

    const { 
        loadMorePosts, posts, isRowLoaded,
        height, width, renderRow,
        errorMsg
    } = usePosts();

    return (
        <div className='Posts'>
            <div className="ContentContainer">
                {
                    posts.length != 0
                    ? <InfiniteList
                        isRowLoaded={isRowLoaded}
                        loadMoreRowsCallback={loadMorePosts}
                        height={height}
                        width={width}
                        rowCount={posts.length}
                        rowHeight={400}
                        renderRowCallback={renderRow}
                    />
                    : <div className='Container'>
                        {
                            errorMsg != ''
                            ? <DataFetchError onButtonClick={loadMorePosts}/>
                            : <Loading/>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Posts;