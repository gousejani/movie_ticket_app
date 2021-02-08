const express = require('express');
const router = express.Router();
const Show = require('../models/Show');
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// @route   POST api/bookings/:showId
// @desc    Book ticket route
// @access  public
router.post('/:showId', auth, async (req, res) => {
	try {
		const { tickets } = req.body;
		const show = await Show.findById(req.params.showId);
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
			date: show.date,
			seats: tickets,
			status: 'upcoming',
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
		console.log(booking);
		const show = Show.findById(booking.show);
		console.log(show);
		booking.seats.map((ticket) => {
			show.seats[ticket[0]][ticket[1]] = true;
		});
		await Show.findOneAndUpdate({ _id: show._id }, show, {
			new: false,
		});
		booking.status = 'Deleted';
		await Booking.findOneAndUpdate({ _id: req.params.bookingId }, booking, {
			new: false,
		});
		res.json(booking);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
	}
});
module.exports = router;
