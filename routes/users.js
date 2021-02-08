const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../middleware/auth');

const { compareSync } = require('bcryptjs');

// @route   POST api/users/register
// @desc    Register User
// @access  public
router.post(
	'/register',
	check('name', 'Name is required').not().isEmpty(),
	check('email', 'Email is not valid').isEmail(),
	check(
		'password',
		'Please enter a password with 6 or more characters'
	).isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already Registered' }] });
			}
			user = new User({ name, email, password });
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			const payload = {
				user: {
					id: user._id,
				},
			};
			jwt.sign(
				payload,
				process.env.jwtSecret,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					return res.json({ token });
				}
			);
		} catch (err) {
			console.log(err);
			res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
		}
	}
);

// Login Route
// @route   POST api/users/login
// @desc    Authneticate User
// @access  public
router.post(
	'/login',
	check('email', 'Email is not valid').isEmail(),
	check('password', 'Please enter a password').not().isEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User not Registered' }] });
			}
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}
			const payload = {
				user: {
					id: user._id,
				},
			};
			jwt.sign(
				payload,
				process.env.jwtSecret,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					return res.json({ token });
				}
			);
		} catch (err) {
			console.log(err);
			res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
		}
	}
);

// Check user login
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});

module.exports = router;
