import React from "react";
import useUsers from './utils';
import './style.scss';
import InfiniteList from "../../components/InfiniteList";
import Loading from "../../components/Loading";
import DataFetchError from "../../components/DataFetchError";


const User: React.FC = () => {

    const { 
        loadMoreUsers, users, isRowLoaded,
        height, width, renderRow,
        errorMsg
    } = useUsers();


    return (
        <div className='User'>
            <div className="ContentContainer">
                {
                    users.length != 0
                    ? <InfiniteList
                            isRowLoaded={isRowLoaded}
                            loadMoreRowsCallback={loadMoreUsers}
                            height={height * 1.2}
                            width={width}
                            rowCount={users.length}
                            rowHeight={275}
                            renderRowCallback={renderRow}
                    />
                    : <div className='Container'>
                        {
                            errorMsg != ''
                            ? <DataFetchError onButtonClick={loadMoreUsers}/>
                            : <Loading/>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default User;