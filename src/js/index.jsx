import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Link, Route, hashHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
require('es6-promise').polyfill()

import rootReducer from './reducers'
import Home from './container/Home'
import MyCards from './container/MyCards'
import Record from './container/Record'
import Share from './container/Share'
import expiry from './container/expiry'
import ShareItem from './container/ShareItem'
import '../css/main.scss'
import NEWSAPPAPI from 'newsapp'

const store = compose(
  applyMiddleware(thunk), 
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(rootReducer)
console.log(store.getState())
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers').default
    store.replaceReducer(nextReducer)
  })
}
function App({ children }) {
  return (
    <div>
      <ul>
      </ul>
      {children}
    </div>
  )
}
render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(hashHistory, store)}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="mycards" component={MyCards} />
        <Route path="record" component={Record} />
        <Route path="share" component={Share} />
        <Route path="expiry" component={expiry} />
        <Route path="shareCard" component={ShareItem} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
)
