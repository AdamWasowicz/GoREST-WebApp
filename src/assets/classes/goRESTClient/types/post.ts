import CommentModel from "./comment";

export default interface PostModel {
    id: number,
    user_id: number,
    title: string,
    body: string,
}

export interface PostCompleteModel {
    id: number,                 //Omit
    user_id: number,            //Omit
    title: string,              //Present as Text
    body: string,               //Present as Text

    userName: string,           //Present as Text
    comments: CommentModel[]    //Present as Modal
}