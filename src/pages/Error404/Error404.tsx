import React from "react";
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'


const Error404: React.FC = () => {

    return (
        <div className="Error404">
            <div className="ContentContainer">
                <div className="Body">
                    <h1>404</h1>
                    <p>There is nothing here, try using navigation bar to get around</p>
                    <div className='LocationContainer'>
                        <FontAwesomeIcon icon={faLocationDot}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error404;