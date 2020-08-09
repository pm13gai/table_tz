import {
  SET_URL,
} from '../actions/HomeActions'

const initialState = {
  url: '',
  isUrl: false,
}


export function homeReducer(state = initialState, action) {
  
  switch (action.type) {
    case SET_URL:
      return { ...state, isUrl: true, url: action.payload }
      
    default:
      return state
  }
}


