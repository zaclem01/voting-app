import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import Chart from '../utils/Chart';

class Home extends React.Component {
	constructor(props, context) {
        super(props);
        this.context = context;
    }

    componentDidMount() {
    	if (this.props.user.id) {
    		this.context.router.push('browse')
    	}
    }

	render() {
		let { polls } = this.props;
		let lastPoll = polls[polls.length - 1];
		return (
			<Grid>
				<Row>
					<Col
						md={6}
						xs={12}
					>
						<h2>Simple and easy to use</h2>
						<p>Create a question and choose the available answers. Thats it!</p>
						<p>Allow as many voting options as you want</p>
						<p>Save your polls and share them for the whole world to see!</p>
						<p>Edit previous polls without losing the current results</p>
					</Col>
					<Col
						md={6}
						xs={12}
					>
						<h2>Start voting today!</h2>
						<h2>Choose an option below:</h2>
						<hr />
						<Row>
							<Col xs={12}>
								<h4>Find an interesting poll and vote now; no signup needed!</h4>
								<Link to="/browse"><h3>Browse Polls</h3></Link>
							</Col>
						</Row>
						<Row>
							<Col xs={6}>
								<h4>Create your own polls?</h4>
								<Link to="/signup"><h3>Sign up</h3></Link>
							</Col>
							<Col xs={6}>
								<h4>Already a user?</h4>
								<Link to="/signin"><h3>Log in</h3></Link>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<h2>Check out this recent poll!</h2>
						<div className="home-chart">
							<Chart data={lastPoll.options} />
						</div>
					</Col>
				</Row>
			</Grid>
		);
	}
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Home;