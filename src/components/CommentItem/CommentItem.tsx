import React from 'react';
import CommentModel from '../../assets/classes/GoRESTClient/types/comment';
import './style.scss';


interface CommentItemProps {
    data: CommentModel,
    style?: {}
}

const CommentItem: React.FC<CommentItemProps> = ({data, style}) => {
    return (
        <div className='CommentItem'>
            <div className='Container'>
                <div className='UserData'>
                    <h1>{data.name}</h1>
                    <h3>{data.email}</h3>
                </div>
                <div className='LongText'>
                    {data.body}
                </div>
            </div>
        </div>
    )
}

export default CommentItem;