import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ isAuthenticated, logout }) => {
	return (
		<Fragment>
			<div className="navbar">
				<div className="navbar-container">
					<h1 className="nav-brand">
						<Link to="/">
							<i className="fas fa-ticket-alt"></i> Ticket Book Chesko
						</Link>
					</h1>
					<div className="nav-list">
						<ul>
							<li className="nav-items">
								<Link to="/">Movies</Link>
							</li>
							{isAuthenticated ? (
								<Fragment>
									<li className="nav-items">
										<Link to="/bookings">My Bookings</Link>
									</li>
									<li className="nav-items">
										<p onClick={(e) => logout()}>Logout</p>
									</li>
								</Fragment>
							) : (
								<Fragment>
									<li className="nav-items">
										<Link to="/register">Register</Link>
									</li>
									<li className="nav-items">
										<Link to="/login">Login</Link>
									</li>
								</Fragment>
							)}
						</ul>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Navbar);
