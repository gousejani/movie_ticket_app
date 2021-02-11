const express = require('express');
const router = express.Router();
const Show = require('../models/Show');
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// @route   POST api/bookings/
// @desc    Get all bookings
// @access  private
router.get('/', auth, async (req, res) => {
	try {
		const bookings = await Booking.find({ user: req.user.id })
			.populate('user', ['name'])
			.populate('show', ['theatre', 'date'])
			.populate('title', ['title', 'banners']);
		res.json(bookings);
	} catch (err) {
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});

// @route   POST api/bookings/:showId
// @desc    Book ticket route
// @access  private
router.post('/:showId', auth, async (req, res) => {
	try {
		const { tickets } = req.body;
		const show = await Show.findById(req.params.showId);
		console.log(show);
		tickets.map((ticket) => {
			show.seats[ticket[0]][ticket[1]] = false;
		});
		await Show.findOneAndUpdate({ _id: req.params.showId }, show, {
			new: false,
		});
		const booking = new Booking({
			user: req.user.id,
			title: show.title,
			show: show._id,
			seats: tickets,
			status: 'Booked',
		});
		await booking.save();
		res.json(booking);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});

// @route   DELETE api/bookings/:bookingId
// @desc    Cancel ticket route
// @access  private
router.delete('/:bookingId', auth, async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.bookingId);
		const show = await Show.findById({ _id: booking.show });
		booking.seats.map((seat) => {
			show.seats[seat[0]][seat[1]] = true;
		});
		await Show.findOneAndUpdate({ _id: show._id }, show, {
			new: false,
		});
		booking.status = 'Cancelled';
		await Booking.findOneAndUpdate({ _id: req.params.bookingId }, booking, {
			new: false,
		});

		const finalBooking = await Booking.findById(req.params.bookingId)
			.populate('user', ['name'])
			.populate('show', ['theatre', 'date'])
			.populate('title', ['title', 'banners']);
		res.json(finalBooking);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});
module.exports = router;
