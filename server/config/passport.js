let LocalStrategy = require('passport-local').Strategy;

let User = require('../models/user');

module.exports = (passport) => {
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => done(err, { id: id, username: user.username }));
	});

	passport.use('local-signup', new LocalStrategy((username, password, done) => {
			User.findOne({ username: username }, (err, user) => {
				if (err) { 
					console.err(err);
					return done(err); 
				}
				if (user) {
					console.log('user already exists')
					return done(null, false);
				} else {
					let newUser = new User();
					
					newUser.username = username;
					newUser.password = password;

					newUser.save(err => {
						if (err) { console.error('could not save new user to dB'); }
						return done(null, newUser);
					})
				}
			})
		}
	));

	passport.use('local-signin', new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				console.error(err);
				return done(err);
			}
			if (!user || !user.validPassword(password)) {
				console.log('Incorrect username or password');
				return done(null, false);
			}
			return done(null, user);
		});
	}
	));
}