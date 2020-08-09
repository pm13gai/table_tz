import {
  DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
} from '../actions/TableActions'

const initialState = {
  data: null,
  error: '',
  isFetching: false,
}


export function tableReducer(state = initialState, action) {
  
  switch (action.type) {
    case DATA_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case GET_DATA_SUCCESS:
      return { ...state, isFetching: false, data: action.payload }
      

    case GET_DATA_FAIL:
      return { ...state, isFetching: false, error: action.payload.message }

    default:
      return state
  }
}


