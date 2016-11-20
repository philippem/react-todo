
import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from '../common/store'
import routes from '../common/routes.jsx'

const store = configureStore(browserHistory, window.LOCALS)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
