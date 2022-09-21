import React from "react";
import usePosts from "./utils";


const Posts: React.FC = () => {

    const { hello } = usePosts();

    return (
        <>
            Posts
        </>
    )
}

export default Posts;