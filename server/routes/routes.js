let Poll = require('../models/poll');

module.exports = function(app /*, passport*/) {
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
}