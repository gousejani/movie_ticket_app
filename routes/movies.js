const express = require('express');
const Movie = require('../models/Movie');
const Show = require('../models/Show');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const trueArray = require('../utils/trueArray');

// New movie title
// @route   POST api/movies
// @desc    New Movie title
// @access  public

router.post(
	'/',
	check('title', 'Movie title is required').not().isEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		let { title, banners, actors, director, genre, language } = req.body;
		banners = banners
			.split(',')
			.filter((banner) => banner.trim() !== '')
			.map((banner) => banner.trim());
		actors = actors
			.split(',')
			.filter((actor) => actor.trim() !== '')
			.map((actor) => actor.trim());

		try {
			const movie = new Movie({
				title,
				banners,
				actors,
				director,
				genre,
				language,
			});
			await movie.save();
			res.json(movie);
		} catch (err) {
			console.log(err);
			res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
		}
	}
);

// Add show
// @route   POST api/movies/show/:id
// @desc    New Show on movie with id
// @access  public

router.post(
	'/show/:id',
	check('date', 'show date and time are required').not().isEmpty(),
	// check('time', 'show date and time are required').not().isEmpty(), //Future implementation
	check('theatre', 'show date and time are required').not().isEmpty(),
	check('rows', 'rows are required').not().isEmpty(),
	check('columns', 'columns are required').not().isEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { date, rows, columns, theatre } = req.body;
		let d = new Date(date);
		try {
			const seats = trueArray(parseInt(rows), parseInt(columns));
			const show = new Show({
				title: req.params.id,
				date: d,
				seats,
				theatre,
			});
			await show.save();
			res.json(show);
		} catch (err) {
			console.log(err);
			res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
		}
	}
);

// @route   Get api/movies/
// @desc    Get all movie title list
// @access  public

router.get('/', async (req, res) => {
	try {
		const movies = await Movie.find();
		res.json(movies);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});
// @route   Get api/movies/:id
// @desc    Get all movie title list
// @access  public

router.get('/:id', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		res.json(movie);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});

// @route   Get api/movies/shows/:movie_id/
// @desc    Get shows by movie and date query (date + 3 days shows return)
// @access  public

router.get('/shows/:titleId', async (req, res) => {
	try {
		// Future implementation, search by date
		// var d = new Date(req.query.date);
		// const query = {
		// 	$and: [
		// 		{
		// 			date: {
		// 				$gte: new Date(d),
		// 				$lt: new Date(d.setDate(d.getDate() + 3)),
		// 			},
		// 		},
		// 		{ title: req.params.titleId },
		// 	],
		// };
		const query = { title: req.params.titleId };
		const shows = await Show.find(query).populate('title', [
			'banners',
			'actors',
			'director',
			'genre',
			'language',
		]);
		res.json(shows);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});
module.exports = router;
