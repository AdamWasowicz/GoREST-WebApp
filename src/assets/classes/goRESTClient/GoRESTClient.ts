import { getUserResponse, getPostResponse, getCommentResponse } from './types/response';
import axios, { AxiosError, AxiosResponse } from 'axios';


export default class GoRESTClient {

    private onRequestStart: () => void;
    private onRequestEnd: () => void;
    private apiURL: string = 'https://gorest.co.in';


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

    public getUsers = (pageNumber: number, onRequestComplete: (response: getUserResponse) => void): void => {
        const route = ApiEnpoints.getUsers.route + `?page=${pageNumber}`;
        this.makeGetRequest(route, onRequestComplete);
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