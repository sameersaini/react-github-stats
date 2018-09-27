import axios from 'axios';
import format from 'string-template';
import {
    FETCH_STATS,
    FETCH_USER,
    FETCH_USER_ERROR,
    FETCH_REPO,
} from './types';

import { USER_URL } from './urls';


export function fetchUserDeatils(values) {
    const url = format(USER_URL, { user: values.Search });
    return (dispatch) => {
        axios.get(url).then((response) => {
            dispatch({
                type: FETCH_USER,
                payload: response.data,
            });
        }).catch((response) => {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: `User ${values.Search} not found`,
            });
        });
    };
}
