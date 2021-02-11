import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Moviecard = ({ movie: { banners, title, genre, language, _id } }) => {
	return (
		<Fragment>
			<div className="title-card">
				<div className="card-image">
					<img src={banners[0]} alt="" />
				</div>
				<div className="card-body">
					<h3 className="text-primary">{title}</h3>
					<p>
						<strong>Genre:</strong> {genre}
					</p>
					<p>
						<strong>Language:</strong>
						{language}
					</p>
					<Link to={`/title/${_id}`} className="btn btn-primary">
						Check Availability
					</Link>
				</div>
			</div>
		</Fragment>
	);
};

Moviecard.propTypes = {
	movie: PropTypes.object.isRequired,
};

export default Moviecard;
