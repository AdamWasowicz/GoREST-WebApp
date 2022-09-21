import React from 'react';
import useTodos from './utils';

const Todos: React.FC = () => {

    const { hello } = useTodos();

    return (
        <>
            Todos
        </>
    )
}

export default Todos;