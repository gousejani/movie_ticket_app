const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	banner: {
		type: String,
	},
});

module.exports = Movie = new mongoose.model('Movie', movieSchema);
