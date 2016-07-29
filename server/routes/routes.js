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
		console.log(req.user)
		if (!req.isAuthenticated()) {
			res.json({ 
				isLoggedIn: false,
				ip: req.ip
			})
		} else {
			res.json({ 
				isLoggedIn: true,
				user: {
					id: req.user.id,
					username: req.user.username,
					ip: req.ip
				}
			});
		}
	})

	app.get('/api/polls', (req, res) => {
		Poll.find({}, (err, polls) => {
			if (err) console.error(`Error in retreiving polls: ${err}`);
			res.json(polls)
		});
	});

	app.post('/api/polls', (req, res) => {
		let newPoll = req.body;
		Poll.create(newPoll, (err, poll) => {
			User.findOneAndUpdate(
				{ username: req.user.username },
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
			if (err) console.error(`Error in retrieving poll: ${err}`);
			res.json(poll);
		});
	});

	app.put('/api/polls/:id', (req, res) => {
		console.log(req.body)
		if (req.body.userVote) {
			let voted = [req.body.ip];
			if (req.body.id) voted.push(req.body.id);
			Poll.findOneAndUpdate(
				{ _id: req.params.id, 'options.label': req.body.userVote }, 
				{ $inc: { 'options.$.value': 1 }, $push: { voters: { $each: voted } } },
				(err, update) => {
					if (err) console.error(`Error in voting on poll: ${err}`);
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
					if (err) console.error(`Error in voting on poll: ${err}`);
					res.json(update);
				}
			);
		}
	});

	app.delete('/api/polls/:id', (req, res) => {
		Poll.findOneAndRemove({ _id: req.params.id }, (err, poll) => {
			if (err) console.error(`Error in removing poll: ${err}`);
			res.json(poll);
		});
	});

	app.get('/api/users/:id', (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) console.error(`Error in retrieving user: ${err}`);
			console.log(user);
			res.json(user);
		})
	});
}