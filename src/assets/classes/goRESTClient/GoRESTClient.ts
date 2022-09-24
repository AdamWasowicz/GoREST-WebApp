import { getUsersResponse, getCommentResponse, getTodoWithUserNameResponse, getUserResponse, getPostsWithCommentsResponse } from './types/response';
import axios, { AxiosResponse } from 'axios';
import TodoModel, { TodoWithUserNameModel } from './types/todo';
import RequestMeta from './types/requestMeta'
import PostModel, { PostCompleteModel } from './types/post';
import CommentModel from './types/comment';


export default class GoRESTClient {

    private apiURL: string = 'https://gorest.co.in';


    private makeGetRequestReturnPromise = async (route: string): Promise<AxiosResponse<any>> => {
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
        })

        //returns promise
        return promise;
    }

    public getCommentsByPostIdReturnPromise = async (pageNumber: number, postId: number): Promise<getCommentResponse> => {
        const route = ApiEnpoints.getComments.route + `?page=${pageNumber}&post_id=${postId}`;

        //recives Promise<AxiosResponse<getCommentResponse>>
        const result = await this.makeGetRequestReturnPromise(route);
        
        //creates new Promise<getCommentResponse>
        const promise = new Promise<getCommentResponse>((resolve) => {
            resolve(result.data);
        })

        return promise;
    }

    private getUserByIdReturnPromise = async (userId: number): Promise<getUserResponse> => {
        const route = ApiEnpoints.getUsers.route + `/${userId}`;
        let promise: Promise<getUserResponse>;

        //recives Promise<AxiosResponse<getUserExponse>>
        await this.makeGetRequestReturnPromise(route)
            .then(response => {
                promise = new Promise<getUserResponse>( (resolve, reject) => {
                    resolve(response.data);
                });
            })
            .catch(error => {
                //Promise.reject(new Error('This resource does not exist'))
            });

        return promise;
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
                await this.getUserByIdReturnPromise(item.user_id)
                    .then((result) => {
                        todosWithUserName[index] = {
                            id: dataFromAPI[index].id,
                            user_id: dataFromAPI[index].user_id,
                            title: dataFromAPI[index].title,
                            due_on: dataFromAPI[index].due_on,
                            status: dataFromAPI[index].status,
                            name: result.data.name,
                        }
                    })
                    .catch(error => {
                        todosWithUserName[index] = {
                            id: dataFromAPI[index].id,
                            user_id: dataFromAPI[index].user_id,
                            title: dataFromAPI[index].title,
                            due_on: dataFromAPI[index].due_on,
                            status: dataFromAPI[index].status,
                            name: 'Anonymous',
                        }
                    })
            })    
        )

        //Filter null just in case
        todosWithUserName = todosWithUserName.filter(item => item != null);

        //create model to contain data to be returned with promise
        const promisedData: getTodoWithUserNameResponse = {
            meta: metaFromApi,
            data: todosWithUserName,
        };

        //create promise
        const promise = new Promise<getTodoWithUserNameResponse>((resolve, reject) =>{
            resolve(promisedData)  
        })

        //return promise
        return promise;
    }

    public getPostsWithCommentsReturnPromise = async (pageNumber: number): Promise <getPostsWithCommentsResponse> => {
        const route = ApiEnpoints.getPosts.route + `?page=${pageNumber}`;
        const result = await this.makeGetRequestReturnPromise(route);

        const dataFromAPI: PostModel[] = result.data.data;
        const metaFromApi: RequestMeta = result.data.meta;

        let postsWithComments: PostCompleteModel[] = [];

        //Get comments for posts
        await Promise.all(
            await dataFromAPI.map( async (item, index) => {
                await this.getCommentsForPost(item.id)
                    .then(result => {
                        const newEntry: PostCompleteModel = {
                            id: item.id,
                            body: item.body,
                            title: item.title,
                            user_id: item.user_id,
                            comments: result,
                            userName: ''
                        }

                        postsWithComments.push(newEntry);
                    })
                    .catch(error => {
                        const newEntry: PostCompleteModel = {
                            id: item.id,
                            body: item.body,
                            title: item.title,
                            user_id: item.user_id,
                            comments: [],
                            userName: ''
                        }

                        postsWithComments.push(newEntry);
                    })
            })
        )

        //Get username
        Promise.all(
            await postsWithComments.map( async (item, index) => {
                await this.getUserByIdReturnPromise(item.user_id)
                    .then(result => {
                        postsWithComments[index].userName = result.data.name;
                    })
                    .catch(error => {
                        postsWithComments[index].userName = 'Anonymous';
                    })
            })
        )


        const promisedData: getPostsWithCommentsResponse = {
            meta: metaFromApi,
            data: postsWithComments,
        }
        const promise = new Promise<getPostsWithCommentsResponse>((resolve) => {
            resolve(promisedData);
        })

        return promise;
    }

    private getCommentsForPost = async (postId: number): Promise<CommentModel[]> => {
        let comments: CommentModel[] = [];
        let isMore = true;
        let pageNumber = 1;


        while (isMore) {
            await this.getCommentsByPostIdReturnPromise(pageNumber, postId)
                .then(response => {
                    pageNumber++;

                    if (pageNumber >= response.meta.pagination.pages)
                        isMore = false;
                    
                    if (response.data != null)
                        comments = [...comments, ...response.data];
                });
        }

        const promise = new Promise<CommentModel[]>((resolve) => {
            resolve(comments);
        })

        return promise;
    }


    constructor() {}
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