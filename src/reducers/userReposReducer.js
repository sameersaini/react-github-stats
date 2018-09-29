import { FETCH_USER_REPOS, FETCH_USER_ERROR } from '../actions/types';

export default function userReposReducer(state = [], action) {
    switch (action.type) {
    case FETCH_USER_REPOS:
        return action.payload;
    case FETCH_USER_ERROR:
        return [...state];
    default:
        return state;
    }
}
