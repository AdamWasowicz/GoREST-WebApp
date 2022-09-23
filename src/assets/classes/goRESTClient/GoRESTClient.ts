import { getUsersResponse, getPostResponse, getCommentResponse, getTodosResponse, getTodoWithUserNameResponse, getUserResponse } from './types/response';
import axios, { AxiosError, AxiosResponse } from 'axios';
import TodoModel, { TodoWithUserNameModel } from './types/todo';
import RequestMeta from './types/requestMeta'


export default class GoRESTClient {

    private onRequestStart: () => void;
    private onRequestEnd: () => void;
    private apiURL: string = 'https://gorest.co.in';


    //used in no Promise flow
    private makeGetRequest = (route: string, onRequestComplete: (response: any) => void): void => {
        
        this.onRequestStart();
        const url = this.apiURL + route;

        axios({
            method: 'GET',
            url: url,
        })
        .then((response: AxiosResponse) => {
            onRequestComplete(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(`${error.code} : ${error.message}`);
        })
        .finally(() => {
            this.onRequestEnd();
        })
    }

    //Used in Promise flow
    private makeGetRequestReturnPromise = async (route: string): Promise<AxiosResponse<any>> => {
        this.onRequestStart();
        const url = this.apiURL + route;

        return axios({
            method: 'GET',
            url: url,
        })
        
    }

    public getUsersReturnPromise = async (pageNumber: number): Promise<getUsersResponse> => {
        const route = ApiEnpoints.getUsers.route + `?page=${pageNumber}`;

        //recives Promise<AxiosResponse<getUserExponse>>
        const result = await this.makeGetRequestReturnPromise(route);

        //creates new Promise<getUserResponse>
        const promise = new Promise<getUsersResponse>( (resolve, reject) => {
            resolve(result.data);
            this.onRequestEnd();
        })

        //returns promise
        return promise;
    }

    public getUserByIdReturnPromise = async (userId: number): Promise<getUserResponse> => {
        const route = ApiEnpoints.getUsers.route + `/${userId}`;

        //recives Promise<AxiosResponse<getUserExponse>>
        const result = await this.makeGetRequestReturnPromise(route);

        //creates new Promise<getUserResponse>
        const promise = new Promise<getUserResponse>( (resolve, reject) => {
            resolve(result.data);
            this.onRequestEnd();
        })

        //returns promise
        return promise;
    }

    public getPosts = (pageNumber: number, onRequestComplete: (respnose: getPostResponse) => void): void => {
        const route = ApiEnpoints.getPosts.route + `?page=${pageNumber}`;
        this.makeGetRequest(route, onRequestComplete);
    }

    public getComments = (pageNumber: number, onRequestComplete: (respnose: getCommentResponse) => void): void => {
        const route = ApiEnpoints.getComments.route + `?page=${pageNumber}`;
        this.makeGetRequest(route, onRequestComplete);
    }

    public getTodos = (pageNumber: number, onRequestComplete: (respnose: getCommentResponse) => void): void => {
        const route = ApiEnpoints.getTodos.route + `?page=${pageNumber}`;
        this.makeGetRequest(route, onRequestComplete);
    }

    public getTodosWithUserName = async (pageNumber: number): Promise<getTodoWithUserNameResponse> => {
        const route = ApiEnpoints.getTodos.route + `?page=${pageNumber}`;
        const result = await this.makeGetRequestReturnPromise(route);

        const dataFromAPI: TodoModel[] = result.data.data;
        const metaFromApi: RequestMeta = result.data.meta;

        //Get names coresponding to user_id and asign thnem to model
        let todosWithUserName: TodoWithUserNameModel[] = [];
        await Promise.all( 
            await dataFromAPI.map( async (item, index) => {
                await this.getUserNameForTodo(item)
                .then((result) => {
                    todosWithUserName[index] = {
                        id: dataFromAPI[index].id,
                        user_id: dataFromAPI[index].user_id,
                        title: dataFromAPI[index].title,
                        due_on: dataFromAPI[index].due_on,
                        status: dataFromAPI[index].status,
                        name: result.data.name,
                    }
                });
            })    
        )

        const promisedData: getTodoWithUserNameResponse = {
            meta: metaFromApi,
            data: todosWithUserName,
        };

        const promise = new Promise<getTodoWithUserNameResponse>((resolve, reject) =>{
            resolve(promisedData)  
        })

        //returns promise
        return promise;
    }

    public getUserNameForTodo = async (dataFromAPI: TodoModel): Promise<getUserResponse> => {
        return this.getUserByIdReturnPromise(dataFromAPI.user_id);
    }

    public getPostComments = (postId: number, onRequestComplete: (response: getCommentResponse) => void): void => {
        const route = ApiEnpoints.getPosts.route + `/${postId}/comments`;
        this.makeGetRequest(route, onRequestComplete);
    }


    constructor( onRequestStart: () => void, onRequestEnd: () => void) {
        this.onRequestStart = onRequestStart;
        this.onRequestEnd = onRequestEnd;
    }
}

const ApiEnpoints = {
    getPosts: {
        resourceName: 'Posts',
        route: '/public/v1/posts'
    },
    getUsers: {
        resourceName: 'Users',
        route: '/public/v1/users'
    },
    getComments: {
        resourceName: 'Comments',
        route: '/public/v1/comments',
    },
    getTodos: {
        resourceName: 'Todos',
        route: '/public/v1/todos'
    },
};