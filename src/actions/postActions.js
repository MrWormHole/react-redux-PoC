import axios from "axios";
import {
    POST_LIST_INIT,
    POST_LIST_SUCCESS,
    POST_LIST_FAILURE,
    POST_DELETE,
} from "../constants/constants";

export const listPosts = () => async (dispatch) => {
    try{
        dispatch({ type: POST_LIST_INIT });
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
        dispatch({ type: POST_LIST_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: POST_LIST_FAILURE, payload: e.message});
    }
};

export const deletePost = (id) => (dispatch) => {
    dispatch({ type: POST_DELETE, payload: id });
}; 

