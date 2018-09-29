import { FETCH_USER, FETCH_USER_ERROR } from '../actions/types';

export default function statsReducer(state = {}, action) {
    switch (action.type) {
    case FETCH_USER:
        return action.payload;
    case FETCH_USER_ERROR:
        return { ...state, error: action.payload };
    default:
        return state;
    }
}
