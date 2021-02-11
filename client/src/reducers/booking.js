import {
	BOOKING_SUCCESS,
	GET_BOOKINGS,
	BOOKING_CANCEL_SUCCESS,
	BOOKING_ERROR,
	CLEAR_BOOKINGS,
} from '../actions/types';

const initialState = {
	loading: true,
	bookings: [],
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		default:
			return state;
		case BOOKING_ERROR:
			return {
				...state,
				loading: false,
			};

		case GET_BOOKINGS:
			return {
				...state,
				bookings: payload,
				loading: false,
			};
		case BOOKING_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case BOOKING_CANCEL_SUCCESS:
			return {
				...state,
				bookings: [
					...state.bookings.filter((booking) => booking._id !== payload._id),
					payload,
				],
			};
		case CLEAR_BOOKINGS:
			return {
				...state,
				bookings: [],
				loading: true,
			};
	}
}
