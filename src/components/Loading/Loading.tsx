import React from 'react';
import './style.scss';

const Loading: React.FC = () => {

    return (
        <div className='Loading'>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading;