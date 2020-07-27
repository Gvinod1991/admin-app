import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers/index';

const configureStore= (initialState={}) => {
 return createStore(
  rootReducer,
  initialState,
   applyMiddleware(thunk)
 );
}

export const store = configureStore();