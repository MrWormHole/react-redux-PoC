import {
    POST_LIST_INIT,
    POST_LIST_SUCCESS,
    POST_LIST_FAILURE,
    POST_DELETE
} from "../constants/constants"

export const postReducer = (state = { posts: [] }, action) => {
    switch(action.type) {
        case POST_LIST_INIT:
            return { loading: true, posts: [] };
        case POST_LIST_SUCCESS:
            return {
                loading: false,
                posts: action.payload
            };
        case POST_LIST_FAILURE:
            return { loading: false, error: action.payload };
        case POST_DELETE:
            const id = action.payload
            return {
                ...state,
                posts: state.posts.filter((x) => x.id !== id)
            };
        default:
            return state;
    }
}

/*export const postDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case POST_DELETE_INIT:
            return { loading: true };
        case POST_DELETE_SUCCESS:
            return { loading: false, success: true }
        case POST_DELETE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state
    }
}*/