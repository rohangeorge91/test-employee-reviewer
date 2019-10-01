export const FETCH_ALL_MEMBER = '@EmployeePage/FETCH_ALL_MEMBER';
export const RESET_ALL_MEMBER = '@EmployeePage/RESET_ALL_MEMBER';

export const FETCH_MEMBER = '@EditEmployeePage/FETCH_MEMBER';
export const UPDATE_COLUMN = '@EditEmployeePage/UPDATE_COLUMN';
export const RESET_MEMBER = '@EditEmployeePage/RESET_MEMBER';
export const FETCH_OPTIONS = '@EditEmployeePage/FETCH_OPTIONS';

const ADD_MEMBER = '@EmployeePage/ADD_MEMBER';
const EDIT_MEMBER= '@EmployeePage/EDIT_MEMBER';

const INITIAL_STATE = {
	members: [],
	member: {
		userId: '',
		name: '',
		role: 'member'
	},
	roleOpts: []
};

const employeeReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FETCH_MEMBER: {
			return {
				...state,
				member: action.data
			};
		}
		case FETCH_OPTIONS: {
			return {
				...state,
				roleOpts: action.data
			};
		}
		case UPDATE_COLUMN: {
			const { name, value } = action.data;
			return {
				...state,
				member: {
					...state.member,
					[name]: value
				}
			};
		}
		case RESET_MEMBER: {
			return {
				...state,
				member: INITIAL_STATE.member
			};
		}
		case FETCH_ALL_MEMBER: {
			return {
				...state,
				members: action.data
			};
		}
		case RESET_ALL_MEMBER: {
			return INITIAL_STATE;
		}
		default:
			return state;
	}
};

export default employeeReducer;