import React from "react";
import useUsers from './utils';
import './style.scss';


const User: React.FC = () => {

    const { hello } = useUsers();

    return (
        <>
            User
        </>
    )
}

export default User;