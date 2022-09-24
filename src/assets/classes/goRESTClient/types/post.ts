import CommentModel from "./comment";

export default interface PostModel {
    id: number,
    user_id: number,
    title: string,
    body: string,
}

export interface PostCompleteModel {
    id: number,
    user_id: number,
    title: string,
    body: string,

    userName: string,
    comments: CommentModel[]
}