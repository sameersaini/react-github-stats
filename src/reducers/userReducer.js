import { FETCH_USER, FETCH_USER_ERROR } from '../actions/types';

export default function statsReducer(state = {}, action) {
    switch (action.type) {
    case FETCH_USER:
        console.log("in reducer found");
        console.log(action.payload);
        return action.payload;
    case FETCH_USER_ERROR:
        console.log(action.payload);
        return { ...state, error: action.payload };
    default:
        return state;
    }
}
