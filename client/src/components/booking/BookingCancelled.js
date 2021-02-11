import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import BookingCard from './BookingCard';

const BookingCancelled = ({ bookings }) => {
	const [sortBy, setSortBy] = useState('movie');
	if (
		bookings.filter((booking) => booking.status === 'Cancelled').length !== 0
	) {
		return (
			<div className="booking-container">
				<div className="booking-header">
					<h2 className="text-primary">Cancelled Tickets</h2>
					{bookings.filter((booking) => booking.status === 'Cancelled').length >
						1 && (
						<Fragment>
							<div className="sort-container">
								<label>Sort by </label>
								<select
									name="booked-sort"
									onChange={(e) => setSortBy(e.target.value)}
									value={sortBy}
								>
									<option value="movie">Movie Date</option>
									<option value="booking">Booking Date</option>
								</select>
							</div>
						</Fragment>
					)}
				</div>
				<div className="past-bookings">
					<Fragment>
						{bookings
							.filter((booking) => booking.status === 'Cancelled')
							.sort((a, b) => {
								if (sortBy === 'booking') {
									return (
										new Date(a.date).getTime() - new Date(b.date).getTime()
									);
								} else {
									return (
										new Date(a.show.date).getTime() -
										new Date(b.show.date).getTime()
									);
								}
							})
							.map((booking) => (
								<BookingCard key={booking._id} booking={booking} />
							))}
					</Fragment>
				</div>
			</div>
		);
	} else {
		return <Fragment></Fragment>;
	}
};

BookingCancelled.propTypes = {
	bookings: PropTypes.array.isRequired,
};

export default BookingCancelled;
