import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TitleCard = ({
	movie: { banners, title, genre, language, director, actors },
}) => {
	return (
		<Fragment>
			<div className="title-banner">
				<div className="movie-banner">
					<img src={banners[0]} alt="" />
				</div>
				<div className="movie-detail">
					<h1 className="text-primary large my-1">{title}</h1>
					<p>
						<strong>Genre: </strong> {genre}
					</p>
					<p>
						<strong>Language: </strong>
						{language}
					</p>
					<p>
						<strong>Director: </strong>
						{director}
					</p>
					<p>
						<strong>Cast:</strong>{' '}
						{actors.map((actor, idx) => (
							<Fragment key={idx}> {actor}, </Fragment>
						))}
					</p>
				</div>
			</div>
		</Fragment>
	);
};

TitleCard.propTypes = {};

export default TitleCard;
