const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Movie',
	},
	show: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Show',
	},
	date: {
		type: Date,
		default: Date.now,
	},
	seats: {
		type: Array,
	},
	status: {
		type: String,
	},
});

module.exports = Booking = new mongoose.model('Booking', bookingSchema);
