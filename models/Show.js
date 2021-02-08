const mongoose = require('mongoose');

const showSchema = mongoose.Schema({
	date: {
		type: Date,
	},
	title: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Movie',
	},
	seats: {
		type: Array,
	},
});

module.exports = Show = new mongoose.model('Show', showSchema);
