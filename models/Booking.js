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
	},
	seats: {
		type: Array,
	},
	status: {
		type: Array,
	},
});

module.exports = Booking = new mongoose.model('Booking', bookingSchema);
