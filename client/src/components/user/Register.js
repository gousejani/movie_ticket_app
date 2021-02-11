import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Redirect, Link } from 'react-router-dom';

const Register = ({ isAuthenticated, registerUser, setAlert }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Password do not match', 'danger', 5000);
		} else {
			registerUser({ name, email, password });
		}
	};
	const { name, email, password, password2 } = formData;
	if (isAuthenticated) {
		return <Redirect to="/" />;
	}
	return (
		<Fragment>
			<h1 className="medium text-primary">Register</h1>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						required
						name="name"
						value={name}
						onChange={(e) => onChange(e)}
					/>
				</div>
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
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						minLength="6"
						name="password2"
						value={password2}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Register
				</button>
			</form>
			<p className="lead my-1">
				Already have an account?{' '}
				<Link to="/login" className="text-primary">
					Sign In
				</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { registerUser, setAlert })(Register);
