import './dependencies';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import createHistory from 'history/lib/createHashHistory'
import App from './components/App';
const __react = React; // only in place to prevent React being purged from dependencies as not used directly

var history = createHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={ history }>
    <Route path="/" component={ App } />
  </Router>
), document.getElementById('content'));
