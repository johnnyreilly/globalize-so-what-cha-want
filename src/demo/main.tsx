import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import useQueries from 'history/lib/useQueries'
import createHistory from 'history/lib/createHashHistory'
import App from './components/App';
import * as ModuleActions from './actions/ModuleActions';
const __react = React; // only in place to prevent React being purged from dependencies as not used directly

var history = useQueries(createHistory)({
  queryKey: false
});

// Respond to route changes
history.listen(location => { ModuleActions.routeChanged(location.query as { [moduleName: string]: string }); });

ReactDOM.render((
  <Router history={ history }>
    <Route path="/" component={ App } />
  </Router>
), document.getElementById('content'));

// Initial state
history.pushState(null, '/?currency=true&date=true&message=true&number=true&plural=true&relativeTime=true&unit=true');