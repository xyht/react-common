import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux'

import helloReducer from './helloReducer'

const reducers = combineReducers({
  helloReducer,
  router: routerReducer
})

export default reducers