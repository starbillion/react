import React from 'react';
import { render } from 'react-dom';
import {Router, useRouterHistory, browserHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import { setCurrentUser } from './actions/authActions';

// import main style dependency file
import './index.css';

const history = useRouterHistory(createBrowserHistory)({
    basename: '/'       // to serve this template from subdirectory, change the base path.
})

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.tourizeToken) {
  store.dispatch(setCurrentUser(localStorage.tourizeToken));
}

render(
  <Provider store={store}>
    <Router history={browserHistory } routes={routes} />
  </Provider>, document.getElementById('root'));