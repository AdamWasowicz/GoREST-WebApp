import React from "react";
import useUsers from './utils';
import './style.scss';
import { InfiniteLoader, List } from 'react-virtualized';
import Footer from "../../components/Footer";


const User: React.FC = () => {

    const { 
        loadMoreUsers, users, isRowLoaded,
        height, width, renderRow,
    } = useUsers();


    return (
        <div className='User'>
            <div className="ContentContainer">
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreUsers}
                    rowCount={3000}
                    minimumBatchSize={1}
                    threshold={10}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <List
                            height={height / 1.2}
                            width={width}
                            rowCount={users.length}
                            rowHeight={275}
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            rowRenderer={renderRow}
                            className='ItemsContainer'
                            style={{width: '100%'}}
                        />
                    )}
                </InfiniteLoader>
            </div>
            <Footer/>
        </div>
    )
}

export default User;