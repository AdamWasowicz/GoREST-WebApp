import Posts from "../pages/Posts";
import TestAPI from "../pages/TestAPI";
import Todos from "../pages/Todos";
import Users from "../pages/Users";
import { IRoute } from "./IRoute";


export const routes: IRoute[] = [
    {
        module: TestAPI,
        route: '',
        name: 'Test',
        showInNavBar: false,
    },

    {
        module: Users,
        route: 'users',
        name: 'Users',
        showInNavBar: true,
    },

    {
        module: Posts,
        route: 'posts',
        name: 'Posts',
        showInNavBar: true,
    },

    {
        module: Todos,
        route: 'todos',
        name: 'Todos',
        showInNavBar: true,
    }
];