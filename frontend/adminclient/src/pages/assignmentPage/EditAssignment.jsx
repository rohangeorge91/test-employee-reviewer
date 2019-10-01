import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchAllMembers, fetchAllAssessmentYear, onChangeReviewAssessment, resetReviewAssessment, editReviewAssessment, fetchReviewAssessment } from './action';
import { goBack } from '../../history';

const mapStateToProps = (state, ownProps) => {
	return {
		...state.assignmentPage,
		id: ownProps.match.params.id
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchReviewAssignment: (id) => {
			return dispatch(fetchReviewAssessment(id));
		},
		fetchAllMembers: () => {
			return dispatch(fetchAllMembers())
		},
		fetchAllYears: () => {
			return dispatch(fetchAllAssessmentYear());
		},
		onChange: (name, value) => {
			return dispatch(onChangeReviewAssessment(name, value));
		},
		onSubmit: (e, reviewAssessment) => {
			e.preventDefault();
			return dispatch(editReviewAssessment(reviewAssessment)).then(() => {
				goBack();
			});
		},
		reset: () => {
			dispatch(resetReviewAssessment());
		}
	}
};

class EditEmployee extends PureComponent {
	componentDidMount() {
		this.props.fetchReviewAssignment(this.props.id);
		this.props.fetchAllMembers();
		this.props.fetchAllYears();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	renderReviewerOptions() {
		const { optionMembers } = this.props;
		return optionMembers.map((opt, index) => {
			return (
				<option value={opt.userId} key={index}>{opt.name}</option>
			);
		});
	}
	
	renderYearOptions() {
		const { optionYears } = this.props;
		return optionYears.map((opt, index) => {
			return (
				<option value={opt.year} key={index}>{opt.year}</option>
			);
		});
	}

	render() {
		const { reviewAssessment } = this.props;
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-9">
						<br />
						<h2>Edit Review Assignment</h2>
						<br />
					</div>
				</div>
				<div className="row justify-content-md-center align-items-center">
					<div className="col-md-12">
						<form onSubmit={(e) => this.props.onSubmit(e, reviewAssessment)}>
							<div className="form-group row">
								<label htmlFor="userId" className="col-sm-3 col-form-label">Review Assignment ID</label>
								<div className="col-sm-9">
									<input type="text" readOnly className="form-control-plaintext" id="userId"
										name="userId" defaultValue={reviewAssessment.id} />
    						</div>
							</div>
							<div className="form-group row">
								<label htmlFor="role" className="col-sm-3 col-form-label">Reviewee Name</label>
								<div className="col-sm-9">
									<select className="form-control" id="reviewer" name="reviewer" value={reviewAssessment.reviewee.userId}
										onChange={(e) => this.props.onChange('reviewee.userId', e.target.value)}>
										{this.renderReviewerOptions()}
									</select>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="role" className="col-sm-3 col-form-label">Reviewer Name</label>
								<div className="col-sm-9">
									<select className="form-control" id="reviewer" name="reviewer" value={reviewAssessment.reviewer.userId}
										onChange={(e) => this.props.onChange('reviewer.userId', e.target.value)}>
										{this.renderReviewerOptions()}
									</select>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="role" className="col-sm-3 col-form-label">Assessment Year</label>
								<div className="col-sm-9">
									<select className="form-control" id="year" name="year" value={reviewAssessment.assessmentYear}
										onChange={(e) => this.props.onChange('assessmentYear', e.target.value)}>
										{this.renderYearOptions()}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee);