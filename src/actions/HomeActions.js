export const SET_URL = 'SET_URL'


export function setUrl(url) {
  return function(dispatch) {
    dispatch({
    type: SET_URL,
    payload: url,
    })
  }
}
