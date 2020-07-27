import { api } from '../../services/api'
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginRequest = (body) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
      dispatch({ type: LOGIN_REQUEST})
      api({api: 'v1/login',
      method: 'post', body }).then((data) => {
          resolve(data)
          dispatch({ type: LOGIN_SUCCESS,
            message:data.message })
      }).catch(({ err }) => {
        dispatch({ type: LOGIN_FAILED,
          message:err })
          reject(true)
      })
  })
}
