require('babel-register');

// Basic server setup
let express = require('express');
let path = require('path');
let logger = require('morgan');
let parser = require('body-parser');

// Environmental variables
let port = process.env.PORT || 3000;
let dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/voting-app';

// Server-side rendering setup
let pug = require('pug');
let React = require('react');
let ReactDOM = require('react-dom/server');
let Router = require('react-router');
let routes = require('../client/routes');

// Database setup
let mongoose = require('mongoose');

mongoose.connect(dbUrl, (err) => {
	if (err) console.error('MongoDB connection error');
	else console.log('Successfully connected to MongoDB');
});

let app = express();

// Passport setup
let passport = require('passport');
let session = require('express-session');
require('./config/passport')(passport);

app.use(session({ secret: 'thisistotallyasecretthatnoonewilleverguessyo' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'));
app.use(parser.json({ type: 'application/json' }));
app.use(parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// API endpoints must come before Router matching
require('./routes/routes')(app, passport);

// Server-side rendering of components
app.use((req, res) => {
	Router.match({ routes: routes.default, location: req.url }, (err, redirectLocation, renderProps) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (redirectLocation) {
			res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			console.log('authenticated?', req.isAuthenticated());
			console.log('session', req.session)
			let html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
			let page = pug.renderFile('client/views/index.pug', { html: html });
			res.status(200).send(page);
		} else {
			res.status(404).send('Page Not Found');
		}
	});
});

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
});