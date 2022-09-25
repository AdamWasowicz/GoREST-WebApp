export default interface UserModel {
    id: number,                     //Omit
    name: string,                   //Present as Text
    email: string,                  //Present as Text
    gender: 'male' | 'female',      //Present as Image
    status: 'inactive' | 'active',  //Present as icon color
} 

export interface CreateUserModel {
    name: string,
    email: string,
    status: string,
    gender: string,
}