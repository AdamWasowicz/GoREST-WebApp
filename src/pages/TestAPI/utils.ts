import GoRESTClient from "../../assets/classes/goRESTClient";
import { getCommentResponse, getUserResponse } from "../../assets/classes/goRESTClient/types/response";

const useTestAPI = () => {

    const test_getUsers = () => {
        const client = new GoRESTClient(() => console.log('start'), () => console.log('end'));
        client.getUsers(1, (response: getUserResponse) => console.log(response));
    }

    const test_getPostComments = () => {
        const client = new GoRESTClient(() => console.log('start'), () => console.log('end'));
        client.getPostComments(93, (response: getCommentResponse) => console.log(response))
    }

    return { test_getUsers, test_getPostComments }
}

export default useTestAPI;