import { combineReducers } from 'redux'
import { tableReducer } from './table'
import { homeReducer } from './home'

export const rootReducer = combineReducers({
  table: tableReducer,
  home: homeReducer,
})
