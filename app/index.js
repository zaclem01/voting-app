import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import routes from './routes';

//const store;

//const history;

ReactDOM.render(
	<Router history={browserHistory}>
		{routes}
	</Router>,
	document.getElementById('app')
);