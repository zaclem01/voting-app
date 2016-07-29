let mongoose = require('mongoose');

let pollSchema = new mongoose.Schema ({ 
	date: {
		type: Date,
		default: Date.now()
	}, 
	creator: String, 
	name: String, 
	options: [{
		label: String, 
		value: Number
	}],
	voters: [String]
});

module.exports = mongoose.model('Poll', pollSchema);