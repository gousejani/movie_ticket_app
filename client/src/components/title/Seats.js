import React, { useState, Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeShow } from '../../actions/movie';
import { bookTickets } from '../../actions/booking';
import { Link } from 'react-router-dom';
import {
	codeToArray,
	arrayToCode,
	arrayToAlphaCode,
	alphaCodeToArray,
} from '../../utils/seatConvertor';
import { withRouter } from 'react-router-dom';

const Seats = ({
	isAuthenticated,
	history,
	bookTickets,
	removeShow,
	show: { _id, seats, date, theatre },
}) => {
	const [selectedSeats, setselectedSeats] = useState([]);
	const toggleSeatSelection = (e, rowIndex, colIndex) => {
		e.target.classList.toggle('selected');
		const idx = selectedSeats.indexOf(arrayToAlphaCode(rowIndex, colIndex));
		if (idx >= 0) {
			setselectedSeats([
				...selectedSeats.slice(0, idx),
				...selectedSeats.slice(idx + 1),
			]);
		} else {
			setselectedSeats([
				...selectedSeats,
				arrayToAlphaCode(rowIndex, colIndex),
			]);
		}
	};

	return (
		<div className="seat-selection-container">
			<div className="seat-selection">
				<i className="fas fa-times" onClick={(e) => removeShow()}></i>
				<h3 className="text-primary my-1">Please select your seats</h3>
				<span>
					<strong>Time: </strong>
					<Moment format="HH:mm">{date}</Moment>
					{'; '}
				</span>
				<span>
					<strong>Theatre: </strong> {theatre}
				</span>
				{selectedSeats.length > 0 && (
					<Fragment>
						<p>
							<strong>Selected:</strong>
							{selectedSeats.map((seat, idx) => (
								<Fragment key={idx}>{seat}, </Fragment>
							))}
						</p>
					</Fragment>
				)}

				<div className="seat-grid">
					{seats.map((seatRow, rowIndex) => (
						<div key={rowIndex} className="row">
							{seatRow.map((seat, colIndex) => {
								if (seat) {
									return (
										<i
											key={colIndex}
											className="fas fa-chair"
											onClick={(e) =>
												toggleSeatSelection(e, rowIndex, colIndex)
											}
										></i>
									);
								}
								{
									return <i key={colIndex} className="fas fa-chair sold"></i>;
								}
							})}
						</div>
					))}
				</div>
				<div className="seat-info">
					{' '}
					<i className="fas fa-chair sold"></i> : Not-available
					<i className="fas fa-chair"></i> : Available
				</div>
				{selectedSeats.length > 0 && (
					<Fragment>
						<div className="confirmation">
							<div className="price">
								<p>
									<strong>{selectedSeats.length}</strong> seats selected
								</p>
								<p>
									<strong>Total Price:</strong> Rs.{' '}
									<strong>{100 * selectedSeats.length}</strong>
								</p>
							</div>
							{isAuthenticated ? (
								<Fragment>
									<div
										className="btn btn-primary"
										onClick={(e) => bookTickets(selectedSeats, _id, history)}
									>
										Confirm Booking
									</div>
								</Fragment>
							) : (
								<Fragment>
									<div className="btn btn-primary">
										<Link to="/login">Please Login to Book</Link>
									</div>
								</Fragment>
							)}
						</div>
					</Fragment>
				)}
			</div>
		</div>
	);
};

Seats.propTypes = {
	show: PropTypes.object.isRequired,
	removeShow: PropTypes.func.isRequired,
	bookTickets: PropTypes.func.isRequired,
	show: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { removeShow, bookTickets })(
	withRouter(Seats)
);
