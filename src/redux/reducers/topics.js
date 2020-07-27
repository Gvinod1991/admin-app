import {
    TOPICS_FETCH_REQUEST,
    TOPICS_FETCH_SUCCESS,
    TOPICS_FETCH_FAILED
  } from '../actions/topics';
  
  const initialState = {
    topics: [],
    loading: false,
    message: null,
    topicError:
      'We are unable fetch topics. Please try again!'
  };
  
  const topics = (state = initialState, action) => {
    switch (action.type) {
      case TOPICS_FETCH_REQUEST:
        return { ...state, loading: true, message: null };
      case TOPICS_FETCH_SUCCESS:
        return {
          ...state,
          topics:action.payload,
          loading: false
        };
      case TOPICS_FETCH_FAILED:
        return { ...state, loading: false, 
                message: action.message ?  action.message : initialState.message
              };
      default:
        return state;
    }
  };
  export default topics;
  