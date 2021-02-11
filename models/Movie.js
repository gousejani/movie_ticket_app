const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	banners: {
		type: Array,
	},
	actors: {
		type: Array,
	},
	director: {
		type: String,
	},
	genre: {
		type: String,
	},
	language: {
		type: String,
	},
});

module.exports = Movie = new mongoose.model('Movie', movieSchema);
