let Poll = require('../models/poll');
let User = require('../models/user');

module.exports = function(app, passport) {

	app.post('/api/signup', passport.authenticate('local-signup'), (req, res) => {
		res.send();
	});

	app.post('/api/signin', passport.authenticate('local-signin'), (req, res) => {
		res.send();
	});

	app.post('/api/logout', (req, res) => {
		req.logout();
		res.json({ success: true });
	});

	app.get('/api/checksession', (req, res) => {
		if (!req.isAuthenticated()) {
			res.json({ 
				isLoggedIn: false
			})
		} else {
			res.json({ 
				isLoggedIn: true,
				user: {
					id: req.user.id,
					email: req.user.email
				}
			});
		}
	})

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
			// User.findOne( { email: req.user.email }, (err, user) => {
			// 	user.poll_ids.push(poll._id);
			// 	user.save();
			// });
			User.findOneAndUpdate(
				{ email: req.user.email },
				{ 
					$push: { 
						poll_ids: poll._id 
					}
				},
				(err, doc) => {
					if (err) console.log(err)
				}
			);
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
		});
	});
}