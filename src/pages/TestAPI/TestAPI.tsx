import React from 'react';
import useTestAPI from './utils';


const TestAPI: React.FC = () => {

    const { test_getUsers, test_getPostComments } = useTestAPI();


    return (
        <>
            <button onClick={test_getUsers}>Test getUsers</button>
            <button onClick={test_getPostComments}>Test getPostComments</button>
        </>
    )
}

export default TestAPI;