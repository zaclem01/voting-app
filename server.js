require('babel-register');

// Basic server requires
let express = require('express');
let path = require('path');
let logger = require('morgan');

// Server-side rendering requires
let pug = require('pug');
let React = require('react');
let ReactDOM = require('react-dom/server');
let Router = require('react-router');
let routes = require('./app/routes');

let app = express();

let port = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

let state = {
	polls: [
		{id: 0, date: 1, creator: 'Zac', name: 'Who is best?', options: [{label: 'me', value: 4}, {label: 'you', value: 2}]},
		{id: 1, date: 2, creator: 'Zac', name: 'Who is worst?', options: [{label: 'me', value: 2}, {label: 'you', value: 1}]},
		{id: 2, date: 3, creator: 'Zac', name: 'Who is mediocre?', options: [{label: 'me', value: 1}, {label: 'you', value: 3}]},
		{id: 3, date: 4, creator: 'Malisa', name: 'Whyyyyyy?', options: [{label: 'dunno', value: 2}, {label: 'because', value: 3}, {label: 'toast', value: 7}]}
	]
};

// API endpoints must come before Router matching
app.get('/api/polls', (req, res) => {
	console.log('sent polls data')
	res.json(state);
});

app.get('/api/polls/:id', (req, res) => {
	console.log('sent individual poll')
	let pollMatch = state.polls.filter((poll) => poll.id == req.params.id);
	res.json(pollMatch[0]);
});

// Server-side rendering of components
app.use((req, res) => {
	Router.match({ routes: routes.default, location: req.url }, (err, redirectLocation, renderProps) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (redirectLocation) {
			res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			let html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
			let page = pug.renderFile('views/index.pug', { html: html });
			res.status(200).send(page);
		} else {
			res.status(404).send('Page Not Found');
		}
	});
});

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
});