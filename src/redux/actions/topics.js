import { api } from '../../services/api'
export const TOPICS_FETCH_REQUEST = 'TOPICS_FETCH_REQUEST';
export const TOPICS_FETCH_SUCCESS = 'TOPICS_FETCH_SUCCESS';
export const TOPICS_FETCH_FAILED = 'TOPICS_FETCH_FAILED';

export const TOPICS_SAVE_REQUEST = 'TOPICS_SAVE_REQUEST';
export const TOPICS_SAVE_SUCCESS = 'TOPICS_SAVE_SUCCESS';
export const TOPICS_SAVE_FAILED = 'TOPICS_SAVE_FAILED';

export const topicsRequest = (body) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
      dispatch({ type: TOPICS_FETCH_REQUEST})
      api({api: 'api/v1/topics',
      method: 'get'}).then((response) => {
          dispatch({ type: TOPICS_FETCH_SUCCESS,
            message:response.message,payload:response.data.topics })
            resolve(true)
      }).catch(({ err }) => {
        dispatch({ type: TOPICS_FETCH_FAILED,
          message:err })
          reject(true)
      })
  })
}
export const topicsSaveRequest = (body) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
      //dispatch({ type: TOPICS_FETCH_REQUEST})
      api({api: 'api/v1/topic',
      method: 'post',body,contentType:'multipart/form-data'}).then((response) => {
          //dispatch({ type: TOPICS_FETCH_SUCCESS,
          //message:response.message,payload:response.data.topics })
            resolve(response)
      }).catch(({ err }) => {
        //dispatch({ type: TOPICS_FETCH_FAILED,
        //message:err })
          reject(true)
      })
  })
}

export const topicsUpdateRequest = (body,_id) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
      //dispatch({ type: TOPICS_FETCH_REQUEST})
      api({api: 'api/v1/topic/'+_id,
      method: 'put',body,contentType:'multipart/form-data'}).then((response) => {
          //dispatch({ type: TOPICS_FETCH_SUCCESS,
          //message:response.message,payload:response.data.topics })
            resolve(response)
      }).catch(({ err }) => {
        //dispatch({ type: TOPICS_FETCH_FAILED,
        //message:err })
          reject(true)
      })
  })
}