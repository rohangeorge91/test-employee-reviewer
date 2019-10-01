import { authenticationRequest } from "../login/authLib";
import { FETCH_ALL_REVIEW_ASSESSMENT, RESET_ALL_REVIEW_ASSESSMENT, FETCH_ALL_MEMBERS, FETCH_ALL_YEARS, UPDATE_COLUMN, RESET_REVIEW_ASSESSMENT, FETCH_REVIEW_ASSESSMENT } from "./reducer";
import { SERVER_URL } from "../../constant";

/**
 * Reset the list
 */
export const resetReviewAssessments = () => {
	return {
		type: RESET_ALL_REVIEW_ASSESSMENT
	};
};

/**
 * Reset the list
 */
export const resetReviewAssessment = () => {
	return {
		type: RESET_REVIEW_ASSESSMENT
	};
};

/**
 * Change the member attribute with the given value.
 * @param {String} name the name of column
 * @param {String} value the option of the column
 */
export const onChangeReviewAssessment = (name, value) => {
	const names = name.split('.');
	if (names.length > 1) {
		const tmpName = names[1];
		return {
			type: UPDATE_COLUMN,
			data: {
				name: names[0],
				value: {
					[tmpName]: value
				}
			}
		};
	}
	return {
		type: UPDATE_COLUMN,
		data: { name, value }
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
			type: FETCH_ALL_MEMBERS,
			data: res
		});
		return res;
	}).catch((error) => {
		console.error(error);
		throw 'Failed to fetch Members';
	});
};

/**
 * Fetch all the members, returns a promise for the same.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const fetchAllAssessmentYear = (fetchAPI = fetch) => (dispatch, getState) => {
	return fetchAPI(`${SERVER_URL}/admin/year`, {
		headers: authenticationRequest()
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to fetch Year';
		}
		return res.json();
	}).then((res) => {
		dispatch({
			type: FETCH_ALL_YEARS,
			data: res
		});
		return res;
	}).catch((error) => {
		console.error(error);
		throw 'Failed to fetch Year';
	});
};

/**
 * Fetch all the review assessment, returns a promise for the same.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const fetchAllReviewAssessment = (fetchAPI = fetch) => (dispatch, getState) => {
	return fetchAPI(`${SERVER_URL}/admin/reviewsAssessment`, {
		headers: authenticationRequest()
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to fetch Assessment';
		}
		return res.json();
	}).then((res) => {
		dispatch({
			type: FETCH_ALL_REVIEW_ASSESSMENT,
			data: res
		});
	}).catch((error) => {
		console.error(error);
		throw 'Failed to fetch Assessment';
	});
};

/**
 * Fetch the review assessment, returns a promise for the same.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const fetchReviewAssessment = (id, fetchAPI = fetch) => (dispatch, getState) => {
	return fetchAPI(`${SERVER_URL}/admin/reviewsAssessment/${id}`, {
		headers: authenticationRequest()
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to fetch Assessment';
		}
		return res.json();
	}).then((res) => {
		dispatch({
			type: FETCH_REVIEW_ASSESSMENT,
			data: res
		});
	}).catch((error) => {
		console.error(error);
		throw 'Failed to fetch Assessment';
	});
};

/**
 * Edit the review assessment from the system and then fetch the new list. Returns a promise for the same.
 * @param {Object} reviewAssessment the id which should be deleted.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const addReviewAssessment = (reviewAssessment, fetchAPI = fetch) => (dispatch, _) => {
	return fetchAPI(`${SERVER_URL}/admin/reviewsAssessment`, {
		method: 'POST',
		headers: authenticationRequest({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(reviewAssessment)
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to add Assessment';
		}
		return res.json();
	}).then(() => {
		return dispatch(resetReviewAssessment());
	}).then(() => {
		return dispatch(fetchAllReviewAssessment())
	}).catch((error) => {
		console.error(error);
		throw 'Failed to add Assessment';
	});
};

/**
 * Edit the review assessment from the system and then fetch the new list. Returns a promise for the same.
 * @param {Object} reviewAssessment the id which should be deleted.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const editReviewAssessment = (reviewAssessment, fetchAPI = fetch) => (dispatch, _) => {
	return fetchAPI(`${SERVER_URL}/admin/reviewsAssessment`, {
		method: 'PUT',
		headers: authenticationRequest({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(reviewAssessment)
	}).then((res) => {
		if (res.status < 200 || res.status >= 300) {
			throw 'Failed to edit Assessment';
		}
		return res.json();
	}).then(() => {
		return dispatch(resetReviewAssessment());
	}).then(() => {
		return dispatch(fetchAllReviewAssessment())
	}).catch((error) => {
		console.error(error);
		throw 'Failed to edit Assessment';
	});
};

/**
 * Delete the review from the system and then fetch the new list. Returns a promise for the same.
 * @param {String} reviewAssessmentId the userid which should be deleted.
 * @param {Function} fetchAPI the fetch function used for fetching information.
 */
export const deleteReviewAssessment = (reviewAssessmentId, fetchAPI = fetch) => {
	return (dispatch, _) => {
		return fetchAPI(`${SERVER_URL}/admin/reviewsAssessment/${reviewAssessmentId}`, {
			method: 'DELETE',
			headers: authenticationRequest()
		}).then((res) => {
			if (res.status < 200 || res.status >= 300) {
				throw 'Failed to delete Assessment';
			}
			return dispatch(fetchAllReviewAssessment());
		}).catch((error) => {
			console.error(error);
			throw 'Failed to delete Assessment';
		});
	};
};
