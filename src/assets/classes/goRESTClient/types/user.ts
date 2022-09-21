export default interface UserModel {
    id: number,
    name: string,
    email: string,
    gender: 'male' | 'female',
    status: string
}