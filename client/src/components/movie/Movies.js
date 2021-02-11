import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovieList } from '../../actions/movie';
import Moviecard from './Moviecard';
import Spinner from '../layout/Spinner';
const Movies = ({ movies, getMovieList, loading }) => {
	useEffect(() => {
		getMovieList();
	}, [getMovieList]);
	if (loading) {
		return <Spinner></Spinner>;
	}
	return (
		<Fragment>
			<h1 className="text-primary my-1">Now showing</h1>
			<div className="movies-container">
				{movies.map((movie) => (
					<Moviecard key={movie._id} movie={movie} />
				))}
			</div>
		</Fragment>
	);
};

Movies.propTypes = {
	movies: PropTypes.array.isRequired,
	getMovieList: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	movies: state.movie.movies,
	loading: state.movie.loading,
});
export default connect(mapStateToProps, { getMovieList })(Movies);
