export default interface CommentModel {
    id: number,             //Omit
    post_id: number,        //Omit
    name: string,           //Present as Text
    email: number,          //Present as Text
    body: string,           //Present as Text
}