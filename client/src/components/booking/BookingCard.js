import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { cancelTickets } from '../../actions/booking';
import { connect } from 'react-redux';
import { ticketstoAlphaCodeArray } from '../../utils/seatConvertor';
function BookingCard({
	cancelTickets,
	booking: {
		_id,
		seats,
		user: { name },
		title: { banners, title },
		show,
		date,
		status,
	},
}) {
	if (_id === null || undefined) {
		return <Fragment></Fragment>;
	}
	return (
		<Fragment>
			<div className="booking-item">
				<div className="movie-banner">
					<img src={banners[0]} alt="" />
				</div>
				<div className="movie-detail">
					<h2 className="text-primary">{title}</h2>
					<p>
						<strong>Show At: </strong>
						<Moment format="HH:mm">{show.date}</Moment>{' '}
						<Moment format="DD/MM/YYYY">{show.date}</Moment>
					</p>
					<p>
						<strong>Seats: </strong>
						{ticketstoAlphaCodeArray(seats).map((seat, idx) => (
							<Fragment key={idx}>
								{seat}
								{idx !== seats.length - 1 && <span>, </span>}
							</Fragment>
						))}
					</p>
					<p>
						<strong>Theatre: </strong>
						{show.theatre}
					</p>
					<p>
						<strong>Status: </strong>
						{status === 'Cancelled' ? (
							<span className="text-primary">{status}</span>
						) : (
							<span style={{ color: 'green' }}>
								<strong>{status}</strong>
							</span>
						)}
					</p>
					<p className="lead">
						<small>
							Booked at: <Moment format="HH:mm DD/MM/YY">{date}</Moment>
						</small>
					</p>
				</div>
				<div className="cancel-booking">
					{status !== 'Cancelled' && (
						<Fragment>
							<div
								className="btn btn-primary"
								onClick={(e) => cancelTickets(_id)}
							>
								Cancel
							</div>
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
}
BookingCard.propTypes = {
	cancelTickets: PropTypes.func.isRequired,
	booking: PropTypes.object.isRequired,
};

export default connect(null, { cancelTickets })(BookingCard);
