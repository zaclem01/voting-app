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
let routes = require('../client/routes');

// Database requires
let mongoose = require('mongoose');

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
app.use(express.static(path.join(__dirname, '../public')));

require('./routes/routes')(app /*, passport*/);

// Server-side rendering of components
app.use((req, res) => {
	Router.match({ routes: routes.default, location: req.url }, (err, redirectLocation, renderProps) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (redirectLocation) {
			res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
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