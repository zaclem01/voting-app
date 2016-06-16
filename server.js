var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

var port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
});