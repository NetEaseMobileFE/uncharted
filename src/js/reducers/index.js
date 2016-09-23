import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import home from './home'
import record from './record'
import mycards from './myCards'
// import share from './share'
import shareItem from './shareItem'
import expiry from './expiry'
const rootReducer = combineReducers({
  routing: routerReducer,
  home,
  record,
  mycards,
  // share,
  shareItem,
  expiry
})

export default rootReducer
