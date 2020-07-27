import { combineReducers } from 'redux';
import auth from './auth';
import topics from './topics'
import articles from './articles'

export default combineReducers({
    auth,
    topics,
    articles
});