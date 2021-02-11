import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBookings } from '../../actions/booking';
import Spinner from '../layout/Spinner';
import BookingCard from './BookingCard';
import { Link } from 'react-router-dom';
import BookingActive from './BookingActive';
import BookingCancelled from './BookingCancelled';
const Booking = ({ loading, bookings, getBookings }) => {
	useEffect(() => {
		getBookings();
	}, [getBookings]);

	if (loading) {
		return <Spinner></Spinner>;
	}
	return (
		<Fragment>
			<div className="container">
				<BookingActive bookings={bookings} />
				<BookingCancelled bookings={bookings} />
			</div>
		</Fragment>
	);
};

Booking.propTypes = {
	getBookings: PropTypes.func.isRequired,
	bookings: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	bookings: state.booking.bookings,
	loading: state.booking.loading,
});
export default connect(mapStateToProps, { getBookings })(Booking);
