import GoRESTClient from "../../assets/classes/GoRESTClient";
import { getCommentResponse } from "../../assets/classes/GoRESTClient/types/response";

const useTestAPI = () => {

    const test_getUsers = () => {

    }

    const test_getPostComments = () => {
        const client = new GoRESTClient(() => console.log('start'), () => console.log('end'));
        client.getPostComments(93, (response: getCommentResponse) => console.log(response))
    }

    return { test_getUsers, test_getPostComments }
}

export default useTestAPI;