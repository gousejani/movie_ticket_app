import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Redirect, Link } from 'react-router-dom';
const Login = ({ isAuthenticated, loginUser, setAlert }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		loginUser(email, password);
	};
	const { email, password } = formData;
	if (isAuthenticated) {
		return <Redirect to="/" />;
	}
	return (
		<Fragment>
			<h1 className="medium text-primary">Login</h1>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						minLength="6"
						name="password"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
			<p className="lead my-1">
				Do not have an account?{' '}
				<Link to="/register" className="text-primary">
					Sign Up
				</Link>
			</p>
		</Fragment>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { loginUser, setAlert })(Login);
