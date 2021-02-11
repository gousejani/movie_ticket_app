import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	AUTH_ERROR,
	USER_LOADED,
	LOGOUT_USER,
} from '../actions/types';

const initialState = {
	isAuthenticated: false,
	token: localStorage.getItem('token'),
	loading: true,
	user: null,
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		default:
			return state;
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT_USER:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				user: null,
				loading: false,
				token: null,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				isAuthenticated: true,
				token: payload.token,
				user: payload.user,
				loading: false,
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
	}
}
