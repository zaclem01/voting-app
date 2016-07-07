require('babel-register');

// Basic server requires
let express = require('express');
let path = require('path');
let logger = require('morgan');
let parser = require('body-parser');

// Server-side rendering requires
let pug = require('pug');
let React = require('react');
let ReactDOM = require('react-dom/server');
let Router = require('react-router');
let routes = require('./app/routes');

// Database requires
let mongoose = require('mongoose');
let Poll = require('./models/poll');

let app = express();

// Environmental variables
let port = process.env.PORT || 3000;
let dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/voting-app';

mongoose.connect(dbUrl, (err) => {
	if (err) console.error('MongoDB connection error');
	else console.log('Successfully connected to MongoDB');
});

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(parser.json({ type: 'application/json' }));
app.use(parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints must come before Router matching
app.get('/api/polls', (req, res) => {
	Poll.find({}, (err, polls) => {
		if (err) res.send(`Error in retreiving polls: ${err}`);
		res.json(polls)
	});
});

app.post('/api/polls', (req, res) => {
	let newPoll = req.body;
	Poll.create(newPoll, (err, poll) => {
		if (err) res.send(`Error in creating poll: ${err}`);
		res.json(poll);
	})
});

app.get('/api/polls/:id', (req, res) => {
	Poll.findOne({ _id: req.params.id }, (err, poll) => {
		if (err) res.send(`Error in retrieving poll: ${err}`);
		res.json(poll);
	});
});

app.put('/api/polls/:id', (req, res) => {
	if (req.body.userVote) {
		Poll.findOneAndUpdate(
			{ _id: req.params.id, 'options.label': req.body.userVote }, 
			{ $inc: { 'options.$.value': 1 } },
			(err, update) => {
				if (err) res.send(`Error in voting on poll: ${err}`);
				res.json(update);
			}
		);
	} else {
		Poll.findOneAndUpdate(
			{ _id: req.params.id },
			{
				name: req.body.name,
				options: req.body.options
			},
			(err, update) => {
				if (err) res.send(`Error in voting on poll: ${err}`);
				res.json(update);
			}
		);
	}
});

app.delete('/api/polls/:id', (req, res) => {
	Poll.findOneAndRemove({ _id: req.params.id }, (err, poll) => {
		if (err) res.send(`Error in removing poll: ${err}`);
		res.json(poll);
	}
	)
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