import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { setShow } from '../../actions/movie';
import { connect } from 'react-redux';

const ShowCard = ({ setShow, props: { theatre, theatreShows } }) => {
	return (
		<div className="show-items">
			<div className="theater">{theatre}</div>
			<div className="show-times">
				{theatreShows.map((show, idx) => (
					<div
						key={idx}
						className="btn btn-available"
						onClick={(e) => {
							setShow(show._id);
						}}
					>
						<Moment format="HH:mm">{show.date}</Moment>
					</div>
				))}
			</div>
		</div>
	);
};

ShowCard.propTypes = {
	props: PropTypes.object.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default connect(null, { setShow })(ShowCard);
