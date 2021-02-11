import {
	MOVIE_ERROR,
	MOVIES_LOADED,
	MOVIE_LOADED,
	MOVIES_ERROR,
	TOGGLE_DISPLAY_SEATS,
	SET_SHOW,
	REMOVE_SHOW,
	CLEAR_MOVIE,
} from '../actions/types';
const initialState = {
	loading: true,
	titleLoading: true,
	movies: [],
	movie: {},
	shows: [],
	show: {},
	errors: {},
	displaySeat: false,
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		default:
			return state;
		case MOVIE_ERROR:
			return {
				...state,
				movie: {},
				shows: [],
				titleLoading: false,
			};
		case MOVIES_ERROR:
			return {
				...state,
				movies: [],
				loading: false,
			};
		case MOVIES_LOADED:
			return {
				...state,
				loading: false,
				movies: payload,
			};
		case MOVIE_LOADED:
			return {
				...state,
				titleLoading: false,
				movie: payload.movie,
				shows: payload.shows,
			};
		case CLEAR_MOVIE:
			return {
				...state,
				titleLoading: true,
				movie: {},
				shows: [],
			};
		case TOGGLE_DISPLAY_SEATS:
			return {
				...state,
				displaySeat: !state.displaySeat,
			};
		case SET_SHOW:
			return {
				...state,
				show: state.shows.filter((show) => show._id.toString() === payload)[0],
			};
		case REMOVE_SHOW:
			return {
				...state,
				show: {},
			};
	}
}
