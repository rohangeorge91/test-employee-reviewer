import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import employeeReducer from './pages/employeePage/reducer';
import loginReducer from './pages/login/reducer';
import assignmentReducer from './pages/assignmentPage/reducer';

let enhancer;
const middleware = [thunk];

const reduxLogger = createLogger({ collapsed: true });
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		// Specify extension’s options like name, actihistoryhistoryhistoryonsBlacklist, actionsCreators, serialize...
	}) : compose;
middleware.push(reduxLogger);
enhancer = composeEnhancers(applyMiddleware(...middleware));

const appReducers = () => {
	return combineReducers({
		employeePage: employeeReducer,
		loginPage: loginReducer,
		assignmentPage: assignmentReducer
	});
};

const store = createStore(
	appReducers(),
	enhancer
);

export default store;