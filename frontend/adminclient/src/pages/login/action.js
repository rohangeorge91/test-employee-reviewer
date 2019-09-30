import { CHANGE_USER_ID, RESET_LOGIN_PAGE, ERROR_LOGIN_PAGE } from "./reducer";
import { login } from "./authLib";

/**
 * Changes the user-id 
 * @param {String} value the value which is changed on the login page.
 */
export const changeUserId = (value) => {
	return {
		type: CHANGE_USER_ID,
		data: value
	};
};

/**
 * Reset the form.
 */
export const resetForm = () => {
	return {
		type: RESET_LOGIN_PAGE
	};
};

/**
 * Set the error in the form.
 * @param {String} error the error in which was sent
 */
export const errorObj = (error) => {
	return {
		type: ERROR_LOGIN_PAGE,
		error
	};
};

/**
 * Function to login the user.
 * @userId the id which is used for the login.
 */
export const onLoginSubmit = (userId) => {
	return login(userId);
};