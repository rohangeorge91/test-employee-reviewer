export const RESET_LOGIN_PAGE = "@loginPage/RESET_LOGIN_PAGE";
export const CHANGE_USER_ID = "@loginPage/CHANGE_USER_ID";
export const ERROR_LOGIN_PAGE = "@loginPage/ERROR_LOGIN_PAGE";

const INITIAL_STATE = {
	userId: '',
	error: ''
};

const loginReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CHANGE_USER_ID: {
			return {
				...state,
				userId: action.data
			};
		}
		case ERROR_LOGIN_PAGE: {
			return {
				...state,
				error: action.error
			};
		}
		case RESET_LOGIN_PAGE: {
			return INITIAL_STATE;
		}
		default:
			return state;
	}
};

export default loginReducer;