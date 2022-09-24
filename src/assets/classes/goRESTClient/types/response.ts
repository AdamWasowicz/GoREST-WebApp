import CommentModel from "./comment";
import PostModel, { PostCompleteModel } from "./post";
import RequestMeta from "./requestMeta";
import TodoModel, { TodoWithUserNameModel } from "./todo";
import UserModel from "./user";


export interface getUsersResponse {
    meta: RequestMeta,
    data: UserModel[],
}

export interface getUserResponse {
    meta: RequestMeta,
    data: UserModel,
}

export interface getPostResponse {
    meta: RequestMeta,
    data: PostModel[],
}

export interface getPostsWithCommentsResponse {
    meta: RequestMeta,
    data: PostCompleteModel[],
}

export interface getCommentResponse {
    meta: RequestMeta,
    data: CommentModel[],
}

export interface getTodosResponse {
    meta: RequestMeta,
    data: TodoModel[],
}

export interface getTodoWithUserNameResponse {
    meta: RequestMeta,
    data: TodoWithUserNameModel[],
}