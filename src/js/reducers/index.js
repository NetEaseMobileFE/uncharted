import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import home from './home'
import record from './record'
import mycards from './mycards'
import share from './share'
import shareItem from './shareItem'
const rootReducer = combineReducers({
  routing: routerReducer,
  home,
  record,
  mycards,
  share,
  shareItem
})

export default rootReducer
