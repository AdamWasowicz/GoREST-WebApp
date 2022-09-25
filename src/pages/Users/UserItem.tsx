import React from "react";
import UserModel from "../../assets/classes/goRESTClient/types/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faPersonDress } from '@fortawesome/free-solid-svg-icons'


const UserItem: React.FC<{userData?: UserModel, style: {}}> = ({userData, style})=> {

    //Returns class for icon container depending on userData
    const getIconClassName = (): string => {
        let className = 'Icon';
        if (userData.status == 'inactive')
            className += ' Inactive';
        else if (userData.status == 'active') {
            className += ' Active';
        }

        if (userData.gender == 'male')
            className += ' Male';
        else if (userData.gender == 'female')
            className += ' Female'

        return className;
    }
    

    return (
        <div className="UserItem" style={style}>
            <div className="Container">
                <div className={getIconClassName()}>
                    <FontAwesomeIcon
                        title={userData.status.toLocaleUpperCase()} 
                        icon={
                            userData.gender == 'male' 
                            ? faPerson 
                            : faPersonDress
                        }
                    />
                </div>
                <div className='Data'>
                    <h3>{userData.name}</h3>
                    <p>{userData.email}</p>
                </div>
            </div>
        </div>
    )
}

export default UserItem;