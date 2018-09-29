import octokit from '@octokit/rest';
import {
    FETCH_STATS,
    FETCH_USER,
    FETCH_USER_ERROR,
    FETCH_USER_REPOS,
} from './types';


export function fetchUserDetails(values) {
    return async (dispatch) => {
        try {
            const userData = await octokit().users.getForUser({ username: values.Search });
            const userRepos = await octokit().repos.getForUser({ username: values.Search });
            dispatch({
                type: FETCH_USER,
                payload: userData.data,
            });
            dispatch({
                type: FETCH_USER_REPOS,
                payload: userRepos.data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: `User ${values.Search} not found`,
            });
        }
    };
}
