import React from 'react';
import useTodos from './utils';
import './style.scss';
import InfiniteList from "../../components/InfiniteList";
import Loading from '../../components/Loading';
import DataFetchError from '../../components/DataFetchError';


const Todos: React.FC = () => {

    const {
        loadMoreTodos, todos, isRowLoaded,
        height, width, renderRow,
        errorMsg,
    } = useTodos();


    return (
        <div className='Todos'>
            <div className='ContentContainer'>
                {
                    todos.length != 0
                    ? <InfiniteList
                            isRowLoaded={isRowLoaded}
                            loadMoreRowsCallback={loadMoreTodos}
                            height={height}
                            width={width}
                            rowCount={todos.length}
                            rowHeight={275}
                            renderRowCallback={renderRow}
                    />
                    : <div className='Container'>
                        {
                            errorMsg != ''
                            ? <DataFetchError onButtonClick={loadMoreTodos}/>
                            : <Loading/>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Todos;