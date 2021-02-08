const express = require('express');
const Movie = require('../models/Movie');
const Show = require('../models/Show');
const auth = require('../middleware/auth');

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
		const { title, banner } = req.body;
		try {
			const movie = new Movie({
				title,
				banner,
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
// @desc    New Show
// @access  public

router.post(
	'/show/:id',
	check('date', 'show date and time are required').not().isEmpty(),
	check('time', 'show date and time are required').not().isEmpty(),
	check('rows', 'rows are required').not().isEmpty(),
	check('columns', 'columns are required').not().isEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { date, rows, columns, time } = req.body;
		let d = new Date(date);
		try {
			const seats = trueArray(parseInt(rows), parseInt(columns));
			const show = new Show({
				title: req.params.id,
				date: d,
				seats,
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

// @route   Get api/movies/:movie_id/
// @desc    Get shows by movie and date query (date + 3 days shows return)
// @access  public

router.get('/:titleId', async (req, res) => {
	try {
		console.log(req.query.date);
		var d = new Date(req.query.date);
		const query = {
			$and: [
				{
					date: {
						$gte: new Date(d),
						$lt: new Date(d.setDate(d.getDate() + 3)),
					},
				},
				{ title: req.params.titleId },
			],
		};
		const a = await Show.find(query);
		res.json(a);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});
module.exports = router;

// Book ticket route
// @route   POST api/movies/book/:showId
// @desc    Get shows by movie and date query (date + 3 days shows return)
// @access  public
router.post('/book/:showId', auth, async (req, res) => {
	try {
		const { tickets } = req.body;
		const show = await Show.findById(req.params.showId);
		tickets.map((ticket) => {
			show.seats[ticket[0]][ticket[1]] = false;
		});
		await Show.findOneAndUpdate({ _id: req.params.showId }, show, {
			new: false,
		});
		res.json(show);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});
