export default interface TodoModel {
    id: number,
    user_id: number,
    title: string,
    due_on: string,
    status: 'pending' | 'completed'
}

export interface TodoWithUserNameModel {
    id: number,                     //Omit
    user_id: number,                //Omit
    name: string,                   //Present as Text
    title: string,                  //Present as Text
    due_on: string,                 //Present as Text
    status: 'pending' | 'completed' //Present as icon
}