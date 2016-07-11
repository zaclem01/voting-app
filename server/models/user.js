let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	email: String,
	password: String
});

userSchema.methods.validPassword = function(password) {
	return password === this.password;
}

module.exports = mongoose.model('User', userSchema);