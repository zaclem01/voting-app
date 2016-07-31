let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let userSchema = new mongoose.Schema({
	username: String,
	password: String,
	poll_ids: [] 
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);