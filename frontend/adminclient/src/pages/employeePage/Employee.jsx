import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchAllMembers, deleteMember, editMember } from './action';
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
		editMember: (userId) => {
			return dispatch(editMember(userId));
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

class Employee extends PureComponent {
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
						<button onClick={(e) => this.props.editMember(member.userId)}>
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
				<div className="row">
					<div className="col-md-9">
						<br />
						<h2>All Members</h2>
						<br />
					</div>
					<div className="col-md-3">
						<br />
						<button onClick={(e) => this.props.fetchAllMember()}>
							<i className="fa fa-refresh" aria-hidden="true"></i>
						</button>
						<br />
					</div>
				</div>
				<div className="row justify-content-md-center align-items-center">
					<div className="col-md-12">
						<table className="table table-dark table-striped table-hover table-bordered">
							<thead>
								<tr>
									<th>#</th>
									<th>User ID</th>
									<th>Name</th>
									<th>Role</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{this.renderTableRows()}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);