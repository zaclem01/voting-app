import React from 'react';
import { Route, IndexRoute } from 'react-router';
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

export default (
	<Route component={App}>
		<Route path='/' component={Home} />
		<Route path='/signin' component={SignIn} />
		<Route path='/signup' component={SignUp} />
		<Route path='/dashboard' component={Dashboard} />
		<Route path='/browse' component={PollsList} />
		<Route path='/:id' component={Poll}>
			<IndexRoute component={PollView} />
			<Route path='edit' component={PollEdit} />
		</Route>
		<Route path='/create' component={PollAdd} />
	</Route>
);