import axios from 'axios';
import {
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	REGISTER_FAIL,
	LOGIN_FAIL,
	AUTH_ERROR,
	USER_LOADED,
	LOGOUT_USER,
} from './types';
import { setAlert } from '../actions/alert';
import { clearBookings } from './booking';
import setAuthToken from '../utils/setAuthToken';

// load User

export const loadUser = () => async (dispatch) => {
	try {
		const res = await axios.get('api/users/');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};
// Rgister User
export const registerUser = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ name, email, password });
	try {
		const res = await axios.post('api/users/register', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		setAuthToken(localStorage.token);

		dispatch(setAlert('User succesfully Registered', 'success', 5000));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 10000)));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post('api/users/login', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(setAlert('User logged In', 'success', 5000));
		setAuthToken(localStorage.token);
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 10000)));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout User
export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT_USER,
	});
	dispatch(clearBookings());
	dispatch(setAlert('User logged out', 'success', 5000));
};
