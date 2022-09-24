import React from "react";
import { PostCompleteModel } from "../../assets/classes/GoRESTClient/types/post";

interface PostItemProps {
    data: PostCompleteModel,
    style?: {}
}

const PostItem: React.FC<PostItemProps> = ({data, style}) => {

    return (
        <div className="PostItem" style={style}>
            {data.title}
        </div>
    )
}

export default PostItem;