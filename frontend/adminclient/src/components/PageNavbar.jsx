import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class PageNavbar extends PureComponent {
	renderNavTab(url, name) {
		const { location } = this.props;
		return (
			<li className={`nav-item ${location === url ? 'active' : ''}`}>
				<Link className="nav-link" to={url}>{name}</Link>
			</li>
		);
	}

	render () {
		const { userId } = this.props;
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/employee">{userId}</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{this.renderNavTab('/employee', 'Employee')}
						{this.renderNavTab('/assignment', 'Assignment')}
						{this.renderNavTab('/review', 'Review')}
					</ul>
				</div>
			</nav>
		);
	}
}

export default PageNavbar;
