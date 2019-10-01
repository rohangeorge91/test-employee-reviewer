import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { resetMember, onChangeMember, fetchOptions, addMember } from './action';
import { goBack } from '../../history';

const mapStateToProps = (state, ownProps) => {
	return {
		...state.employeePage,
		userId: ownProps.match.params.userId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchRoles: () => {
			return dispatch(fetchOptions())
		},
		onChange: (name, value) => {
			return dispatch(onChangeMember(name, value));
		},
		onSubmit: (e, user) => {
			e.preventDefault();
			return dispatch(addMember(user)).then(() => {
				goBack();
			});
		},
		reset: () => {
			dispatch(resetMember());
		}
	}
};

class AddEmployee extends PureComponent {
	componentDidMount() {
		this.props.fetchRoles();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	
	renderOptions() {
		const { roleOpts } = this.props;
		return roleOpts.map((opt, index) => {
			return (
				<option value={opt.role} key={index}>{opt.role}</option>
			);
		});
	}

	render() {
		const { member } = this.props;
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-9">
						<br />
						<h2>Edit Member</h2>
						<br />
					</div>
				</div>
				<div className="row justify-content-md-center align-items-center">
					<div className="col-md-12">
						<form onSubmit={(e) => this.props.onSubmit(e, this.props.member)}>
							<div className="form-group row">
								<label htmlFor="userId" className="col-sm-2 col-form-label">User ID</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="userId" name="userId"
										value={member.userId} 
										onChange={(e) => this.props.onChange('userId', e.target.value)} />
    						</div>
							</div>
							<div className="form-group row">
								<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="name" name="name"
										value={member.name}
										onChange={(e) => this.props.onChange('name', e.target.value)} />
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="role" className="col-sm-2 col-form-label">Name</label>
								<div className="col-sm-10">
									<select className="form-control" id="role" name="role" value={member.role}
										onChange={(e) => this.props.onChange('role', e.target.value)}>
										{this.renderOptions()}
									</select>
								</div>
							</div>
							<button type="submit" className="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);