import {
    ARTICLES_FETCH_REQUEST,
    ARTICLES_FETCH_SUCCESS,
    ARTICLES_FETCH_FAILED
  } from '../actions/articles';
  
  const initialState = {
    articles: [],
    loading: false,
    message: null,
    articleError:
      'We are unable fetch topics. Please try again!'
  };
  
  const articles = (state = initialState, action) => {
    switch (action.type) {
      case ARTICLES_FETCH_REQUEST:
        return { ...state, loading: true, message: null };
      case ARTICLES_FETCH_SUCCESS:
        return {
          ...state,
          articles:action.payload,
          loading: false
        };
      case ARTICLES_FETCH_FAILED:
        return { ...state, loading: false, 
                message: action.message ?  action.message : initialState.message
              };
      default:
        return state;
    }
  };
  export default articles;
  