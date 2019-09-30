import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

/**
 * Navigates the browser history programmatically 
 * @param {string|Object} location the url to navigate to 'or' a location object.
 * @param {boolean} replace if set to true then replaces the history path. Else pushes to history.
 */
export const appRouter = (location, replace = false) => replace ? history.replace(location) : history.push(location);

/**
 * Navigates the browser back a given number of times.
 * @param {Integer} times the total number of times to move back in history.
 */
export const goBack = (times = 0) => times && times > 0 ? history.go(times) : history.goBack();

export default history;