import React from 'react';
import './style.scss';


const DataFetchError: React.FC<{onButtonClick: () => void}> = ({onButtonClick}) => {

    return (
        <div className='DataFetchError'>
            <div className='Text'>
                <h1>I encountered error while fetching data for you</h1>
                <p>would you like to try again?</p>
            </div>

            <button onClick={onButtonClick}>Yes</button>
        </div>
    )
}

export default DataFetchError;