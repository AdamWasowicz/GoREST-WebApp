import React from "react";
import useUsers from './utils';
import './style.scss';
import InfiniteList from "../../components/InfiniteList";
import Loading from "../../components/Loading";


const User: React.FC = () => {

    const { 
        loadMoreUsers, users, isRowLoaded,
        height, width, renderRow,
        isLoading
    } = useUsers();


    return (
        <div className='User'>
            <div className="ContentContainer">
                {
                    users.length != 0 && isLoading == false
                    ? <InfiniteList
                            isRowLoaded={isRowLoaded}
                            loadMoreRowsCallback={loadMoreUsers}
                            height={height}
                            width={width}
                            rowCount={users.length}
                            rowHeight={275}
                            renderRowCallback={renderRow}
                    />
                    : <Loading/>
                }
            </div>
        </div>
    )
}

export default User;