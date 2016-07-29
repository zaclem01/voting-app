import React from 'react';
import { Route, IndexRoute } from 'react-router';
import $ from 'jquery';

import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Poll from './components/Poll';
import PollsList from './components/PollsList';
import PollView from './components/PollView';
import PollEdit from './components/PollEdit';
import PollAdd from './components/PollAdd';

function checkAuth(nextState, replace, callback) {
	console.log('checking shit out')
	$.ajax({
        url: '/api/checksession',
        type: 'GET',
        dataType: 'json'
    })
    .done(data => {
    	console.log('is user logged in?')
    	if (!data.isLoggedIn) {
    		replace({
    			pathname: '/signin',
    			state: { nextPathname: nextState.location.pathname }
    		});
    	}
    	// Delay until async call to checksession is complete
    	callback();
    })
    .fail((xhr, status, err) => console.error(err.toString()));
}

export default (
	<Route component={App}>
		<Route path='/' component={Home} />
		<Route path='/signin' component={SignIn} />
		<Route path='/signup' component={SignUp} />
		<Route path='/dashboard' component={Dashboard} onEnter={checkAuth}/>
		<Route path='/browse' component={PollsList} />
		<Route path='/create' component={PollAdd} onEnter={checkAuth}/>
		<Route path='/:id' component={Poll}>
			<IndexRoute component={PollView} />
			<Route path='edit' component={PollEdit} onEnter={checkAuth}/>
		</Route>
	</Route>
);