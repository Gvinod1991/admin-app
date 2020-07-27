import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED
  } from '../actions/auth';
  
  const initialState = {
    user: null,
    token: null,
    loading: false,
    message: null,
    resetError: null,
    refreshLoader: false,
    loginError:
      'We are unable to log you in. Please try again!',
    requestSent: false,
    logoutMessage:null
  };
  
  const auth = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, loading: true, message: null };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case LOGIN_FAILED:
        return { ...state, loading: false, 
                message: action.message === "Invalid Password" || action.message === "User Not Found" ? "Incorrect Username or Password! " : initialState.loginError 
              };
      default:
        return state;
    }
  };
  export default auth;
  