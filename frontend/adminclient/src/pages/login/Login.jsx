import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { changeUserId, onLoginSubmit, errorObj } from './action';
import { appRouter } from '../../history';

const mapStateToProps = (state) => {
	return {
		...state.loginPage
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmit: (e, userId) => {
			e.preventDefault();
			return onLoginSubmit(userId)
				.then(() => appRouter('/employee'))
				.catch((error) => {
					dispatch(errorObj(error));
				});
		},
		onChange: (value) => {
			dispatch(changeUserId(value));
		}
	}
};

class LoginPage extends PureComponent {
	render () {
		return (
			<div className="container h-100">
				<div className="row h-75 justify-content-md-center align-items-center">
					<div className="col-md-6 px-lg-5">
						<h2>Login Page</h2>
						<br />
						<form onSubmit={(e) => this.props.onSubmit(e, this.props.userId)}>
							<div className="form-group">
								<label htmlFor="userId">User ID</label>
								<input type="text" className="form-control" id="userId" placeholder="Enter User-id"
									onChange={(e) => this.props.onChange(e.target.value)} value={this.props.userId} />
								<small id="userIdError" className="form-text text-danger">{" " + this.props.error}</small>
							</div>
							<button type="submit" className="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);