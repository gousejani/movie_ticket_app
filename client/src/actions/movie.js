import axios from 'axios';
import {
	MOVIE_ERROR,
	MOVIES_ERROR,
	MOVIES_LOADED,
	MOVIE_LOADED,
	TOGGLE_DISPLAY_SEATS,
	SET_SHOW,
	REMOVE_SHOW,
	CLEAR_MOVIE,
} from './types';

export const getMovieList = () => async (dispatch) => {
	try {
		const res = await axios.get('api/movies/');
		dispatch({
			type: MOVIES_LOADED,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: MOVIES_ERROR,
		});
	}
};

export const getShows = (titleId) => async (dispatch) => {
	try {
		const movie = await axios.get(`/api/movies/${titleId}`);
		const shows = await axios.get(`/api/movies/shows/${titleId}`);
		dispatch({
			type: MOVIE_LOADED,
			payload: {
				movie: movie.data,
				shows: shows.data,
			},
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: MOVIE_ERROR,
		});
	}
};

export const clearMovieAndShows = () => (dispatch) => {
	dispatch({
		type: CLEAR_MOVIE,
	});
};

export const setShow = (showId) => (dispatch) => {
	dispatch({
		type: SET_SHOW,
		payload: showId,
	});
	dispatch({
		type: TOGGLE_DISPLAY_SEATS,
	});
};
export const removeShow = () => (dispatch) => {
	dispatch({
		type: REMOVE_SHOW,
	});
	dispatch({
		type: TOGGLE_DISPLAY_SEATS,
	});
};
