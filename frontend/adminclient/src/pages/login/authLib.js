import { SERVER_URL } from "../../constant";

/**
 * This is a wrapper solution for authentication where we add the userId onto the request.
 * NOTE: this is not production ready and should contact another service via a promise.
 */

// user information where the userId is stored.
const userInfo = {
	userId: ''
};

/**
 * Returns a promise which is resolved onces the userId is verified.
 * TODO: this needs to change to something actually production ready.
 * @param {String} user the user id which is used for the login.
 * @param {Function} fetchAPI an api to make fetch request via promise.
 */
export const login = (user, fetchAPI = fetch) => {
	return fetchAPI(`${SERVER_URL}/login/user/${user}`)
		.then((res) => {
			return res.json()
		})
		.then((res) => {
			if (res.logged && res.role === 'admin') {
				userInfo.userId = user;
			} else {
				throw 'User not found.';
			}
			return res;
		}).catch((error) => {
			console.error(error);
			throw 'User not found';
		});
};

/**
 * Returns a login id.
 */
export const getLoginId = () => {
	return userInfo.userId;
}

/**
 * Checks if the user is logged-in.
 */
export const isLogin = () => {
	return userInfo.userId.trim() !== '';
};

/**
 * Returns a promise which is resolved onces the userId is logged-out.
 */
export const logout = () => {
	return new Promise((resolve) => {
		userInfo.userId = '';
		resolve(userInfo);
	});
};

/**
 * Returns an object which the options previous set along with the Auhtorization
 * @param {Object} options a key-value which has the options for the request.
 */
export const authenticationRequest = (options = {}) => {
	return {
		...options,
		Authorization: `Basic ${btoa(userInfo.userId)}`
	};
};

export default {
	login,
	getLoginId,
	isLogin,
	logout
}