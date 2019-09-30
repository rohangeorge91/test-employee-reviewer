import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchAllMembers, deleteMember } from './action';
import { getLoginId } from '../login/authLib';

const mapStateToProps = (state) => {
	return {
		...state.employeePage
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllMember: () => {
			return dispatch(fetchAllMembers());
		},
		deleteMember: (userId, curUserId = getLoginId()) => {
			if (userId === curUserId) {
				alert('Can\'t delete yourself');
			} else {
				return dispatch(deleteMember(userId));
			}
		}
	}
};

class EditEmployee extends PureComponent {
	componentDidMount() {
		this.props.fetchAllMember();
	}

	renderTableRows() {
		const { members } = this.props;
		return members.map((member, index) => {
			return (
				<tr key={index}>
					<td>{(index + 1)}</td>
					<td>{member.userId}</td>
					<td>{member.name}</td>
					<td>{member.role}</td>
					<td>
						<button>
							<i className="fa fa-pencil" aria-hidden="true"></i>
						</button>
					</td>
					<td>
						<button onClick={(e) => this.props.deleteMember(member.userId)}>
							<i className="fa fa-minus" aria-hidden="true"></i>
						</button>
					</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div className="container">
				<div className="row justify-content-md-center align-items-center">
					<div className="col-md-12">
						<form>
							<div className="form-group row">
								<label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
								<div className="col-sm-10">
									<input type="text" readonly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
    						</div>
							</div>
							<div className="form-group row">
								<label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
								<div className="col-sm-10">
									<input type="password" className="form-control" id="inputPassword" placeholder="Password" />
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee);