import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
	BOOKING_SUCCESS,
	GET_BOOKINGS,
	BOOKING_CANCEL_SUCCESS,
	BOOKING_ERROR,
	TOGGLE_DISPLAY_SEATS,
	CLEAR_BOOKINGS,
} from '../actions/types';
import { alphaCodeArrayToArray } from '../utils/seatConvertor';
import { setAlert } from './alert';
export const getBookings = () => async (dispatch) => {
	try {
		const res = await axios.get('api/bookings/');
		dispatch({
			type: GET_BOOKINGS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: BOOKING_ERROR,
		});
	}
};

export const bookTickets = (alphaArray, showId, history) => async (
	dispatch
) => {
	const tickets = alphaCodeArrayToArray(alphaArray);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ tickets });
	try {
		const res = await axios.post(`/api/bookings/${showId}`, body, config);
		dispatch({
			type: BOOKING_SUCCESS,
			payload: res.data,
		});
		history.push('/bookings');
		dispatch(setAlert('Hurray!! Booking Confirmed!', 'success', '10000'));
		dispatch({
			type: TOGGLE_DISPLAY_SEATS,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: BOOKING_ERROR,
		});
	}
};

export const cancelTickets = (bookingId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/bookings/${bookingId}`);
		dispatch({
			type: BOOKING_CANCEL_SUCCESS,
			payload: res.data,
		});
		dispatch(setAlert('Booking Cancalled!', 'danger', '10000'));
	} catch (err) {
		console.log(err);
		dispatch({
			type: BOOKING_ERROR,
		});
	}
};

export const clearBookings = () => (dispatch) => {
	dispatch({
		type: CLEAR_BOOKINGS,
	});
};
