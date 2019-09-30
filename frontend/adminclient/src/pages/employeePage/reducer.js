export const VIEW_ALL_TAB = '@EmployeePage/VIEW_ALL_TAB';
export const FETCH_ALL_MEMBER = '@EmployeePage/FETCH_ALL_MEMBER';
const ADD_MEMBER_TAB = '@EmployeePage/ADD_MEMBER_TAB';
const EDIT_MEMBER_TAB = '@EmployeePage/EDIT_MEMBER_TAB';

const INITIAL_STATE = {
	option: 'view',
	members: []

};

const employeeReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case VIEW_ALL_TAB: {
			return {
				...state,
				option: 'view'
			}
		}
		case FETCH_ALL_MEMBER: {
			return {
				...state,
				members: action.data
			};
		}
		default:
			return state;
	}
};

export default employeeReducer;