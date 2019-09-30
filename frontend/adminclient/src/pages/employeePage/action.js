import { SERVER_URL } from "../../constant"
import { FETCH_ALL_MEMBER } from "./reducer";
import { authenticationRequest } from "../login/authLib";

/**
 * Fetch all the members, returns a promise for the same.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const fetchAllMembers = (fetchAPI = fetch) => (dispatch, getState) => {
	return fetchAPI(`${SERVER_URL}/admin/users`, {
		headers: authenticationRequest()
	}).then((res) => {
			return res.json();
		}).then((res) => {
			dispatch({ 
				type: FETCH_ALL_MEMBER,
				data: res
			})
		}).catch((error) => {
			console.error(error);
			return 'Failed to fetch Members';
		});
};

/**
 * Edit the member from the system and then fetch the new list. Returns a promise for the same.
 * @param {Object} user the userid which should be deleted.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const editMember = (user, fetchAPI = fetch) => (dispatch, getState) => {
	return fetchAPI(`${SERVER_URL}/admin/users`, {
		method: 'PUT',
		headers: authenticationRequest()
	}).then(() => {
		return dispatch(fetchAllMembers())
	}).catch((error) => {
		console.error(error);
		return 'Failed to fetch Members';
	});
};


/**
 * Delete the member from the system and then fetch the new list. Returns a promise for the same.
 * @param {String} userId the userid which should be deleted.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const deleteMember = (userId, fetchAPI = fetch) => (dispatch, getState) => {
	return fetchAPI(`${SERVER_URL}/admin/users/${userId}`, {
		method: 'DELETE',
		headers: authenticationRequest()
	}).then(() => {
		return dispatch(fetchAllMembers())
	}).catch((error) => {
		console.error(error);
		return 'Failed to fetch Members';
	});
};
