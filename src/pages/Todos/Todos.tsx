import React from 'react';
import useTodos from './utils';
import './style.scss';
import InfiniteList from "../../components/InfiniteList";
import Loading from '../../components/Loading';


const Todos: React.FC = () => {

    const {
        loadMoreTodos, todos, isRowLoaded,
        height, width, renderRow, isLoading
    } = useTodos();


    return (
        <div className='Todos'>
            <div className='ContentContainer'>
                {
                    todos.length != 0 && isLoading == false
                    ? <InfiniteList
                            isRowLoaded={isRowLoaded}
                            loadMoreRowsCallback={loadMoreTodos}
                            height={height / 1.2}
                            width={width}
                            rowCount={todos.length}
                            rowHeight={275}
                            renderRowCallback={renderRow}
                    />
                    : <Loading/>
                }
            </div>
        </div>
    )
}

export default Todos;