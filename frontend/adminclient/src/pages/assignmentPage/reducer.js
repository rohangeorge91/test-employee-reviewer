export const FETCH_ALL_REVIEW_ASSESSMENT = '@AssignmentPage/FETCH_ALL_REVIEW_ASSESSMENT';
export const FETCH_REVIEW_ASSESSMENT = '@EditAssignmentPage/FETCH_REVIEW_ASSESSMENT';
export const FETCH_ALL_MEMBERS = '@EditAssignmentPage/FETCH_ALL_MEMBERS';
export const FETCH_ALL_YEARS = '@EditAssignmentPage/FETCH_ALL_YEARS';
export const UPDATE_COLUMN = '@EditAssignmentPage/UPDATE_COLUMN'

export const RESET_ALL_REVIEW_ASSESSMENT = '@AssignmentPage/RESET_ALL_REVIEW_ASSESSMENT';
export const RESET_REVIEW_ASSESSMENT = '@AssignmentPage/RESET_REVIEW_ASSESSMENT';

const INITIAL_STATE = {
	reviewAssessments: [],
	optionMembers: [],
	optionYears: [],
	reviewAssessment: {
		id: '',
		reviewee: {
			userId: '',
			name: ''
		},
		reviewer: {
			userId: '',
			name: ''
		},
		assessmentYear: '',
		summary: ''
	}
};

const assignmentReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FETCH_ALL_REVIEW_ASSESSMENT: {
			return {
				...state,
				reviewAssessments: action.data
			};
		}
		case RESET_REVIEW_ASSESSMENT: {
			return {
				...state,
				reviewAssessment: INITIAL_STATE.reviewAssessment
			};
		}
		case FETCH_REVIEW_ASSESSMENT: {
			return {
				...state,
				reviewAssessment: action.data
			};
		}
		case FETCH_ALL_MEMBERS: {
			return {
				...state,
				optionMembers: action.data
			};
		}
		case FETCH_ALL_YEARS: {
			return {
				...state,
				optionYears: action.data
			};
		}
		case UPDATE_COLUMN: {
			const { name, value } = action.data;
			return {
				...state,
				reviewAssessment: {
					...state.reviewAssessment,
					[name]: value
				}
			};
		}
		case RESET_ALL_REVIEW_ASSESSMENT: {
			return INITIAL_STATE;
		}
		default:
			return state;
	}
};

export default assignmentReducer;