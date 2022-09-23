import React from 'react';
import useTodos from './utils';
import './style.scss';
import { InfiniteLoader, List } from 'react-virtualized';
import Footer from "../../components/Footer";

const Todos: React.FC = () => {

    const {
        loadMoreTodos, todos, isRowLoaded,
        height, width, renderRow,
    } = useTodos();

    return (
        <div className='Todos'>
            <div className='ContentContainer'>
                <   InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreTodos}
                    rowCount={3000}
                    minimumBatchSize={1}
                    threshold={10}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <List
                            height={height / 1.2}
                            width={width}
                            rowCount={todos.length}
                            rowHeight={325}
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            rowRenderer={renderRow}
                            className='ItemsContainer'
                            style={{ width: '100%' }}
                        />
                    )}
                </InfiniteLoader>
            </div>
            <Footer/>
        </div>
    )
}

export default Todos;