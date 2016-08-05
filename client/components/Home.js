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
		let sortedPolls = polls.sort((prev, curr) => Date.parse(curr.date) - Date.parse(prev.date))
		let lastPoll = sortedPolls[0];
		return (
			<Grid>
				<Row>
					<Col
						md={6}
						xs={12}
					>
						<h2 className="home-callout-secondary">
							Simple and easy to use
						</h2>
						<p>
							Create a question and choose the available answers. Thats it!
						</p>
						<p>
							Allow as many voting options as you want
						</p>
						<p>
							Save your polls and share them for the whole world to see!
						</p>
						<p>
							Edit previous polls without losing the current results
						</p>
					</Col>
					<Col
						md={6}
						xs={12}
					>
						<h2 className="home-callout">
							Start voting today!
						</h2>
						<h2 className="home-callout">
							Choose an option below:
						</h2>
						<hr />
						<Row>
							<Col xs={12}>
								<h4 className="home-navigation">
									Find an interesting poll and vote now; no signup needed!
								</h4>
								<Link to="/browse">
									<h3 className="home-navigation">
										Browse Polls
									</h3>
								</Link>
							</Col>
						</Row>
						<Row>
							<Col xs={6}>
								<h4 className="home-navigation">
									Create your own polls?
								</h4>
								<Link to="/signup">
									<h3 className="home-navigation">
										Sign up
									</h3>
								</Link>
							</Col>
							<Col xs={6}>
								<h4 className="home-navigation">
									Already a user?
								</h4>
								<Link to="/signin">
									<h3 className="home-navigation">
										Log in
									</h3>
								</Link>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<h2 className="home-poll-example home-poll-example-title">
							Check out this recent poll!
						</h2>
						<h3 className="home-poll-example">
							{lastPoll.name}
						</h3>
						<div 
							className="home-chart"
							onClick={() => this.context.router.push(`/${lastPoll._id}`)}
						>
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