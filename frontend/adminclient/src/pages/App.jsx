import React, { Component } from 'react';
import { getLoginId } from './login/authLib';
import PageNavbar from './../components/PageNavbar';

class App extends Component {
	render() {
		return (
			<div>
				<PageNavbar userId={getLoginId()} location={this.props.location.pathname} />
				{this.props.children}
			</div>
		);
	}
}

export default App;