import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getShows, clearMovieAndShows } from '../../actions/movie';
import TitleCard from './TitleCard';
import Spinner from '../layout/Spinner';
import ShowCard from './ShowCard';
import Seats from './Seats';
import store from '../../store';

const Title = ({
	getShows,
	movie,
	shows,
	match,
	titleLoading,
	show,
	displaySeat,
}) => {
	useEffect(() => {
		getShows(match.params.id);
		return () => {
			store.dispatch(clearMovieAndShows());
		};
	}, [getShows]);
	const theatres = [...new Set(shows.map((show) => show.theatre))];

	if (titleLoading) {
		return <Spinner></Spinner>;
	}
	return (
		<Fragment>
			<TitleCard movie={movie}></TitleCard>
			{displaySeat && <Seats show={show} />}

			<div className="show-container">
				{theatres.map((theatre, idx) => {
					const theatreShows = shows.filter((show) => show.theatre === theatre);
					// console.log(theatreShows);
					const props = {
						theatre,
						theatreShows,
					};
					return <ShowCard key={idx} props={props} />;
				})}
			</div>
		</Fragment>
	);
};

Title.propTypes = {
	getShows: PropTypes.func.isRequired,
	movie: PropTypes.object.isRequired,
	shows: PropTypes.array.isRequired,
	titleLoading: PropTypes.bool.isRequired,
	displaySeat: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	movie: state.movie.movie,
	shows: state.movie.shows,
	show: state.movie.show,
	titleLoading: state.movie.titleLoading,
	displaySeat: state.movie.displaySeat,
});
export default connect(mapStateToProps, { getShows })(Title);
