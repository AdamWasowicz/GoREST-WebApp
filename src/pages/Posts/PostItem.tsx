import React, { useState } from "react";
import { PostCompleteModel } from "../../assets/classes/GoRESTClient/types/post";
import ListModal from '../../components/ListModal';

interface PostItemProps {
    data: PostCompleteModel,
    style?: {}
}

const PostItem: React.FC<PostItemProps> = ({ data, style }) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleClick = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    
    return (
        <>
            <div className="PostItem" style={style}>
                <div className="Container">
                    <div className="Text">
                        <h1>{data.userName}</h1>
                        <h3>{data.title}</h3>
                        <div className="LongText">{data.body}</div>
                    </div>
                    {data.comments.length != 0 && <button onClick={handleClick}>Comments</button>}
                </div>
            </div>
            <ListModal
                isOpen={isModalOpen}
                data={data.comments}
                height={400}
                width={800}
                rowCount={data.comments.length}
                rowHeight={200}
                handleClose={handleCloseModal}
            />
        </>
    )
}

export default PostItem;