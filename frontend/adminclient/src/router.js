import React, { Suspense, lazy } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { isLogin } from './pages/login/authLib';
import history from './history';
import App from './pages/App';

const redirectOnEntry = () => {
	// if Authorized then all /login are redirected to home
	return isLogin() ? <Redirect from="/login" to="/employee" /> : <Redirect from="/employee" to="/login" />;
};

const buildRouter = () => {
	return (
		<Router history={history}>
			<Suspense fallback={<div>Loading...</div>}>
				{redirectOnEntry()}
				<Switch>
					<Route exact path="/login" component={lazy(() => import('./pages/login/Login.jsx'))} />
					<App location={history.location.pathname}>
						<Switch>
							<Route exact path="/employee" component={lazy(() => import('./pages/employeePage/Employee.jsx'))} />
							<Route exact path="/employee/add" component={lazy(() => import('./pages/employeePage/AddEmployee.jsx'))} />
							<Route exact path="/employee/:userId" component={lazy(() => import('./pages/employeePage/EditEmployee.jsx'))} />
							<Route exact path="/assignment" component={lazy(() => import('./pages/assignmentPage/Assignment.jsx'))} />
							<Route exact path="/assignment/add" component={lazy(() => import('./pages/assignmentPage/AddAssignment.jsx'))} />
							<Route exact path="/assignment/:id" component={lazy(() => import('./pages/assignmentPage/EditAssignment.jsx'))} />
							<Route exact path="/review" component={lazy(() => import('./pages/reviewPage/Review.jsx'))} />
							
						</Switch>
					</App>
				</Switch>
			</Suspense>
		</Router>
	);
};

export default buildRouter;