import { getUsersResponse, getCommentResponse, getTodoWithUserNameResponse, getUserResponse, getPostsWithCommentsResponse } from './types/response';
import axios, { AxiosResponse } from 'axios';
import TodoModel, { TodoWithUserNameModel } from './types/todo';
import RequestMeta from './types/requestMeta'
import PostModel, { PostCompleteModel } from './types/post';
import CommentModel from './types/comment';


export default class GoRESTClient {

    private apiURL: string = 'https://gorest.co.in';


    private makeGetRequestReturnPromise = async (route: string): Promise<any>=> {
        const url = this.apiURL + route;

        return axios({
            method: 'GET',
            url: url,
        })
        .then( response => {
            return response.data;
        })
        .catch( error => {
            Promise.reject();
        })
        
    }

    public getUsersReturnPromise = async (pageNumber: number): Promise<getUsersResponse> => {
        const route = ApiEnpoints.getUsers.route + `?page=${pageNumber}`;

        //returns Promise<getUserExponse>
        return await this.makeGetRequestReturnPromise(route)
            .then(response => {
                return response
            })
            .catch(error => {
                Promise.reject();
            })
    }

    public getCommentsByPostIdReturnPromise = async (pageNumber: number, postId: number): Promise<getCommentResponse> => {
        const route = ApiEnpoints.getComments.route + `?page=${pageNumber}&post_id=${postId}`;

        //returns Promise<getCommentResponse>
        return this.makeGetRequestReturnPromise(route)
            .then(response => {
                return response;
            })
            .catch(error => {
                Promise.reject();
            });
    }

    private getUserByIdReturnPromise = async (userId: number): Promise<getUserResponse> => {
        const route = ApiEnpoints.getUsers.route + `/${userId}`;

        //returns Promise<getUserResponse>
        return await this.makeGetRequestReturnPromise(route)
            .then(response => {
                return response;
            })
            .catch(error => {
                Promise.reject();
            });
    }

    public getTodosWithUserName = async (pageNumber: number): Promise<getTodoWithUserNameResponse> => {
        const route = ApiEnpoints.getTodos.route + `?page=${pageNumber}`;
        const result = await this.makeGetRequestReturnPromise(route);

        const dataFromAPI: TodoModel[] = result.data;
        const metaFromApi: RequestMeta = result.meta;


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


        //return promise
        return promisedData;
    }

    public getPostsWithCommentsReturnPromise = async (pageNumber: number): Promise <getPostsWithCommentsResponse> => {
        const route = ApiEnpoints.getPosts.route + `?page=${pageNumber}`;
        const result = await this.makeGetRequestReturnPromise(route);

        const dataFromAPI: PostModel[] = result.data;
        const metaFromApi: RequestMeta = result.meta;

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
        await Promise.all(
            await postsWithComments.map(async (item, index) => {
                await this.getUserByIdReturnPromise(item.user_id)
                    .then(result => {
                        postsWithComments[index].userName = result.data.name;
                    })
                    .catch(error => {
                        postsWithComments[index] = {
                            id: postsWithComments[index].id,
                            body: postsWithComments[index].body,
                            title: postsWithComments[index].title,
                            user_id: postsWithComments[index].user_id,
                            comments: postsWithComments[index].comments,
                            userName: 'Anonymous'
                        };
                    })
            })
        )


        const promisedData: getPostsWithCommentsResponse = {
            meta: metaFromApi,
            data: postsWithComments,
        }

        return promisedData;
    }

    private getCommentsForPost = async (postId: number): Promise<CommentModel[]> => {
        let comments: CommentModel[] = [];
        let isMore = true;
        let pageNumber = 1;

        //While there are still pages to load
        while (isMore) {
            //Get that page data
            await this.getCommentsByPostIdReturnPromise(pageNumber, postId)
                .then(response => {
                    pageNumber++;

                    //If there are no more pages then stop
                    if (pageNumber >= response.meta.pagination.pages)
                        isMore = false;
                    
                    //If response is not null then add it to array
                    if (response.data != null)
                        comments = [...comments, ...response.data];
                });
        }

        return comments;
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