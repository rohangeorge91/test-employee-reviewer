import { SERVER_URL } from "../../constant"
import { FETCH_ALL_MEMBER, RESET_ALL_MEMBER, FETCH_MEMBER, RESET_MEMBER, UPDATE_COLUMN, FETCH_OPTIONS } from "./reducer";
import { authenticationRequest } from "../login/authLib";

/**
 * Reset the list
 */
export const resetMembers = () => {
	return {
		type: RESET_ALL_MEMBER
	};
};

/**
 * Fetch all the members, returns a promise for the same.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const fetchAllMembers = (fetchAPI = fetch) => (dispatch, getState) => {
	return fetchAPI(`${SERVER_URL}/admin/users`, {
		headers: authenticationRequest()
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to fetch Members';
		}
			return res.json();
		}).then((res) => {
			dispatch({ 
				type: FETCH_ALL_MEMBER,
				data: res
			});
		}).catch((error) => {
			console.error(error);
			throw 'Failed to fetch Members';
		});
};

export const resetMember = () => {
	return {
		type: RESET_MEMBER
	};
};


/**
 * Fetch the members, returns a promise for the same.
 * @param {String} userId the user id which should be fetched.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const fetchMember = (userId, fetchAPI = fetch) => (dispatch, getState) => {
	return fetchAPI(`${SERVER_URL}/admin/users/${userId}`, {
		headers: authenticationRequest()
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to fetch Member';
		}
		return res.json();
	}).then((res) => {
		dispatch({
			type: FETCH_MEMBER,
			data: res
		});
	}).catch((error) => {
		console.error(error);
		throw 'Failed to fetch Member';
	});
};

export const fetchOptions = (fetchAPI = fetch) => (dispatch, getState) => {
	return fetchAPI(`${SERVER_URL}/admin/role`, {
		headers: authenticationRequest()
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to fetch role';
		}
		return res.json();
	}).then((res) => {
		dispatch({
			type: FETCH_OPTIONS,
			data: res
		});
	}).catch((error) => {
		console.error(error);
		throw 'Failed to fetch role';
	});
};

/**
 * Change the member attribute with the given value.
 * @param {String} name the name of column
 * @param {String} value the option of the column
 */
export const onChangeMember = (name, value) => {
	return {
		type: UPDATE_COLUMN,
		data: { name, value }
	};
};

/**
 * Edit the member from the system and then fetch the new list. Returns a promise for the same.
 * @param {Object} user the userid which should be deleted.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const addMember = (user, fetchAPI = fetch) => (dispatch, _) => {
	return fetchAPI(`${SERVER_URL}/admin/users`, {
		method: 'POST',
		headers: authenticationRequest({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(user)
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to add Members';
		}
		return res.json();
	}).then(() => {
		return dispatch(fetchAllMembers())
	}).then(() => {
		return dispatch(resetMember());
	}).catch((error) => {
		console.error(error);
		throw 'Failed to add Members';
	});
};

/**
 * Edit the member from the system and then fetch the new list. Returns a promise for the same.
 * @param {Object} user the userid which should be deleted.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const editMember = (user, fetchAPI = fetch) => (dispatch, _) => {
	return fetchAPI(`${SERVER_URL}/admin/users`, {
		method: 'PUT',
		headers: authenticationRequest({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(user)
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to edit Member';
		}
		return res.json();
	}).then(() => {
		return dispatch(resetMember());
	}).then(() => {
		return dispatch(fetchAllMembers())
	}).catch((error) => {
		console.error(error);
		throw 'Failed to edit Member';
	});
};

/**
 * Delete the member from the system and then fetch the new list. Returns a promise for the same.
 * @param {String} userId the userid which should be deleted.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const deleteMember = (userId, fetchAPI = fetch) => (dispatch, _) => {
	return fetchAPI(`${SERVER_URL}/admin/users/${userId}`, {
		method: 'DELETE',
		headers: authenticationRequest()
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to delete Member';
		}
		return dispatch(fetchAllMembers())
	}).catch((error) => {
		console.error(error);
		throw 'Failed to delete Members';
	});
};
