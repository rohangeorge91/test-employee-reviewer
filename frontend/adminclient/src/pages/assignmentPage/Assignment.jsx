import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {

	}
};

const mapDispatchToProps = (dispatch) => {
	return {

	}
};

class Home extends PureComponent {
	render() {
		return (
			<div>
				Home
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);