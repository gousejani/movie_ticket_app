import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import BookingCard from './BookingCard';

const BookingActive = ({ bookings }) => {
	const [sortBy, setSortBy] = useState('movie-up');
	return (
		<div className="booking-container upcoming-bookings">
			<div className="booking-header">
				<h2 className="text-primary">Booked Tickets</h2>
				{bookings.filter((booking) => booking.status !== 'Cancelled').length >
					1 && (
					<Fragment>
						<div className="sort-container">
							<label>Sort by </label>
							<select
								name="booked-sort"
								onChange={(e) => setSortBy(e.target.value)}
								value={sortBy}
							>
								<option value="movie-up">Movie Date - Asc</option>
								<option value="movie-down">Movie Date - Desc</option>

								<option value="booking-up">Booking Date - Asc</option>
								<option value="booking-down">Booking Date - Desc</option>
							</select>
						</div>
					</Fragment>
				)}
			</div>
			{bookings.filter((booking) => booking.status !== 'Cancelled').length ===
			0 ? (
				<Fragment>
					<div className="no-booking-item">
						{' '}
						<p>
							<strong>
								No Active Bookings{' '}
								{/* <Link to="/movies" className="text-primary">
											Browse Movies
										</Link> */}
							</strong>
						</p>{' '}
					</div>
				</Fragment>
			) : (
				<Fragment>
					{bookings
						.filter((booking) => booking.status !== 'Cancelled')
						.sort((a, b) => {
							switch (sortBy) {
								case 'movie-up':
									return (
										new Date(a.show.date).getTime() -
										new Date(b.show.date).getTime()
									);
								case 'movie-down':
									return (
										new Date(b.show.date).getTime() -
										new Date(a.show.date).getTime()
									);
								case 'booking-up':
									return (
										new Date(a.date).getTime() - new Date(b.date).getTime()
									);
								case 'booking-down':
									return (
										new Date(b.date).getTime() - new Date(a.date).getTime()
									);
							}
						})
						.map((booking) => (
							<BookingCard key={booking._id} booking={booking} />
						))}
				</Fragment>
			)}
		</div>
	);
};

BookingActive.propTypes = {
	bookings: PropTypes.array.isRequired,
};

export default BookingActive;
