import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import movie from './movie';
import booking from './booking';

export default combineReducers({
	alert,
	auth,
	movie,
	booking,
});
