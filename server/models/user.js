let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	email: String,
	password: String,
	poll_ids: [] 
});

userSchema.methods.validPassword = function(password) {
	return password === this.password;
}

module.exports = mongoose.model('User', userSchema);