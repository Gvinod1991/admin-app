import { api } from '../../services/api'
export const ARTICLES_FETCH_REQUEST = 'ARTICLES_FETCH_REQUEST';
export const ARTICLES_FETCH_SUCCESS = 'ARTICLES_FETCH_SUCCESS';
export const ARTICLES_FETCH_FAILED = 'ARTICLES_FETCH_FAILED';

export const ARTICLES_SAVE_REQUEST = 'ARTICLES_SAVE_REQUEST';
export const ARTICLES_SAVE_SUCCESS = 'ARTICLES_SAVE_SUCCESS';
export const ARTICLES_SAVE_FAILED = 'ARTICLES_SAVE_FAILED';

export const articlesRequest = (body) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
      dispatch({ type: ARTICLES_FETCH_REQUEST})
      api({api: 'api/v1/articles',
      method: 'get'}).then((response) => {
          dispatch({ type: ARTICLES_FETCH_SUCCESS,
            message:response.message,payload:response.data.articles })
            resolve(true)
      }).catch(({ err }) => {
        dispatch({ type: ARTICLES_FETCH_FAILED,
          message:err })
          reject(true)
      })
  })
}
export const articlesSaveRequest = (body) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
      //dispatch({ type: ARTICLES_FETCH_REQUEST})
      api({api: 'api/v1/article',
      method: 'post',body,contentType:'multipart/form-data'}).then((response) => {
          //dispatch({ type: ARTICLES_FETCH_SUCCESS,
          //message:response.message,payload:response.data.ARTICLES })
            resolve(response)
      }).catch(({ err }) => {
        //dispatch({ type: ARTICLES_FETCH_FAILED,
        //message:err })
          reject(true)
      })
  })
}

export const articlesUpdateRequest = (body,_id) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
      //dispatch({ type: ARTICLES_FETCH_REQUEST})
      api({api: 'api/v1/article/'+_id,
      method: 'put',body,contentType:'multipart/form-data'}).then((response) => {
          //dispatch({ type: ARTICLES_FETCH_SUCCESS,
          //message:response.message,payload:response.data.ARTICLES })
            resolve(response)
      }).catch(({ err }) => {
        //dispatch({ type: ARTICLES_FETCH_FAILED,
        //message:err })
          reject(true)
      })
  })
}