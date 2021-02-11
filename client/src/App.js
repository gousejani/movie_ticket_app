import './App.css';
import react, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Movies from './components/movie/Movies';
import Alert from './components/layout/Alert';
import Booking from './components/booking/Booking';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Title from './components/title/Title';
// Set token for axios headers
if (localStorage.token) {
	setAuthToken(localStorage.token);
}
function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	});
	const onLeave = () => store.dispatch({ type: 'CLEAR_MOVIE' });
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<section className="container">
					<Alert />
					<Route exact path="/" component={Movies}></Route>
					<Switch>
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route
							exact
							path="/title/:id"
							component={Title}
							onLeave={onLeave}
						/>
						<PrivateRoute exact path="/bookings" component={Booking} />
					</Switch>
				</section>
			</Router>
		</Provider>
	);
}

export default App;
