import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchAllReviewAssessment, resetReviewAssessments, deleteReviewAssessment } from './action';
import { appRouter } from '../../history';

const mapStateToProps = (state) => {
	return {
		...state.assignmentPage
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reset: () => {
			return resetReviewAssessments();
		},
		fetchAllReviewAssessment: () => {
			return dispatch(fetchAllReviewAssessment());
		},
		addReviewAssessment: () => {
			appRouter('/assignment/add');
		},
		openEditReviewAssessment: (reviewAssessmentId) => {
			appRouter(`/assignment/${reviewAssessmentId}`);
		},
		deleteReviewAssessment: (reviewAssessmentId) => {
			return dispatch(deleteReviewAssessment(reviewAssessmentId));
		}
	}
};

class AssignmentPage extends PureComponent {
	componentDidMount() {
		this.props.fetchAllReviewAssessment();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	renderTableRows() {
		const { reviewAssessments } = this.props;
		return reviewAssessments.map((reviewAssessment, index) => {
			return (
				<tr key={index}>
					<td>{reviewAssessment.id}</td>
					<td>{reviewAssessment.reviewee.name}</td>
					<td>{reviewAssessment.reviewer.name}</td>
					<td>{reviewAssessment.assessmentYear}</td>
					<td>{reviewAssessment.summary}</td>
					<td>
						<button onClick={(e) => this.props.openEditReviewAssessment(reviewAssessment.id)}>
							<i className="fa fa-pencil" aria-hidden="true"></i>
						</button>
					</td>
					<td>
						<button onClick={(e) => this.props.deleteReviewAssessment(reviewAssessment.id)}>
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
						<h2>All Assignment</h2>
						<br />
					</div>
					<div className="col-md-3 button-panel">
						<br />
						<button onClick={(e) => this.props.fetchAllReviewAssessment()}>
							<i className="fa fa-refresh" aria-hidden="true"></i>
						</button>
						<button onClick={(e) => this.props.addReviewAssessment()} className="">
							<i className="fa fa-plus" aria-hidden="true"></i>
						</button>
						<br />
					</div>
				</div>
				<div className="row justify-content-md-center align-items-center">
					<div className="col-md-12">
						<table className="table table-striped table-hover table-bordered">
							<thead>
								<tr>
									<th>ID</th>
									<th>Reviewee Name</th>
									<th>Reviewer Name</th>
									<th>Assessment year</th>
									<th>Summary</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentPage);