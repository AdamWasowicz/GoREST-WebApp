import PostModel from "./post";
import RequestMeta from "./requestMeta";
import TodoModel from "./todo";
import UserModel from "./user";


export interface getUserResponse {
    meta: RequestMeta,
    data: UserModel[],
}

export interface getPostResponse {
    meta: RequestMeta,
    data: PostModel[],
}

export interface getCommentResponse {
    meta: RequestMeta,
    data: Comment[],
}

export interface getTodoResponse {
    meta: RequestMeta,
    data: TodoModel[],
}