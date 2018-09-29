import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import userReposReducer from './userReposReducer';

const rootReducer = combineReducers({
    user: userReducer,
    userRepos: userReposReducer,
    form: formReducer,
});

export default rootReducer;
