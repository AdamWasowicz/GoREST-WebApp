export default interface TodoModel {
    id: number,
    user_id: number,
    title: string,
    due_on: string,
    status: 'pending' | 'completed'
}